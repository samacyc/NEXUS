import React from 'react';
import { Coordinates } from '../types';

interface MapVisualizationProps {
  origin: Coordinates;
  destination: Coordinates;
}

export const MapVisualization: React.FC<MapVisualizationProps> = ({ origin, destination }) => {
  // Simplified logic to project US coordinates to SVG viewbox (800x500)
  // Continental US Bounds approx:
  // Min Lon: -125, Max Lon: -67 (Width ~58)
  // Min Lat: 24, Max Lat: 50 (Height ~26)
  
  const project = (coords: Coordinates) => {
    const minLon = -125;
    const maxLon = -66;
    const minLat = 24;
    const maxLat = 50;
    
    // Clamp coordinates to bounds
    const lng = Math.max(minLon, Math.min(maxLon, coords.lng));
    const lat = Math.max(minLat, Math.min(maxLat, coords.lat));

    const x = ((lng - minLon) / (maxLon - minLon)) * 800;
    // SVG y is inverted (0 is top)
    const y = 500 - ((lat - minLat) / (maxLat - minLat)) * 500;
    
    return { x, y };
  };

  const start = project(origin);
  const end = project(destination);

  // Calculate control point for quadratic bezier curve (arc effect)
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 100; // Curve upwards
  const pathData = `M${start.x},${start.y} Q${midX},${midY} ${end.x},${end.y}`;

  // Simplified US Silhouette Path
  const usPath = "M765,135 L744,115 L731,94 L714,64 L676,55 L636,63 L606,53 L565,60 L545,55 L516,60 L486,55 L456,60 L426,55 L396,55 L366,55 L336,55 L306,55 L250,55 L220,65 L180,85 L140,85 L100,85 L70,85 L50,105 L40,125 L30,165 L20,205 L30,245 L40,285 L50,325 L60,365 L80,405 L120,425 L160,435 L200,435 L240,425 L280,435 L320,445 L360,445 L400,435 L440,415 L480,405 L520,385 L560,365 L600,345 L640,325 L680,305 L720,285 L760,265 L770,225 L760,185 Z";

  return (
    <div className="w-full h-48 sm:h-64 bg-slate-900 rounded-lg overflow-hidden relative border border-slate-800 mb-6">
       <div className="absolute top-2 left-2 flex gap-2">
         <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded text-xs text-slate-300">
           <div className="w-2 h-2 rounded-full bg-slate-400"></div> Origin
         </div>
         <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded text-xs text-slate-300">
           <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> Dest
         </div>
       </div>

       <svg viewBox="0 0 800 500" className="w-full h-full preserve-3d">
         {/* Background Grid */}
         <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
            </pattern>
            <linearGradient id="lineGradient" gradientUnits="userSpaceOnUse" x1={start.x} y1={start.y} x2={end.x} y2={end.y}>
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
         </defs>
         
         <rect width="800" height="500" fill="url(#grid)" />

         {/* Abstract Map Silhouette */}
         <path d={usPath} fill="#1e293b" opacity="0.3" stroke="#334155" strokeWidth="2" />

         {/* Route Line */}
         <path 
           d={pathData} 
           fill="none" 
           stroke="url(#lineGradient)" 
           strokeWidth="3" 
           strokeDasharray="8 4"
           className="drop-shadow-lg"
         >
           <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
         </path>

         {/* Origin Dot */}
         <circle cx={start.x} cy={start.y} r="6" fill="#94a3b8" stroke="#1e293b" strokeWidth="2" />

         {/* Dest Dot */}
         <g transform={`translate(${end.x}, ${end.y})`}>
           <circle r="6" fill="#ef4444" stroke="#fff" strokeWidth="2" />
           <circle r="12" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.5">
             <animate attributeName="r" from="6" to="20" dur="1.5s" repeatCount="indefinite" />
             <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite" />
           </circle>
         </g>

       </svg>
    </div>
  );
};