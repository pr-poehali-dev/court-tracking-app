import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const Header: React.FC = () => {
  return (
    <header className="gradient-bg text-white p-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Icon name="Scale" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Legal Tracker</h1>
            <p className="text-blue-100">Система отслеживания судебных дел</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
            <Icon name="Bell" size={16} className="mr-2" />
            Уведомления
            <Badge className="ml-2 bg-red-500 text-white">3</Badge>
          </Button>
          <Avatar>
            <AvatarImage src="/api/placeholder/32/32" />
            <AvatarFallback className="bg-white/20 text-white">ЮК</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;