import React, { useState, useRef } from 'react';
import {
  Upload,
  FileImage,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Loader2,
  FileText,
  X,
  Globe2,
  ShieldCheck,
} from 'lucide-react';
import { JURISDICTIONS } from '../data/statutoryDatabase';
import { ComplianceReport } from '../types/compliance';

interface ScanUploadStudioProps {
  onScanComplete: (report: ComplianceReport) => void;
  onLoadFlagshipDemo: () => void;
  geminiConfigured: boolean;
}

export const ScanUploadStudio: React.FC<ScanUploadStudioProps> = ({
  onScanComplete,
  onLoadFlagshipDemo,
  geminiConfigured,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<'Singapore' | 'Japan' | 'India' | 'Vietnam'>('Singapore');
  const [selectedAssetType, setSelectedAssetType] = useState<'food_label' | 'business_document'>('food_label');
  const [productCategoryNotes, setProductCategoryNotes] = useState<string>('');

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isOverloaded, setIsOverloaded] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const cleanErrorMessage = (errStr: string): string => {
    try {
      if (errStr.startsWith('{') && errStr.endsWith('}')) {
        const parsed = JSON.parse(errStr);
        if (parsed.error?.message) return parsed.error.message;
        if (parsed.error && typeof parsed.error === 'string') return parsed.error;
      }
    } catch {
      // not json
    }
    return errStr;
  };

  const handleFileSelect = (file: File) => {
    setErrorMessage(null);
    setIsOverloaded(false);

    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      setErrorMessage('Please upload a valid image file (JPEG, PNG, WebP) or single-page PDF document.');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage('Asset size exceeds 20MB limit. Please upload an optimized file.');
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrorMessage(null);
    setIsOverloaded(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRunScan = async (fallbackRequested = false) => {
    if (!selectedFile || !previewUrl) {
      setErrorMessage('Please upload a product packaging image or business document first.');
      return;
    }

    if (!geminiConfigured && !fallbackRequested) {
      setErrorMessage(
        'Google Cloud Gemini API key is not configured. Live custom scans require active credentials. You can test immediately using the precomputed Flagship Demo or Grounded Engine.'
      );
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setIsOverloaded(false);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: previewUrl,
          mimeType: selectedFile.type,
          assetName: selectedFile.name,
          jurisdiction: selectedJurisdiction,
          assetType: selectedAssetType,
          allowFallback: fallbackRequested,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (response.status === 503 || data.isTransient || data.canUseFallbackEngine) {
          setIsOverloaded(true);
        }
        throw new Error(cleanErrorMessage(data.error || 'Failed to analyze asset.'));
      }

      setIsProcessing(false);
      onScanComplete(data.report);
    } catch (err: any) {
      setIsProcessing(false);
      const cleaned = cleanErrorMessage(err.message || 'Error occurred during multimodal analysis.');
      if (cleaned.includes('503') || cleaned.includes('high demand') || cleaned.includes('UNAVAILABLE')) {
        setIsOverloaded(true);
      }
      setErrorMessage(cleaned);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#26352D] tracking-tight">New Compliance Scan</h1>
        <p className="text-xs sm:text-sm text-[#68736A] mt-1">
          Upload product packaging artwork or trade documentation to run statutory verification.
        </p>
      </div>

      {/* Main Configuration Card */}
      <div className="rounded-2xl bg-[#FFFEFA] border border-[#DFDACD] p-5 sm:p-7 space-y-6 shadow-xs">
        {/* Market Selection */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-[#26352D] uppercase tracking-wider">
            Target Market
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {JURISDICTIONS.map((j) => (
              <button
                key={j.id}
                type="button"
                onClick={() => setSelectedJurisdiction(j.id)}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                  selectedJurisdiction === j.id
                    ? 'border-[#477A58] bg-[#E5EFE5] text-[#26352D] ring-1 ring-[#477A58]'
                    : 'border-[#DFDACD] bg-[#FFFEFA] text-[#68736A] hover:bg-[#F1EEE4]'
                }`}
              >
                <span className="font-mono font-bold text-xs px-1.5 py-0.5 rounded bg-[#F1EEE4] text-[#26352D] border border-[#DFDACD] shrink-0">
                  {j.code}
                </span>
                <span className="text-xs font-semibold text-[#26352D] truncate">{j.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Asset Classification */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-[#26352D] uppercase tracking-wider">
            Asset Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSelectedAssetType('food_label')}
              className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                selectedAssetType === 'food_label'
                  ? 'border-[#477A58] bg-[#E5EFE5] text-[#26352D] ring-1 ring-[#477A58]'
                  : 'border-[#DFDACD] bg-[#FFFEFA] text-[#68736A] hover:bg-[#F1EEE4]'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <FileImage className="h-4 w-4 text-[#477A58] shrink-0" />
                <span className="text-xs font-semibold text-[#26352D] truncate">
                  Packaging Artwork & Labels
                </span>
              </div>
              <span className="text-[10px] font-semibold text-[#28734A] bg-[#E5F3E8] px-1.5 py-0.2 rounded border border-[#28734A]/20 shrink-0">
                Active
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedAssetType('business_document')}
              className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                selectedAssetType === 'business_document'
                  ? 'border-[#477A58] bg-[#E5EFE5] text-[#26352D] ring-1 ring-[#477A58]'
                  : 'border-[#DFDACD] bg-[#FFFEFA] text-[#68736A] hover:bg-[#F1EEE4]'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <FileText className="h-4 w-4 text-[#346C92] shrink-0" />
                <span className="text-xs font-semibold text-[#26352D] truncate">
                  Commercial Invoice & Spec Sheet
                </span>
              </div>
              <span className="text-[10px] font-semibold text-[#68736A] bg-[#F1EEE4] px-1.5 py-0.2 rounded border border-[#DFDACD] shrink-0">
                Supported
              </span>
            </button>
          </div>
        </div>

        {/* Upload Dropzone */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-[#26352D] uppercase tracking-wider">
              Upload Asset
            </label>
            <button
              type="button"
              onClick={onLoadFlagshipDemo}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#477A58] hover:text-[#386849] transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Load Sample Case (ZenBrew 330ml)</span>
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,application/pdf"
            onChange={(e) => e.target.files && e.target.files[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
          />

          {!previewUrl ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                isDragOver
                  ? 'border-[#477A58] bg-[#E5EFE5]'
                  : 'border-[#DFDACD] hover:border-[#477A58] bg-[#F7F5EE]/50'
              }`}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFFEFA] border border-[#DFDACD] mb-3 shadow-2xs">
                <Upload className="h-6 w-6 text-[#477A58]" />
              </div>
              <p className="text-sm font-semibold text-[#26352D]">
                Drag packaging image here, or <span className="text-[#477A58] underline">browse</span>
              </p>
              <p className="text-xs text-[#68736A] mt-1">
                Supports JPEG, PNG, WebP, or single-page PDF (up to 20MB)
              </p>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-[#F1EEE4] border border-[#DFDACD] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="h-14 w-14 rounded-lg bg-[#FFFEFA] border border-[#DFDACD] overflow-hidden shrink-0 flex items-center justify-center">
                  <img
                    src={previewUrl}
                    alt="Uploaded asset preview"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="truncate">
                  <span className="text-xs font-semibold text-[#26352D] truncate block">
                    {selectedFile?.name}
                  </span>
                  <span className="text-[11px] text-[#68736A] font-mono">
                    {selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) + ' MB' : ''}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 rounded-lg bg-[#FFFEFA] hover:bg-[#F1EEE4] border border-[#DFDACD] text-xs font-semibold text-[#26352D] transition-colors"
                >
                  Replace
                </button>
                <button
                  type="button"
                  onClick={handleClearFile}
                  className="p-1 rounded-lg text-[#858A80] hover:text-[#B53D4A] hover:bg-[#FFFEFA] transition-colors"
                  title="Remove Asset"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          <input
            type="text"
            value={productCategoryNotes}
            onChange={(e) => setProductCategoryNotes(e.target.value)}
            placeholder="Optional context note (e.g. Sparkling organic green tea 330ml)"
            className="w-full px-3 py-2 rounded-lg bg-[#FFFEFA] border border-[#DFDACD] text-xs text-[#26352D] placeholder-[#858A80]/70 focus:outline-none focus:border-[#477A58]"
          />
        </div>

        {/* Error / Overload Banner */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-[#F8E6E8] border border-[#B53D4A]/30 text-xs space-y-2">
            <div className="flex items-start gap-2 text-[#B53D4A]">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">{errorMessage}</p>
            </div>

            {isOverloaded && (
              <div className="flex items-center gap-2 pt-1 border-t border-[#B53D4A]/20">
                <button
                  type="button"
                  onClick={() => handleRunScan(false)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#477A58] text-white font-semibold text-xs"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Retry Scan</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRunScan(true)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FFFEFA] border border-[#DFDACD] text-[#26352D] font-semibold text-xs"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-[#28734A]" />
                  <span>Run Grounded Engine</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="p-4 rounded-xl bg-[#F1EEE4] border border-[#DFDACD] flex items-center justify-center gap-3 text-xs text-[#26352D] font-medium">
            <Loader2 className="h-4 w-4 animate-spin text-[#477A58]" />
            <span>Analyzing asset against {selectedJurisdiction} regulations...</span>
          </div>
        )}

        {/* Submit Action */}
        <div className="pt-2 flex items-center justify-between border-t border-[#DFDACD]">
          <span className="text-xs text-[#68736A]">
            Grounded in verified {selectedJurisdiction} statutory codes
          </span>

          <button
            type="button"
            onClick={() => handleRunScan(false)}
            disabled={isProcessing || !previewUrl}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#477A58] hover:bg-[#386849] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-xs shadow-xs transition-all active:scale-[0.98]"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Run Compliance Scan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
