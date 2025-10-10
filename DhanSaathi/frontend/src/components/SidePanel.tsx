// src/components/SidePanel.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, onClose, name }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <>
      {/* Overlay - clickable to close */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300 z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Panel */}
      <aside
        className={`fixed top-[72px] right-0 h-[calc(100%-72px)] w-80 bg-gradient-to-b from-slate-900 to-slate-800 border-l border-amber-500/20 shadow-2xl shadow-black/30 z-50 transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col p-6 space-y-8 h-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                Profile
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-all duration-200 transform hover:scale-110"
            >
              ✕
            </button>
          </div>

          {/* User Section */}
          <div className="flex flex-col items-center space-y-4">
            {/* Avatar */}
            <div className="w-24 h-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-lg shadow-amber-500/25">
              {name.charAt(0).toUpperCase()}
            </div>
            
            {/* User Info */}
            <div className="text-center">
              <div className="text-xl font-semibold text-white mb-1">{name}</div>
              <div className="text-sm text-slate-400">Premium Member</div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            className="w-full py-3 px-4 bg-gradient-to-r from-red-500/90 to-red-600/90 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/20 border border-red-500/30"
            onClick={handleLogout}
          >
            Sign Out
          </button>

          {/* Security Note */}
         
        </div>
      </aside>
    </>
  );
};

export default SidePanel;