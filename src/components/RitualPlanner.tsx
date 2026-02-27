import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Plus, Bell, CheckCircle2, Circle, Star, Flame, Moon, Sun, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'awaken' | 'calm' | 'desire' | 'personal';
  completed: boolean;
  notes?: string;
}

const MOCK_EVENTS: Event[] = [
  { id: '1', title: 'Focus Sprint - Deep Work', date: new Date(), time: '09:00', type: 'awaken', completed: true },
  { id: '2', title: 'Night Reset Breathing', date: new Date(), time: '21:30', type: 'calm', completed: false },
  { id: '3', title: 'Aniversario - Connection Cards', date: new Date(new Date().setDate(new Date().getDate() + 2)), time: '20:00', type: 'desire', completed: false },
];

export const RitualPlanner = () => {
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({ type: 'personal' });

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const getEventsForDate = (date: Date) => {
    return events.filter(e => 
      e.date.getDate() === date.getDate() && 
      e.date.getMonth() === date.getMonth() && 
      e.date.getFullYear() === date.getFullYear()
    );
  };

  const toggleEventCompletion = (id: string) => {
    setEvents(events.map(e => e.id === id ? { ...e, completed: !e.completed } : e));
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.time) {
      setEvents([...events, { 
        ...newEvent, 
        id: Math.random().toString(), 
        date: selectedDate,
        completed: false
      } as Event]);
      setIsAddingEvent(false);
      setNewEvent({ type: 'personal' });
    }
  };

  const generate21DayPlan = () => {
    const newEvents: Event[] = [];
    const today = new Date();
    
    for (let i = 0; i < 21; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      newEvents.push({
        id: `plan-awaken-${i}`,
        title: t('Ritual Matutino: Intención & Awaken'),
        date: new Date(date),
        time: '08:00',
        type: 'awaken',
        completed: false
      });
      
      newEvents.push({
        id: `plan-calm-${i}`,
        title: t('Ritual Nocturno: Gratitud & Calm'),
        date: new Date(date),
        time: '21:00',
        type: 'calm',
        completed: false
      });
    }
    
    setEvents([...events, ...newEvents]);
    alert(t('¡Plan de 21 días de hábitos buenos generado con éxito!'));
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'awaken': return 'bg-ohawell-awaken text-ohawell-ink';
      case 'calm': return 'bg-ohawell-calm text-ohawell-ink';
      case 'desire': return 'bg-ohawell-desire text-ohawell-ink';
      default: return 'bg-black/10 text-ohawell-ink';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'awaken': return <Sun className="w-4 h-4" />;
      case 'calm': return <Moon className="w-4 h-4" />;
      case 'desire': return <Flame className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="font-serif text-5xl mb-6">{t('Ritual Planner')}</h2>
          <p className="text-xl font-light opacity-70 max-w-2xl">
            {t('Organiza tu vida, agenda tus rituales y recibe notificaciones para mantener tu constancia.')}
          </p>
        </div>
        <button 
          onClick={generate21DayPlan}
          className="btn-shiny bg-ohawell-ink text-ohawell-base px-6 py-3 rounded-full text-sm font-bold tracking-widest uppercase flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          {t('Crear Plan de 21 Días')}
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* CALENDAR VIEW */}
        <div className="lg:col-span-2 bg-white/5 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-black/10">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif text-3xl">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex gap-4">
              <button onClick={prevMonth} className="p-3 bg-black/5 rounded-full hover:bg-black/10 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextMonth} className="p-3 bg-black/5 rounded-full hover:bg-black/10 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4 mb-4 text-center">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
              <div key={day} className="text-xs font-bold tracking-widest uppercase opacity-50">{t(day)}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 md:gap-4">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
              const isSelected = date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear();
              const isToday = date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
              const dayEvents = getEventsForDate(date);

              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative transition-all ${
                    isSelected ? 'bg-ohawell-ink text-ohawell-base shadow-xl scale-110 z-10' : 
                    isToday ? 'bg-black/10 hover:bg-black/20' : 'hover:bg-black/5'
                  }`}
                >
                  <span className={`text-lg ${isSelected ? 'font-bold' : 'font-light'}`}>{i + 1}</span>
                  {dayEvents.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {dayEvents.slice(0, 3).map((e, idx) => (
                        <div key={idx} className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-ohawell-base' : getTypeColor(e.type).split(' ')[0]}`} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* AGENDA VIEW */}
        <div className="bg-white/5 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-black/10 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-serif text-3xl mb-1">{t('Agenda')}</h3>
              <p className="text-sm font-bold tracking-widest uppercase opacity-50">
                {selectedDate.toLocaleDateString('default', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
            <button 
              onClick={() => setIsAddingEvent(true)}
              className="p-3 bg-ohawell-ink text-ohawell-base rounded-full hover:scale-105 transition-transform shadow-lg"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            <AnimatePresence>
              {getEventsForDate(selectedDate).length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-12 opacity-50"
                >
                  <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="font-light">{t('No hay rituales programados para este día.')}</p>
                </motion.div>
              ) : (
                getEventsForDate(selectedDate).sort((a, b) => a.time.localeCompare(b.time)).map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`p-4 md:p-5 rounded-2xl border transition-all ${
                      event.completed ? 'opacity-60 border-black/10 bg-black/5' : `border-black/10 ${getTypeColor(event.type)}`
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 mb-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <button onClick={() => toggleEventCompletion(event.id)} className="mt-1 shrink-0">
                          {event.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <Circle className="w-5 h-5 opacity-50" />
                          )}
                        </button>
                        <h4 className={`font-serif text-lg md:text-xl leading-tight break-words ${event.completed ? 'line-through' : ''}`}>{t(event.title)}</h4>
                      </div>
                      <div className="flex items-center gap-1 opacity-70 text-xs md:text-sm font-bold tracking-widest shrink-0">
                        <Clock className="w-4 h-4" /> {event.time}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 ml-8">
                      <span className="flex items-center gap-1 text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-70">
                        {getTypeIcon(event.type)} {t(event.type)}
                      </span>
                      <button className="flex items-center gap-1 text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">
                        <Bell className="w-3 h-3" /> {t('Recordatorio')}
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ADD EVENT MODAL */}
      <AnimatePresence>
        {isAddingEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsAddingEvent(false)}
              className="absolute inset-0 bg-ohawell-ink/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-ohawell-base rounded-[3rem] p-10 shadow-2xl"
            >
              <h3 className="font-serif text-4xl mb-8">{t('Nuevo Ritual')}</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-2">{t('Título')}</label>
                  <input 
                    type="text" 
                    value={newEvent.title || ''}
                    onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                    className="w-full bg-black/5 border-none rounded-xl p-4 font-serif text-xl focus:ring-2 focus:ring-ohawell-ink"
                    placeholder={t("Ej. Focus Sprint Matutino")}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-2">{t('Hora')}</label>
                    <input 
                      type="time" 
                      value={newEvent.time || ''}
                      onChange={e => setNewEvent({...newEvent, time: e.target.value})}
                      className="w-full bg-black/5 border-none rounded-xl p-4 font-serif text-xl focus:ring-2 focus:ring-ohawell-ink"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-2">{t('Tipo')}</label>
                    <select 
                      value={newEvent.type}
                      onChange={e => setNewEvent({...newEvent, type: e.target.value as any})}
                      className="w-full bg-black/5 border-none rounded-xl p-4 font-serif text-xl focus:ring-2 focus:ring-ohawell-ink"
                    >
                      <option value="awaken">Awaken</option>
                      <option value="calm">Calm</option>
                      <option value="desire">Desire</option>
                      <option value="personal">Personal</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <button 
                    onClick={() => setIsAddingEvent(false)}
                    className="flex-1 py-4 rounded-full font-bold tracking-widest uppercase text-sm border border-black/20 hover:bg-black/5 transition-colors"
                  >
                    {t('Cancelar')}
                  </button>
                  <button 
                    onClick={handleAddEvent}
                    disabled={!newEvent.title || !newEvent.time}
                    className="flex-1 py-4 rounded-full font-bold tracking-widest uppercase text-sm bg-ohawell-ink text-ohawell-base hover:bg-black/80 transition-colors disabled:opacity-50"
                  >
                    {t('Guardar')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
