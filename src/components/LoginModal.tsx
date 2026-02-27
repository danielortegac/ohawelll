import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Mail, Lock, User, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [age, setAge] = useState<string>('25');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAge = parseInt(age, 10);
    login(isNaN(parsedAge) ? 25 : parsedAge);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-ohawell-base rounded-[2rem] shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-black/50 hover:text-black hover:bg-black/5 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-10 space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-ohawell-ink text-ohawell-base rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h2 className="font-serif text-3xl mb-2">{isLogin ? 'Bienvenido de vuelta' : 'Únete al Ritual Pass'}</h2>
                <p className="text-sm opacity-60 font-light">
                  {isLogin ? 'Continúa tu viaje sensorial con OHAWELL.' : 'Acumula puntos, desbloquea cupones y accede a drops exclusivos.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                    <input 
                      type="text" 
                      placeholder="Nombre completo" 
                      className="w-full bg-black/5 border border-transparent focus:border-ohawell-ink rounded-xl py-4 pl-12 pr-4 outline-none transition-colors text-sm"
                      required
                    />
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                  <input 
                    type="email" 
                    placeholder="Correo electrónico" 
                    className="w-full bg-black/5 border border-transparent focus:border-ohawell-ink rounded-xl py-4 pl-12 pr-4 outline-none transition-colors text-sm"
                    required
                  />
                </div>
                {!isLogin && (
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                    <input 
                      type="number" 
                      placeholder="Edad (para personalizar tu experiencia)" 
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full bg-black/5 border border-transparent focus:border-ohawell-ink rounded-xl py-4 pl-12 pr-4 outline-none transition-colors text-sm"
                      required
                      min="1"
                      max="120"
                    />
                  </div>
                )}
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                  <input 
                    type="password" 
                    placeholder="Contraseña" 
                    className="w-full bg-black/5 border border-transparent focus:border-ohawell-ink rounded-xl py-4 pl-12 pr-4 outline-none transition-colors text-sm"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-ohawell-ink text-ohawell-base py-4 rounded-xl text-sm font-bold tracking-widest uppercase hover:bg-black/80 transition-colors mt-6"
                >
                  {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </button>
              </form>

              <div className="mt-8 text-center">
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                >
                  {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
