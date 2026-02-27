import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const RitualBuilder = () => {
  const [step, setStep] = useState(1);
  const [need, setNeed] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { currency } = useLanguage();

  const handleNext = () => setStep(step + 1);

  const getRecommendation = () => {
    if (need === 'Energía & enfoque') return products.find(p => p.mood === 'Awaken' && p.format === 'Bar');
    if (need === 'Soltar estrés & dormir mejor') return products.find(p => p.mood === 'Calm' && p.format === 'Bar');
    if (need === 'Conectar & compartir') return products.find(p => p.mood === 'Desire' && p.format === 'Bar');
    return products[0];
  };

  const recommendedProduct = getRecommendation();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-3xl mx-auto flex flex-col justify-center">
      <div className="text-center mb-16">
        <Sparkles className="w-8 h-8 mx-auto opacity-50 mb-6" />
        <h1 className="font-serif text-5xl md:text-6xl mb-4">Ritual Builder</h1>
        <p className="text-xl font-light opacity-70">Descubre el chocolate que tu cuerpo pide hoy.</p>
      </div>

      <div className="relative bg-white/50 backdrop-blur-md rounded-3xl p-8 md:p-16 shadow-xl border border-black/5 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-black/5">
          <motion.div 
            className="h-full bg-ohawell-ink"
            initial={{ width: '33%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">¿Qué necesitas hoy?</h2>
              <div className="grid grid-cols-1 gap-4">
                {['Energía & enfoque', 'Soltar estrés & dormir mejor', 'Conectar & compartir'].map((option) => (
                  <button
                    key={option}
                    onClick={() => { setNeed(option); handleNext(); }}
                    className="w-full p-6 text-left rounded-2xl border border-black/10 hover:border-ohawell-ink hover:bg-black/5 transition-all group flex justify-between items-center"
                  >
                    <span className="font-medium text-lg">{option}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">¿En qué momento del día?</h2>
              <div className="grid grid-cols-1 gap-4">
                {['Mañana', 'Tarde', 'Noche'].map((option) => (
                  <button
                    key={option}
                    onClick={() => { setTime(option); handleNext(); }}
                    className="w-full p-6 text-left rounded-2xl border border-black/10 hover:border-ohawell-ink hover:bg-black/5 transition-all group flex justify-between items-center"
                  >
                    <span className="font-medium text-lg">{option}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && recommendedProduct && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <h2 className="font-serif text-3xl md:text-4xl mb-2">Tu Ritual Perfecto</h2>
              <p className="text-lg opacity-70 mb-12">
                Hoy necesitas {need?.toLowerCase()} en la {time?.toLowerCase()}. Te recomendamos:
              </p>

              <div className="bg-black/5 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 text-left">
                <img 
                  src={recommendedProduct.image} 
                  alt={recommendedProduct.name} 
                  className="w-48 h-64 object-cover rounded-xl shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-2">{recommendedProduct.mood}</span>
                    <h3 className="font-serif text-3xl mb-2">{recommendedProduct.name}</h3>
                    <p className="opacity-80">{recommendedProduct.description}</p>
                  </div>
                  
                  <div className="bg-white/50 p-6 rounded-2xl">
                    <h4 className="font-medium mb-2">Mini Ritual Sugerido</h4>
                    <p className="text-sm opacity-80 italic">"Toma 2 cuadritos, respira profundo 3 veces y visualiza tu intención para este momento."</p>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className="font-medium text-xl">{recommendedProduct.price} {currency}</span>
                    <button 
                      onClick={() => addToCart(recommendedProduct)}
                      className="bg-ohawell-ink text-ohawell-base px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-black/80 transition-colors"
                    >
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStep(1)}
                className="text-sm font-medium tracking-widest uppercase underline opacity-50 hover:opacity-100 transition-opacity mt-8"
              >
                Volver a empezar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
