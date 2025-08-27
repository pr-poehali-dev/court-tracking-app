import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { mockNotifications } from './types';

interface OtherTabsProps {
  onOpenSignatureLibrary: () => void;
  onOpenDocumentHistory: () => void;
}

const OtherTabs: React.FC<OtherTabsProps> = ({ onOpenSignatureLibrary, onOpenDocumentHistory }) => {
  return (
    <>
      {/* Уведомления */}
      <div className="space-y-6 fade-in">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Уведомления</h2>
          <Button variant="outline">
            <Icon name="Check" size={16} className="mr-2" />
            Отметить все как прочитанные
          </Button>
        </div>

        <div className="space-y-4">
          {mockNotifications.map(notification => (
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
      </div>

      {/* Статистика */}
      <div className="space-y-6 fade-in">
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
      </div>

      {/* Настройки */}
      <div className="space-y-6 fade-in">
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
              <CardTitle>Подписи и печати</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Библиотека подписей</h4>
                  <p className="text-sm text-muted-foreground">Управление цифровыми подписями</p>
                </div>
                <Button variant="outline" onClick={onOpenSignatureLibrary}>
                  <Icon name="PenTool" size={16} className="mr-2" />
                  Открыть
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Официальные печати</h4>
                  <p className="text-sm text-muted-foreground">Настройка печатей организации</p>
                </div>
                <Button variant="outline" onClick={onOpenSignatureLibrary}>
                  <Icon name="Stamp" size={16} className="mr-2" />
                  Управление
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Автоматическая вставка</h4>
                  <p className="text-sm text-muted-foreground">Вставлять подписи в документы автоматически</p>
                </div>
                <Button variant="outline">Включить</Button>
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
      </div>

      {/* Профиль */}
      <div className="space-y-6 fade-in">
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
      </div>

      {/* История документов */}
      <div className="space-y-6 fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">История документов</h2>
          <Button onClick={onOpenDocumentHistory}>
            <Icon name="History" size={16} className="mr-2" />
            Открыть полную историю
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Быстрая статистика */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="FileText" size={20} className="mr-2 text-blue-600" />
                Недавние документы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Договор аренды</span>
                <Badge className="bg-green-100 text-green-700">Готов</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Исковое заявление</span>
                <Badge className="bg-blue-100 text-blue-700">Отправлен</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Трудовой договор</span>
                <Badge className="bg-gray-100 text-gray-700">Черновик</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2" onClick={onOpenDocumentHistory}>
                Показать все
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="TrendingUp" size={20} className="mr-2 text-green-600" />
                Статистика за месяц
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Создано документов:</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Завершено:</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">В работе:</span>
                <span className="font-semibold">4</span>
              </div>
              <div className="pt-2">
                <div className="text-xs text-muted-foreground mb-1">Прогресс</div>
                <Progress value={67} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Users" size={20} className="mr-2 text-purple-600" />
                По клиентам
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">ООО "Альфа"</span>
                <span className="text-xs text-muted-foreground">5 док.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Иванов И.И.</span>
                <span className="text-xs text-muted-foreground">3 док.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">ИП Петров</span>
                <span className="text-xs text-muted-foreground">2 док.</span>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2">
                <Icon name="BarChart3" size={16} className="mr-2" />
                Подробная статистика
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Последние документы */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Недавно созданные документы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: 'Договор аренды офисного помещения', client: 'ООО "Альфа"', date: '25.08.2024', status: 'completed' },
                { title: 'Исковое заявление о взыскании долга', client: 'Иванов И.И.', date: '22.08.2024', status: 'sent' },
                { title: 'Трудовой договор с менеджером', client: 'ИП Петров', date: '26.08.2024', status: 'draft' },
                { title: 'Устав ООО "Новые технологии"', client: 'ООО "Новые технологии"', date: '20.08.2024', status: 'completed' }
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div className="flex-1">
                    <div className="font-medium">{doc.title}</div>
                    <div className="text-sm text-muted-foreground">{doc.client} • {doc.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={
                      doc.status === 'completed' ? 'bg-green-100 text-green-700' :
                      doc.status === 'sent' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }>
                      {doc.status === 'completed' ? 'Готов' : 
                       doc.status === 'sent' ? 'Отправлен' : 'Черновик'}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Icon name="Eye" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-4">
              <Button variant="outline" onClick={onOpenDocumentHistory}>
                <Icon name="History" size={16} className="mr-2" />
                Открыть полную историю
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OtherTabs;