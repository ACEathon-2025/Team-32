// ocr.js
import fs from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env.AZURE_ENDPOINT;
const key = process.env.AZURE_KEY;
const filePath = ""; 

async function runOCR() {
  try {
    const fileBuffer = fs.readFileSync(filePath);

    // Step 1: Submit document for analysis
    const response = await fetch(
      `${endpoint}/formrecognizer/documentModels/prebuilt-read:analyze?api-version=2023-07-31`,
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Content-Type": "application/octet-stream",
        },
        body: fileBuffer,
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error("Submit failed: " + text);
    }

    const operationLocation = response.headers.get("operation-location");
    if (!operationLocation) throw new Error("No operation-location header returned");

    console.log("Submitted, polling...");

    // Step 2: Poll for results
    let result = null;
    for (let i = 0; i < 10; i++) {
      const pollResponse = await fetch(operationLocation, {
        headers: { "Ocp-Apim-Subscription-Key": key },
      });
      result = await pollResponse.json();
      if (result.status === "succeeded") break;
      await new Promise((r) => setTimeout(r, 1000));
    }

    if (!result || result.status !== "succeeded") {
      throw new Error("OCR failed or timed out");
    }

    // Step 3: Extract text
    const extractedText = result.analyzeResult?.contentElements
      ? result.analyzeResult.contentElements.map(el => el.content).join("\n")
      : "No text found";

    console.log("Extracted Text:\n", extractedText);

  } catch (err) {
    console.error(err);
  }
}

runOCR();
