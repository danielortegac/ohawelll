import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Users, Sparkles, Flame } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DesireConnectionCardsModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { isAdult } = useAuth();
  const [mode, setMode] = useState<'general' | '18+'>('general');
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const cardsGeneral = [
    { type: 'Pregunta', text: '¿Qué te hizo sonreír esta semana?' },
    { type: 'Reto', text: '10 minutos de presencia sin pantallas.' },
    { type: 'Gratitud', text: 'Hoy valoré que...' },
    { type: 'Pregunta', text: '¿Qué aventura queremos planear juntos?' },
    { type: 'Reto', text: 'Intercambiar una historia que nunca han contado.' }
  ];

  const cardsAdult = [
    { type: 'Presencia', text: 'Mirarse 1 minuto sin hablar.' },
    { type: 'Juego', text: 'Elige un gesto de afecto para hacer hoy.' },
    { type: 'Sensorial', text: 'Explorar palabras que los hagan sentir vistos.' },
    { type: 'Juego', text: 'Crea un pequeño ritual nocturno juntos.' },
    { type: 'Sensorial', text: 'Compartir deseos no físicos: viajes, ideas, mundos.' }
  ];

  const cards = mode === 'general' ? cardsGeneral : cardsAdult;

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % cards.length);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ohawell-desire/90 backdrop-blur-xl"
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
              <Heart className="w-8 h-8" /> Connection Cards
            </h2>
            <p className="opacity-60 mb-8 text-center max-w-md">Juegos de complicidad y exploración emocional.</p>

            <div className="flex gap-4 mb-12">
              <button
                onClick={() => { setMode('general'); setCurrentCard(0); setIsFlipped(false); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-colors ${
                  mode === 'general' ? 'bg-ohawell-ink text-ohawell-desire' : 'border border-ohawell-ink/20 hover:bg-black/5'
                }`}
              >
                <Users className="w-4 h-4" /> General
              </button>
              
              {isAdult && (
                <button
                  onClick={() => { setMode('18+'); setCurrentCard(0); setIsFlipped(false); }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-colors ${
                    mode === '18+' ? 'bg-ohawell-ink text-ohawell-desire' : 'border border-ohawell-ink/20 hover:bg-black/5'
                  }`}
                >
                  <Flame className="w-4 h-4" /> Desire+ (18+)
                </button>
              )}
            </div>

            <div className="relative w-full max-w-sm aspect-[3/4] perspective-1000 mb-12">
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                className="w-full h-full relative preserve-3d cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-white/10 backdrop-blur-md rounded-[2rem] border border-ohawell-ink/20 flex flex-col items-center justify-center p-8 shadow-2xl">
                  <Sparkles className="w-12 h-12 opacity-50 mb-6" />
                  <span className="font-serif text-3xl opacity-80">Toca para revelar</span>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-ohawell-ink text-ohawell-desire rounded-[2rem] flex flex-col items-center justify-center p-12 text-center shadow-2xl">
                  <span className="text-xs font-bold tracking-widest uppercase opacity-50 mb-6 block border border-current px-4 py-1 rounded-full">
                    {cards[currentCard].type}
                  </span>
                  <p className="font-serif text-3xl leading-snug">
                    {cards[currentCard].text}
                  </p>
                </div>
              </motion.div>
            </div>

            <button
              onClick={nextCard}
              className="bg-ohawell-ink text-ohawell-desire px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:scale-105 transition-transform shadow-xl"
            >
              Siguiente Carta
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
