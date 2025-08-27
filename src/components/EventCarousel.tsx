import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock, Users } from 'lucide-react';
import './EventCarousel.css';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  loacation: string;
  addres: string;
  image: string;
}

interface EventCarouselProps {
  events: Event[];
}

const EventCarousel = ({ events }: EventCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((current + 1) % events.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((current - 1 + events.length) % events.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const currentEvent = events[current];

  return (
    <section className="events-section" id="events">
      <div className="container">
        <h2 className="section-title">Ближайшие мероприятия</h2>
        <p className="section-subtitle">
          Выберите интересное событие и забронируйте билеты прямо сейчас
        </p>
        
        <div className="carousel-wrapper">
          <div className="carousel-container">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current}
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="carousel-item"
              >
                <div className="event-card">
                  <div className="event-image">
                    <img src={currentEvent.image} alt={currentEvent.title} />
                    <div className="event-overlay">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-primary"
                      >
                        Купить билет
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="event-content">
                    <h3 className="event-title">{currentEvent.title}</h3>
                    
                    <div className="event-details">
                      <div className="event-detail">
                        <Calendar className="detail-icon" />
                        <span>{currentEvent.date}</span>
                      </div>
                      <div className="event-detail">
                        <Clock className="detail-icon" />
                        <span>{currentEvent.time}</span>
                      </div>
                      <div className="event-detail">
                        <MapPin className="detail-icon" />
                        <span>{currentEvent.loacation}</span>
                      </div>
                      <div className="event-detail">
                        <Users className="detail-icon" />
                        <span>{currentEvent.addres}</span>
                      </div>
                    </div>
                    
                    <div className="event-actions">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-primary"
                      >
                        Забронировать
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-secondary"
                      >
                        Подробнее
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <button className="carousel-btn prev" onClick={prev}>
            <ChevronLeft size={24} />
          </button>
          <button className="carousel-btn next" onClick={next}>
            <ChevronRight size={24} />
          </button>
          
          <div className="carousel-indicators">
            {events.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === current ? 'active' : ''}`}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCarousel;