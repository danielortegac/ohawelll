import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, RotateCcw } from 'lucide-react';

type Mode = 'soft' | 'night' | 'box';

export const CalmBreathingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [mode, setMode] = useState<Mode>('soft');
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'hold2'>('inhale');
  const [cycles, setCycles] = useState(0);

  const modes = {
    soft: { name: 'Soft Calm', inhale: 4, hold: 0, exhale: 6, hold2: 0, desc: 'Perfecto para bajar revoluciones' },
    night: { name: 'Night Reset', inhale: 4, hold: 2, exhale: 8, hold2: 0, desc: 'Ideal antes de dormir' },
    box: { name: 'Box Breathing', inhale: 4, hold: 4, exhale: 4, hold2: 4, desc: 'Para control emocional' }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      const currentMode = modes[mode];
      
      const runPhase = () => {
        if (phase === 'inhale') {
          timer = setTimeout(() => {
            setPhase(currentMode.hold > 0 ? 'hold' : 'exhale');
          }, currentMode.inhale * 1000);
        } else if (phase === 'hold') {
          timer = setTimeout(() => {
            setPhase('exhale');
          }, currentMode.hold * 1000);
        } else if (phase === 'exhale') {
          timer = setTimeout(() => {
            if (currentMode.hold2 > 0) {
              setPhase('hold2');
            } else {
              setPhase('inhale');
              setCycles(c => c + 1);
            }
          }, currentMode.exhale * 1000);
        } else if (phase === 'hold2') {
          timer = setTimeout(() => {
            setPhase('inhale');
            setCycles(c => c + 1);
          }, currentMode.hold2 * 1000);
        }
      };
      
      runPhase();
    }
    return () => clearTimeout(timer);
  }, [isActive, phase, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setPhase('inhale');
    setCycles(0);
  };

  const getScale = () => {
    if (!isActive) return 1;
    switch (phase) {
      case 'inhale': return 1.5;
      case 'hold': return 1.5;
      case 'exhale': return 1;
      case 'hold2': return 1;
      default: return 1;
    }
  };

  const getPhaseText = () => {
    if (!isActive) return 'Listo';
    switch (phase) {
      case 'inhale': return 'Inhala';
      case 'hold': return 'Mantén';
      case 'exhale': return 'Exhala';
      case 'hold2': return 'Mantén';
      default: return '';
    }
  };

  const getDuration = () => {
    const currentMode = modes[mode];
    switch (phase) {
      case 'inhale': return currentMode.inhale;
      case 'hold': return currentMode.hold;
      case 'exhale': return currentMode.exhale;
      case 'hold2': return currentMode.hold2;
      default: return 0;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ohawell-calm/90 backdrop-blur-xl"
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

            <h2 className="font-serif text-4xl mb-2">Respiración Calm</h2>
            <p className="opacity-60 mb-12 text-center max-w-md">Encuentra tu centro. Sigue el círculo.</p>

            <div className="flex gap-4 mb-16">
              {(Object.keys(modes) as Mode[]).map(m => (
                <button
                  key={m}
                  onClick={() => { setMode(m); resetTimer(); }}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-colors ${
                    mode === m ? 'bg-ohawell-ink text-ohawell-calm' : 'border border-ohawell-ink/20 hover:bg-black/5'
                  }`}
                >
                  {modes[m].name}
                </button>
              ))}
            </div>

            <div className="relative w-64 h-64 flex items-center justify-center mb-16">
              <motion.div
                animate={{ scale: getScale() }}
                transition={{ duration: getDuration(), ease: "easeInOut" }}
                className="absolute w-32 h-32 rounded-full bg-ohawell-ink/10"
              />
              <motion.div
                animate={{ scale: getScale() }}
                transition={{ duration: getDuration(), ease: "easeInOut" }}
                className="absolute w-32 h-32 rounded-full border border-ohawell-ink/30"
              />
              <div className="relative z-10 text-center">
                <span className="font-serif text-3xl block mb-1">{getPhaseText()}</span>
                {isActive && <span className="text-sm opacity-60 font-medium">{getDuration()}s</span>}
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-center">
                <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-1">Ciclos</span>
                <span className="font-serif text-2xl">{cycles}</span>
              </div>
              
              <button
                onClick={toggleTimer}
                className="w-16 h-16 rounded-full bg-ohawell-ink text-ohawell-calm flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>

              <button onClick={resetTimer} className="p-3 hover:bg-black/5 rounded-full transition-colors">
                <RotateCcw className="w-5 h-5 opacity-60" />
              </button>
            </div>
            
            <p className="mt-12 text-sm opacity-60 font-light text-center max-w-sm">
              {modes[mode].desc}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
