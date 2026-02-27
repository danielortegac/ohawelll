import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Filter, Search, Sparkles, X, ChevronDown } from 'lucide-react';

export const Shop = () => {
  const { addToCart } = useCart();
  const { currency } = useLanguage();
  const { user } = useAuth();
  
  const [filterMood, setFilterMood] = useState<string | null>(null);
  const [filterFormat, setFilterFormat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = products.filter(p => {
    if (filterMood && p.mood !== filterMood) return false;
    if (filterFormat && p.format !== filterFormat) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const moods = Array.from(new Set(products.map(p => p.mood)));
  const formats = Array.from(new Set(products.map(p => p.format)));

  return (
    <div className="min-h-screen bg-ohawell-base pt-24">
      {/* SHOP HEADER */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80" 
          alt="Shop Ohawell" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ohawell-base via-transparent to-transparent" />
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-6xl md:text-8xl mb-6"
          >
            La Colección
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-light opacity-80 max-w-2xl mx-auto"
          >
            Explora nuestros chocolates funcionales diseñados para acompañar y elevar tus estados de ánimo.
          </motion.p>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-6 pb-32 flex flex-col lg:flex-row gap-12">
        {/* SIDEBAR FILTERS (Desktop) */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-12 sticky top-32 h-fit">
          <div>
            <div className="relative mb-12">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50" />
              <input 
                type="text" 
                placeholder="Buscar..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-black/20 py-4 pl-12 pr-4 focus:outline-none focus:border-black transition-colors font-light"
              />
            </div>

            <h3 className="text-xs font-bold tracking-widest uppercase opacity-50 mb-6">Filtrar por Universo</h3>
            <div className="space-y-3">
              <button 
                onClick={() => setFilterMood(null)}
                className={`block w-full text-left text-lg font-serif transition-opacity ${filterMood === null ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
              >
                Todos los universos
              </button>
              {moods.map(mood => (
                <button 
                  key={mood}
                  onClick={() => setFilterMood(mood)}
                  className={`block w-full text-left text-lg font-serif transition-opacity ${filterMood === mood ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase opacity-50 mb-6">Formato</h3>
            <div className="space-y-3">
              <button 
                onClick={() => setFilterFormat(null)}
                className={`block w-full text-left text-sm transition-opacity ${filterFormat === null ? 'opacity-100 font-medium' : 'opacity-50 hover:opacity-80'}`}
              >
                Todos los formatos
              </button>
              {formats.map(format => (
                <button 
                  key={format}
                  onClick={() => setFilterFormat(format)}
                  className={`block w-full text-left text-sm transition-opacity ${filterFormat === format ? 'opacity-100 font-medium' : 'opacity-50 hover:opacity-80'}`}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* MOBILE FILTER TOGGLE */}
        <div className="lg:hidden flex justify-between items-center border-b border-black/10 pb-4">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase"
          >
            <Filter className="w-4 h-4" /> Filtros
          </button>
          <span className="text-sm opacity-50">{filteredProducts.length} productos</span>
        </div>

        {/* MOBILE FILTERS MENU */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-black/5 rounded-2xl p-6 space-y-8"
            >
              <div>
                <h3 className="text-xs font-bold tracking-widest uppercase opacity-50 mb-4">Universo</h3>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setFilterMood(null)}
                    className={`px-4 py-2 rounded-full text-sm border ${filterMood === null ? 'bg-ohawell-ink text-white border-ohawell-ink' : 'border-black/20'}`}
                  >
                    Todos
                  </button>
                  {moods.map(mood => (
                    <button 
                      key={mood}
                      onClick={() => setFilterMood(mood)}
                      className={`px-4 py-2 rounded-full text-sm border ${filterMood === mood ? 'bg-ohawell-ink text-white border-ohawell-ink' : 'border-black/20'}`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-widest uppercase opacity-50 mb-4">Formato</h3>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setFilterFormat(null)}
                    className={`px-4 py-2 rounded-full text-sm border ${filterFormat === null ? 'bg-ohawell-ink text-white border-ohawell-ink' : 'border-black/20'}`}
                  >
                    Todos
                  </button>
                  {formats.map(format => (
                    <button 
                      key={format}
                      onClick={() => setFilterFormat(format)}
                      className={`px-4 py-2 rounded-full text-sm border ${filterFormat === format ? 'bg-ohawell-ink text-white border-ohawell-ink' : 'border-black/20'}`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PRODUCT GRID */}
        <div className="flex-1">
          {!user && (
            <div className="bg-ohawell-ink text-ohawell-base p-8 rounded-3xl mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
              <div className="relative z-10 flex items-center gap-4">
                <Sparkles className="w-8 h-8 opacity-80" />
                <div>
                  <h3 className="font-serif text-2xl mb-1">Únete al Ritual Pass</h3>
                  <p className="opacity-80 text-sm">Inicia sesión para acumular puntos y desbloquear cupones en tu compra.</p>
                </div>
              </div>
              <button className="relative z-10 shrink-0 bg-ohawell-base text-ohawell-ink px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white/90 transition-colors">
                Iniciar Sesión
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProducts.map((product, i) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer flex flex-col"
              >
                <Link to={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6 bg-black/5 block">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
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
                      <h3 className="font-serif text-2xl mb-1 group-hover:opacity-70 transition-opacity">{product.name}</h3>
                      <p className="text-xs opacity-60 font-medium tracking-widest uppercase">{product.format}</p>
                    </div>
                    <span className="font-medium text-lg">{product.price} {currency}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-32 opacity-50">
              <p className="text-xl font-light">No se encontraron productos con esos filtros.</p>
              <button 
                onClick={() => { setFilterMood(null); setFilterFormat(null); setSearchQuery(''); }}
                className="mt-6 text-sm font-bold tracking-widest uppercase border-b border-current pb-1"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
