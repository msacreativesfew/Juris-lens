import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Cpu,
  Database,
  Cloud,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  geminiConfigured: boolean;
  onRefreshHealth: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  geminiConfigured,
  onRefreshHealth,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isOpen) return null;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefreshHealth();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26352D]/40 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl flex flex-col rounded-2xl bg-[#FFFEFA] border border-[#DFDACD] shadow-xl overflow-hidden text-[#26352D]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#DFDACD] bg-[#FFFEFA]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#E5EFE5] text-[#477A58]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#26352D]">System Diagnostics & Status</h3>
              <p className="text-xs text-[#68736A]">Google Cloud AI & Statutory Engine Configuration</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-1.5 rounded-lg text-[#68736A] hover:text-[#26352D] hover:bg-[#F1EEE4] transition-colors"
              title="Refresh Health Check"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#68736A] hover:text-[#26352D] hover:bg-[#F1EEE4] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs overflow-y-auto max-h-[75vh]">
          {/* Cloud AI Status Card */}
          <div className="p-4 rounded-xl bg-[#F7F5EE] border border-[#DFDACD] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-[#477A58]" />
                <span className="font-bold text-[#26352D]">Vertex AI Gemini Connection</span>
              </div>
              {geminiConfigured ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-semibold bg-[#E5F3E8] text-[#28734A] border border-[#28734A]/20">
                  <CheckCircle2 className="h-3 w-3" />
                  Connected & Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-semibold bg-[#FBF0D2] text-[#8A6417] border border-[#8A6417]/20">
                  <AlertCircle className="h-3 w-3" />
                  Key Not Configured
                </span>
              )}
            </div>

            <p className="text-[#68736A] leading-relaxed">
              {geminiConfigured
                ? 'Primary multimodal reasoning model gemini-3.8-flash is active with automatic failover to gemini-3.1-flash-lite on 503 capacity spikes.'
                : 'Custom asset scans require GEMINI_API_KEY in the environment. Precomputed demonstration datasets and the local grounded statutory engine remain operational without credentials.'}
            </p>

            <div className="pt-2 border-t border-[#DFDACD] flex items-center justify-between text-[#858A80] font-mono text-[11px]">
              <span>Target Model: gemini-3.8-flash</span>
              <span>SDK: @google/genai v2.4.0</span>
            </div>
          </div>

          {/* Statutory Database Engine Status */}
          <div className="p-4 rounded-xl bg-[#F7F5EE] border border-[#DFDACD] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-[#346C92]" />
                <span className="font-bold text-[#26352D]">Statutory Knowledge Store</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-semibold bg-[#E5F3E8] text-[#28734A] border border-[#28734A]/20">
                <CheckCircle2 className="h-3 w-3" />
                Index Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[#68736A]">
              <div className="p-2.5 rounded-lg bg-[#FFFEFA] border border-[#DFDACD]">
                <span className="text-[#26352D] font-semibold block">Singapore SFA</span>
                <span className="text-[10px]">Cap. 283 & Nutri-Grade Guidelines (18 rules)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FFFEFA] border border-[#DFDACD]">
                <span className="text-[#26352D] font-semibold block">Regional Previews</span>
                <span className="text-[10px]">Japan CAA, India FSSAI, Vietnam VFA (15 rules)</span>
              </div>
            </div>
          </div>

          {/* Cloud Run Execution Environment */}
          <div className="p-4 rounded-xl bg-[#F7F5EE] border border-[#DFDACD] space-y-2">
            <div className="flex items-center gap-2">
              <Cloud className="h-4 w-4 text-[#477A58]" />
              <span className="font-bold text-[#26352D]">Cloud Run Full-Stack Gateway</span>
            </div>
            <p className="text-[#68736A] leading-relaxed">
              Express backend with Vite SSR middlewares running on port 3000. All Gemini API calls execute server-side, preventing client-side key leakage.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#DFDACD] bg-[#FFFEFA] flex items-center justify-between">
          <span className="text-[11px] text-[#858A80]">JurisLens Compliance Engine</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#FFFEFA] hover:bg-[#F1EEE4] border border-[#DFDACD] text-xs font-semibold text-[#26352D] transition-colors shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
