import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Settings, 
  LogOut, 
  Crown,
  Star,
  Heart,
  Clock,
  CreditCard,
  Bell,
  Shield,
  HelpCircle
} from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';
import './ProfilePage.css';

interface Ticket {
  id: number;
  eventTitle: string;
  date: string;
  location: string;
  status: 'active' | 'used' | 'cancelled';
  price: string;
}

const ProfilePage = () => {
  const { user, isReady, showAlert, hapticFeedback, isTelegramEnv } = useTelegram();
  const [activeTab, setActiveTab] = useState<'profile' | 'tickets' | 'settings'>('profile');

  const mockTickets: Ticket[] = [
    {
      id: 1,
      eventTitle: 'StandUp и Музыка на теплоходе',
      date: '27.09.2025',
      location: 'Теплоход «Ривьера»',
      status: 'active',
      price: '1500 ₽'
    },
    {
      id: 2,
      eventTitle: 'StandUp на Крыше',
      date: '01.09.2025',
      location: 'Депо Лесная',
      status: 'used',
      price: '1200 ₽'
    },
    {
      id: 3,
      eventTitle: 'Главный Проверочный StandUp',
      date: '05.09.2025',
      location: 'Pub Daddy',
      status: 'active',
      price: '1000 ₽'
    }
  ];

  const handleTabChange = (tab: 'profile' | 'tickets' | 'settings') => {
    setActiveTab(tab);
    hapticFeedback.selectionChanged();
  };

  const handleLogout = async () => {
    hapticFeedback.impactOccurred('medium');
    showAlert('Функция выхода будет добавлена позже');
  };

  const handleContactSupport = () => {
    hapticFeedback.impactOccurred('light');
    showAlert('Служба поддержки: @standup_support');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#27ae60';
      case 'used': return '#7f8c8d';
      case 'cancelled': return '#e74c3c';
      default: return '#7f8c8d';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активен';
      case 'used': return 'Использован';
      case 'cancelled': return 'Отменен';
      default: return 'Неизвестно';
    }
  };

  if (!isReady) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Загрузка профиля...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1 className="page-title">Профиль</h1>
          {!isTelegramEnv && (
            <div className="demo-indicator">
              <span>Демо-режим</span>
            </div>
          )}
        </div>

        <div className="profile-tabs">
          <button
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => handleTabChange('profile')}
          >
            <User size={20} />
            <span>Профиль</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'tickets' ? 'active' : ''}`}
            onClick={() => handleTabChange('tickets')}
          >
            <Calendar size={20} />
            <span>Билеты</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => handleTabChange('settings')}
          >
            <Settings size={20} />
            <span>Настройки</span>
          </button>
        </div>

        <div className="profile-content">
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="profile-info"
            >
              <div className="user-card">
                <div className="user-avatar">
                  {user?.photo_url ? (
                    <img src={user.photo_url} alt="Avatar" />
                  ) : (
                    <div className="avatar-placeholder">
                      <User size={40} />
                    </div>
                  )}
                  {user?.is_premium && (
                    <div className="premium-badge">
                      <Crown size={16} />
                    </div>
                  )}
                </div>
                
                <div className="user-details">
                  <h2 className="user-name">
                    {user?.first_name} {user?.last_name}
                  </h2>
                  {user?.username && (
                    <p className="user-username">@{user.username}</p>
                  )}
                  <p className="user-id">ID: {user?.id}</p>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <Calendar size={24} />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{mockTickets.length}</div>
                    <div className="stat-label">Билетов</div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">
                    <Star size={24} />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">12</div>
                    <div className="stat-label">Посещений</div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">
                    <Heart size={24} />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">5</div>
                    <div className="stat-label">Избранных</div>
                  </div>
                </div>
              </div>

              <div className="contact-info">
                <h3>Контактная информация</h3>
                <div className="contact-item">
                  <Phone size={20} />
                  <span>+7 (***) ***-**-**</span>
                </div>
                <div className="contact-item">
                  <Mail size={20} />
                  <span>user@example.com</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'tickets' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="tickets-section"
            >
              <h3>Мои билеты</h3>
              <div className="tickets-list">
                {mockTickets.map((ticket) => (
                  <motion.div
                    key={ticket.id}
                    className="ticket-card"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="ticket-header">
                      <h4>{ticket.eventTitle}</h4>
                      <span 
                        className="ticket-status"
                        style={{ color: getStatusColor(ticket.status) }}
                      >
                        {getStatusText(ticket.status)}
                      </span>
                    </div>
                    
                    <div className="ticket-details">
                      <div className="ticket-detail">
                        <Clock size={16} />
                        <span>{ticket.date}</span>
                      </div>
                      <div className="ticket-detail">
                        <MapPin size={16} />
                        <span>{ticket.location}</span>
                      </div>
                      <div className="ticket-detail">
                        <CreditCard size={16} />
                        <span>{ticket.price}</span>
                      </div>
                    </div>
                    
                    {ticket.status === 'active' && (
                      <button className="btn btn-primary ticket-action">
                        Показать QR-код
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="settings-section"
            >
              <h3>Настройки</h3>
              <div className="settings-list">
                <button className="setting-item">
                  <div className="setting-icon">
                    <Bell size={20} />
                  </div>
                  <div className="setting-content">
                    <span>Уведомления</span>
                    <small>Настройки уведомлений</small>
                  </div>
                </button>
                
                <button className="setting-item">
                  <div className="setting-icon">
                    <Shield size={20} />
                  </div>
                  <div className="setting-content">
                    <span>Безопасность</span>
                    <small>Настройки безопасности</small>
                  </div>
                </button>
                
                <button className="setting-item" onClick={handleContactSupport}>
                  <div className="setting-icon">
                    <HelpCircle size={20} />
                  </div>
                  <div className="setting-content">
                    <span>Поддержка</span>
                    <small>Связаться с поддержкой</small>
                  </div>
                </button>
                
                <button className="setting-item" onClick={handleLogout}>
                  <div className="setting-icon">
                    <LogOut size={20} />
                  </div>
                  <div className="setting-content">
                    <span>Выйти</span>
                    <small>Выйти из аккаунта</small>
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
