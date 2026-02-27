import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Upload, MessageCircle, CreditCard, Building2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, total } = useCart();
  const { user } = useAuth();
  const { currency, t } = useLanguage();
  const [showTransferModal, setShowTransferModal] = useState(false);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-ohawell-base h-full shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-black/5">
              <h2 className="font-serif text-2xl">{t('Tu Ritual')}</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {!user && (
              <div className="bg-ohawell-ink text-ohawell-base p-4 text-sm text-center">
                {t('Log in para aplicar recompensas + acceder a scratch coupons.')}
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-black/50 space-y-4">
                  <ShoppingBag className="w-12 h-12 opacity-20" />
                  <p className="font-serif text-xl">{t('Tu carrito está vacío')}</p>
                  <button onClick={() => setIsCartOpen(false)} className="underline text-sm tracking-widest uppercase hover:text-black">
                    {t('Explorar Universos')}
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{t(item.name)}</h3>
                      <p className="text-xs text-black/50 mb-2">{t(item.format)}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-black/10 rounded-full px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-black/5 rounded-full">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-black/5 rounded-full">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-medium text-sm">{item.price * item.quantity} {currency}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-black/5 bg-white/50 space-y-4">
                <div className="flex justify-between items-center font-serif text-xl mb-4">
                  <span>{t('Total')}</span>
                  <span>{total} {currency}</span>
                </div>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => setShowTransferModal(true)}
                    className="w-full bg-white border border-black/20 text-ohawell-ink py-4 rounded-full text-sm font-medium tracking-widest uppercase hover:bg-black/5 transition-colors flex items-center justify-center gap-2"
                  >
                    <Building2 className="w-4 h-4" />
                    {t('Pago con transferencia a cuenta bancaria')}
                  </button>
                  
                  <button className="w-full bg-ohawell-ink text-ohawell-base py-4 rounded-full text-sm font-medium tracking-widest uppercase hover:bg-black/80 transition-colors flex items-center justify-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    {t('Pago con tarjeta de crédito o débito')}
                  </button>
                  <p className="text-center text-xs opacity-60 mt-2">
                    {t('Aceptamos todas las tarjetas con PayPal')}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowTransferModal(false)}
            className="absolute inset-0 bg-ohawell-ink/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-ohawell-base rounded-[2rem] p-8 shadow-2xl text-center"
          >
            <button 
              onClick={() => setShowTransferModal(false)}
              className="absolute top-4 right-4 p-2 bg-black/5 rounded-full hover:bg-black/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="font-serif text-3xl mb-2">{t('Transferencia Bancaria')}</h3>
            <p className="opacity-70 text-sm mb-6">
              {t('Realiza tu transferencia a la siguiente cuenta y envíanos el comprobante.')}
            </p>

            <div className="bg-black/5 rounded-xl p-4 mb-6 text-left space-y-2 text-sm">
              <div className="flex justify-between"><span className="opacity-60">{t('Banco')}:</span> <span className="font-medium">Banco Ficticio S.A.</span></div>
              <div className="flex justify-between"><span className="opacity-60">{t('Tipo')}:</span> <span className="font-medium">Cuenta Corriente</span></div>
              <div className="flex justify-between"><span className="opacity-60">{t('Número')}:</span> <span className="font-medium">1234567890</span></div>
              <div className="flex justify-between"><span className="opacity-60">{t('Titular')}:</span> <span className="font-medium">OHAWEL LLC</span></div>
              <div className="flex justify-between pt-2 border-t border-black/10"><span className="opacity-60">{t('Monto a pagar')}:</span> <span className="font-bold text-lg">{total} {currency}</span></div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => window.open('https://wa.me/1234567890?text=Hola,%20adjunto%20el%20comprobante%20de%20mi%20pago.', '_blank')}
                className="w-full bg-[#25D366] text-white py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                {t('Enviar voucher por WhatsApp')}
              </button>
              
              <button className="w-full bg-ohawell-ink text-ohawell-base py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-black/80 transition-colors flex items-center justify-center gap-2 relative overflow-hidden group">
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*,.pdf" />
                <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                {t('Cargar voucher aquí')}
              </button>
              <p className="text-xs opacity-50 mt-2">
                {t('El super admin verificará tu pago para dar el OK y enviar tu pedido.')}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
