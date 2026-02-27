import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { LoginModal } from '../components/LoginModal';
import { FeatureModal } from '../components/FeatureModal';
import { Leaf, Sparkles, Heart, ShieldCheck, ArrowRight, Play, Globe, Droplets, Wind, Calendar, Gift, Coffee, Wine, Briefcase, Quote, Star, Brain, Zap, Moon, Check, X, Activity, Shield, Clock } from 'lucide-react';

export const Home = () => {
  const { t, currency } = useLanguage();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState<any | null>(null);

  const bestSellers = products.slice(0, 6);

  const features = [
    {
      id: 'origen',
      icon: Globe,
      title: 'Cacao de Origen Ecuatoriano',
      subtitle: 'Latitud 0°',
      description: 'Nuestro cacao proviene de fincas seleccionadas en Ecuador, cultivado bajo prácticas regenerativas que respetan la tierra y a quienes la trabajan.',
      details: [
        'Sabor fino de aroma reconocido mundialmente.',
        'Cultivo regenerativo que protege la biodiversidad.',
        'Comercio directo y precio justo para los agricultores.'
      ],
      image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80',
      ctaText: 'Descubre nuestro origen',
      ctaLink: '/impact'
    },
    {
      id: 'formulas',
      icon: Droplets,
      title: 'Fórmulas Limpias',
      subtitle: '100% Plant Based',
      description: 'Combinamos cacao premium con botánicos funcionales y adaptógenos, sin azúcares refinados ni ingredientes artificiales.',
      details: [
        'Endulzado naturalmente con azúcar de coco.',
        'Libre de lácteos, gluten y conservantes.',
        'Ingredientes funcionales dosificados para el bienestar.'
      ],
      image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80',
      ctaText: 'Ver ingredientes',
      ctaLink: '/shop'
    },
    {
      id: 'rituales',
      icon: Sparkles,
      title: 'Rituales Guiados',
      subtitle: 'Intención Diaria',
      description: 'No es solo chocolate, es una herramienta para pausar, conectar o enfocarte. Cada producto viene con una guía para maximizar su efecto.',
      details: [
        'Prácticas de respiración de 60 segundos.',
        'Ejercicios de mindfulness integrados.',
        'Diseñados para diferentes momentos del día.'
      ],
      image: 'https://images.unsplash.com/photo-1511381939415-e440c0521a6b?auto=format&fit=crop&q=80',
      ctaText: 'Explorar Rituales',
      ctaLink: '/account'
    },
    {
      id: 'clima',
      icon: Wind,
      title: 'Clima Controlado',
      subtitle: 'Calidad Intacta',
      description: 'Garantizamos que tu experiencia OHAWELL llegue en perfectas condiciones, manteniendo la textura y propiedades de cada barra.',
      details: [
        'Envíos con aislamiento térmico.',
        'Monitoreo de temperatura en tránsito.',
        'Garantía de frescura al recibir.'
      ],
      image: 'https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?auto=format&fit=crop&q=80',
      ctaText: 'Ver políticas de envío',
      ctaLink: '/support'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* HERO CINEMATOGRÁFICO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80" 
            alt="Cacao Ritual" 
            className="w-full h-full object-cover opacity-60 mix-blend-multiply scale-105 animate-[pulse_20s_ease-in-out_infinite]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-ohawell-base/90" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto space-y-12 mt-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-3 border border-ohawell-ink/30 px-6 py-2 rounded-full backdrop-blur-md bg-white/10 mb-6 shadow-2xl"
          >
            <Sparkles className="w-4 h-4 text-ohawell-ink" />
            <span className="text-xs font-bold tracking-widest uppercase text-ohawell-ink">Nuevo: LAT 0° RESERVE</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl md:text-8xl lg:text-[10rem] tracking-tighter text-ohawell-ink leading-[0.85] drop-shadow-2xl"
          >
            {t('home.hero.title')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-2xl md:text-3xl font-light max-w-3xl mx-auto text-ohawell-ink/90 leading-relaxed"
          >
            {t('home.hero.subtitle')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-12"
          >
            <Link 
              to="/shop" 
              className="bg-ohawell-ink text-ohawell-base px-12 py-6 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-black/80 transition-all hover:-translate-y-2 shadow-2xl flex items-center gap-3"
            >
              {t('home.hero.btn1')} <ArrowRight className="w-4 h-4" />
            </Link>
            {!user && (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-white/20 backdrop-blur-md border border-ohawell-ink/30 text-ohawell-ink px-12 py-6 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-white/40 transition-all flex items-center justify-center gap-3 hover:-translate-y-2 shadow-xl"
              >
                {t('home.hero.btn2')} <Sparkles className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 opacity-50"
        >
          <div className="w-[1px] h-16 bg-ohawell-ink relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white animate-[slideDown_2s_ease-in-out_infinite]" />
          </div>
        </motion.div>
      </section>

      {/* PRESS BANNER (As seen in) */}
      <section className="py-12 border-b border-black/5 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-bold tracking-widest uppercase opacity-40 mb-8">Reconocidos por la excelencia</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-tighter">VOGUE</span>
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-widest">Forbes</span>
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-tighter">GQ</span>
            <span className="font-serif text-2xl md:text-3xl font-light italic">Kinfolk</span>
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-widest uppercase">Wired</span>
          </div>
        </div>
      </section>

      {/* BENEFITS BAR */}
      <div className="bg-ohawell-ink text-ohawell-base py-5 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 items-center">
          <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-2"><Sparkles className="w-3 h-3"/> 100% Plant Based</span>
          <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-2"><Sparkles className="w-3 h-3"/> Sin Azúcar Refinada</span>
          <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-2"><Sparkles className="w-3 h-3"/> Cacao Arriba Nacional</span>
          <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-2"><Sparkles className="w-3 h-3"/> Botánicos Funcionales</span>
        </div>
      </div>

      {/* GUARANTEE BANNER (Alice Inspired - Marquee) */}
      <div className="bg-[#E8EEDF] text-ohawell-ink py-6 border-y border-black/10 mt-12 overflow-hidden">
        <div className="animate-marquee gap-16 pr-16">
          {/* Group 1 */}
          <span className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 shrink-0"><Shield className="w-4 h-4"/> Formulado por Expertos</span>
          <span className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 shrink-0"><Brain className="w-4 h-4"/> No Psicoactivo</span>
          <span className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 shrink-0"><Activity className="w-4 h-4"/> Sin Bajón de Energía</span>
          <span className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 shrink-0"><Check className="w-4 h-4"/> Seguro para uso diario</span>
          {/* Group 2 (Duplicate for seamless loop) */}
          <span className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 shrink-0"><Shield className="w-4 h-4"/> Formulado por Expertos</span>
          <span className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 shrink-0"><Brain className="w-4 h-4"/> No Psicoactivo</span>
          <span className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 shrink-0"><Activity className="w-4 h-4"/> Sin Bajón de Energía</span>
          <span className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 shrink-0"><Check className="w-4 h-4"/> Seguro para uso diario</span>
          {/* Group 3 (Duplicate for wide screens) */}
          <span className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 shrink-0"><Shield className="w-4 h-4"/> Formulado por Expertos</span>
          <span className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 shrink-0"><Brain className="w-4 h-4"/> No Psicoactivo</span>
          <span className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 shrink-0"><Activity className="w-4 h-4"/> Sin Bajón de Energía</span>
          <span className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 shrink-0"><Check className="w-4 h-4"/> Seguro para uso diario</span>
        </div>
      </div>

      {/* YOUR RITUAL PASS HOOK */}
      {!user && (
        <section className="py-32 px-6 bg-ohawell-ink text-ohawell-base relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-ohawell-awaken opacity-5 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase opacity-50 flex items-center gap-2 mb-6">
                  <Sparkles className="w-4 h-4" /> Ecosistema OHAWELL
                </span>
                <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-[1.1]">
                  Más que chocolate.<br />
                  <span className="italic font-light opacity-80">Un sistema de vida.</span>
                </h2>
                <p className="text-xl font-light opacity-70 mb-12 leading-relaxed">
                  Al registrarte, desbloqueas acceso gratuito a nuestro <strong>Ritual Planner</strong>. Organiza tu agenda, recibe recordatorios para tus pausas y haz tracking de tu bienestar emocional.
                </p>
                
                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-2xl mb-1">Agenda Inteligente</h4>
                      <p className="opacity-60 font-light">Sincroniza tus rituales con tu día a día.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-2xl mb-1">Socio Estratégico</h4>
                      <p className="opacity-60 font-light">Genera ingresos compartiendo el bienestar con nuestro programa de aliados.</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="btn-shiny bg-ohawell-base text-ohawell-ink px-10 py-5 rounded-full text-sm font-bold tracking-widest uppercase hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                >
                  Crear Cuenta Gratis
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-ohawell-awaken/20 to-ohawell-desire/20 rounded-[3rem] transform rotate-3 scale-105 blur-xl" />
                <div className="glass-panel p-8 md:p-12 rounded-[3rem] relative z-10">
                  <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                    <h3 className="font-serif text-3xl">Tu Semana</h3>
                    <Calendar className="w-6 h-6 opacity-50" />
                  </div>
                  <div className="space-y-4">
                    {[
                      { time: '08:00', title: 'Focus Sprint', type: 'Awaken' },
                      { time: '14:30', title: 'Pausa Creativa', type: 'Personal' },
                      { time: '21:00', title: 'Night Reset', type: 'Calm' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold tracking-widest opacity-50">{item.time}</span>
                          <span className="font-serif text-xl">{item.title}</span>
                        </div>
                        <span className="text-xs uppercase tracking-widest opacity-50 border border-white/20 px-3 py-1 rounded-full">{item.type}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/10 text-center">
                    <p className="text-sm font-light opacity-60 italic">"La constancia es la clave de la transformación."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MANIFESTO SECTION */}
      <section id="manifesto" className="py-40 px-6 max-w-[1200px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-8">Nuestra Filosofía</span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.2] text-ohawell-ink">
            No es solo chocolate.<br/>
            Es <span className="italic font-light">neurociencia aplicada</span> al bienestar diario.
          </h2>
        </motion.div>
      </section>

      {/* ANCESTRAL WISDOM (Awki Inspired) */}
      <section id="herencia" className="py-32 px-6 bg-ohawell-base border-b border-black/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="order-2 lg:order-1 relative aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <img src="https://images.unsplash.com/photo-1516824535497-6c174360e206?auto=format&fit=crop&q=80" alt="Plant Medicine" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2 space-y-8"
          >
            <span className="text-xs font-bold tracking-widest uppercase opacity-50 flex items-center gap-3">
              <Leaf className="w-4 h-4" /> Medicina Ancestral
            </span>
            <h2 className="font-serif text-5xl md:text-7xl leading-[1.1]">
              El Espíritu de <br/><span className="italic font-light opacity-90">la Planta.</span>
            </h2>
            <p className="text-xl font-light opacity-80 leading-relaxed max-w-lg">
              Durante milenios, el cacao ha sido venerado como una planta maestra, utilizada en ceremonias para abrir el corazón y expandir la conciencia. En OHAWELL, honramos esta sabiduría ancestral.
            </p>
            <p className="text-xl font-light opacity-80 leading-relaxed max-w-lg">
              No alteramos su naturaleza; la potenciamos. Al combinar cacao puro con adaptógenos milenarios, creamos un puente entre el conocimiento antiguo y el bienestar moderno.
            </p>
          </motion.div>
        </div>
      </section>

      {/* HERITAGE & TERROIR (To'ak Inspired) */}
      <section id="terroir" className="py-32 px-6 bg-ohawell-ink text-ohawell-base overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <span className="text-xs font-bold tracking-widest uppercase opacity-50 flex items-center gap-3">
              <Globe className="w-4 h-4" /> Terroir & Herencia
            </span>
            <h2 className="font-serif text-5xl md:text-7xl leading-[1.1]">
              El Cacao Más <br/><span className="italic font-light opacity-90">Raro del Mundo.</span>
            </h2>
            <p className="text-xl font-light opacity-80 leading-relaxed max-w-lg">
              Cultivado en la latitud 0°, nuestro cacao Arriba Nacional es una reliquia viva. Solo el 5% del cacao mundial clasifica como "Fino de Aroma". Nosotros utilizamos el 1% superior, preservando la biodiversidad de la Amazonía ecuatoriana.
            </p>
            <div className="pt-6">
              <Link to="/impact" className="inline-flex items-center gap-4 text-sm font-bold tracking-widest uppercase border-b border-white/30 pb-2 hover:gap-6 transition-all">
                Descubre el Origen <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <img src="https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80" alt="Cacao Pod" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-10 left-10 text-white">
              <p className="text-xs font-bold tracking-widest uppercase opacity-80 mb-2">Latitud 0°</p>
              <p className="font-serif text-2xl">Ecuador, Sudamérica</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CRAFTSMANSHIP & PROCESS (To'ak Inspired) */}
      <section id="proceso" className="py-32 px-6 bg-ohawell-ink text-ohawell-base border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-24">
            <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4">Small Batch & Stone Ground</span>
            <h2 className="font-serif text-5xl md:text-7xl">Maestría y Paciencia</h2>
            <p className="text-xl font-light opacity-70 mt-6 max-w-2xl mx-auto">
              La excelencia no se puede apresurar. Nuestro proceso artesanal toma semanas, asegurando que cada nota de sabor y cada beneficio funcional se preserve intacto.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="aspect-square rounded-[2rem] overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80" alt="Fermentation" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
              </div>
              <h3 className="font-serif text-3xl">01. Fermentación</h3>
              <p className="font-light opacity-70 leading-relaxed text-lg">Controlamos meticulosamente la fermentación en cajas de madera de laurel para desarrollar los precursores del sabor "Fino de Aroma".</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="aspect-square rounded-[2rem] overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1511381939415-e440c0521a6b?auto=format&fit=crop&q=80" alt="Roasting" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
              </div>
              <h3 className="font-serif text-3xl">02. Tueste Lento</h3>
              <p className="font-light opacity-70 leading-relaxed text-lg">Un tueste a baja temperatura que protege los antioxidantes naturales del cacao y evita las notas amargas o quemadas.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="aspect-square rounded-[2rem] overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&q=80" alt="Conching" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
              </div>
              <h3 className="font-serif text-3xl">03. Conchado en Piedra</h3>
              <p className="font-light opacity-70 leading-relaxed text-lg">Refinamos el chocolate en molinos de piedra durante 48 horas, logrando una textura sedosa que se funde perfectamente en el paladar.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOUNDER'S NOTE (Awki/To'ak Inspired) */}
      <section className="py-32 px-6 bg-white border-b border-black/5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square md:aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80" alt="Founder" className="w-full h-full object-cover grayscale opacity-90" referrerPolicy="no-referrer" />
          </div>
          <div className="space-y-8 md:pl-12">
            <Quote className="w-12 h-12 opacity-20 text-ohawell-ink" />
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              "Nuestra historia comenzó con una pregunta simple: ¿Qué pasaría si el chocolate pudiera hacer más que solo saber bien?"
            </h2>
            <p className="text-lg font-light opacity-70 leading-relaxed">
              Pasamos años estudiando la neurociencia detrás de los adaptógenos y la botánica ancestral. OHAWELL nació de la necesidad de crear pausas reales en un mundo acelerado. No queríamos hacer otro dulce; queríamos crear una herramienta de bienestar que pudieras saborear.
            </p>
            <div className="pt-8 border-t border-black/10">
              <p className="font-serif text-2xl">Fundadores de OHAWELL</p>
              <p className="text-xs font-bold tracking-widest uppercase opacity-50 mt-2">Quito, Ecuador</p>
            </div>
          </div>
        </div>
      </section>

      {/* MOOD SELECTOR - ALTERNATING FULL WIDTH */}
      <section className="py-20">
        <div className="text-center mb-24">
          <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4">Elige tu estado</span>
          <h2 className="font-serif text-5xl md:text-7xl">Tres Universos</h2>
        </div>
        
        <div className="flex flex-col">
          {/* Awaken */}
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-ohawell-awaken p-16 md:p-32 flex flex-col justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl opacity-0 hover:opacity-100 transition-opacity duration-700 z-0" />
              <div className="relative z-10">
                <span className="text-xs font-bold tracking-widest uppercase opacity-60 mb-6 block">Energía Lúcida</span>
                <h3 className="font-serif text-7xl md:text-9xl mb-8 text-ohawell-ink">Awaken</h3>
                <p className="text-2xl font-light opacity-80 mb-12 max-w-lg leading-relaxed">
                  Claridad mental sin ansiedad. Tu aliado para empezar el día con intención y foco sostenido.
                </p>
                <Link to="/moods/awaken" className="inline-flex items-center gap-4 text-sm font-bold tracking-widest uppercase border-b-2 border-ohawell-ink pb-2 hover:gap-6 transition-all">
                  Explorar Universo <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative overflow-hidden"
            >
              <img src="https://images.unsplash.com/photo-1623660053975-1011850d9953?auto=format&fit=crop&q=80" alt="Awaken" className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]" referrerPolicy="no-referrer" />
            </motion.div>
          </div>
          
          {/* Calm */}
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative overflow-hidden order-2 lg:order-1"
            >
              <img src="https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&q=80" alt="Calm" className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-ohawell-calm p-16 md:p-32 flex flex-col justify-center relative overflow-hidden order-1 lg:order-2"
            >
              <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl opacity-0 hover:opacity-100 transition-opacity duration-700 z-0" />
              <div className="relative z-10">
                <span className="text-xs font-bold tracking-widest uppercase opacity-60 mb-6 block">Rituales de Pausa</span>
                <h3 className="font-serif text-7xl md:text-9xl mb-8 text-ohawell-ink">Calm</h3>
                <p className="text-2xl font-light opacity-80 mb-12 max-w-lg leading-relaxed">
                  Transiciona del hacer al ser. Baja las revoluciones y prepara tu cuerpo para el descanso profundo.
                </p>
                <Link to="/moods/calm" className="inline-flex items-center gap-4 text-sm font-bold tracking-widest uppercase border-b-2 border-ohawell-ink pb-2 hover:gap-6 transition-all">
                  Explorar Universo <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Desire */}
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-ohawell-desire p-16 md:p-32 flex flex-col justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl opacity-0 hover:opacity-100 transition-opacity duration-700 z-0" />
              <div className="relative z-10">
                <span className="text-xs font-bold tracking-widest uppercase opacity-60 mb-6 block">Experiencias Sensoriales</span>
                <h3 className="font-serif text-7xl md:text-9xl mb-8 text-ohawell-ink">Desire</h3>
                <p className="text-2xl font-light opacity-80 mb-12 max-w-lg leading-relaxed">
                  Despierta los sentidos y fomenta la intimidad. Una experiencia cálida diseñada para compartirse.
                </p>
                <Link to="/moods/desire" className="inline-flex items-center gap-4 text-sm font-bold tracking-widest uppercase border-b-2 border-ohawell-ink pb-2 hover:gap-6 transition-all">
                  Explorar Universo <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative overflow-hidden"
            >
              <img src="https://images.unsplash.com/photo-1604514628550-37477afdf4e3?auto=format&fit=crop&q=80" alt="Desire" className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]" referrerPolicy="no-referrer" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* THE ART OF TASTING (Awki/To'ak Inspired) */}
      <section className="py-32 px-6 bg-white border-b border-black/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-24">
            <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4">La Experiencia Sensorial</span>
            <h2 className="font-serif text-5xl md:text-7xl">El Arte de Degustar</h2>
            <p className="text-xl font-light opacity-70 mt-6 max-w-2xl mx-auto">
              Un ritual en cuatro pasos para despertar los botánicos y conectar con el momento presente.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { step: '01', title: 'Observa', desc: 'Nota el brillo sedoso y el color profundo, señal de un temperado perfecto y manteca pura.' },
              { step: '02', title: 'Escucha', desc: 'Rompe un trozo cerca de tu oído. Un "snap" limpio indica la alta calidad del cristal de cacao.' },
              { step: '03', title: 'Inhala', desc: 'Frota el chocolate suavemente y respira profundo para percibir las notas florales y terrosas.' },
              { step: '04', title: 'Funde', desc: 'No lo muerdas. Deja que se derrita en tu paladar para liberar los adaptógenos lentamente.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="text-center group"
              >
                <span className="font-serif text-7xl text-ohawell-ink/5 block mb-8 group-hover:text-ohawell-ink/20 transition-colors duration-500">{item.step}</span>
                <h3 className="font-serif text-3xl mb-4">{item.title}</h3>
                <p className="font-light opacity-70 leading-relaxed text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PAIRING GUIDE (To'ak Inspired) */}
      <section id="maridaje" className="py-32 px-6 bg-black/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4">Guía de Cata</span>
              <h2 className="font-serif text-5xl md:text-6xl">Maridaje Perfecto</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-12 rounded-[3rem] border border-black/5 hover:shadow-2xl transition-all duration-500 group">
              <Coffee className="w-10 h-10 mb-8 opacity-50 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-3xl mb-4">Awaken + Espresso</h3>
              <p className="text-lg font-light opacity-70 leading-relaxed">
                Las notas cítricas de la Maca y el Guaraná se elevan al combinarse con un espresso de especialidad de tueste medio. La acidez brillante corta la riqueza del cacao 70%.
              </p>
            </div>
            <div className="bg-white p-12 rounded-[3rem] border border-black/5 hover:shadow-2xl transition-all duration-500 group">
              <Leaf className="w-10 h-10 mb-8 opacity-50 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-3xl mb-4">Calm + Té Herbal</h3>
              <p className="text-lg font-light opacity-70 leading-relaxed">
                Una infusión caliente de manzanilla o lavanda potencia los efectos relajantes de la Ashwagandha. El calor derrite la manteca de cacao lentamente en el paladar.
              </p>
            </div>
            <div className="bg-white p-12 rounded-[3rem] border border-black/5 hover:shadow-2xl transition-all duration-500 group">
              <Wine className="w-10 h-10 mb-8 opacity-50 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-3xl mb-4">Desire + Pinot Noir</h3>
              <p className="text-lg font-light opacity-70 leading-relaxed">
                Los taninos suaves de un Pinot Noir o un Mezcal artesanal complementan el picor sutil de la pimienta cayena y la profundidad de la Damiana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT MAKES IT FUNCTIONAL */}
      <section id="funcional" className="py-32 px-6 bg-black/5 overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="w-20 h-20 mx-auto bg-ohawell-ink text-ohawell-base rounded-full flex items-center justify-center mb-8 shadow-xl">
              <Leaf className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-8">
              OHAWELL es chocolate vegano elaborado con cacao de origen y botánicos funcionales. No se trata de hacks: se trata de rituales.
            </h2>
            <p className="text-xl font-light opacity-70">Haz clic en cada pilar para descubrir nuestra filosofía.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onClick={() => setActiveFeature(feature)}
                className="group relative bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-10 cursor-pointer hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 border border-white overflow-hidden flex flex-col items-center text-center h-full min-h-[300px]"
              >
                <div className="absolute inset-0 bg-ohawell-ink opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                <feature.icon className="w-12 h-12 mb-6 opacity-80 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="font-serif text-2xl mb-4">{feature.title}</h3>
                <p className="text-sm opacity-60 font-light mb-8 flex-1">{feature.subtitle}</p>
                <div className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-ohawell-ink group-hover:text-ohawell-base group-hover:border-ohawell-ink transition-colors mt-auto">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FeatureModal 
        isOpen={!!activeFeature} 
        onClose={() => setActiveFeature(null)} 
        feature={activeFeature} 
      />

      {/* THE SCIENCE (Alice Inspired Ingredient Deep Dive) */}
      <section id="ciencia" className="py-32 px-6 bg-white border-b border-black/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-24">
            <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4">Ingredientes Clínicamente Probados</span>
            <h2 className="font-serif text-5xl md:text-7xl">La Ciencia Detrás de la Magia</h2>
            <p className="text-xl font-light opacity-70 mt-6 max-w-2xl mx-auto">
              No usamos "polvos mágicos". Usamos dosis efectivas de adaptógenos y nootrópicos respaldados por la ciencia, utilizando el cacao como el vehículo de absorción perfecto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/5 p-12 rounded-[3rem] border border-black/5 hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm">
                <Zap className="w-8 h-8 text-ohawell-ink" />
              </div>
              <h3 className="font-serif text-3xl mb-2">Maca & Guaraná</h3>
              <p className="text-sm font-bold tracking-widest uppercase opacity-50 mb-6">En Universo Awaken</p>
              <p className="text-lg font-light opacity-80 leading-relaxed mb-6">
                La Maca peruana actúa como un adaptógeno que equilibra las hormonas del estrés, mientras que el Guaraná proporciona una liberación lenta de energía. ¿El resultado? Foco profundo sin la ansiedad ni el bajón del café.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-4 h-4 text-green-600"/> Aumenta la concentración</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-4 h-4 text-green-600"/> Energía sostenida por 4+ horas</li>
              </ul>
            </div>

            <div className="bg-black/5 p-12 rounded-[3rem] border border-black/5 hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm">
                <Moon className="w-8 h-8 text-ohawell-ink" />
              </div>
              <h3 className="font-serif text-3xl mb-2">Ashwagandha KSM-66®</h3>
              <p className="text-sm font-bold tracking-widest uppercase opacity-50 mb-6">En Universo Calm</p>
              <p className="text-lg font-light opacity-80 leading-relaxed mb-6">
                Utilizamos el extracto de raíz de Ashwagandha más estudiado clínicamente del mundo. Ha demostrado reducir los niveles de cortisol (la hormona del estrés) y mejorar la calidad del sueño profundo.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-4 h-4 text-green-600"/> Reduce el estrés y la ansiedad</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-4 h-4 text-green-600"/> Promueve el sueño reparador</li>
              </ul>
            </div>

            <div className="bg-black/5 p-12 rounded-[3rem] border border-black/5 hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm">
                <Brain className="w-8 h-8 text-ohawell-ink" />
              </div>
              <h3 className="font-serif text-3xl mb-2">Teobromina</h3>
              <p className="text-sm font-bold tracking-widest uppercase opacity-50 mb-6">En Todos los Universos</p>
              <p className="text-lg font-light opacity-80 leading-relaxed mb-6">
                El compuesto activo natural del cacao. A diferencia de la cafeína, la teobromina es un vasodilatador que aumenta el flujo sanguíneo al cerebro, mejorando el estado de ánimo y la función cognitiva de forma suave.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-4 h-4 text-green-600"/> Mejora el estado de ánimo</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-4 h-4 text-green-600"/> Vehículo de absorción perfecto</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON CHART (Alice Inspired) */}
      <section className="py-32 px-6 bg-ohawell-ink text-ohawell-base">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl md:text-6xl mb-6">Por qué OHAWELL es diferente</h2>
            <p className="text-xl font-light opacity-70">La evolución de los suplementos diarios.</p>
          </div>

          <div className="bg-white/5 rounded-[3rem] border border-white/10 overflow-hidden backdrop-blur-sm">
            <div className="grid grid-cols-4 p-8 border-b border-white/10 items-center">
              <div className="col-span-2 font-serif text-2xl">Beneficios</div>
              <div className="text-center font-bold tracking-widest uppercase text-ohawell-awaken">OHAWELL</div>
              <div className="text-center font-bold tracking-widest uppercase opacity-50 text-xs md:text-sm">Suplementos / Café</div>
            </div>
            
            {[
              { label: 'Ingredientes 100% Naturales', us: true, them: false },
              { label: 'Sin Bajón de Energía (No Crash)', us: true, them: false },
              { label: 'Sabor a Chocolate Premium', us: true, them: false },
              { label: 'Dosis Clínicamente Efectivas', us: true, them: true },
              { label: 'Fácil de crear un hábito', us: true, them: false },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 p-8 border-b border-white/5 items-center hover:bg-white/5 transition-colors">
                <div className="col-span-2 text-lg font-light">{row.label}</div>
                <div className="flex justify-center">
                  {row.us ? <Check className="w-6 h-6 text-ohawell-awaken" /> : <X className="w-6 h-6 opacity-30" />}
                </div>
                <div className="flex justify-center">
                  {row.them ? <Check className="w-6 h-6 opacity-50" /> : <X className="w-6 h-6 opacity-30" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DAILY ROUTINE (Alice Inspired) */}
      <section className="py-32 px-6 bg-white border-b border-black/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-24">
            <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4">Tu Nuevo Hábito</span>
            <h2 className="font-serif text-5xl md:text-7xl">Un Día con OHAWELL</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-black/10 -translate-y-1/2 z-0" />
            
            <div className="relative z-10 bg-white p-10 rounded-[3rem] border border-black/10 shadow-xl text-center">
              <div className="w-16 h-16 mx-auto bg-ohawell-awaken text-ohawell-ink rounded-full flex items-center justify-center mb-6 font-bold tracking-widest">08:00</div>
              <h3 className="font-serif text-3xl mb-4">La Mañana</h3>
              <p className="text-lg font-light opacity-70 mb-6">Reemplaza tu segundo café con 2 cuadros de <strong>Awaken</strong>. Disfruta de foco sostenido para tu trabajo profundo sin la ansiedad de la cafeína.</p>
              <Link to="/moods/awaken" className="text-xs font-bold tracking-widest uppercase border-b border-black pb-1">Ver Awaken</Link>
            </div>

            <div className="relative z-10 bg-white p-10 rounded-[3rem] border border-black/10 shadow-xl text-center">
              <div className="w-16 h-16 mx-auto bg-ohawell-desire text-ohawell-ink rounded-full flex items-center justify-center mb-6 font-bold tracking-widest">18:00</div>
              <h3 className="font-serif text-3xl mb-4">La Tarde</h3>
              <p className="text-lg font-light opacity-70 mb-6">Desconecta del trabajo y reconecta contigo o tu pareja con 2 cuadros de <strong>Desire</strong>. Un boost de energía cálida y sensorial.</p>
              <Link to="/moods/desire" className="text-xs font-bold tracking-widest uppercase border-b border-black pb-1">Ver Desire</Link>
            </div>

            <div className="relative z-10 bg-white p-10 rounded-[3rem] border border-black/10 shadow-xl text-center">
              <div className="w-16 h-16 mx-auto bg-ohawell-calm text-ohawell-ink rounded-full flex items-center justify-center mb-6 font-bold tracking-widest">21:00</div>
              <h3 className="font-serif text-3xl mb-4">La Noche</h3>
              <p className="text-lg font-light opacity-70 mb-6">Una hora antes de dormir, toma 2 cuadros de <strong>Calm</strong>. Deja que la Ashwagandha baje tus niveles de cortisol para un sueño profundo.</p>
              <Link to="/moods/calm" className="text-xs font-bold tracking-widest uppercase border-b border-black pb-1">Ver Calm</Link>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto border-t border-black/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4">Los más elegidos</span>
            <h2 className="font-serif text-5xl">Best Sellers</h2>
          </div>
          <Link to="/shop" className="text-sm font-bold tracking-widest uppercase border-b border-black pb-1 hover:opacity-70 transition-opacity flex items-center gap-2">
            Ver colección completa <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {bestSellers.map((product, i) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              <Link to={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden rounded-[2rem] mb-6 block shadow-2xl">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-sm text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full shadow-sm">
                    {product.mood}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    className="bg-white text-black px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase transform translate-y-8 group-hover:translate-y-0 transition-all duration-500"
                  >
                    Añadir al carrito
                  </button>
                </div>
              </Link>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-serif text-3xl mb-1 group-hover:opacity-70 transition-opacity">{product.name}</h3>
                    <p className="text-sm opacity-60 font-medium tracking-widest uppercase">{product.format}</p>
                  </div>
                  <span className="font-medium text-xl">{product.price} {currency}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EDITORIAL / JOURNAL PREVIEW */}
      <section className="py-32 px-6 bg-black/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4">Journal</span>
              <h2 className="font-serif text-5xl">Historias de Cacao</h2>
            </div>
            <Link to="/journal" className="text-sm font-bold tracking-widest uppercase border-b border-black pb-1 hover:opacity-70 transition-opacity flex items-center gap-2">
              Leer más <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/journal/ritual-manana" className="group relative aspect-video rounded-3xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1542843137-87f18834166a?auto=format&fit=crop&q=80" alt="Journal 1" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-10 text-white">
                <span className="text-xs font-bold tracking-widest uppercase opacity-80 mb-4 block">Rituales</span>
                <h3 className="font-serif text-3xl md:text-4xl">Cómo construir una mañana intencional</h3>
              </div>
            </Link>
            <Link to="/journal/origen-latitud-0" className="group relative aspect-video rounded-3xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80" alt="Journal 2" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-10 text-white">
                <span className="text-xs font-bold tracking-widest uppercase opacity-80 mb-4 block">Origen</span>
                <h3 className="font-serif text-3xl md:text-4xl">El secreto de la Latitud 0°</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEWS / TESTIMONIALS (Awki Inspired) */}
      <section id="testimonios" className="py-32 px-6 bg-white border-b border-black/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4">Testimonios</span>
            <h2 className="font-serif text-5xl md:text-6xl">Lo que dice nuestra tribu</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "María F.", text: "Awaken reemplazó mi segundo café del día. Me da un foco mental increíble sin la ansiedad de la cafeína.", stars: 5 },
              { name: "Carlos R.", text: "El ritual de Calm antes de dormir ha cambiado mi calidad de sueño por completo. El sabor es profundo y terroso.", stars: 5 },
              { name: "Elena S.", text: "No es solo chocolate, es una experiencia. La textura, el empaque y la intención detrás de cada barra son de otro nivel.", stars: 5 }
            ].map((review, i) => (
              <div key={i} className="bg-black/5 p-10 rounded-[2.5rem] border border-black/5">
                <div className="flex text-yellow-600 mb-6">
                  {[...Array(review.stars)].map((_, idx) => <Star key={idx} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-xl font-light italic mb-8 leading-relaxed">"{review.text}"</p>
                <p className="text-sm font-bold tracking-widest uppercase opacity-60">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY / TRIBE GRID (Awki Inspired) */}
      <section id="comunidad" className="py-32 px-2 bg-white">
        <div className="text-center mb-16 px-4">
          <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4">Comunidad OHAWELL</span>
          <h2 className="font-serif text-5xl md:text-6xl mb-6">Únete al Ritual</h2>
          <p className="text-lg font-light opacity-70">Comparte tu momento de pausa etiquetando <strong className="font-medium">@ohawell.co</strong></p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-[1600px] mx-auto">
          {[
            'https://images.unsplash.com/photo-1511381939415-e440c0521a6b?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1604514628550-37477afdf4e3?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1529693662653-9d480530a697?auto=format&fit=crop&q=80'
          ].map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-square overflow-hidden group cursor-pointer"
            >
              <img src={img} alt="Community" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CORPORATE GIFTING (To'ak Inspired) */}
      <section id="corporativo" className="py-32 px-6 bg-ohawell-ink text-ohawell-base border-b border-white/10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <Briefcase className="w-12 h-12 opacity-50" />
            <h2 className="font-serif text-5xl md:text-6xl">Regalos Corporativos & Catas Privadas</h2>
            <p className="text-xl font-light opacity-70 leading-relaxed max-w-lg">
              Eleva los regalos de tu empresa. Ofrecemos cajas de degustación personalizadas y experiencias de cata virtual guiadas por nuestros expertos en cacao y bienestar.
            </p>
            <div className="pt-6">
              <Link to="/contact" className="inline-flex items-center gap-4 text-sm font-bold tracking-widest uppercase border-b border-white/30 pb-2 hover:gap-6 transition-all">
                Solicitar Catálogo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="relative aspect-video md:aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&q=80" alt="Corporate Gifting" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* IMPACTO SOCIAL */}
      <section id="impacto" className="py-32 px-6 bg-ohawell-ink text-ohawell-base">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80" 
              alt="Impacto Social" 
              className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 cursor-pointer hover:bg-white/20 transition-colors">
                <Play className="w-8 h-8 text-white ml-2" />
              </div>
            </div>
          </div>
          <div className="space-y-10">
            <span className="text-xs font-bold tracking-widest uppercase opacity-50 flex items-center gap-3">
              <Heart className="w-4 h-4" /> Alianza con Fundación Talita Cumi
            </span>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight">
              Un porcentaje de cada compra apoya programas para mujeres sobrevivientes de violencia.
            </h2>
            <p className="text-xl font-light opacity-80 leading-relaxed">
              Creemos en el poder transformador del cacao, no solo para quien lo consume, sino para quienes lo cultivan y las comunidades que lo rodean.
            </p>
            <div className="pt-8">
              <Link 
                to="/impact" 
                className="inline-flex items-center gap-4 border border-white/30 px-10 py-5 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-white/10 transition-colors"
              >
                Conocer Nuestro Impacto <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
};
