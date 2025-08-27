import { Home, Calendar, User } from 'lucide-react';
import './MobileTabBar.css';

interface MobileTabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileTabBar = ({ activeTab, onTabChange }: MobileTabBarProps) => {
  const tabs = [
    { id: 'events', icon: Calendar, label: 'События' },
    { id: 'home', icon: Home, label: 'Главная' },
    { id: 'profile', icon: User, label: 'Профиль' }
  ];

  return (
    <div className="mobile-tab-bar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon size={20} />
            <span className="tab-label">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MobileTabBar;
