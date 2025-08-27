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
    { value: 'clients', icon: 'Users', label: 'Клиенты' },
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
    <TabsList className="grid w-full grid-cols-13 mb-8">
      {navigationItems.map((item) => (
        <TabsTrigger key={item.value} value={item.value} className="flex items-center">
          <Icon name={item.icon as any} size={16} className="mr-2" />
          {item.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default Navigation;