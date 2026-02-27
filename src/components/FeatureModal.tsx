import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type FeatureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    details: string[];
    image: string;
    ctaText: string;
    ctaLink: string;
  } | null;
};

export const FeatureModal = ({ isOpen, onClose, feature }: FeatureModalProps) => {
  if (!feature) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-ohawell-base rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row m-4"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white md:text-black/50 md:bg-black/5 md:hover:bg-black/10 rounded-full transition-colors z-20 backdrop-blur-sm"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img 
                src={feature.image} 
                alt={feature.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
              <div className="absolute bottom-6 left-6 md:hidden text-white">
                <span className="text-xs font-bold tracking-widest uppercase opacity-80 mb-2 block">{feature.subtitle}</span>
                <h2 className="font-serif text-4xl">{feature.title}</h2>
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col overflow-y-auto">
              <div className="hidden md:block mb-12">
                <span className="text-xs font-bold tracking-widest uppercase opacity-50 mb-4 block">{feature.subtitle}</span>
                <h2 className="font-serif text-5xl lg:text-6xl leading-tight">{feature.title}</h2>
              </div>

              <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed mb-12">
                {feature.description}
              </p>

              <div className="space-y-6 mb-12 flex-1">
                {feature.details.map((detail, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-ohawell-ink/5 flex items-center justify-center shrink-0 mt-1">
                      <span className="font-serif text-sm opacity-50">0{i + 1}</span>
                    </div>
                    <p className="text-base opacity-80 leading-relaxed">{detail}</p>
                  </motion.div>
                ))}
              </div>

              <div className="pt-8 border-t border-black/10 mt-auto">
                <Link 
                  to={feature.ctaLink}
                  onClick={onClose}
                  className="group flex items-center justify-between w-full bg-ohawell-ink text-ohawell-base p-6 rounded-2xl hover:bg-black/80 transition-colors"
                >
                  <span className="text-sm font-bold tracking-widest uppercase">{feature.ctaText}</span>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
