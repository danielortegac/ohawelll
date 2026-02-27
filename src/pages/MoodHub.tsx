import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { Sun, Moon, Flame, CheckCircle2, ChevronDown, ChevronUp, Leaf, ShieldCheck, Sparkles, ArrowRight, Play, Wind, Droplets, Brain, Activity } from 'lucide-react';
import { CalmBreathingModal } from '../components/CalmBreathingModal';
import { AwakenTimerModal } from '../components/AwakenTimerModal';
import { DesireConnectionCardsModal } from '../components/DesireConnectionCardsModal';

const moodData = {
  awaken: {
    title: 'Awaken',
    subtitle: 'Energía lúcida. Foco inquebrantable.',
    description: 'Diseñado para esos momentos donde necesitas <span class="bg-black/10 px-2 py-1 rounded-lg font-bold">claridad mental absoluta</span> sin la ansiedad de la cafeína tradicional. Awaken es tu aliado estratégico para empezar el día con <span class="bg-black/10 px-2 py-1 rounded-lg font-bold">intención y rendimiento sostenido</span>.',
    philosophy: 'No es cafeína, es claridad. Despierta tu mente sin alterar tu sistema nervioso.',
    sensory: {
      aroma: 'Cacao tostado con notas vibrantes de cítricos y tierra húmeda.',
      texture: 'Sedosa al inicio, con un final ligeramente astringente que despierta el paladar.',
      taste: 'Intenso 70% cacao, balanceado con el dulzor terroso de la maca y el golpe herbal del guaraná.'
    },
    bg: 'bg-ohawell-awaken',
    textColor: 'text-ohawell-ink',
    icon: Sun,
    moments: [
      { title: 'Primera luz', desc: 'Antes de empezar el día, para establecer la intención y el tono de tu jornada.' },
      { title: 'Deep Work', desc: 'Antes de un reto mental que requiera concentración absoluta y cero distracciones.' },
      { title: 'Movimiento', desc: 'Antes de entrenar o crear, para activar el cuerpo desde la claridad, no desde el estrés.' }
    ],
    ritual: [
      'Rompe 1–2 cuadritos de chocolate Awaken escuchando el <span class="font-bold text-ohawell-ink">"snap" limpio</span>.',
      'Tómalo con agua, infusión o <span class="font-bold text-ohawell-ink">café de especialidad</span> según tu preferencia.',
      'Cierra los ojos y <span class="font-bold text-ohawell-ink">respira profundo 3 veces</span> antes de arrancar.',
      '<span class="font-bold text-ohawell-ink">Visualiza tu objetivo principal</span> para las próximas 4 horas.'
    ],
    formula: [
      { name: 'Cacao 70%', desc: 'Rico en Teobromina para energía sostenida y vasodilatación cerebral.' },
      { name: 'Maca Peruana', desc: 'Adaptógeno ancestral que mejora la resistencia física y mental.' },
      { name: 'Guaraná', desc: 'Estimulante natural de liberación lenta para evitar el "crash" energético.' }
    ],
    faqs: [
      { q: '¿Reemplaza a mi café de la mañana?', a: 'Puede complementarlo o reemplazarlo. La teobromina del cacao ofrece una energía más estable y duradera que el pico de la cafeína.' },
      { q: '¿A qué hora es mejor consumirlo?', a: 'Idealmente por la mañana o temprano en la tarde. Evita consumirlo después de las 4 PM si eres sensible a los estimulantes.' }
    ],
    reviews: [
      { text: "Cambió mi rutina de mañana. Me siento enfocada pero sin el nerviosismo del café.", author: "María S." },
      { text: "El sabor es increíble y realmente noto la diferencia cuando trabajo profundo.", author: "Carlos D." }
    ],
    proInfo: {
      title: "La Ciencia del Enfoque (Neuro-Optimización)",
      content: "Awaken no es solo energía; es <span class='font-bold bg-black/10 px-2 py-1 rounded-lg'>neuro-optimización</span>. La combinación de <span class='font-bold bg-black/10 px-2 py-1 rounded-lg'>Teobromina</span> (un vasodilatador suave) y adaptógenos estimula la producción de <span class='font-bold bg-black/10 px-2 py-1 rounded-lg'>Factor de Crecimiento Nervioso (NGF)</span>. Esto se traduce en una mejora tangible en la neuroplasticidad, permitiéndote entrar en estados de 'Deep Work' con mayor facilidad y sostener la atención sin el temido 'crash' de la cafeína aislada."
    },
    image: 'https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&q=80',
    videoBg: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80',
    actionText: 'Iniciar Focus Sprint'
  },
  calm: {
    title: 'Calm',
    subtitle: 'El arte de la pausa consciente.',
    description: 'Una invitación a la <span class="bg-black/10 px-2 py-1 rounded-lg font-bold">desconexión profunda</span>. Calm está formulado para ayudarte a transicionar del hacer al ser, <span class="bg-black/10 px-2 py-1 rounded-lg font-bold">bajando las revoluciones</span> y preparando tu cuerpo y mente para el descanso reparador.',
    philosophy: 'Un refugio para tu sistema nervioso al final del día. Apaga el ruido.',
    sensory: {
      aroma: 'Notas florales profundas dominadas por la lavanda y un fondo de cacao suave.',
      texture: 'Extremadamente fundente y cremosa, diseñada para derretirse lentamente.',
      taste: 'Cacao 60% aterciopelado, con un retrogusto herbal y calmante que perdura.'
    },
    bg: 'bg-ohawell-calm',
    textColor: 'text-ohawell-ink',
    icon: Moon,
    moments: [
      { title: 'Desconexión', desc: 'Justo después de cerrar la computadora del trabajo para marcar el fin de la jornada.' },
      { title: 'Pre-sueño', desc: 'Una hora antes de dormir para preparar el cuerpo y bajar el cortisol.' },
      { title: 'Domingo', desc: 'Tardes de descanso, lectura, meditación o journaling introspectivo.' }
    ],
    ritual: [
      'Prepara una bebida caliente o come los trocitos <span class="font-bold text-ohawell-ink">muy despacio</span>, dejando que se fundan.',
      '<span class="font-bold text-ohawell-ink">Atenúa las luces</span> de tu espacio y pon música suave o frecuencias de fondo.',
      '<span class="font-bold text-ohawell-ink">Aleja tu teléfono</span> y cualquier pantalla por al menos 15-30 minutos.',
      'Permítete <span class="font-bold text-ohawell-ink">no hacer nada más</span> que saborear el momento y respirar.'
    ],
    formula: [
      { name: 'Cacao 60%', desc: 'Rico en magnesio biodisponible para relajar la tensión muscular.' },
      { name: 'Lavanda', desc: 'Calma el sistema nervioso central y reduce la agitación mental.' },
      { name: 'Ashwagandha KSM-66®', desc: 'Adaptógeno clínico que reduce los niveles de cortisol y estrés.' }
    ],
    faqs: [
      { q: '¿Me dará sueño inmediatamente?', a: 'No es un somnífero. Es un relajante natural que ayuda a tu cuerpo a entrar en un estado parasimpático de calma, facilitando el descanso posterior.' },
      { q: '¿Puedo tomarlo si me despierto en la noche?', a: 'Sí, especialmente en formato de infusión tibia, puede ayudarte a volver a conciliar el sueño sin aturdimiento al día siguiente.' }
    ],
    reviews: [
      { text: "Mi ritual favorito antes de dormir. El toque de lavanda es perfecto y duermo como un bebé.", author: "Elena R." },
      { text: "Me ayuda a marcar el fin de mi día laboral. Totalmente recomendado para la ansiedad nocturna.", author: "Javier M." }
    ],
    proInfo: {
      title: "Regulación del Sistema Nervioso (Eje HPA)",
      content: "Calm actúa directamente sobre el <span class='font-bold bg-black/10 px-2 py-1 rounded-lg'>eje HPA</span> (hipotálamo-pituitaria-adrenal). La Ashwagandha KSM-66® reduce clínicamente los niveles de <span class='font-bold bg-black/10 px-2 py-1 rounded-lg'>cortisol sérico</span>, mientras que el magnesio biodisponible del cacao actúa como un <span class='font-bold bg-black/10 px-2 py-1 rounded-lg'>bloqueador natural</span> de los receptores NMDA, previniendo la sobreexcitación neuronal. Es una herramienta fisiológica para cambiar del sistema nervioso simpático (lucha o huida) al parasimpático (descanso y digestión)."
    },
    image: 'https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&q=80',
    videoBg: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80',
    actionText: 'Iniciar Respiración'
  },
  desire: {
    title: 'Desire',
    subtitle: 'Conexión, fuego y sensorialidad.',
    description: 'Creado para <span class="bg-black/10 px-2 py-1 rounded-lg font-bold">despertar los sentidos</span> y fomentar la intimidad. Desire es una experiencia cálida, intensa y diseñada para <span class="bg-black/10 px-2 py-1 rounded-lg font-bold">compartirse</span> o disfrutarse en profunda conexión con tu propio cuerpo.',
    philosophy: 'Eleva la temperatura del momento. Un viaje sensorial hacia la vulnerabilidad y el placer.',
    sensory: {
      aroma: 'Cacao profundo e intenso entrelazado con notas de rosas frescas y especias cálidas.',
      texture: 'Firme al inicio, fundiéndose en un final que deja un rastro de calor sutil en la garganta.',
      taste: 'Cacao 80% robusto, notas florales elegantes y un "kick" final de pimienta cayena.'
    },
    bg: 'bg-ohawell-desire',
    textColor: 'text-ohawell-ink',
    icon: Flame,
    moments: [
      { title: 'Cita en casa', desc: 'El final perfecto y provocativo para una cena íntima en pareja.' },
      { title: 'Celebración', desc: 'Aniversarios o momentos que merecen presencia total y celebración del cuerpo.' },
      { title: 'Conexión Profunda', desc: 'Noches de conversación profunda, vulnerabilidad y exploración sensorial.' }
    ],
    ritual: [
      '<span class="font-bold text-ohawell-ink">Comparte la barra</span>, partiendo los trozos juntos para iniciar la conexión.',
      'Hagan un <span class="font-bold text-ohawell-ink">tasting conjunto</span>: huelan, dejen derretir en la lengua, comenten las notas.',
      'Acompañen con nuestras <span class="font-bold text-ohawell-ink">Connection Cards</span> o preguntas disparadoras.',
      'Disfruten sin prisa, dejando que el <span class="font-bold text-ohawell-ink">calor del chile actúe</span> y despierte la piel.'
    ],
    formula: [
      { name: 'Cacao 80%', desc: 'Intenso, liberador masivo de endorfinas y anandamida.' },
      { name: 'Pimienta Cayena', desc: 'Estimula la circulación periférica y aporta un calor sutil y excitante.' },
      { name: 'Rosa Damascena', desc: 'Abre los sentidos, relaja el corazón y aporta notas florales elegantes.' }
    ],
    faqs: [
      { q: '¿Es muy picante?', a: 'No. El chile aporta una calidez sutil al final de la degustación que se siente en la garganta, no un picor invasivo en la lengua.' },
      { q: '¿Es solo para parejas?', a: 'Absolutamente no. Es ideal para cualquier momento donde busques conectar profundamente con tus propios sentidos, tu cuerpo, o con amigos cercanos en charlas profundas.' }
    ],
    reviews: [
      { text: "Lo compartimos en nuestro aniversario y fue una experiencia hermosa y muy sensual.", author: "Ana & Luis" },
      { text: "Ese calorcito al final es adictivo. Muy elegante y perfecto con una copa de vino tinto.", author: "Sofía T." }
    ],
    proInfo: {
      title: "Vasodilatación y Bioquímica del Placer",
      content: "Desire es una obra maestra de la bioquímica sensorial. El alto porcentaje de cacao (80%) maximiza la entrega de <span class='font-bold bg-black/10 px-2 py-1 rounded-lg'>Anandamida</span> (la 'molécula de la felicidad') y <span class='font-bold bg-black/10 px-2 py-1 rounded-lg'>Feniletilamina (PEA)</span>, el químico del amor. Simultáneamente, la capsaicina del chile actúa como un <span class='font-bold bg-black/10 px-2 py-1 rounded-lg'>vasodilatador periférico</span>, aumentando el flujo sanguíneo y la sensibilidad táctil. No es un afrodisíaco mágico; es ciencia aplicada a la conexión humana y el placer."
    },
    image: 'https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&q=80',
    videoBg: 'https://images.unsplash.com/photo-1604514628550-37477afdf4e3?auto=format&fit=crop&q=80',
    actionText: 'Connection Cards'
  }
};

export const MoodHub = () => {
  const { moodId } = useParams<{ moodId: 'awaken' | 'calm' | 'desire' }>();
  const mood = moodData[moodId || 'awaken'];
  const { addToCart } = useCart();
  const { currency } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const moodProducts = products.filter(p => p.mood.toLowerCase() === moodId);

  if (!mood) return <div>Mood no encontrado</div>;

  const Icon = mood.icon;

  return (
    <div className={`min-h-screen ${mood.bg} ${mood.textColor}`}>
      {/* HERO CINEMATOGRÁFICO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={mood.videoBg} 
            alt={`${mood.title} background`} 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-${mood.bg.replace('bg-', '')}`} />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-12 mt-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Icon className="w-20 h-20 mx-auto opacity-60 mb-8" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-7xl md:text-[10rem] tracking-tighter leading-[0.85] drop-shadow-2xl"
          >
            {mood.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-light opacity-90 max-w-3xl mx-auto"
          >
            {mood.subtitle}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12"
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-current text-white px-12 py-6 rounded-full text-sm font-bold tracking-widest uppercase hover:-translate-y-2 transition-all duration-300 flex items-center gap-3 shadow-2xl"
              style={{ color: mood.bg === 'bg-ohawell-awaken' ? '#F7F3EB' : mood.bg === 'bg-ohawell-calm' ? '#F7F3EB' : '#F7F3EB', backgroundColor: mood.textColor === 'text-ohawell-ink' ? '#141414' : '#F7F3EB' }}
            >
              <Play className="w-5 h-5" /> {mood.actionText}
            </button>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="text-xs font-bold tracking-widest uppercase border border-current/30 px-8 py-4 rounded-full flex items-center gap-2 backdrop-blur-md bg-white/5">
                <Leaf className="w-4 h-4" /> Vegan
              </span>
              <span className="text-xs font-bold tracking-widest uppercase border border-current/30 px-8 py-4 rounded-full flex items-center gap-2 backdrop-blur-md bg-white/5">
                <ShieldCheck className="w-4 h-4" /> Functional Botanicals
              </span>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-xs tracking-widest uppercase">Descubrir</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.div>
      </section>

      {/* INTRODUCCIÓN PROFUNDA & PRO INFO */}
      <section className="py-40 px-6 max-w-[1400px] mx-auto overflow-hidden">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="inline-block border border-current/20 px-8 py-4 rounded-full mb-8 backdrop-blur-sm"
          >
            <span className="font-serif text-2xl md:text-3xl italic">"{mood.philosophy}"</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight opacity-90 max-w-5xl mx-auto" 
            dangerouslySetInnerHTML={{ __html: mood.description }} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* SENSORY PROFILE */}
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-12"
          >
            <div>
              <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4">Perfil Sensorial</span>
              <h2 className="font-serif text-5xl mb-12">Notas de Cata</h2>
              <div className="space-y-8">
                <div className="flex gap-6 items-start border-b border-current/10 pb-8">
                  <Wind className="w-8 h-8 opacity-50 shrink-0" />
                  <div>
                    <h4 className="font-bold tracking-widest uppercase text-sm mb-2 opacity-70">Aroma</h4>
                    <p className="text-xl font-light leading-relaxed">{mood.sensory.aroma}</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start border-b border-current/10 pb-8">
                  <Droplets className="w-8 h-8 opacity-50 shrink-0" />
                  <div>
                    <h4 className="font-bold tracking-widest uppercase text-sm mb-2 opacity-70">Textura</h4>
                    <p className="text-xl font-light leading-relaxed">{mood.sensory.texture}</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <Leaf className="w-8 h-8 opacity-50 shrink-0" />
                  <div>
                    <h4 className="font-bold tracking-widest uppercase text-sm mb-2 opacity-70">Sabor</h4>
                    <p className="text-xl font-light leading-relaxed">{mood.sensory.taste}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* PRO INFO CARD */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="bg-white text-ohawell-ink p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden shadow-2xl border border-black/5"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-current opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10">
              <span className="text-xs font-bold tracking-widest uppercase opacity-50 flex items-center gap-2 mb-6">
                <Brain className="w-4 h-4" /> The Science
              </span>
              <h3 className="font-serif text-4xl mb-6 leading-tight">{mood.proInfo.title}</h3>
              <p 
                className="text-lg font-light opacity-80 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: mood.proInfo.content }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* THE FORMULA */}
      <section className="py-24 px-6 border-t border-current/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4">Ingredientes con propósito</span>
            <h2 className="font-serif text-5xl">The Formula</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mood.formula.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white text-ohawell-ink p-8 md:p-12 rounded-[2rem] border border-black/5 text-center shadow-xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-20 h-20 mx-auto border border-black/10 bg-black/5 rounded-full flex items-center justify-center mb-8">
                  <Leaf className="w-8 h-8 opacity-80" />
                </div>
                <h3 className="font-serif text-3xl mb-4">{item.name}</h3>
                <p className="opacity-80 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MOMENTS & RITUAL */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-12"
        >
          <div>
            <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-4">Cuándo usarlo</span>
            <h2 className="font-serif text-5xl md:text-7xl mb-16 leading-tight">Momentos <br/><span className="italic font-light opacity-80">Ideales</span></h2>
            <div className="space-y-6">
              {mood.moments.map((m, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="group relative bg-black/5 p-8 rounded-[2rem] border border-black/5 hover:bg-black/10 transition-colors duration-500"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-serif text-3xl">{m.title}</h4>
                    <span className="font-serif text-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-500">0{i + 1}</span>
                  </div>
                  <p className="opacity-70 text-lg leading-relaxed">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative lg:mt-32"
        >
          <div className="absolute inset-0 bg-current opacity-5 rounded-[3rem] transform -rotate-3 scale-105 transition-transform duration-700 hover:rotate-0" />
          <div className="bg-white text-ohawell-ink p-10 md:p-16 rounded-[3rem] border border-black/5 relative z-10 shadow-2xl">
            <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-6">Paso a paso</span>
            <h2 className="font-serif text-5xl md:text-6xl mb-16">El Ritual</h2>
            <div className="space-y-12 relative before:absolute before:inset-y-0 before:left-[1.1rem] before:w-px before:bg-black/10">
              {mood.ritual.map((r, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex gap-8 items-start relative z-10 group"
                >
                  <div className="w-10 h-10 rounded-full bg-white border border-black/20 flex items-center justify-center shrink-0 mt-1 group-hover:border-current transition-colors duration-500 shadow-sm">
                    <span className="font-serif text-lg opacity-50 group-hover:opacity-100 transition-opacity">{i + 1}</span>
                  </div>
                  <p 
                    className="text-xl font-light opacity-90 leading-relaxed pt-2 group-hover:opacity-100 transition-opacity"
                    dangerouslySetInnerHTML={{ __html: r }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* PRODUCTS */}
      <section className="py-32 px-6 max-w-7xl mx-auto border-t border-current/10">
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-7xl mb-6">La Colección {mood.title}</h2>
          <p className="opacity-70 max-w-2xl mx-auto text-xl font-light">
            Explora los formatos diseñados para acompañar tu ritual de {mood.title.toLowerCase()}.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {moodProducts.map((product, i) => (
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
                  src="https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&q=80" 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
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
                <p className="opacity-70 text-sm leading-relaxed">{product.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* REVIEWS & FAQ */}
      <section className="py-32 px-6 border-t border-current/10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* REVIEWS */}
          <div>
            <h2 className="font-serif text-4xl mb-12">Lo que dicen</h2>
            <div className="space-y-8">
              {mood.reviews.map((review, i) => (
                <div key={i} className="bg-white text-ohawell-ink p-8 md:p-12 rounded-[2rem] border border-black/5 shadow-xl hover:-translate-y-2 transition-all duration-500">
                  <div className="flex text-yellow-500 mb-6">
                    {[1,2,3,4,5].map(star => <Sparkles key={star} className="w-5 h-5 mr-1" />)}
                  </div>
                  <p className="text-xl md:text-2xl font-light italic mb-8 leading-relaxed">"{review.text}"</p>
                  <p className="text-sm font-bold tracking-widest uppercase opacity-60">— {review.author}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="font-serif text-4xl mb-12">Preguntas Frecuentes</h2>
            <div className="space-y-4">
              {mood.faqs.map((faq, i) => (
                <div key={i} className="border-b border-black/10 overflow-hidden bg-white/50 backdrop-blur-sm rounded-2xl mb-4 px-6">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full py-6 flex justify-between items-center text-left hover:opacity-70 transition-opacity"
                  >
                    <span className="font-serif text-2xl pr-8">{faq.q}</span>
                    {openFaq === i ? <ChevronUp className="w-6 h-6 shrink-0" /> : <ChevronDown className="w-6 h-6 shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 opacity-80 leading-relaxed text-lg">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEXT MOOD EXPLORATION */}
      <section className="py-24 px-6 text-center">
        <p className="text-sm font-bold tracking-widest uppercase opacity-50 mb-6">Sigue explorando</p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {moodId !== 'awaken' && (
            <Link to="/moods/awaken" className="inline-flex items-center justify-center gap-3 border border-current/20 px-8 py-4 rounded-full hover:bg-current/5 transition-colors">
              <span className="font-serif text-xl">Awaken</span> <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          {moodId !== 'calm' && (
            <Link to="/moods/calm" className="inline-flex items-center justify-center gap-3 border border-current/20 px-8 py-4 rounded-full hover:bg-current/5 transition-colors">
              <span className="font-serif text-xl">Calm</span> <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          {moodId !== 'desire' && (
            <Link to="/moods/desire" className="inline-flex items-center justify-center gap-3 border border-current/20 px-8 py-4 rounded-full hover:bg-current/5 transition-colors">
              <span className="font-serif text-xl">Desire</span> <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </section>

      {moodId === 'calm' && <CalmBreathingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      {moodId === 'awaken' && <AwakenTimerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      {moodId === 'desire' && <DesireConnectionCardsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

