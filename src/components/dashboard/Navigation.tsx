import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  activeTab: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab }) => {
  const navigationItems = [
    { value: 'dashboard', icon: 'BarChart3', label: 'Дашборд' },
    { value: 'cases', icon: 'Scale', label: 'Дела' },
    { value: 'timeline', icon: 'GitBranch', label: 'Хронология' },
    { value: 'tasks', icon: 'CheckSquare', label: 'Задачи' },
    { value: 'clients', icon: 'Users', label: 'Клиенты' },
    { value: 'lawyers', icon: 'UserCheck', label: 'Юристы' },
    { value: 'billing', icon: 'CreditCard', label: 'Биллинг' },
    { value: 'expenses', icon: 'Receipt', label: 'Расходы' },
    { value: 'calendar', icon: 'Calendar', label: 'Календарь' },
    { value: 'documents', icon: 'FileText', label: 'Документы' },
    { value: 'history', icon: 'History', label: 'История' },
    { value: 'templates', icon: 'FileCheck', label: 'Шаблоны' },
    { value: 'notifications', icon: 'Bell', label: 'Уведомления' },
    { value: 'statistics', icon: 'TrendingUp', label: 'Статистика' },
    { value: 'settings', icon: 'Settings', label: 'Настройки' },
    { value: 'profile', icon: 'User', label: 'Профиль' }
  ];

  return (
    <div className="fixed left-0 top-[112px] h-[calc(100vh-112px)] w-64 bg-white border-r border-slate-200 overflow-y-auto z-40">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Дашборд</h2>
        <TabsList className="flex flex-col w-full h-auto bg-transparent p-0">
          {navigationItems.map((item) => (
            <TabsTrigger 
              key={item.value} 
              value={item.value} 
              className="w-full justify-start p-3 mb-1 text-left data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 hover:bg-slate-50"
            >
              <Icon name={item.icon as any} size={18} className="mr-3" />
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </div>
  );
};

export default Navigation;