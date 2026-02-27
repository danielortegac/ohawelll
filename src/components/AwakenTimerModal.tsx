import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, RotateCcw, Zap } from 'lucide-react';

export const AwakenTimerModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [duration, setDuration] = useState(25); // minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isActive, setIsActive] = useState(false);
  const [activity, setActivity] = useState('Trabajar');
  const [intention, setIntention] = useState('');

  const durations = [10, 25, 45, 60];
  const activities = ['Estudiar', 'Trabajar', 'Crear', 'Entrenar'];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Here we could trigger a badge or points
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ohawell-awaken/90 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 w-full max-w-2xl p-8 flex flex-col items-center text-ohawell-ink"
          >
            <button onClick={onClose} className="absolute top-0 right-8 p-2 hover:bg-black/5 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>

            <h2 className="font-serif text-4xl mb-2 flex items-center gap-3">
              <Zap className="w-8 h-8" /> Focus Sprint
            </h2>
            <p className="opacity-60 mb-12 text-center max-w-md">Define tu intención, toma un trozo de Awaken y entra en la zona.</p>

            {!isActive && timeLeft === duration * 60 ? (
              <div className="w-full max-w-md space-y-8 mb-12">
                <div>
                  <label className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-3">Duración</label>
                  <div className="flex gap-2">
                    {durations.map(d => (
                      <button
                        key={d}
                        onClick={() => { setDuration(d); setTimeLeft(d * 60); }}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-colors ${
                          duration === d ? 'bg-ohawell-ink text-ohawell-awaken' : 'border border-ohawell-ink/20 hover:bg-black/5'
                        }`}
                      >
                        {d}m
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-3">Actividad</label>
                  <div className="flex flex-wrap gap-2">
                    {activities.map(a => (
                      <button
                        key={a}
                        onClick={() => setActivity(a)}
                        className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-colors ${
                          activity === a ? 'bg-ohawell-ink text-ohawell-awaken' : 'border border-ohawell-ink/20 hover:bg-black/5'
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-3">Intención del Sprint</label>
                  <input 
                    type="text" 
                    placeholder="Ej: Terminar la presentación..." 
                    value={intention}
                    onChange={(e) => setIntention(e.target.value)}
                    className="w-full bg-black/5 border border-transparent focus:border-ohawell-ink rounded-xl py-4 px-4 outline-none transition-colors text-sm"
                  />
                </div>
              </div>
            ) : (
              <div className="text-center mb-16">
                <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-2">{activity}</span>
                <span className="font-serif text-2xl block mb-8">{intention || 'Focus Mode'}</span>
                
                <div className="relative w-64 h-64 mx-auto flex items-center justify-center mb-8">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-10" />
                    <circle 
                      cx="128" cy="128" r="120" 
                      stroke="currentColor" strokeWidth="4" fill="none" 
                      strokeDasharray="754" 
                      strokeDashoffset={754 - (754 * progress) / 100} 
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  <span className="font-serif text-6xl tabular-nums">{formatTime(timeLeft)}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-8">
              <button
                onClick={toggleTimer}
                className="w-20 h-20 rounded-full bg-ohawell-ink text-ohawell-awaken flex items-center justify-center hover:scale-105 transition-transform shadow-xl"
              >
                {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>

              {(isActive || timeLeft < duration * 60) && (
                <button onClick={resetTimer} className="p-4 hover:bg-black/5 rounded-full transition-colors">
                  <RotateCcw className="w-6 h-6 opacity-60" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
