import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, X, Image as ImageIcon, Send, Volume2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

// Mock initial articles with more valuable content, max 4 lines per paragraph, and indentation
const initialArticles = [
  {
    id: '1',
    title: 'El Poder del Cacao Ecuatoriano: Más Allá del Sabor',
    excerpt: 'Descubre por qué el cacao fino de aroma de Ecuador es considerado el mejor del mundo y cómo sus propiedades antioxidantes benefician tu salud celular.',
    content: `El cacao ecuatoriano, especialmente la variedad Arriba Nacional, es mundialmente reconocido por su perfil floral y frutal. Pero más allá de su exquisito sabor, este superalimento es una potencia nutricional. Rico en flavonoides, magnesio y teobromina, el cacao puro actúa como un vasodilatador natural, mejorando el flujo sanguíneo y la oxigenación del cerebro.

    En OHAWELL, utilizamos cacao de origen ético para asegurar que cada barra no solo deleite tu paladar, sino que también nutra tu cuerpo a nivel celular. La teobromina, a diferencia de la cafeína, proporciona una energía sostenida sin los picos y caídas bruscas. Esto lo convierte en el aliado perfecto para mantener la concentración durante largas jornadas de trabajo o estudio.

    Además, el consumo regular de cacao de alta calidad está asociado con una mejora en el estado de ánimo gracias a la liberación de endorfinas y serotonina. Es por eso que integrar un pequeño ritual de cacao en tu día puede transformar tu perspectiva. No se trata solo de comer chocolate, sino de nutrir tu mente y cuerpo con intención.`,
    author: 'Equipo OHAWELL',
    date: '24 Feb 2026',
    image: 'https://images.unsplash.com/photo-1613478881439-ce3611172f3e?auto=format&fit=crop&q=80',
    category: 'Nutrición',
  },
  {
    id: '2',
    title: 'Rituales vs. Hábitos: La Diferencia que Transforma tu Día',
    excerpt: 'Por qué hacer una pausa consciente con intención es mucho más poderoso que simplemente repetir una acción en piloto automático.',
    content: `Un hábito es algo que haces casi sin pensar: cepillarte los dientes, revisar el teléfono al despertar. Un ritual, por otro lado, requiere presencia e intención. Cuando transformas el acto de comer chocolate en un ritual —tomándote 5 minutos para respirar, saborear y conectar con el momento— estás entrenando a tu sistema nervioso para entrar en un estado de calma o enfoque.

    Nuestros chocolates están diseñados para ser el ancla física de estos rituales mentales, ayudándote a transicionar entre los diferentes estados de tu día. Al asociar un sabor y aroma específicos con un estado mental, creas un atajo neurológico. Con el tiempo, solo el olor del cacao puede desencadenar la respuesta de relajación o alerta que buscas.

    Te invitamos a probar este ejercicio: mañana, antes de empezar a trabajar, toma un trozo de chocolate Awaken. Cierra los ojos, respira profundamente tres veces y establece una intención clara para las próximas horas. Notarás cómo esta pequeña pausa consciente cambia por completo la trayectoria de tu día, aportando mayor claridad y propósito a tus acciones.`,
    author: 'Dra. Elena Silva',
    date: '20 Feb 2026',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80',
    category: 'Mindfulness',
  },
  {
    id: '3',
    title: 'Adaptógenos 101: Cómo la Naturaleza Ayuda a Manejar el Estrés',
    excerpt: 'Una guía rápida sobre Ashwagandha, Maca y Melena de León, y cómo estos botánicos funcionales potencian el efecto del cacao.',
    content: `Los adaptógenos son sustancias naturales que ayudan al cuerpo a adaptarse al estrés y a ejercer un efecto normalizador sobre los procesos corporales. En nuestra línea Calm, utilizamos Ashwagandha para reducir los niveles de cortisol, la hormona del estrés. Esta raíz milenaria ha sido utilizada en la medicina ayurvédica para calmar la mente y promover un sueño reparador.

    En Awaken, la Melena de León mejora la neurogénesis y el enfoque. Este hongo funcional apoya la salud cognitiva, estimulando la producción del factor de crecimiento nervioso. Y en Desire, la Maca peruana actúa como un energizante natural y potenciador de la libido, equilibrando las hormonas y aumentando la vitalidad general del cuerpo.

    Al combinar estos extractos potentes con la teobromina del cacao, creamos una sinergia que maximiza la absorción y efectividad de cada ingrediente. El cacao actúa como un vehículo perfecto, dilatando los vasos sanguíneos y permitiendo que los adaptógenos lleguen más rápido a las células. Es la unión perfecta entre la sabiduría ancestral y la ciencia moderna.`,
    author: 'Equipo OHAWELL',
    date: '15 Feb 2026',
    image: 'https://images.unsplash.com/photo-1596547609652-9cb5d4d7308f?auto=format&fit=crop&q=80',
    category: 'Ciencia',
  },
  {
    id: '4',
    title: 'El Arte de la Pausa: Respiración Consciente',
    excerpt: 'Técnicas simples de respiración que puedes combinar con tu ritual de cacao para reducir la ansiedad en minutos.',
    content: `La respiración es el puente entre el cuerpo y la mente. Cuando estamos estresados, nuestra respiración se vuelve superficial y rápida, lo que envía señales de peligro al cerebro. Al tomar el control de nuestra respiración, podemos revertir este proceso. La técnica 4-7-8 es una de las más efectivas: inhala por 4 segundos, retén por 7 y exhala por 8.

    Te sugerimos combinar esta técnica con nuestro chocolate Calm. Toma un pequeño trozo, déjalo derretir en tu lengua y comienza el ciclo de respiración. La combinación de la Ashwagandha, el magnesio del cacao y la respiración profunda activará tu sistema nervioso parasimpático casi de inmediato. Es un rescate rápido y efectivo para momentos de alta tensión.

    Practicar esto diariamente, incluso cuando no te sientas estresado, construye resiliencia en tu sistema nervioso. Es como ir al gimnasio para tu mente. Con el tiempo, descubrirás que tu línea base de ansiedad disminuye y tu capacidad para manejar situaciones difíciles aumenta significativamente. La verdadera magia ocurre en la constancia de la práctica.`,
    author: 'Dra. Elena Silva',
    date: '10 Feb 2026',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80',
    category: 'Bienestar',
  }
];

export const Blog = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [articles, setArticles] = useState(initialArticles);
  const [isWriting, setIsWriting] = useState(false);
  const [newArticle, setNewArticle] = useState({ title: '', excerpt: '', content: '', category: 'Comunidad' });
  const [selectedArticle, setSelectedArticle] = useState<typeof initialArticles[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const article = {
      id: Date.now().toString(),
      ...newArticle,
      author: user.name,
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80', // Default image for community
    };

    setArticles([article, ...articles]);
    setIsWriting(false);
    setNewArticle({ title: '', excerpt: '', content: '', category: 'Comunidad' });
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.onend = () => setIsPlaying(false);
      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert(t('Tu navegador no soporta la lectura de texto.'));
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-ohawell-base pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {selectedArticle ? (
            <motion.div
              key="article-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              <button 
                onClick={() => {
                  setSelectedArticle(null);
                  stopSpeaking();
                }}
                className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-8"
              >
                <ArrowLeft className="w-4 h-4" /> {t('Volver al Journal')}
              </button>

              <div className="mb-8">
                <div className="flex items-center gap-3 text-xs opacity-60 font-bold tracking-widest uppercase mb-4">
                  <span>{t(selectedArticle.category)}</span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.author}</span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">{t(selectedArticle.title)}</h1>
                
                <button 
                  onClick={() => isPlaying ? stopSpeaking() : speakText(t(selectedArticle.content))}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-colors ${
                    isPlaying ? 'bg-ohawell-ink text-ohawell-base' : 'bg-black/5 text-ohawell-ink hover:bg-black/10'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  {isPlaying ? t('Detener Lectura') : t('Escuchar Artículo')}
                </button>
              </div>

              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title}
                className="w-full aspect-video object-cover rounded-3xl mb-12"
              />

              <div className="prose prose-lg max-w-none">
                {t(selectedArticle.content).split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-6 font-light leading-relaxed text-lg text-ohawell-ink/80 indent-8">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div className="max-w-2xl">
                  <h1 className="font-serif text-5xl md:text-7xl mb-6">{t('Journal & Comunidad')}</h1>
                  <p className="text-xl font-light opacity-70 leading-relaxed">
                    {t('Explora artículos sobre bienestar, ciencia detrás del cacao y rituales diarios. Únete a la conversación y comparte tus propias experiencias.')}
                  </p>
                </div>
                {user && (
                  <button 
                    onClick={() => setIsWriting(true)}
                    className="btn-shiny bg-ohawell-ink text-ohawell-base px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase flex items-center gap-2 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> {t('Escribir Artículo')}
                  </button>
                )}
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, idx) => (
                  <motion.article 
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedArticle(article)}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                        {t(article.category)}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-xs opacity-60 font-bold tracking-widest uppercase">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.author}</span>
                      </div>
                      <h3 className="font-serif text-2xl group-hover:text-ohawell-ink/70 transition-colors line-clamp-2">
                        {t(article.title)}
                      </h3>
                      <p className="font-light opacity-70 line-clamp-3">
                        {t(article.excerpt)}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Write Article Modal */}
        <AnimatePresence>
          {isWriting && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsWriting(false)}
                className="absolute inset-0 bg-ohawell-ink/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-3xl bg-ohawell-base rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh]"
              >
                <button 
                  onClick={() => setIsWriting(false)}
                  className="absolute top-8 right-8 p-2 bg-black/5 rounded-full hover:bg-black/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="mb-8">
                  <h2 className="font-serif text-4xl mb-2">{t('Comparte tu Experiencia')}</h2>
                  <p className="opacity-70 font-light">{t('Escribe un artículo para la comunidad OHAWELL.')}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase opacity-50 mb-2">{t('Título')}</label>
                    <input 
                      type="text" 
                      required
                      value={newArticle.title}
                      onChange={e => setNewArticle({...newArticle, title: e.target.value})}
                      className="w-full bg-transparent border-b border-black/20 pb-2 focus:outline-none focus:border-ohawell-ink font-serif text-2xl"
                      placeholder={t("Ej: Mi ritual matutino con Awaken...")}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase opacity-50 mb-2">{t('Resumen Corto')}</label>
                    <input 
                      type="text" 
                      required
                      value={newArticle.excerpt}
                      onChange={e => setNewArticle({...newArticle, excerpt: e.target.value})}
                      className="w-full bg-transparent border-b border-black/20 pb-2 focus:outline-none focus:border-ohawell-ink font-light"
                      placeholder={t("Una breve descripción de tu artículo...")}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase opacity-50 mb-2">{t('Contenido')}</label>
                    <textarea 
                      required
                      rows={8}
                      value={newArticle.content}
                      onChange={e => setNewArticle({...newArticle, content: e.target.value})}
                      className="w-full bg-black/5 rounded-2xl p-4 focus:outline-none focus:ring-1 focus:ring-ohawell-ink font-light resize-none"
                      placeholder={t("Escribe tu historia aquí...")}
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit"
                      className="btn-shiny bg-ohawell-ink text-ohawell-base px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                      <Send className="w-4 h-4" /> {t('Publicar Artículo')}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
