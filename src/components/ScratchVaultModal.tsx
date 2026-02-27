import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Gift, Lock } from 'lucide-react';
import { ScratchCard } from './ScratchCard';
import { useAuth } from '../context/AuthContext';
import { LoginModal } from './LoginModal';

interface ScratchVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScratchVaultModal: React.FC<ScratchVaultModalProps> = ({ isOpen, onClose }) => {
  const { user, useScratchCoupon, addPoints } = useAuth();
  const [scratchResult, setScratchResult] = useState<string | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Allow guest scratching (1 free try) or user scratching if they have coupons
  const canScratch = !user || (user && user.scratchCoupons > 0);

  const handleStartScratch = () => {
    if (canScratch && !isScratching && !isRevealed) {
      setIsScratching(true);
      
      const prizes = ['15% OFF en tu próxima compra', 'Envío Gratis Nacional', 'Awaken Coins Extra', '50 Puntos OHAWELL'];
      const prize = prizes[Math.floor(Math.random() * prizes.length)];
      setScratchResult(prize);
    }
  };

  const handleScratchComplete = () => {
    if (isScratching && !isRevealed) {
      setIsRevealed(true);
      setIsScratching(false);
      if (user) {
        useScratchCoupon();
        if (scratchResult === '50 Puntos OHAWELL') addPoints(50);
      }
    }
  };

  const resetAndClose = () => {
    setScratchResult(null);
    setIsScratching(false);
    setIsRevealed(false);
    onClose();
  };

  const claimPrize = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    resetAndClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="absolute inset-0 bg-ohawell-ink/80 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-ohawell-base rounded-[3rem] overflow-hidden shadow-2xl"
        >
          <button 
            onClick={resetAndClose}
            className="absolute top-6 right-6 z-20 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-12 text-center">
            <h2 className="font-serif text-5xl mb-4">Scratch Vault</h2>
            <p className="text-xl font-light opacity-70 mb-12">
              {!user ? (
                <>Tienes <strong className="font-serif text-2xl mx-2">1</strong> intento gratis. Raspa para descubrir tu premio de bienvenida.</>
              ) : (
                <>Tienes <strong className="font-serif text-2xl mx-2">{user.scratchCoupons}</strong> cupones disponibles.</>
              )}
            </p>

            {canScratch ? (
              <div className="relative max-w-2xl mx-auto">
                <div 
                  className={`aspect-[16/9] rounded-[3rem] p-2 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer transition-all duration-500 ${
                    isScratching ? 'scale-[1.02] shadow-2xl' : 'hover:scale-[1.02] shadow-2xl'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)'
                  }}
                  onClick={handleStartScratch}
                >
                  {/* PRIZE REVEAL LAYER */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-ohawell-ink p-12 text-center z-10">
                    <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-6">Premio Oculto</span>
                    <p className="font-serif text-4xl md:text-5xl mb-8 leading-tight">{scratchResult || '???'}</p>
                    <Sparkles className="w-12 h-12 opacity-20" />
                  </div>

                  {/* SCRATCH LAYER */}
                  {!isRevealed && (
                    <div className="absolute inset-0 z-20">
                      <ScratchCard 
                        isScratching={isScratching} 
                        onComplete={handleScratchComplete} 
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto aspect-[16/9] bg-black/5 rounded-[3rem] flex flex-col items-center justify-center text-center p-12 border border-black/10">
                <Lock className="w-12 h-12 opacity-20 mb-6" />
                <span className="font-serif text-3xl mb-4">
                  No hay cupones disponibles
                </span>
                <p className="opacity-60 font-light">Realiza una compra o completa un ritual para ganar más cupones.</p>
              </div>
            )}

            <AnimatePresence>
              {isRevealed && scratchResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="mt-8 p-8 bg-ohawell-awaken text-ohawell-ink rounded-[2rem] text-center border border-ohawell-ink/10 shadow-xl"
                >
                  <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4">Premio Revelado</span>
                  <h3 className="font-serif text-4xl mb-4">¡Felicidades!</h3>
                  <p className="text-xl font-light mb-6">Has ganado: <strong className="font-serif text-2xl block mt-2">{scratchResult}</strong></p>
                  <button 
                    onClick={claimPrize}
                    className="btn-shiny bg-ohawell-ink text-ohawell-base px-10 py-5 rounded-full text-sm font-bold tracking-widest uppercase hover:scale-105 transition-transform shadow-[0_0_40px_rgba(0,0,0,0.2)]"
                  >
                    {!user ? 'Iniciar Sesión para Reclamar' : 'Reclamar Premio'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </AnimatePresence>
  );
};
