import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Star, ShieldCheck, Leaf, Sparkles, ChevronDown, ChevronUp, ArrowRight, Play } from 'lucide-react';

export const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const { currency } = useLanguage();
  const { user } = useAuth();
  
  const product = products.find(p => p.id === productId);
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscription'>('one-time');
  const [activeAccordion, setActiveAccordion] = useState<string | null>('benefits');

  if (!product) return <div className="min-h-screen flex items-center justify-center font-serif text-3xl">Producto no encontrado</div>;

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const relatedProducts = products.filter(p => p.mood === product.mood && p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-ohawell-base pt-24 pb-32">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* BREADCRUMBS */}
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase opacity-50 mb-12">
          <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:opacity-100 transition-opacity">Shop</Link>
          <span>/</span>
          <Link to={`/moods/${product.mood.toLowerCase()}`} className="hover:opacity-100 transition-opacity">{product.mood}</Link>
          <span>/</span>
          <span className="opacity-100">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          {/* GALERÍA */}
          <div className="space-y-6 lg:sticky lg:top-32 h-fit">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-black/5 relative group"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-3">
                <span className="bg-white/90 backdrop-blur-sm text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full shadow-sm w-fit">
                  Universo {product.mood}
                </span>
                <span className="bg-white/90 backdrop-blur-sm text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full shadow-sm w-fit flex items-center gap-2">
                  <Leaf className="w-3 h-3" /> 100% Plant Based
                </span>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => {
                const detailImages = [
                  'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1511381939415-e440c0521a6b?auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?auto=format&fit=crop&q=80'
                ];
                return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="aspect-square rounded-2xl overflow-hidden bg-black/5 cursor-pointer hover:opacity-70 transition-opacity relative group"
                >
                  <img 
                    src={detailImages[i-1]} 
                    alt={`${product.name} detail ${i}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {i === 2 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  )}
                </motion.div>
              )})}
            </div>
          </div>

          {/* INFO & COMPRA */}
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-ohawell-ink">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-sm font-medium tracking-widest uppercase opacity-50 underline cursor-pointer hover:opacity-100 transition-opacity">128 reseñas</span>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">{product.name}</h1>
              <p className="text-xl font-light opacity-80 leading-relaxed mb-8">{product.description}</p>
              <p className="text-3xl font-medium">{product.price} {currency}</p>
            </motion.div>

            {!user && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-ohawell-ink text-ohawell-base p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
                <div className="relative z-10 flex items-center gap-4">
                  <Sparkles className="w-6 h-6 opacity-80 shrink-0" />
                  <span className="text-sm font-medium leading-relaxed">Únete al Ritual Pass para acumular puntos, desbloquear cupones y acceder a drops exclusivos.</span>
                </div>
                <button className="relative z-10 shrink-0 text-xs font-bold tracking-widest uppercase border border-white/30 px-6 py-3 rounded-full hover:bg-white/10 transition-colors whitespace-nowrap">
                  Iniciar Sesión
                </button>
              </motion.div>
            )}

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <button 
                onClick={() => setPurchaseType('one-time')}
                className={`w-full p-6 rounded-2xl border-2 flex justify-between items-center transition-all ${
                  purchaseType === 'one-time' ? 'border-ohawell-ink bg-black/5' : 'border-black/10 hover:border-black/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    purchaseType === 'one-time' ? 'border-ohawell-ink' : 'border-black/30'
                  }`}>
                    {purchaseType === 'one-time' && <motion.div layoutId="radio" className="w-3 h-3 bg-ohawell-ink rounded-full" />}
                  </div>
                  <span className="font-serif text-xl">Compra única</span>
                </div>
                <span className="font-medium text-lg">{product.price} {currency}</span>
              </button>

              <button 
                onClick={() => setPurchaseType('subscription')}
                className={`w-full p-6 rounded-2xl border-2 flex justify-between items-center transition-all ${
                  purchaseType === 'subscription' ? 'border-ohawell-ink bg-black/5' : 'border-black/10 hover:border-black/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    purchaseType === 'subscription' ? 'border-ohawell-ink' : 'border-black/30'
                  }`}>
                    {purchaseType === 'subscription' && <motion.div layoutId="radio" className="w-3 h-3 bg-ohawell-ink rounded-full" />}
                  </div>
                  <div className="text-left">
                    <span className="font-serif text-xl block mb-1">Suscripción OHAWELL</span>
                    <span className="text-sm font-bold tracking-widest uppercase opacity-60 text-ohawell-ink">Ahorra 15% + Envío Gratis</span>
                  </div>
                </div>
                <span className="font-medium text-lg">{(product.price * 0.85).toFixed(2)} {currency}</span>
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4 pt-4"
            >
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-ohawell-ink text-ohawell-base py-6 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-black/80 transition-transform hover:scale-[1.02] shadow-xl"
              >
                Añadir al carrito — {purchaseType === 'subscription' ? (product.price * 0.85).toFixed(2) : product.price} {currency}
              </button>
              <p className="text-center text-xs font-bold tracking-widest uppercase opacity-50 pt-4 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Pago seguro vía Stripe / PayPal
              </p>
            </motion.div>

            {/* ACCORDIONS */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-12 space-y-4 border-t border-black/10"
            >
              {[
                {
                  id: 'benefits',
                  title: 'Qué vas a sentir',
                  content: (
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4 text-base opacity-80 leading-relaxed"><ShieldCheck className="w-5 h-5 opacity-50 shrink-0 mt-1" /> Sensación de {product.mood === 'Awaken' ? 'claridad mental y energía sostenida sin picos.' : product.mood === 'Calm' ? 'paz profunda y relajación muscular.' : 'calidez, apertura y conexión sensorial.'}</li>
                      <li className="flex items-start gap-4 text-base opacity-80 leading-relaxed"><ShieldCheck className="w-5 h-5 opacity-50 shrink-0 mt-1" /> Ideal para {product.mood === 'Awaken' ? 'empezar la mañana o antes de un trabajo profundo.' : product.mood === 'Calm' ? 'transicionar del trabajo al descanso en la noche.' : 'momentos especiales, citas o introspección.'}</li>
                    </ul>
                  )
                },
                {
                  id: 'ritual',
                  title: 'El Ritual (60s)',
                  content: (
                    <div className="bg-black/5 p-8 rounded-2xl space-y-6">
                      <p className="text-base opacity-80 flex gap-4"><span className="font-serif text-xl opacity-50">01</span> Rompe 1–2 cuadritos con intención.</p>
                      <p className="text-base opacity-80 flex gap-4"><span className="font-serif text-xl opacity-50">02</span> Cierra los ojos y respira profundo 3 veces.</p>
                      <p className="text-base opacity-80 flex gap-4"><span className="font-serif text-xl opacity-50">03</span> Deja que se derrita lentamente en tu boca.</p>
                      <p className="text-base opacity-80 flex gap-4"><span className="font-serif text-xl opacity-50">04</span> Observa cómo cambia tu estado en los próximos minutos.</p>
                    </div>
                  )
                },
                {
                  id: 'ingredients',
                  title: 'Ingredientes & Origen',
                  content: (
                    <div className="space-y-6">
                      <p className="text-base opacity-80 leading-relaxed">
                        <strong>Fórmula limpia:</strong> Cacao fino de aroma (Latitud 0°), manteca de cacao, azúcar de coco, {product.mood === 'Awaken' ? 'maca, guaraná' : product.mood === 'Calm' ? 'lavanda, ashwagandha' : 'chile, rosa'}.
                      </p>
                      <p className="text-base opacity-80 leading-relaxed">
                        <strong>Origen:</strong> Cultivado en fincas seleccionadas en Ecuador bajo prácticas regenerativas. Pagamos un precio justo directo al agricultor.
                      </p>
                      <div className="flex flex-wrap gap-3 pt-4">
                        <span className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase border border-black/20 px-4 py-2 rounded-full"><Leaf className="w-4 h-4" /> Vegano</span>
                        <span className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase border border-black/20 px-4 py-2 rounded-full"><ShieldCheck className="w-4 h-4" /> Sin lácteos</span>
                        <span className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase border border-black/20 px-4 py-2 rounded-full"><Sparkles className="w-4 h-4" /> Sin refinados</span>
                      </div>
                    </div>
                  )
                }
              ].map((section) => (
                <div key={section.id} className="border-b border-black/10 last:border-0">
                  <button 
                    onClick={() => toggleAccordion(section.id)}
                    className="w-full py-6 flex justify-between items-center hover:opacity-70 transition-opacity"
                  >
                    <span className="font-serif text-2xl">{section.title}</span>
                    {activeAccordion === section.id ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </button>
                  <AnimatePresence>
                    {activeAccordion === section.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8">
                          {section.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="mt-32 pt-24 border-t border-black/10 px-6 max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4">Completa tu ritual</span>
              <h2 className="font-serif text-4xl md:text-5xl">También te podría gustar</h2>
            </div>
            <Link to={`/moods/${product.mood.toLowerCase()}`} className="text-sm font-bold tracking-widest uppercase border-b border-black pb-1 hover:opacity-70 transition-opacity flex items-center gap-2">
              Ver Universo {product.mood} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct, i) => (
              <motion.div 
                key={relatedProduct.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer flex flex-col"
              >
                <Link to={`/product/${relatedProduct.id}`} className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6 bg-black/5 block">
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(relatedProduct);
                      }}
                      className="bg-white text-black px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase transform translate-y-8 group-hover:translate-y-0 transition-all duration-500"
                    >
                      Añadir al carrito
                    </button>
                  </div>
                </Link>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-2xl mb-1 group-hover:opacity-70 transition-opacity">{relatedProduct.name}</h3>
                    <p className="text-xs opacity-60 font-medium tracking-widest uppercase">{relatedProduct.format}</p>
                  </div>
                  <span className="font-medium text-lg">{relatedProduct.price} {currency}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
