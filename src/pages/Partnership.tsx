import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Award, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LoginModal } from '../components/LoginModal';

export const Partnership = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);

  const handleJoinClick = () => {
    if (user) {
      navigate('/account');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-ohawell-base pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24 max-w-3xl mx-auto">
        <span className="text-xs font-bold tracking-widest uppercase opacity-50 flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-4 h-4" /> Programa de Afiliados
        </span>
        <h1 className="font-serif text-5xl md:text-7xl mb-8">Socio Estratégico</h1>
        <p className="text-xl font-light opacity-80 leading-relaxed">
          Genera ingresos compartiendo el bienestar. Únete a nuestro programa de afiliados gratis y obtén recompensas por cada venta generada con tu código.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
        <div className="aspect-square rounded-[3rem] overflow-hidden bg-black/5 relative group">
          <img 
            src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80" 
            alt="Socio Estratégico" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <div className="space-y-12">
          <div className="bg-black/5 p-10 rounded-[2rem] border border-black/10">
            <div className="w-12 h-12 bg-ohawell-ink text-ohawell-base rounded-full flex items-center justify-center mb-6">
              <Gift className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-3xl mb-4">Para tu Comunidad</h3>
            <p className="text-lg font-light opacity-70">
              Tus amigos y seguidores reciben un <strong className="font-bold">10% de descuento</strong> en toda la tienda al usar tu código en el checkout.
            </p>
          </div>

          <div className="bg-black/5 p-10 rounded-[2rem] border border-black/10">
            <div className="w-12 h-12 bg-ohawell-ink text-ohawell-base rounded-full flex items-center justify-center mb-6">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-3xl mb-4">Para Ti</h3>
            <p className="text-lg font-light opacity-70">
              Ganas un <strong className="font-bold">15% de comisión</strong> en efectivo por cada venta completada con tu código. Pagos mensuales automáticos.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-ohawell-ink text-ohawell-base rounded-[3rem] p-12 md:p-24 text-center max-w-5xl mx-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-ohawell-awaken opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10">
          <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-8">Comienza a compartir bienestar hoy mismo.</h2>
          <p className="text-xl font-light opacity-80 leading-relaxed max-w-2xl mx-auto mb-12">
            Regístrate o inicia sesión para obtener tu código único de Socio Estratégico y acceder a tu panel de comisiones.
          </p>
          <button 
            onClick={handleJoinClick}
            className="btn-shiny bg-ohawell-base text-ohawell-ink px-10 py-5 rounded-full text-sm font-bold tracking-widest uppercase hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.1)] inline-flex items-center gap-3"
          >
            {user ? 'Ir a mi Panel de Socio' : 'Unirme al Programa'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
};
