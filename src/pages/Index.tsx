import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Мок данные
  const cases = [
    {
      id: 1,
      title: 'Дело о взыскании задолженности',
      number: '№ 2-1234/2024',
      status: 'В процессе',
      progress: 65,
      nextHearing: '2024-09-15',
      priority: 'high',
      court: 'Арбитражный суд г. Москвы',
      documents: 12,
      notifications: 3
    },
    {
      id: 2,
      title: 'Трудовой спор',
      number: '№ 2-5678/2024',
      status: 'Подготовка',
      progress: 30,
      nextHearing: '2024-09-20',
      priority: 'medium',
      court: 'Замоскворецкий районный суд',
      documents: 8,
      notifications: 1
    },
    {
      id: 3,
      title: 'Договорное право',
      number: '№ 2-9012/2024',
      status: 'Завершено',
      progress: 100,
      nextHearing: null,
      priority: 'low',
      court: 'Тверской районный суд',
      documents: 15,
      notifications: 0
    }
  ];

  const upcomingEvents = [
    {
      date: '2024-09-15',
      time: '10:00',
      title: 'Судебное заседание',
      case: 'Дело № 2-1234/2024',
      court: 'Арбитражный суд г. Москвы'
    },
    {
      date: '2024-09-18',
      time: '14:30',
      title: 'Подача документов',
      case: 'Дело № 2-5678/2024',
      court: 'Замоскворецкий районный суд'
    },
    {
      date: '2024-09-20',
      time: '11:15',
      title: 'Предварительное заседание',
      case: 'Дело № 2-5678/2024',
      court: 'Замоскворецкий районный суд'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'deadline',
      title: 'Приближается дедлайн',
      message: 'Подача возражения по делу № 2-1234/2024 до 16 сентября',
      time: '2 часа назад',
      urgent: true
    },
    {
      id: 2,
      type: 'hearing',
      title: 'Изменение даты заседания',
      message: 'Заседание по делу № 2-5678/2024 перенесено на 20 сентября',
      time: '5 часов назад',
      urgent: false
    },
    {
      id: 3,
      type: 'document',
      title: 'Новый документ',
      message: 'Получено определение суда по делу № 2-1234/2024',
      time: '1 день назад',
      urgent: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'В процессе': return 'bg-blue-500';
      case 'Подготовка': return 'bg-yellow-500';
      case 'Завершено': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Дашборд
            </TabsTrigger>
            <TabsTrigger value="cases" className="flex items-center">
              <Icon name="Scale" size={16} className="mr-2" />
              Дела
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center">
              <Icon name="Calendar" size={16} className="mr-2" />
              Календарь
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center">
              <Icon name="FileText" size={16} className="mr-2" />
              Документы
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Icon name="Bell" size={16} className="mr-2" />
              Уведомления
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center">
              <Icon name="TrendingUp" size={16} className="mr-2" />
              Статистика
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center">
              <Icon name="User" size={16} className="mr-2" />
              Профиль
            </TabsTrigger>
          </TabsList>

          {/* Дашборд */}
          <TabsContent value="dashboard" className="space-y-6 fade-in">
            {/* Статистические карточки */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Активные дела</CardTitle>
                  <Icon name="Scale" size={20} className="text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">+1 за месяц</p>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Заседания</CardTitle>
                  <Icon name="Calendar" size={20} className="text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">На этой неделе</p>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Документы</CardTitle>
                  <Icon name="FileText" size={20} className="text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">35</div>
                  <p className="text-xs text-muted-foreground">Всего файлов</p>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Уведомления</CardTitle>
                  <Icon name="Bell" size={20} className="text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">Требуют внимания</p>
                </CardContent>
              </Card>
            </div>

            {/* Активные дела и календарь */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Активные дела */}
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Scale" size={20} className="mr-2 text-primary" />
                    Активные дела
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cases.filter(c => c.status !== 'Завершено').map(case_ => (
                    <div key={case_.id} className={`p-4 rounded-lg border-l-4 ${getPriorityColor(case_.priority)}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{case_.title}</h4>
                          <p className="text-sm text-muted-foreground">{case_.number}</p>
                        </div>
                        <Badge className={`${getStatusColor(case_.status)} text-white`}>
                          {case_.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Прогресс</span>
                          <span>{case_.progress}%</span>
                        </div>
                        <Progress value={case_.progress} className="h-2" />
                        {case_.nextHearing && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Icon name="Calendar" size={14} className="mr-1" />
                            Следующее заседание: {new Date(case_.nextHearing).toLocaleDateString('ru-RU')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Предстоящие события */}
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Clock" size={20} className="mr-2 text-accent" />
                    Предстоящие события
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.slice(0, 4).map((event, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="text-center min-w-[60px]">
                        <div className="text-lg font-bold text-primary">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString('ru-RU', { month: 'short' })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">{event.case}</p>
                        <p className="text-xs text-muted-foreground">{event.time} • {event.court}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Дела */}
          <TabsContent value="cases" className="space-y-6 fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Все дела</h2>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить дело
              </Button>
            </div>
            
            <div className="grid gap-6">
              {cases.map(case_ => (
                <Card key={case_.id} className={`card-hover border-l-4 ${getPriorityColor(case_.priority)}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{case_.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{case_.number} • {case_.court}</p>
                      </div>
                      <Badge className={`${getStatusColor(case_.status)} text-white`}>
                        {case_.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Прогресс дела</span>
                          <span>{case_.progress}%</span>
                        </div>
                        <Progress value={case_.progress} className="h-2" />
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Icon name="FileText" size={16} className="mr-1 text-muted-foreground" />
                          <span className="text-sm">{case_.documents} документов</span>
                        </div>
                        <div className="flex items-center">
                          <Icon name="Bell" size={16} className="mr-1 text-muted-foreground" />
                          <span className="text-sm">{case_.notifications} уведомлений</span>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" size={14} className="mr-1" />
                          Просмотр
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Edit" size={14} className="mr-1" />
                          Редактировать
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Календарь */}
          <TabsContent value="calendar" className="space-y-6 fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Календарь</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Предстоящие события</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border hover:shadow-md transition-shadow">
                        <div className="text-center min-w-[70px] bg-primary/10 rounded-lg p-2">
                          <div className="text-lg font-bold text-primary">
                            {new Date(event.date).getDate()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(event.date).toLocaleDateString('ru-RU', { month: 'short' })}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">{event.case}</p>
                          <div className="flex items-center mt-2 space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Icon name="Clock" size={12} className="mr-1" />
                              {event.time}
                            </div>
                            <div className="flex items-center">
                              <Icon name="MapPin" size={12} className="mr-1" />
                              {event.court}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Icon name="Calendar" size={14} className="mr-1" />
                          Добавить в календарь
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Документы */}
          <TabsContent value="documents" className="space-y-6 fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Документы</h2>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Upload" size={16} className="mr-2" />
                Загрузить документ
              </Button>
            </div>

            <div className="grid gap-4">
              {[
                { name: 'Исковое заявление.pdf', case: 'Дело № 2-1234/2024', date: '15.08.2024', size: '2.1 MB' },
                { name: 'Возражение ответчика.docx', case: 'Дело № 2-1234/2024', date: '20.08.2024', size: '1.8 MB' },
                { name: 'Определение суда.pdf', case: 'Дело № 2-5678/2024', date: '25.08.2024', size: '856 KB' },
                { name: 'Протокол заседания.pdf', case: 'Дело № 2-9012/2024', date: '30.08.2024', size: '3.2 MB' }
              ].map((doc, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="FileText" size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{doc.name}</h4>
                        <p className="text-sm text-muted-foreground">{doc.case} • {doc.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">{doc.size}</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Icon name="Download" size={14} className="mr-1" />
                          Скачать
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" size={14} className="mr-1" />
                          Просмотр
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Уведомления */}
          <TabsContent value="notifications" className="space-y-6 fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Уведомления</h2>
              <Button variant="outline">
                <Icon name="Check" size={16} className="mr-2" />
                Отметить все как прочитанные
              </Button>
            </div>

            <div className="space-y-4">
              {notifications.map(notification => (
                <Card key={notification.id} className={`card-hover ${notification.urgent ? 'border-red-200 bg-red-50/50' : ''}`}>
                  <CardContent className="flex items-start space-x-4 p-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      notification.type === 'deadline' ? 'bg-red-100' :
                      notification.type === 'hearing' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      <Icon 
                        name={notification.type === 'deadline' ? 'AlertTriangle' : 
                              notification.type === 'hearing' ? 'Calendar' : 'FileText'} 
                        size={20} 
                        className={
                          notification.type === 'deadline' ? 'text-red-600' :
                          notification.type === 'hearing' ? 'text-blue-600' : 'text-green-600'
                        } 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{notification.title}</h4>
                        {notification.urgent && (
                          <Badge className="bg-red-500 text-white">Срочно</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Icon name="X" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Статистика */}
          <TabsContent value="statistics" className="space-y-6 fade-in">
            <h2 className="text-2xl font-bold">Статистика</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Статус дел</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        В процессе
                      </span>
                      <span className="font-semibold">1 (33%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        Подготовка
                      </span>
                      <span className="font-semibold">1 (33%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        Завершено
                      </span>
                      <span className="font-semibold">1 (33%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Активность по месяцам</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Август 2024</span>
                      <div className="flex items-center">
                        <div className="w-20 h-2 bg-gray-200 rounded mr-2">
                          <div className="w-16 h-2 bg-primary rounded"></div>
                        </div>
                        <span className="text-sm font-semibold">8 событий</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Сентябрь 2024</span>
                      <div className="flex items-center">
                        <div className="w-20 h-2 bg-gray-200 rounded mr-2">
                          <div className="w-12 h-2 bg-primary rounded"></div>
                        </div>
                        <span className="text-sm font-semibold">6 событий</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Настройки */}
          <TabsContent value="settings" className="space-y-6 fade-in">
            <h2 className="text-2xl font-bold">Настройки</h2>
            
            <div className="grid gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Уведомления</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Email уведомления</h4>
                      <p className="text-sm text-muted-foreground">Получать уведомления на электронную почту</p>
                    </div>
                    <Button variant="outline">Включить</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">SMS уведомления</h4>
                      <p className="text-sm text-muted-foreground">Срочные уведомления по SMS</p>
                    </div>
                    <Button variant="outline">Настроить</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Напоминания о дедлайнах</h4>
                      <p className="text-sm text-muted-foreground">За 3 дня до истечения срока</p>
                    </div>
                    <Button variant="outline">Изменить</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Интеграции</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Google Calendar</h4>
                      <p className="text-sm text-muted-foreground">Синхронизация с календарем Google</p>
                    </div>
                    <Button variant="outline">Подключить</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">1С: Предприятие</h4>
                      <p className="text-sm text-muted-foreground">Интеграция с системой учета</p>
                    </div>
                    <Button variant="outline">Настроить</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Профиль */}
          <TabsContent value="profile" className="space-y-6 fade-in">
            <h2 className="text-2xl font-bold">Профиль</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Личная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="/api/placeholder/80/80" />
                      <AvatarFallback className="text-xl">ЮК</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Изменить фото
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">ФИО</label>
                    <p className="text-sm text-muted-foreground">Юрий Консультант</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Должность</label>
                    <p className="text-sm text-muted-foreground">Старший юрист</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">lawyer@example.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 card-hover">
                <CardHeader>
                  <CardTitle>Статистика активности</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">15</div>
                      <div className="text-sm text-muted-foreground">Всего дел</div>
                    </div>
                    <div className="text-center p-4 bg-green-500/5 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">12</div>
                      <div className="text-sm text-muted-foreground">Выиграно</div>
                    </div>
                    <div className="text-center p-4 bg-accent/5 rounded-lg">
                      <div className="text-2xl font-bold text-accent">156</div>
                      <div className="text-sm text-muted-foreground">Документов</div>
                    </div>
                    <div className="text-center p-4 bg-blue-500/5 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">89%</div>
                      <div className="text-sm text-muted-foreground">Успешность</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;