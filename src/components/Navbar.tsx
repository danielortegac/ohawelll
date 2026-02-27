import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Sparkles, Sun, Moon, Flame, Calendar, ChevronDown, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginModal } from './LoginModal';
import { CartDrawer } from './CartDrawer';
import { ScratchVaultModal } from './ScratchVaultModal';
import { AwakenTimerModal } from './AwakenTimerModal';
import { CalmBreathingModal } from './CalmBreathingModal';
import { DesireConnectionCardsModal } from './DesireConnectionCardsModal';

export const Navbar = () => {
  const { user } = useAuth();
  const { items, setIsCartOpen } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Dropdown state
  const [activeDropdown, setActiveDropdown] = useState<'shop' | 'universos' | 'filosofia' | 'comunidad' | null>(null);

  // Modals state
  const [isScratchOpen, setIsScratchOpen] = useState(false);
  const [isAwakenOpen, setIsAwakenOpen] = useState(false);
  const [isCalmOpen, setIsCalmOpen] = useState(false);
  const [isDesireOpen, setIsDesireOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (path: string, hash?: string) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    if (hash) {
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(hash);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-ohawell-base/90 backdrop-blur-md border-b border-black/5 flex flex-col" onMouseLeave={() => setActiveDropdown(null)}>
        {/* TOP ROW: Main Navigation */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-3 items-center h-16">
            {/* Left: Mobile menu button & Desktop Nav */}
            <div className="flex items-center justify-start">
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-ohawell-ink lg:hidden">
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="hidden lg:flex space-x-6 items-center">
                {/* SHOP DROPDOWN */}
                <div className="relative h-16 flex items-center" onMouseEnter={() => setActiveDropdown('shop')}>
                  <button className="text-xs tracking-widest uppercase hover:opacity-70 transition-opacity flex items-center gap-1">
                    {t('nav.shop')} <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'shop' ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* UNIVERSOS DROPDOWN */}
                <div className="relative h-16 flex items-center" onMouseEnter={() => setActiveDropdown('universos')}>
                  <button className="text-xs tracking-widest uppercase hover:opacity-70 transition-opacity flex items-center gap-1">
                    {t('nav.moods')} <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'universos' ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* FILOSOFIA DROPDOWN */}
                <div className="relative h-16 flex items-center" onMouseEnter={() => setActiveDropdown('filosofia')}>
                  <button className="text-xs tracking-widest uppercase hover:opacity-70 transition-opacity flex items-center gap-1">
                    Filosofía <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'filosofia' ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* COMUNIDAD DROPDOWN */}
                <div className="relative h-16 flex items-center" onMouseEnter={() => setActiveDropdown('comunidad')}>
                  <button className="text-xs tracking-widest uppercase hover:opacity-70 transition-opacity flex items-center gap-1">
                    Comunidad <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'comunidad' ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Center: Logo */}
            <div className="flex justify-center items-center">
              <Link to="/" className="font-serif text-2xl md:text-3xl tracking-widest font-light whitespace-nowrap">
                OHAWELL
              </Link>
            </div>

            {/* Right: Icons */}
            <div className="flex items-center justify-end space-x-2 md:space-x-4">
              <button 
                onClick={() => user ? window.location.href='/account' : setIsLoginModalOpen(true)}
                className="p-2 text-ohawell-ink hover:opacity-70 transition-opacity flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                {user && <span className="hidden xl:inline text-xs font-medium bg-black text-white px-2 py-1 rounded-full">{user.points} pts</span>}
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-ohawell-ink hover:opacity-70 transition-opacity relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MEGA MENU DROPDOWNS (Desktop) */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 w-full bg-ohawell-base border-b border-black/10 shadow-2xl z-50 hidden lg:block"
            >
              <div className="max-w-[1400px] mx-auto px-8 py-12">
                {activeDropdown === 'shop' && (
                  <div className="grid grid-cols-4 gap-12">
                    <div>
                      <h4 className="font-serif text-2xl mb-6">Categorías</h4>
                      <ul className="space-y-4">
                        <li><button onClick={() => handleNavClick('/shop')} className="text-sm hover:opacity-60 transition-opacity">Ver Todo</button></li>
                        <li><button onClick={() => handleNavClick('/shop')} className="text-sm hover:opacity-60 transition-opacity">Barras Funcionales</button></li>
                        <li><button onClick={() => handleNavClick('/shop')} className="text-sm hover:opacity-60 transition-opacity">Monedas para Derretir</button></li>
                        <li><button onClick={() => handleNavClick('/shop')} className="text-sm hover:opacity-60 transition-opacity">Infusiones de Cascarilla</button></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-serif text-2xl mb-6">Colecciones</h4>
                      <ul className="space-y-4">
                        <li><button onClick={() => handleNavClick('/moods/awaken')} className="text-sm hover:opacity-60 transition-opacity">Colección Awaken</button></li>
                        <li><button onClick={() => handleNavClick('/moods/calm')} className="text-sm hover:opacity-60 transition-opacity">Colección Calm</button></li>
                        <li><button onClick={() => handleNavClick('/moods/desire')} className="text-sm hover:opacity-60 transition-opacity">Colección Desire</button></li>
                        <li><button onClick={() => handleNavClick('/', 'corporativo')} className="text-sm hover:opacity-60 transition-opacity">Regalos Corporativos</button></li>
                      </ul>
                    </div>
                    <div className="col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer" onClick={() => handleNavClick('/shop')}>
                      <img src="https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80" alt="Shop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white font-serif text-3xl flex items-center gap-2">Ir a la Tienda <ArrowRight className="w-6 h-6" /></span>
                      </div>
                    </div>
                  </div>
                )}

                {activeDropdown === 'universos' && (
                  <div className="grid grid-cols-3 gap-8">
                    <div className="bg-ohawell-awaken/20 p-8 rounded-2xl cursor-pointer hover:bg-ohawell-awaken/40 transition-colors" onClick={() => handleNavClick('/moods/awaken')}>
                      <Sun className="w-8 h-8 mb-4" />
                      <h4 className="font-serif text-3xl mb-2">Awaken</h4>
                      <p className="text-sm opacity-70 mb-6">Energía lúcida y foco profundo. Cacao 70% con Maca y Guaraná.</p>
                      <span className="text-xs font-bold tracking-widest uppercase border-b border-black pb-1">Explorar</span>
                    </div>
                    <div className="bg-ohawell-calm/20 p-8 rounded-2xl cursor-pointer hover:bg-ohawell-calm/40 transition-colors" onClick={() => handleNavClick('/moods/calm')}>
                      <Moon className="w-8 h-8 mb-4" />
                      <h4 className="font-serif text-3xl mb-2">Calm</h4>
                      <p className="text-sm opacity-70 mb-6">Pausa y relajación. Cacao 60% con Lavanda y Ashwagandha.</p>
                      <span className="text-xs font-bold tracking-widest uppercase border-b border-black pb-1">Explorar</span>
                    </div>
                    <div className="bg-ohawell-desire/20 p-8 rounded-2xl cursor-pointer hover:bg-ohawell-desire/40 transition-colors" onClick={() => handleNavClick('/moods/desire')}>
                      <Flame className="w-8 h-8 mb-4" />
                      <h4 className="font-serif text-3xl mb-2">Desire</h4>
                      <p className="text-sm opacity-70 mb-6">Conexión y sensorialidad. Cacao 80% con Pimienta y Rosa.</p>
                      <span className="text-xs font-bold tracking-widest uppercase border-b border-black pb-1">Explorar</span>
                    </div>
                  </div>
                )}

                {activeDropdown === 'filosofia' && (
                  <div className="grid grid-cols-4 gap-12">
                    <div>
                      <h4 className="font-serif text-2xl mb-6">Nuestra Esencia</h4>
                      <ul className="space-y-4">
                        <li><button onClick={() => handleNavClick('/', 'manifesto')} className="text-sm hover:opacity-60 transition-opacity">El Manifiesto</button></li>
                        <li><button onClick={() => handleNavClick('/', 'herencia')} className="text-sm hover:opacity-60 transition-opacity">Sabiduría Ancestral</button></li>
                        <li><button onClick={() => handleNavClick('/', 'terroir')} className="text-sm hover:opacity-60 transition-opacity">Origen y Terroir</button></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-serif text-2xl mb-6">Creación</h4>
                      <ul className="space-y-4">
                        <li><button onClick={() => handleNavClick('/', 'proceso')} className="text-sm hover:opacity-60 transition-opacity">Proceso Artesanal</button></li>
                        <li><button onClick={() => handleNavClick('/', 'ciencia')} className="text-sm hover:opacity-60 transition-opacity">La Ciencia (Ingredientes)</button></li>
                        <li><button onClick={() => handleNavClick('/', 'funcional')} className="text-sm hover:opacity-60 transition-opacity">¿Por qué es funcional?</button></li>
                        <li><button onClick={() => handleNavClick('/', 'maridaje')} className="text-sm hover:opacity-60 transition-opacity">Guía de Maridaje</button></li>
                      </ul>
                    </div>
                    <div className="col-span-2 relative rounded-2xl overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80" alt="Process" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                        <p className="text-white font-serif text-2xl max-w-md">"No queríamos hacer otro dulce; queríamos crear una herramienta de bienestar."</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeDropdown === 'comunidad' && (
                  <div className="grid grid-cols-4 gap-12">
                    <div>
                      <h4 className="font-serif text-2xl mb-6">Explorar</h4>
                      <ul className="space-y-4">
                        <li><button onClick={() => handleNavClick('/blog')} className="text-sm hover:opacity-60 transition-opacity">Journal (Blog)</button></li>
                        <li><button onClick={() => handleNavClick('/', 'testimonios')} className="text-sm hover:opacity-60 transition-opacity">Testimonios</button></li>
                        <li><button onClick={() => handleNavClick('/', 'comunidad')} className="text-sm hover:opacity-60 transition-opacity">La Tribu (Social)</button></li>
                        <li><button onClick={() => handleNavClick('/', 'impacto')} className="text-sm hover:opacity-60 transition-opacity">Impacto Social</button></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-serif text-2xl mb-6">Rituales</h4>
                      <ul className="space-y-4">
                        <li><button onClick={() => handleNavClick('/ritual-builder')} className="text-sm hover:opacity-60 transition-opacity">Creador de Rituales</button></li>
                        <li><button onClick={() => { setActiveDropdown(null); setIsAwakenOpen(true); }} className="text-sm hover:opacity-60 transition-opacity flex items-center gap-2"><Sun className="w-4 h-4"/> Focus Sprint</button></li>
                        <li><button onClick={() => { setActiveDropdown(null); setIsCalmOpen(true); }} className="text-sm hover:opacity-60 transition-opacity flex items-center gap-2"><Moon className="w-4 h-4"/> Respiración</button></li>
                        <li><button onClick={() => { setActiveDropdown(null); setIsDesireOpen(true); }} className="text-sm hover:opacity-60 transition-opacity flex items-center gap-2"><Flame className="w-4 h-4"/> Connection Cards</button></li>
                      </ul>
                    </div>
                    <div className="col-span-2 relative rounded-2xl overflow-hidden cursor-pointer group" onClick={() => handleNavClick('/blog')}>
                      <img src="https://images.unsplash.com/photo-1542843137-87f18834166a?auto=format&fit=crop&q=80" alt="Journal" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white font-serif text-3xl flex items-center gap-2">Leer el Journal <ArrowRight className="w-6 h-6" /></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOTTOM ROW: Quick Actions / Popups */}
        <div className="border-t border-black/5 bg-black/5 hidden md:block backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-12 space-x-12">
              <button 
                onClick={() => {
                  if (user) {
                    window.location.href = '/account?tab=planner';
                  } else {
                    setIsLoginModalOpen(true);
                  }
                }}
                className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-ohawell-ink hover:text-ohawell-ink/70 transition-colors"
              >
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" /> {t('nav.challenge')}
              </button>
              <button onClick={() => setIsAwakenOpen(true)} className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-ohawell-ink hover:text-ohawell-ink/70 transition-colors">
                <Sun className="w-4 h-4 group-hover:scale-110 transition-transform" /> Focus Sprint
              </button>
              <button onClick={() => setIsCalmOpen(true)} className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-ohawell-ink hover:text-ohawell-ink/70 transition-colors">
                <Moon className="w-4 h-4 group-hover:scale-110 transition-transform" /> Respiración
              </button>
              <button onClick={() => setIsDesireOpen(true)} className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-ohawell-ink hover:text-ohawell-ink/70 transition-colors">
                <Flame className="w-4 h-4 group-hover:scale-110 transition-transform" /> Connection Cards
              </button>
              <button onClick={() => setIsScratchOpen(true)} className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-ohawell-ink hover:text-ohawell-ink/70 transition-colors relative">
                <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform text-yellow-600" /> 
                <span className="relative">
                  Scratch Vault
                  <span className="absolute -top-3 -right-6 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full animate-pulse">FREE</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 bg-ohawell-base flex flex-col pt-20 px-6 overflow-y-auto pb-20"
          >
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 p-2">
              <X className="w-8 h-8" />
            </button>
            
            <div className="flex flex-col space-y-6 mt-10">
              {/* Mobile Shop */}
              <div>
                <button onClick={() => setActiveDropdown(activeDropdown === 'shop' ? null : 'shop')} className="flex items-center justify-between w-full text-2xl font-serif">
                  {t('nav.shop')} <ChevronDown className={`w-6 h-6 transition-transform ${activeDropdown === 'shop' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'shop' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-4 mt-4 space-y-4">
                      <button onClick={() => handleNavClick('/shop')} className="block text-lg opacity-70">Ver Todo</button>
                      <button onClick={() => handleNavClick('/moods/awaken')} className="block text-lg opacity-70">Colección Awaken</button>
                      <button onClick={() => handleNavClick('/moods/calm')} className="block text-lg opacity-70">Colección Calm</button>
                      <button onClick={() => handleNavClick('/moods/desire')} className="block text-lg opacity-70">Colección Desire</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Universos */}
              <div>
                <button onClick={() => setActiveDropdown(activeDropdown === 'universos' ? null : 'universos')} className="flex items-center justify-between w-full text-2xl font-serif">
                  {t('nav.moods')} <ChevronDown className={`w-6 h-6 transition-transform ${activeDropdown === 'universos' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'universos' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-4 mt-4 space-y-4">
                      <button onClick={() => handleNavClick('/moods/awaken')} className="block text-lg opacity-70">Awaken (Energía)</button>
                      <button onClick={() => handleNavClick('/moods/calm')} className="block text-lg opacity-70">Calm (Pausa)</button>
                      <button onClick={() => handleNavClick('/moods/desire')} className="block text-lg opacity-70">Desire (Conexión)</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Filosofia */}
              <div>
                <button onClick={() => setActiveDropdown(activeDropdown === 'filosofia' ? null : 'filosofia')} className="flex items-center justify-between w-full text-2xl font-serif">
                  Filosofía <ChevronDown className={`w-6 h-6 transition-transform ${activeDropdown === 'filosofia' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'filosofia' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-4 mt-4 space-y-4">
                      <button onClick={() => handleNavClick('/', 'manifesto')} className="block text-lg opacity-70">El Manifiesto</button>
                      <button onClick={() => handleNavClick('/', 'proceso')} className="block text-lg opacity-70">Proceso Artesanal</button>
                      <button onClick={() => handleNavClick('/', 'ciencia')} className="block text-lg opacity-70">La Ciencia</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Comunidad */}
              <div>
                <button onClick={() => setActiveDropdown(activeDropdown === 'comunidad' ? null : 'comunidad')} className="flex items-center justify-between w-full text-2xl font-serif">
                  Comunidad <ChevronDown className={`w-6 h-6 transition-transform ${activeDropdown === 'comunidad' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'comunidad' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-4 mt-4 space-y-4">
                      <button onClick={() => handleNavClick('/blog')} className="block text-lg opacity-70">Journal</button>
                      <button onClick={() => handleNavClick('/', 'testimonios')} className="block text-lg opacity-70">Testimonios</button>
                      <button onClick={() => handleNavClick('/', 'impacto')} className="block text-lg opacity-70">Impacto Social</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/ritual-builder" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif">{t('nav.ritual')}</Link>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (user) {
                    window.location.href = '/account?tab=planner';
                  } else {
                    setIsLoginModalOpen(true);
                  }
                }}
                className="text-ohawell-ink flex items-center gap-2 font-bold text-2xl font-serif"
              >
                <Calendar className="w-6 h-6" /> {t('nav.challenge')}
              </button>
              <Link to="/socio-estrategico" onClick={() => setIsMobileMenuOpen(false)} className="text-yellow-600 flex items-center gap-2 text-2xl font-serif">
                <Sparkles className="w-6 h-6" /> Socio Estratégico
              </Link>
            </div>

            <div className="mt-12 pt-12 border-t border-black/10 flex flex-col space-y-6">
              <span className="text-xs font-bold tracking-widest uppercase opacity-50">Rituales Rápidos</span>
              <button onClick={() => { setIsMobileMenuOpen(false); setIsAwakenOpen(true); }} className="flex items-center gap-4 text-lg font-serif">
                <Sun className="w-5 h-5" /> Focus Sprint
              </button>
              <button onClick={() => { setIsMobileMenuOpen(false); setIsCalmOpen(true); }} className="flex items-center gap-4 text-lg font-serif">
                <Moon className="w-5 h-5" /> Respiración
              </button>
              <button onClick={() => { setIsMobileMenuOpen(false); setIsDesireOpen(true); }} className="flex items-center gap-4 text-lg font-serif">
                <Flame className="w-5 h-5" /> Connection Cards
              </button>
              <button onClick={() => { setIsMobileMenuOpen(false); setIsScratchOpen(true); }} className="flex items-center gap-4 text-lg font-serif">
                <Sparkles className="w-5 h-5" /> Scratch Vault
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <CartDrawer />
      <ScratchVaultModal isOpen={isScratchOpen} onClose={() => setIsScratchOpen(false)} />
      <AwakenTimerModal isOpen={isAwakenOpen} onClose={() => setIsAwakenOpen(false)} />
      <CalmBreathingModal isOpen={isCalmOpen} onClose={() => setIsCalmOpen(false)} />
      <DesireConnectionCardsModal isOpen={isDesireOpen} onClose={() => setIsDesireOpen(false)} />
    </>
  );
};

