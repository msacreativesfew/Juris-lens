import React, { useState, useRef } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  EyeOff,
  Maximize2,
  Crosshair,
  Move,
} from 'lucide-react';
import { ComplianceFinding, ComplianceReport } from '../types/compliance';

interface InteractiveCanvasProps {
  report: ComplianceReport;
  selectedFindingId: string | null;
  onSelectFinding: (findingId: string) => void;
  showAnnotations: boolean;
  onToggleAnnotations: () => void;
}

export const InteractiveCanvas: React.FC<InteractiveCanvasProps> = ({
  report,
  selectedFindingId,
  onSelectFinding,
  showAnnotations,
  onToggleAnnotations,
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredFindingId, setHoveredFindingId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(Number((prev + 0.25).toFixed(2)), 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(Number((prev - 0.25).toFixed(2)), 0.5));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };
  const handleFitToView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY * -0.002;
      setZoom((prev) => Math.min(Math.max(Number((prev + delta).toFixed(2)), 0.5), 3));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1 || e.button === 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Validate geometry coordinates
  const validFindings = report.findings.filter((f) => {
    const { geometry } = f;
    return (
      geometry &&
      typeof geometry.ymin === 'number' &&
      typeof geometry.xmin === 'number' &&
      typeof geometry.ymax === 'number' &&
      typeof geometry.xmax === 'number' &&
      geometry.ymin < geometry.ymax &&
      geometry.xmin < geometry.xmax
    );
  });

  const getSeverityTheme = (severity: ComplianceFinding['severity'], isSelected: boolean) => {
    if (severity === 'high') {
      return {
        stroke: '#B53D4A',
        fill: isSelected ? 'rgba(181, 61, 74, 0.30)' : 'rgba(181, 61, 74, 0.14)',
        badgeBg: '#FFFEFA',
        badgeBorder: '#B53D4A',
        badgeText: '#26352D',
        dotColor: '#B53D4A',
      };
    }
    if (severity === 'medium') {
      return {
        stroke: '#8A6417',
        fill: isSelected ? 'rgba(138, 100, 23, 0.30)' : 'rgba(138, 100, 23, 0.14)',
        badgeBg: '#FFFEFA',
        badgeBorder: '#8A6417',
        badgeText: '#26352D',
        dotColor: '#8A6417',
      };
    }
    return {
      stroke: '#28734A',
      fill: isSelected ? 'rgba(40, 115, 74, 0.30)' : 'rgba(40, 115, 74, 0.14)',
      badgeBg: '#FFFEFA',
      badgeBorder: '#28734A',
      badgeText: '#26352D',
      dotColor: '#28734A',
    };
  };

  return (
    <div className="flex flex-col h-full bg-[#FFFEFA] border border-[#DFDACD] rounded-2xl overflow-hidden shadow-xs select-none">
      {/* Top Precision Toolbar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-[#DFDACD] bg-[#FFFEFA] text-xs shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <Crosshair className="h-4 w-4 text-[#477A58]" />
            <span className="font-bold text-[#26352D] tracking-tight">Inspection Canvas</span>
          </div>
          <span className="text-[#DFDACD] hidden sm:inline">·</span>
          <span className="text-[#68736A] truncate max-w-[140px] sm:max-w-[200px] hidden sm:inline" title={report.assetName}>
            {report.assetName}
          </span>
          <div className="flex items-center gap-1 pl-1.5 border-l border-[#DFDACD] shrink-0 font-mono text-[11px] text-[#477A58] font-semibold">
            {Math.round(zoom * 100)}%
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onToggleAnnotations}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              showAnnotations
                ? 'bg-[#E5EFE5] text-[#26352D] border border-[#C9C2B3]'
                : 'text-[#68736A] hover:bg-[#F1EEE4] hover:text-[#26352D]'
            }`}
            title={showAnnotations ? 'Hide annotations' : 'Show annotations'}
          >
            {showAnnotations ? <Eye className="h-3.5 w-3.5 text-[#477A58]" /> : <EyeOff className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">Overlay</span>
          </button>

          <div className="h-4 w-px bg-[#DFDACD] mx-0.5" />

          <button
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
            className="p-1 sm:p-1.5 rounded-lg text-[#68736A] hover:bg-[#F1EEE4] hover:text-[#26352D] disabled:opacity-30 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={handleZoomIn}
            disabled={zoom >= 3}
            className="p-1 sm:p-1.5 rounded-lg text-[#68736A] hover:bg-[#F1EEE4] hover:text-[#26352D] disabled:opacity-30 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={handleFitToView}
            className="p-1 sm:p-1.5 rounded-lg text-[#68736A] hover:bg-[#F1EEE4] hover:text-[#26352D] transition-colors"
            title="Fit to View (100%)"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={handleResetZoom}
            className="p-1 sm:p-1.5 rounded-lg text-[#68736A] hover:bg-[#F1EEE4] hover:text-[#26352D] transition-colors"
            title="Reset Pan and Zoom"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative flex-1 overflow-hidden flex items-center justify-center p-4 sm:p-6 bg-[#F1EEE4] ${
          zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
        }`}
      >
        {/* Stage */}
        <div
          className="relative transition-transform duration-75 ease-out max-h-full max-w-full flex items-center justify-center"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
          }}
        >
          {/* Packaging Asset Container */}
          <div className="relative inline-block max-h-[calc(100vh-210px)] rounded-xl overflow-hidden border border-[#DFDACD] shadow-sm bg-[#FFFEFA]">
            <img
              src={report.assetImageUrl}
              alt={report.assetName}
              referrerPolicy="no-referrer"
              className="max-h-[calc(100vh-210px)] w-auto object-contain block pointer-events-none"
            />

            {/* SVG Precision Coordinate Overlay */}
            {showAnnotations && (
              <svg
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-auto"
              >
                {validFindings.map((finding) => {
                  const { geometry } = finding;
                  const isSelected = selectedFindingId === finding.id;
                  const isHovered = hoveredFindingId === finding.id;
                  const theme = getSeverityTheme(finding.severity, isSelected);

                  const x = geometry.xmin * 1000;
                  const y = geometry.ymin * 1000;
                  const width = (geometry.xmax - geometry.xmin) * 1000;
                  const height = (geometry.ymax - geometry.ymin) * 1000;

                  return (
                    <g
                      key={finding.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectFinding(finding.id);
                      }}
                      onMouseEnter={() => setHoveredFindingId(finding.id)}
                      onMouseLeave={() => setHoveredFindingId(null)}
                      className="cursor-pointer group"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          onSelectFinding(finding.id);
                        }
                      }}
                    >
                      {/* Bounding Box */}
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        rx="5"
                        ry="5"
                        fill={theme.fill}
                        stroke={theme.stroke}
                        strokeWidth={isSelected ? '3.5' : isHovered ? '2.5' : '1.75'}
                        strokeDasharray={finding.status === 'needs_review' ? '6 4' : 'none'}
                        className="transition-all duration-150"
                      />

                      {/* Corner Reticle Marks when Selected */}
                      {isSelected && (
                        <>
                          <line x1={x - 4} y1={y} x2={x + 10} y2={y} stroke={theme.stroke} strokeWidth="2.5" />
                          <line x1={x} y1={y - 4} x2={x} y2={y + 10} stroke={theme.stroke} strokeWidth="2.5" />
                          <line x1={x + width - 10} y1={y} x2={x + width + 4} y2={y} stroke={theme.stroke} strokeWidth="2.5" />
                          <line x1={x + width} y1={y - 4} x2={x + width} y2={y + 10} stroke={theme.stroke} strokeWidth="2.5" />
                          <line x1={x - 4} y1={y + height} x2={x + 10} y2={y + height} stroke={theme.stroke} strokeWidth="2.5" />
                          <line x1={x} y1={y + height - 10} x2={x} y2={y + height + 4} stroke={theme.stroke} strokeWidth="2.5" />
                          <line x1={x + width - 10} y1={y + height} x2={x + width + 4} y2={y + height} stroke={theme.stroke} strokeWidth="2.5" />
                          <line x1={x + width} y1={y + height - 10} x2={x + width} y2={y + height + 4} stroke={theme.stroke} strokeWidth="2.5" />
                        </>
                      )}

                      {/* Finding Identifier Badge */}
                      <g transform={`translate(${x}, ${Math.max(y - 22, 6)})`}>
                        <rect
                          x="0"
                          y="0"
                          width={finding.id.length * 8.5 + 32}
                          height="18"
                          rx="4"
                          fill={theme.badgeBg}
                          stroke={theme.badgeBorder}
                          strokeWidth="1.25"
                          className="shadow-2xs"
                        />
                        <text
                          x="6"
                          y="13"
                          fill={theme.badgeText}
                          fontSize="10"
                          fontWeight="700"
                          fontFamily="JetBrains Mono, monospace"
                        >
                          {finding.id}
                        </text>
                        <circle
                          cx={finding.id.length * 8.5 + 23}
                          cy="9"
                          r="3.5"
                          fill={theme.dotColor}
                        />
                      </g>
                    </g>
                  );
                })}
              </svg>
            )}
          </div>
        </div>

        {/* Minimal Floating Legend */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#FFFEFA]/95 border border-[#DFDACD] text-xs shadow-xs text-[#26352D] pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#B53D4A]" />
            <span className="text-[11px] text-[#26352D]">Potential Issue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8A6417]" />
            <span className="text-[11px] text-[#26352D]">Needs Review</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#28734A]" />
            <span className="text-[11px] text-[#26352D]">No Issue</span>
          </div>
        </div>

        {/* Pan hint when zoomed */}
        {zoom > 1 && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFFEFA]/90 border border-[#DFDACD] text-[11px] text-[#68736A] pointer-events-none shadow-2xs">
            <Move className="h-3 w-3 text-[#477A58]" />
            <span>Drag to pan</span>
          </div>
        )}
      </div>
    </div>
  );
};
