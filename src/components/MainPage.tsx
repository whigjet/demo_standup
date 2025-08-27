import { useState } from 'react';
import EventCarousel from './EventCarousel';
import EventsPage from './EventsPage';
import ProfilePage from './ProfilePage';
import MobileTabBar from './MobileTabBar';
import './MainPage.css';

import bezteplohod from '../assets/images/bezteplohod.jpg';
import depo from '../assets/images/depo-1080-kvadratnyj-dlya-sajta-vse-biletnye.jpg';
import glavnaya from '../assets/images/glavnaya-proverka-kvadrat-5.jpg';
import chernyi from '../assets/images/CHERNYJ-STENDAP.webp';
import standup from '../assets/images/kvadrat-ekskursiya-1.jpg';

const MainPage = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [events] = useState([
        {
            id: 1,
            title: 'StandUp и Музыка на теплоходе',
            date: "27.08",
            time: '20:00',
            loacation: '«Теплоход «Ривьера»',
            addres: 'м. Лужники / прич. Лужники-Северный',
            image: bezteplohod,
        },
        {
            id: 2,
            title: 'StandUp на Крыше',
            date: '27.08',
            time: '19:30',
            loacation: '"Депо Лесная"',
            addres: 'м. Белорусская / Лесная 20с3',
            image: depo,
        },
        {
            id: 3,
            title: 'Главный Проверочный StandUp',
            date: "27.08",
            time: '20:00',
            loacation: '«Pub Daddy»',
            addres: 'м. Новокузнецкая / Б. Овчинниковский пер. 18с2',
            image: glavnaya,
        },
        {
            id: 4,
            title: 'Черный StandUp',
            date: '27.08',
            time: '20:00',
            loacation: '«ODonoghues pub»',
            addres: 'м. Новокузнецкая / Пятницкая 29',
            image: chernyi,
        },
        {
            id: 5,
            title: 'StandUp Экскурсия',
            date: "27.08",
            time: '10:00',
            loacation: '',
            addres: 'м. Китай-город / Встреча у памятника Кириллу и Мефодию',
            image: standup,
        }
    ]);

    const renderContent = () => {
        switch (activeTab) {
            case 'events':
                return <EventsPage />;
            case 'profile':
                return <ProfilePage />;
            default:
                return <EventCarousel events={events} />;
        }
    };

    return (
        <div className="main-page">
            {renderContent()}
            <MobileTabBar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
};

export default MainPage;