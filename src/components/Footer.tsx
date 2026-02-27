import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

// Custom TikTok icon since it's not in lucide-react by default
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const Footer = () => {
  const { language, setLanguage, currency, setCurrency } = useLanguage();

  const whatsappMsg = encodeURIComponent('Hola equipo OHAWELL, necesito ayuda con...');

  return (
    <footer className="bg-ohawell-ink text-ohawell-base py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h3 className="font-serif text-2xl tracking-widest">OHAWELL</h3>
          <p className="text-sm opacity-70 leading-relaxed">
            Chocolate vegano premium + botánicos funcionales diseñados para transformar momentos en rituales.
          </p>
          <div className="flex gap-4 text-xs font-medium tracking-widest uppercase">
            <span className="border border-white/20 px-3 py-1 rounded-full">Vegan</span>
            <span className="border border-white/20 px-3 py-1 rounded-full">Talita Cumi</span>
          </div>
          
          {/* Social Icons */}
          <div className="flex gap-4 pt-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:scale-110 transition-all">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:scale-110 transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:scale-110 transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:scale-110 transition-all">
              <TikTokIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-widest uppercase opacity-50">Explorar</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/shop" className="hover:opacity-70 transition-opacity">Shop</Link></li>
            <li><Link to="/moods/awaken" className="hover:opacity-70 transition-opacity">Awaken</Link></li>
            <li><Link to="/moods/calm" className="hover:opacity-70 transition-opacity">Calm</Link></li>
            <li><Link to="/moods/desire" className="hover:opacity-70 transition-opacity">Desire</Link></li>
            <li><Link to="/blog" className="hover:opacity-70 transition-opacity">Blog</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-widest uppercase opacity-50">Soporte</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/faq" className="hover:opacity-70 transition-opacity">FAQ</Link></li>
            <li><Link to="/shipping" className="hover:opacity-70 transition-opacity">Envíos</Link></li>
            <li><Link to="/returns" className="hover:opacity-70 transition-opacity">Devoluciones</Link></li>
            <li>
              <a 
                href={`https://wa.me/1234567890?text=${whatsappMsg}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-[#25D366]"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Support
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-transparent border border-white/20 rounded px-2 py-1 text-sm focus:outline-none"
            >
              <option value="ES" className="text-black">ES</option>
              <option value="EN" className="text-black">EN</option>
              <option value="FR" className="text-black">FR</option>
            </select>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value as any)}
              className="bg-transparent border border-white/20 rounded px-2 py-1 text-sm focus:outline-none"
            >
              <option value="USD" className="text-black">USD</option>
              <option value="EUR" className="text-black">EUR</option>
              <option value="MXN" className="text-black">MXN</option>
              <option value="COP" className="text-black">COP</option>
            </select>
          </div>
          <div className="text-xs opacity-50 pt-8 border-t border-white/10">
            <p>© {new Date().getFullYear()} OHAWELL. Todos los derechos reservados.</p>
            <p className="mt-2">
              Sitio desarrollado por <a href="https://www.goatify.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">goatify ia</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
