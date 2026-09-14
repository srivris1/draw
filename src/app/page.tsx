'use client';

import { useEffect, useRef, useState } from 'react';
import { Eraser, Pen, Trash2, Download } from 'lucide-react';

export default function DrawPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#3b82f6');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    const handleResize = () => {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      if (tempCtx) tempCtx.drawImage(canvas, 0, 0);

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.fillStyle = '#09090b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = tool === 'eraser' ? '#09090b' : color;
    ctx.lineWidth = brushSize;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'board-export.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="h-screen w-screen bg-[#09090b] overflow-hidden relative font-sans">
      <div className="crt-overlay"></div>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#121110]/95 backdrop-blur-md border border-[#ffaa00]/30 rounded-none p-3 flex items-center gap-4 shadow-[0_0_16px_rgba(255,170,0,0.2)] z-10">
        <div className="text-[#ffaa00] text-xs font-mono font-bold tracking-widest px-2 border-r border-[#ffaa00]/30">
          SYS.DRAW
        </div>
        <button 
          onClick={() => setTool('pen')}
          className={`p-2 transition-colors border ${tool === 'pen' ? 'bg-[#ffaa00]/20 text-[#ffaa00] border-[#ffaa00]/50' : 'hover:bg-[#ffaa00]/10 text-[#a89a85] border-transparent'}`}
        >
          <Pen className="w-5 h-5" />
        </button>
        
        <button 
          onClick={() => setTool('eraser')}
          className={`p-2 transition-colors border ${tool === 'eraser' ? 'bg-[#ffaa00] text-black border-[#ffaa00]' : 'hover:bg-[#ffaa00]/10 text-[#a89a85] border-transparent'}`}
        >
          <Eraser className="w-5 h-5" />
        </button>

        <div className="h-6 w-px bg-[#ffaa00]/20 mx-1" />

        <input 
          type="color" 
          value={color}
          onChange={(e) => { setColor(e.target.value); setTool('pen'); }}
          className="w-8 h-8 cursor-pointer bg-transparent border-0 p-0"
        />

        <input 
          type="range" 
          min="1" 
          max="50" 
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
          className="w-24 mx-2 accent-[#ffaa00]"
        />

        <div className="h-6 w-px bg-[#ffaa00]/20 mx-1" />
        
        <button onClick={clearCanvas} className="p-2 hover:bg-red-500/20 hover:text-red-400 border border-transparent text-[#a89a85] transition-colors">
          <Trash2 className="w-5 h-5" />
        </button>
        
        <button onClick={downloadCanvas} className="p-2 hover:bg-[#ffaa00]/20 border border-transparent text-[#a89a85] hover:text-[#ffaa00] transition-colors">
          <Download className="w-5 h-5" />
        </button>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="block touch-none cursor-crosshair"
      />
    </div>
  );
}
