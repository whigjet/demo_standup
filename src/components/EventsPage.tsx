import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Filter, ChevronDown } from 'lucide-react';
import './EventsPage.css';

import bezteplohod from '../assets/images/bezteplohod.jpg';
import depo from '../assets/images/depo-1080-kvadratnyj-dlya-sajta-vse-biletnye.jpg';
import glavnaya from '../assets/images/glavnaya-proverka-kvadrat-5.jpg';
import chernyi from '../assets/images/CHERNYJ-STENDAP.webp';
import standup from '../assets/images/kvadrat-ekskursiya-1.jpg';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  image: string;
  price: string;
  available: boolean;
}

const EventsPage = () => {
  const [selectedDate, setSelectedDate] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const events: Event[] = [
    {
      id: 1,
      title: 'StandUp и Музыка на теплоходе',
      date: '2025-09-01',
      time: '20:00',
      location: 'Теплоход «Ривьера»',
      address: 'м. Лужники / прич. Лужники-Северный',
      image: bezteplohod,
      price: 'от 1500 ₽',
      available: true
    },
    {
      id: 2,
      title: 'StandUp на Крыше',
      date: '2025-09-01',
      time: '19:30',
      location: 'Депо Лесная',
      address: 'м. Белорусская / Лесная 20с3',
      image: depo,
      price: 'от 1200 ₽',
      available: true
    },
    {
      id: 3,
      title: 'Главный Проверочный StandUp',
      date: '2025-09-05',
      time: '20:00',
      location: 'Pub Daddy',
      address: 'м. Новокузнецкая / Б. Овчинниковский пер. 18с2',
      image: glavnaya,
      price: 'от 1000 ₽',
      available: true
    },
    {
      id: 4,
      title: 'Черный StandUp',
      date: '2025-09-10',
      time: '20:00',
      location: 'ODonoghues pub',
      address: 'м. Новокузнецкая / Пятницкая 29',
      image: chernyi,
      price: 'от 800 ₽',
      available: false
    },
    {
      id: 5,
      title: 'StandUp Экскурсия',
      date: '2025-09-19',
      time: '10:00',
      location: 'Памятник Кириллу и Мефодию',
      address: 'м. Китай-город / Встреча у памятника',
      image: standup,
      price: 'от 2000 ₽',
      available: true
    },
    {
      id: 6,
      title: 'Вечерний StandUp',
      date: '2025-09-14',
      time: '21:00',
      location: 'Теплоход «Ривьера»',
      address: 'м. Лужники / прич. Лужники-Северный',
      image: bezteplohod,
      price: 'от 1800 ₽',
      available: true
    },
    {
      id: 7,
      title: 'Утренний StandUp',
      date: '2025-09-21',
      time: '12:00',
      location: 'Депо Лесная',
      address: 'м. Белорусская / Лесная 20с3',
      image: depo,
      price: 'от 900 ₽',
      available: true
    },
    {
      id: 8,
      title: 'Ночной StandUp',
      date: '2025-09-21',
      time: '23:00',
      location: 'Pub Daddy',
      address: 'м. Новокузнецкая / Б. Овчинниковский пер. 18с2',
      image: glavnaya,
      price: 'от 1500 ₽',
      available: true
    }
  ];

  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(events.map(event => event.location))];
    return uniqueLocations;
  }, []);

  const dates = useMemo(() => {
    const uniqueDates = [...new Set(events.map(event => event.date))];
    return uniqueDates.sort();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const dateMatch = selectedDate === 'all' || event.date === selectedDate;
      const locationMatch = selectedLocation === 'all' || event.location === selectedLocation;
      return dateMatch && locationMatch;
    });
  }, [events, selectedDate, selectedLocation]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  return (
    <div className="events-page">
      <div className="container">
        <div className="events-header">
          <h1 className="section-title">События</h1>
          <p className="page-subtitle">Выберите интересное мероприятие и забронируйте билеты</p>
        </div>

        <div className="filters-section">
          <button 
            className="filter-toggle"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={20} />
            Фильтры
            <ChevronDown size={16} className={isFilterOpen ? 'rotated' : ''} />
          </button>

          <motion.div 
            className={`filters ${isFilterOpen ? 'open' : ''}`}
            initial={false}
            animate={{ height: isFilterOpen ? 'auto' : 0, opacity: isFilterOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="filter-group">
              <label>Дата:</label>
              <select 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
                className="filter-select"
              >
                <option value="all">Все даты</option>
                {dates.map(date => (
                  <option key={date} value={date}>
                    {formatDate(date)}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Место:</label>
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="filter-select"
              >
                <option value="all">Все места</option>
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>

        <div className="events-grid">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="event-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="event-image">
                <img src={event.image} alt={event.title} />
                {!event.available && (
                  <div className="sold-out-badge">Продано</div>
                )}
                <div className="event-overlay">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary"
                    disabled={!event.available}
                  >
                    {event.available ? 'Купить билет' : 'Недоступно'}
                  </motion.button>
                </div>
              </div>

              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                
                <div className="event-details">
                  <div className="event-detail">
                    <Calendar className="detail-icon" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="event-detail">
                    <Clock className="detail-icon" />
                    <span>{formatTime(event.time)}</span>
                  </div>
                  <div className="event-detail">
                    <MapPin className="detail-icon" />
                    <span>{event.location}</span>
                  </div>
                  <div className="event-detail">
                    <Users className="detail-icon" />
                    <span>{event.address}</span>
                  </div>
                </div>

                <div className="event-footer">
                  <div className="event-price">{event.price}</div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary"
                    disabled={!event.available}
                  >
                    {event.available ? 'Забронировать' : 'Недоступно'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="no-events">
            <p>По выбранным фильтрам события не найдены</p>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setSelectedDate('all');
                setSelectedLocation('all');
              }}
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
