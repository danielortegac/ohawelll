import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Leaf, ShieldCheck, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Impact = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24 max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl mb-8">Impacto & Origen</h1>
        <p className="text-xl font-light opacity-80 leading-relaxed">
          Creemos en el poder transformador del cacao, no solo para quien lo consume, sino para quienes lo cultivan y las comunidades que lo rodean.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
        <div className="aspect-[4/5] rounded-3xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80" 
            alt="Origen Cacao" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-8">
          <span className="text-xs font-bold tracking-widest uppercase opacity-50">Latitud 0°</span>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">El Origen</h2>
          <p className="text-lg font-light opacity-80 leading-relaxed">
            Ohawell nace en Ecuador, desde un territorio único: la latitud 0°. Un punto simbólico donde el mundo no se inclina hacia ningún extremo.
          </p>
          <p className="text-lg font-light opacity-80 leading-relaxed">
            Trabajamos directamente con fincas seleccionadas, asegurando prácticas sostenibles y un precio justo que valora el trabajo artesanal.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-32">
        {[
          { icon: Leaf, title: 'Prácticas Sostenibles', desc: 'Cultivo regenerativo que protege la biodiversidad.' },
          { icon: ShieldCheck, title: 'Precio Justo', desc: 'Pago directo a agricultores, sin intermediarios.' },
          { icon: Heart, title: 'Impacto Social', desc: 'Apoyo a comunidades locales y educación.' },
          { icon: Globe, title: 'Huella Cero', desc: 'Empaques compostables y envíos neutros en carbono.' }
        ].map((item, i) => (
          <div key={i} className="bg-black/5 p-8 rounded-3xl text-center space-y-4">
            <item.icon className="w-8 h-8 mx-auto opacity-50" />
            <h3 className="font-serif text-xl">{item.title}</h3>
            <p className="text-sm opacity-70">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-ohawell-ink text-ohawell-base rounded-3xl p-12 md:p-24 text-center max-w-5xl mx-auto">
        <span className="text-xs font-bold tracking-widest uppercase opacity-50 mb-6 block">Alianza Estratégica</span>
        <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-8">Fundación Talita Cumi</h2>
        <p className="text-xl font-light opacity-80 leading-relaxed max-w-2xl mx-auto mb-12">
          Un porcentaje de cada compra de OHAWELL se destina directamente a apoyar programas de recuperación, educación y empoderamiento para mujeres sobrevivientes de violencia.
        </p>
        <Link 
          to="/shop" 
          className="inline-block border border-white/30 px-8 py-4 rounded-full text-sm font-medium tracking-widest uppercase hover:bg-white/10 transition-colors"
        >
          Conoce los productos que nacen de este origen
        </Link>
      </div>
    </div>
  );
};
