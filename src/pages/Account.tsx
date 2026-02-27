import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, Calendar, Award, ShieldCheck, Leaf, LogOut, ArrowRight, Play } from 'lucide-react';
import { ScratchCard } from '../components/ScratchCard';
import { RitualPlanner } from '../components/RitualPlanner';

export const Account = () => {
  const { user, logout, useScratchCoupon, addPoints } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'planner' | 'scratch' | 'allies'>('dashboard');
  const [scratchResult, setScratchResult] = useState<string | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ohawell-base relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
        <div className="text-center space-y-8 relative z-10 max-w-md px-6">
          <div className="w-20 h-20 bg-ohawell-ink text-ohawell-base rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Sparkles className="w-10 h-10" />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl">Acceso Denegado</h1>
          <p className="opacity-70 text-lg font-light leading-relaxed">
            El Ritual Pass es un espacio exclusivo para miembros. Inicia sesión para desbloquear recompensas y tracking avanzado.
          </p>
        </div>
      </div>
    );
  }

  const handleStartScratch = () => {
    if (user.scratchCoupons > 0 && !isScratching && !isRevealed) {
      setIsScratching(true);
      
      // Pre-determine prize
      const prizes = ['15% OFF en tu próxima compra', 'Envío Gratis Nacional', 'Awaken Coins Extra', '50 Puntos OHAWELL'];
      const prize = prizes[Math.floor(Math.random() * prizes.length)];
      setScratchResult(prize);
    }
  };

  const handleScratchComplete = () => {
    if (isScratching && !isRevealed) {
      setIsRevealed(true);
      setIsScratching(false);
      useScratchCoupon();
      if (scratchResult === '50 Puntos OHAWELL') addPoints(50);
    }
  };

  return (
    <div className="min-h-screen bg-ohawell-base pt-32 pb-24 px-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
        <div className="space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase opacity-50 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Ritual Pass Member
          </span>
          <h1 className="font-serif text-6xl md:text-7xl">Hola, {user.name}</h1>
          <p className="text-xl font-light opacity-70 max-w-2xl">
            Bienvenido a tu espacio personal. Aquí puedes gestionar tus recompensas, planificar tus rituales y acceder a beneficios exclusivos.
          </p>
        </div>
        <button 
          onClick={logout} 
          className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase border border-black/20 px-6 py-3 rounded-full hover:bg-black/5 transition-colors shrink-0"
        >
          <LogOut className="w-4 h-4" /> Cerrar Sesión
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* SIDEBAR */}
        <div className="lg:col-span-3 space-y-4 lg:sticky lg:top-32 h-fit">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: ShieldCheck },
            { id: 'planner', label: 'Ritual Planner', icon: Calendar },
            { id: 'scratch', label: 'Scratch Vault', icon: Sparkles },
            { id: 'allies', label: 'Allies Program', icon: Gift },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setScratchResult(null);
              }}
              className={`w-full flex items-center justify-between p-6 rounded-2xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-ohawell-ink text-ohawell-base shadow-xl scale-[1.02]' 
                  : 'hover:bg-black/5 text-ohawell-ink'
              }`}
            >
              <div className="flex items-center gap-4">
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'opacity-100' : 'opacity-50'}`} />
                <span className="font-bold tracking-widest uppercase text-xs">{tab.label}</span>
              </div>
              {activeTab === tab.id && <ArrowRight className="w-4 h-4" />}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-black/5 p-6 md:p-10 rounded-[2rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-ohawell-ink opacity-5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000" />
                    <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4 md:mb-6">Puntos Acumulados</span>
                    <span className="font-serif text-5xl md:text-7xl block mb-2">{user.points}</span>
                    <span className="text-xs md:text-sm opacity-60 font-medium">Equivale a ${(user.points * 0.1).toFixed(2)} USD</span>
                  </div>
                  <div className="bg-black/5 p-6 md:p-10 rounded-[2rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-ohawell-awaken opacity-20 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000" />
                    <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4 md:mb-6">Nivel Actual</span>
                    <span className="font-serif text-4xl md:text-5xl text-ohawell-ink flex items-center gap-3 md:gap-4 mb-2">
                      <Leaf className="w-8 h-8 md:w-10 md:h-10 opacity-50" /> {user.level}
                    </span>
                    <span className="text-xs md:text-sm opacity-60 font-medium">Próximo nivel: Maestro Cacaotero</span>
                  </div>
                  <div className="bg-black/5 p-6 md:p-10 rounded-[2rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-ohawell-desire opacity-20 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000" />
                    <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4 md:mb-6">Racha de Rituales</span>
                    <span className="font-serif text-5xl md:text-7xl flex items-center gap-3 md:gap-4 mb-2">
                      {user.streak} <Award className="w-8 h-8 md:w-10 md:h-10 opacity-50" />
                    </span>
                    <span className="text-xs md:text-sm opacity-60 font-medium">Días consecutivos</span>
                  </div>
                </div>

                <div className="bg-ohawell-ink text-ohawell-base p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
                  <div className="relative z-10">
                    <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4 md:mb-6">Progreso de Nivel</span>
                    <h3 className="font-serif text-3xl md:text-5xl mb-4 md:mb-6 leading-tight">Estás a 50 puntos de desbloquear envío gratis permanente.</h3>
                    <p className="text-base md:text-lg opacity-80 mb-8 md:mb-12 font-light max-w-2xl">Completa tu perfil o realiza una compra para alcanzar el siguiente nivel y disfrutar de beneficios exclusivos en todas tus órdenes.</p>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm font-bold tracking-widest uppercase">
                        <span>Nivel {user.level}</span>
                        <span className="opacity-50">Maestro Cacaotero</span>
                      </div>
                      <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '75%' }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="bg-white h-full rounded-full" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'scratch' && (
              <motion.div
                key="scratch"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                <div>
                  <h2 className="font-serif text-5xl mb-6">Scratch Vault</h2>
                  <p className="text-xl font-light opacity-70 max-w-2xl">Descubre sorpresas ocultas. Tienes <strong className="font-serif text-2xl mx-2">{user.scratchCoupons}</strong> cupones disponibles para raspar hoy.</p>
                </div>
                
                {user.scratchCoupons > 0 ? (
                  <div className="relative max-w-2xl">
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
                        <ScratchCard 
                          isScratching={isScratching} 
                          onComplete={handleScratchComplete} 
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="max-w-2xl aspect-[16/9] bg-black/5 rounded-[3rem] flex flex-col items-center justify-center text-center p-12 border border-black/10">
                    <Sparkles className="w-12 h-12 opacity-20 mb-6" />
                    <span className="font-serif text-3xl mb-4">No hay cupones disponibles</span>
                    <p className="opacity-60 font-light">Realiza una compra o completa un ritual para ganar más cupones.</p>
                  </div>
                )}

                <AnimatePresence>
                  {isRevealed && scratchResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="max-w-2xl p-12 bg-ohawell-awaken text-ohawell-ink rounded-[3rem] text-center border border-ohawell-ink/10 shadow-xl"
                    >
                      <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-6">Premio Revelado</span>
                      <h3 className="font-serif text-5xl mb-6">¡Felicidades!</h3>
                      <p className="text-2xl font-light mb-8">Has ganado: <strong className="font-serif text-3xl block mt-4">{scratchResult}</strong></p>
                      <button 
                        onClick={() => {
                          setScratchResult(null);
                          setIsRevealed(false);
                          setIsScratching(false);
                        }}
                        className="bg-ohawell-ink text-ohawell-base px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-black/80 transition-colors"
                      >
                        Reclamar Premio
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {activeTab === 'planner' && (
              <motion.div
                key="planner"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <RitualPlanner />
              </motion.div>
            )}

            {activeTab === 'allies' && (
              <motion.div
                key="allies"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                <div>
                  <h2 className="font-serif text-5xl mb-6">Socio Estratégico</h2>
                  <p className="text-xl font-light opacity-70 max-w-2xl">
                    Genera ingresos compartiendo el bienestar. Únete a nuestro programa de afiliados gratis y obtén recompensas por cada venta generada con tu código.
                  </p>
                </div>

                <div className="bg-ohawell-ink text-ohawell-base p-10 md:p-12 rounded-[3rem] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-ohawell-awaken opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                      <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4">Tu Código Único</span>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-3xl md:text-4xl bg-white/10 px-6 py-3 rounded-2xl border border-white/20">
                          OHA-{user.name.split(' ')[0].toUpperCase()}-2026
                        </span>
                      </div>
                      <p className="mt-4 text-sm font-light opacity-70">Comparte este código con tu comunidad.</p>
                    </div>
                    <div className="shrink-0">
                      <button 
                        onClick={() => navigator.clipboard.writeText(`OHA-${user.name.split(' ')[0].toUpperCase()}-2026`)}
                        className="btn-shiny bg-ohawell-base text-ohawell-ink px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:scale-105 transition-transform"
                      >
                        Copiar Código
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-black/5 p-10 rounded-[2rem] border border-black/10">
                    <div className="w-12 h-12 bg-ohawell-ink text-ohawell-base rounded-full flex items-center justify-center mb-6">
                      <Gift className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-3xl mb-4">Para tu Comunidad</h3>
                    <p className="text-lg font-light opacity-70 mb-6">
                      Tus amigos y seguidores reciben un <strong className="font-bold">10% de descuento</strong> en toda la tienda al usar tu código en el checkout.
                    </p>
                  </div>

                  <div className="bg-black/5 p-10 rounded-[2rem] border border-black/10">
                    <div className="w-12 h-12 bg-ohawell-ink text-ohawell-base rounded-full flex items-center justify-center mb-6">
                      <Award className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-3xl mb-4">Para Ti</h3>
                    <p className="text-lg font-light opacity-70 mb-6">
                      Ganas un <strong className="font-bold">15% de comisión</strong> en efectivo por cada venta completada con tu código. Pagos mensuales automáticos.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-black/10 rounded-[2rem] p-10">
                  <h3 className="font-serif text-2xl mb-8">Tus Estadísticas</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    <div>
                      <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-50 block mb-2">Ventas Generadas</span>
                      <span className="font-serif text-3xl md:text-4xl">0</span>
                    </div>
                    <div>
                      <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-50 block mb-2">Comisiones Pendientes</span>
                      <span className="font-serif text-3xl md:text-4xl">$0.00</span>
                    </div>
                    <div>
                      <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-50 block mb-2">Comisiones Pagadas</span>
                      <span className="font-serif text-3xl md:text-4xl">$0.00</span>
                    </div>
                    <div>
                      <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-50 block mb-2">Clics en tu Enlace</span>
                      <span className="font-serif text-3xl md:text-4xl">0</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
