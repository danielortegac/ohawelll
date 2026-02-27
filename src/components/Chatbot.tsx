import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ShoppingBag, Info, Users, ArrowRight, Send, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string | React.ReactNode;
  options?: { label: string; action: () => void }[];
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      showMainMenu();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (msg: Message) => {
    setMessages(prev => [...prev, msg]);
  };

  const showMainMenu = () => {
    addMessage({
      id: Date.now().toString(),
      sender: 'bot',
      text: '¡Hola! Soy tu guía OHAWELL. ¿En qué puedo ayudarte hoy para mejorar tu bienestar?',
      options: [
        { label: 'Ver Productos', action: showProducts },
        { label: '¿Qué es OHAWELL?', action: showAbout },
        { label: 'Programa de Socios', action: showPartnership },
        { label: 'Soporte Humano', action: showSupport },
      ]
    });
  };

  const handleUserChoice = (label: string, action: () => void) => {
    // Remove options from previous message
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages.length > 0) {
        newMessages[newMessages.length - 1].options = undefined;
      }
      return newMessages;
    });

    addMessage({
      id: Date.now().toString(),
      sender: 'user',
      text: label,
    });

    setTimeout(() => {
      action();
    }, 500);
  };

  const showProducts = () => {
    addMessage({
      id: Date.now().toString(),
      sender: 'bot',
      text: 'Nuestros chocolates funcionales están diseñados para 3 estados específicos. ¿Cuál te interesa?',
      options: [
        { label: 'Awaken (Energía)', action: () => showProductDetails('awaken') },
        { label: 'Calm (Pausa)', action: () => showProductDetails('calm') },
        { label: 'Desire (Conexión)', action: () => showProductDetails('desire') },
        { label: 'Volver al inicio', action: showMainMenu },
      ]
    });
  };

  const showProductDetails = (mood: string) => {
    const product = products.find(p => p.mood.toLowerCase() === mood);
    if (!product) return;

    addMessage({
      id: Date.now().toString(),
      sender: 'bot',
      text: (
        <div className="space-y-3">
          <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-xl" />
          <h4 className="font-serif text-lg">{product.name}</h4>
          <p className="text-sm opacity-80">{product.description}</p>
          <div className="flex justify-between items-center font-bold">
            <span>{product.price} USD</span>
          </div>
          <button 
            onClick={() => {
              addToCart(product);
              addMessage({
                id: Date.now().toString(),
                sender: 'bot',
                text: '¡Añadido al carrito! ¿Deseas ver algo más?',
                options: [
                  { label: 'Ver otros productos', action: showProducts },
                  { label: 'Volver al inicio', action: showMainMenu },
                ]
              });
            }}
            className="w-full bg-ohawell-ink text-ohawell-base py-2 rounded-full text-xs uppercase tracking-widest mt-2 hover:bg-black/80 transition-colors"
          >
            Añadir al carrito
          </button>
        </div>
      ),
      options: [
        { label: 'Ver otros productos', action: showProducts },
        { label: 'Volver al inicio', action: showMainMenu },
      ]
    });
  };

  const showAbout = () => {
    addMessage({
      id: Date.now().toString(),
      sender: 'bot',
      text: 'OHAWELL es chocolate vegano elaborado con cacao de origen ecuatoriano y botánicos funcionales. No se trata de hacks: se trata de rituales. Cada barra incluye una experiencia guiada (respiración, focus, conexión).',
      options: [
        { label: 'Ver Productos', action: showProducts },
        { label: 'Volver al inicio', action: showMainMenu },
      ]
    });
  };

  const showPartnership = () => {
    addMessage({
      id: Date.now().toString(),
      sender: 'bot',
      text: '¡Puedes generar ingresos con OHAWELL! Al registrarte, puedes convertirte en Socio Estratégico gratis. Obtendrás un código único para compartir, ganando un 15% de comisión por cada venta, y tus amigos recibirán un 10% de descuento.',
      options: [
        { label: 'Quiero registrarme', action: () => window.location.href = '/account' },
        { label: 'Volver al inicio', action: showMainMenu },
      ]
    });
  };

  const showSupport = () => {
    const whatsappMsg = encodeURIComponent('Hola equipo OHAWELL, necesito ayuda con...');
    addMessage({
      id: Date.now().toString(),
      sender: 'bot',
      text: 'Para atención personalizada, puedes contactarnos directamente por WhatsApp.',
      options: [
        { label: 'Abrir WhatsApp', action: () => window.open(`https://wa.me/1234567890?text=${whatsappMsg}`, '_blank') },
        { label: 'Volver al inicio', action: showMainMenu },
      ]
    });
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-ohawell-ink text-ohawell-base rounded-full shadow-2xl flex items-center justify-center ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-ohawell-base rounded-3xl shadow-2xl border border-black/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-ohawell-ink text-ohawell-base p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg leading-none">OHAWELL Guide</h3>
                  <span className="text-[10px] uppercase tracking-widest opacity-70">Asistente Virtual</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/5">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      msg.sender === 'user' 
                        ? 'bg-ohawell-ink text-ohawell-base rounded-tr-sm' 
                        : 'bg-white text-ohawell-ink rounded-tl-sm shadow-sm border border-black/5'
                    }`}
                  >
                    {typeof msg.text === 'string' ? (
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    ) : (
                      msg.text
                    )}
                  </div>
                  
                  {/* Options */}
                  {msg.options && (
                    <div className="mt-3 flex flex-col gap-2 w-[85%]">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleUserChoice(opt.label, opt.action)}
                          className="bg-white border border-ohawell-ink/20 text-ohawell-ink text-xs font-bold tracking-widest uppercase py-2 px-4 rounded-full hover:bg-ohawell-ink hover:text-ohawell-base transition-colors text-left flex justify-between items-center"
                        >
                          {opt.label}
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
