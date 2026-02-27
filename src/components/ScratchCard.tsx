import React, { useRef, useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ScratchCardProps {
  onComplete: () => void;
  isScratching: boolean;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({ onComplete, isScratching }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas dimensions to match container
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      drawScratchLayer(ctx, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const drawScratchLayer = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Metallic gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#3a3a3a');
    gradient.addColorStop(0.5, '#5a5a5a');
    gradient.addColorStop(1, '#2a2a2a');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add some noise/texture for realism
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 20 - 10;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise));
      data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);

    // Add text overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('RASPAR AQUÍ', width / 2, height / 2);
  };

  const getPointerPos = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!canvas || !ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2); // Brush size
    ctx.fill();

    checkCompletion();
  };

  const checkCompletion = () => {
    if (isCompleted) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!canvas || !ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    // Check every 4th pixel (alpha channel)
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const totalPixels = pixels.length / 4;
    const percentScratched = (transparentPixels / totalPixels) * 100;

    if (percentScratched > 40) { // If 40% is scratched, reveal the rest
      setIsCompleted(true);
      
      // Animate clearing the rest of the canvas
      canvas.style.transition = 'opacity 0.5s ease-out';
      canvas.style.opacity = '0';
      
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching || isCompleted) return;
    setIsDrawing(true);
    const { x, y } = getPointerPos(e);
    scratch(x, y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !isScratching || isCompleted) return;
    // Prevent scrolling on touch devices while scratching
    if ('touches' in e && e.cancelable) {
      // e.preventDefault(); // Cannot preventDefault on passive event listener in React easily, so we use CSS touch-action: none
    }
    const { x, y } = getPointerPos(e);
    scratch(x, y);
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-20 overflow-hidden rounded-[3rem]"
      style={{
        pointerEvents: isScratching ? 'auto' : 'none',
        touchAction: 'none' // Important for touch devices to prevent scrolling
      }}
    >
      {!isScratching && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-ohawell-base pointer-events-none bg-ohawell-ink/90 backdrop-blur-sm z-30">
          <div className="w-20 h-20 border border-white/20 rounded-full flex items-center justify-center mx-auto bg-white/5 backdrop-blur-sm mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          <span className="font-serif text-4xl block mb-2">Raspar Cupón</span>
          <span className="text-sm font-bold tracking-widest uppercase opacity-60">Click para empezar</span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair"
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      />
    </div>
  );
};
