import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import SignatureTemplates from '@/components/SignatureTemplates';

interface SignatureLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSignature?: (signature: any) => void;
  onSelectSeal?: (seal: any) => void;
}

const SignatureLibrary = ({ isOpen, onClose, onSelectSignature, onSelectSeal }: SignatureLibraryProps) => {
  const [activeTab, setActiveTab] = useState('signatures');
  const [isCreateSignatureOpen, setIsCreateSignatureOpen] = useState(false);
  const [isCreateSealOpen, setIsCreateSealOpen] = useState(false);
  const [isSignatureTemplatesOpen, setIsSignatureTemplatesOpen] = useState(false);
  const [signatureFormData, setSignatureFormData] = useState({
    name: '',
    position: '',
    style: 'handwritten',
    color: '#000000'
  });

  // Мок данные для подписей
  const signatures = [
    {
      id: 1,
      name: 'Иванов И.И.',
      position: 'Генеральный директор',
      style: 'handwritten',
      color: '#000000',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjAwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTAgMzBRMzAgMTAgNTAgMzBUOTAgMzBRMTEwIDUwIDEzMCAzMFQxNzAgMzAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+Cjx0ZXh0IHg9IjEwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjMDAwIj5JdmFub3YgSS5JLjwvdGV4dD4KPHN2Zz4=',
      createdAt: '2024-08-15',
      isActive: true
    },
    {
      id: 2,
      name: 'Петров П.П.',
      position: 'Юрист',
      style: 'typed',
      color: '#1e40af',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjAwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8dGV4dCB4PSIxMCIgeT0iMzAiIGZvbnQtZmFtaWx5PSJUaW1lcyBOZXcgUm9tYW4iIGZvbnQtc2l6ZT0iMTgiIGZvbnQtc3R5bGU9Iml0YWxpYyIgZmlsbD0iIzFlNDBhZiI+UGV0cm92IFAuUC48L3RleHQ+Cjx0ZXh0IHg9IjEwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNjY2Ij7QrtGA0LjRgdGCPC90ZXh0Pgo8L3N2Zz4=',
      createdAt: '2024-08-20',
      isActive: true
    },
    {
      id: 3,
      name: 'Сидоров С.С.',
      position: 'Старший партнер',
      style: 'calligraphy',
      color: '#059669',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjAwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTAgMjVRMjAgMTUgMzAgMjVRNDAgMzUgNTAgMjVRNjAgMTUgNzAgMjVRODAgMzUgOTAgMjVRMTAwIDE1IDExMCAyNVExMjAgMzUgMTMwIDI1UTE0MCAzNSAxNTAgMjVRMTYwIDE1IDE3MCAyNSIgc3Ryb2tlPSIjMDU5NjY5IiBzdHJva2Utd2lkdGg9IjIuNSIgZmlsbD0ibm9uZSIvPgo8dGV4dCB4PSIxMCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzA1OTY2OSI+U2lkb3JvdiBTLlMuPC90ZXh0Pgo8L3N2Zz4=',
      createdAt: '2024-08-22',
      isActive: false
    }
  ];

  // Мок данные для печатей
  const seals = [
    {
      id: 1,
      name: 'Печать организации',
      type: 'round',
      text: 'ООО "ЮРИДИЧЕСКАЯ КОМПАНИЯ"',
      size: 'large',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjQ1IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIzNSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz4KPHN2Zz4=',
      createdAt: '2024-07-10',
      isActive: true
    },
    {
      id: 2,
      name: 'Печать для договоров',
      type: 'rectangular',
      text: 'УТВЕРЖДАЮ',
      size: 'medium',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iMTEwIiBoZWlnaHQ9IjcwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8dGV4dCB4PSI2MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwMCI+0KPQotCS0JXQoNCW0JTQkNCu0KY8L3RleHQ+Cjwvc3ZnPg==',
      createdAt: '2024-07-15',
      isActive: true
    },
    {
      id: 3,
      name: 'Личная печать',
      type: 'round',
      text: 'ИВАНОВ И.И. АДВОКАТ',
      size: 'small',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjgiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIGZpbGw9Im5vbmUiLz4KPHN2Zz4=',
      createdAt: '2024-08-01',
      isActive: true
    }
  ];

  const signatureStyles = [
    { id: 'handwritten', name: 'Рукописная', description: 'Имитация рукописной подписи' },
    { id: 'typed', name: 'Печатная', description: 'Стилизованный текст' },
    { id: 'calligraphy', name: 'Каллиграфическая', description: 'Художественный стиль' },
    { id: 'minimalist', name: 'Минималистская', description: 'Простые линии' }
  ];

  const handleCreateSignature = () => {
    // Логика создания подписи
    console.log('Создание подписи:', signatureFormData);
    setIsCreateSignatureOpen(false);
    setSignatureFormData({ name: '', position: '', style: 'handwritten', color: '#000000' });
  };

  const handleSelectSignature = (signature: any) => {
    if (onSelectSignature) {
      onSelectSignature(signature);
    }
    onClose();
  };

  const handleSelectSeal = (seal: any) => {
    if (onSelectSeal) {
      onSelectSeal(seal);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Icon name="PenTool" size={20} className="text-primary" />
            <span>Библиотека подписей и печатей</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="signatures" className="flex items-center">
              <Icon name="PenTool" size={16} className="mr-2" />
              Подписи
            </TabsTrigger>
            <TabsTrigger value="seals" className="flex items-center">
              <Icon name="Stamp" size={16} className="mr-2" />
              Печати
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center">
              <Icon name="Layout" size={16} className="mr-2" />
              Шаблоны
            </TabsTrigger>
          </TabsList>

          {/* Подписи */}
          <TabsContent value="signatures" className="space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Цифровые подписи</h3>
                <p className="text-sm text-muted-foreground">Управление электронными подписями</p>
              </div>
              <Dialog open={isCreateSignatureOpen} onOpenChange={setIsCreateSignatureOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Создать подпись
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Создание новой подписи</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="sig-name">ФИО</Label>
                        <Input
                          id="sig-name"
                          placeholder="Введите ФИО"
                          value={signatureFormData.name}
                          onChange={(e) => setSignatureFormData(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="sig-position">Должность</Label>
                        <Input
                          id="sig-position"
                          placeholder="Введите должность"
                          value={signatureFormData.position}
                          onChange={(e) => setSignatureFormData(prev => ({ ...prev, position: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="sig-style">Стиль подписи</Label>
                        <Select value={signatureFormData.style} onValueChange={(value) => setSignatureFormData(prev => ({ ...prev, style: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {signatureStyles.map(style => (
                              <SelectItem key={style.id} value={style.id}>
                                {style.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="sig-color">Цвет</Label>
                        <Input
                          id="sig-color"
                          type="color"
                          value={signatureFormData.color}
                          onChange={(e) => setSignatureFormData(prev => ({ ...prev, color: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label>Предварительный просмотр</Label>
                      <Card className="p-4">
                        <div className="h-32 flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded">
                          <div className="text-center">
                            <div className="font-semibold text-lg" style={{ color: signatureFormData.color }}>
                              {signatureFormData.name || 'Ваша подпись'}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {signatureFormData.position || 'Должность'}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <Button variant="outline" onClick={() => setIsCreateSignatureOpen(false)}>
                      Отменить
                    </Button>
                    <Button onClick={handleCreateSignature}>
                      Создать подпись
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {signatures.map(signature => (
                <Card key={signature.id} className="card-hover cursor-pointer" onClick={() => handleSelectSignature(signature)}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">{signature.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{signature.position}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {signature.isActive && (
                          <Badge className="bg-green-500 text-white">Активна</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="h-16 bg-gray-50 rounded flex items-center justify-center border">
                      <img 
                        src={signature.preview} 
                        alt={signature.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Создана: {signature.createdAt}</span>
                      <Badge variant="outline">
                        {signatureStyles.find(s => s.id === signature.style)?.name}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Edit" size={14} className="mr-1" />
                        Редактировать
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Download" size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Печати */}
          <TabsContent value="seals" className="space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Печати и штампы</h3>
                <p className="text-sm text-muted-foreground">Управление официальными печатями</p>
              </div>
              <Dialog open={isCreateSealOpen} onOpenChange={setIsCreateSealOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Создать печать
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Создание новой печати</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="seal-name">Название печати</Label>
                        <Input
                          id="seal-name"
                          placeholder="Например: Печать организации"
                        />
                      </div>
                      <div>
                        <Label htmlFor="seal-text">Текст печати</Label>
                        <Textarea
                          id="seal-text"
                          placeholder="Текст, который будет отображаться на печати"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="seal-type">Тип печати</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип печати" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="round">Круглая</SelectItem>
                            <SelectItem value="rectangular">Прямоугольная</SelectItem>
                            <SelectItem value="triangular">Треугольная</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="seal-size">Размер</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите размер" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Малый (40мм)</SelectItem>
                            <SelectItem value="medium">Средний (50мм)</SelectItem>
                            <SelectItem value="large">Большой (65мм)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label>Предварительный просмотр</Label>
                      <Card className="p-4">
                        <div className="h-32 flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded">
                          <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center">
                            <span className="text-xs text-center">Печать</span>
                          </div>
                        </div>
                      </Card>
                      <div className="space-y-2">
                        <Label>Загрузить изображение печати</Label>
                        <Input type="file" accept="image/*" />
                        <p className="text-xs text-muted-foreground">
                          Поддерживаются форматы: PNG, JPG, SVG
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <Button variant="outline" onClick={() => setIsCreateSealOpen(false)}>
                      Отменить
                    </Button>
                    <Button>
                      Создать печать
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {seals.map(seal => (
                <Card key={seal.id} className="card-hover cursor-pointer" onClick={() => handleSelectSeal(seal)}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{seal.name}</CardTitle>
                      {seal.isActive && (
                        <Badge className="bg-green-500 text-white text-xs">Активна</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="h-20 bg-gray-50 rounded flex items-center justify-center border">
                      <img 
                        src={seal.preview} 
                        alt={seal.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div>Тип: {seal.type === 'round' ? 'Круглая' : 'Прямоугольная'}</div>
                      <div>Размер: {seal.size === 'large' ? 'Большой' : seal.size === 'medium' ? 'Средний' : 'Малый'}</div>
                      <div>Создана: {seal.createdAt}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Edit" size={12} className="mr-1" />
                        Изменить
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Download" size={12} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Шаблоны расположения */}
          <TabsContent value="templates" className="space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Шаблоны расположения подписей</h3>
                <p className="text-sm text-muted-foreground">Управление позиционированием в документах</p>
              </div>
              <Button onClick={() => setIsSignatureTemplatesOpen(true)}>
                <Icon name="Layout" size={16} className="mr-2" />
                Управление шаблонами
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Быстрые шаблоны */}
              {[
                {
                  id: '1',
                  name: 'Стандартный договор',
                  description: 'Подпись справа, печать слева',
                  documentType: 'Договор',
                  positions: 2,
                  isDefault: true
                },
                {
                  id: '2',
                  name: 'Исковое заявление',
                  description: 'Подпись заявителя внизу',
                  documentType: 'Исковое заявление',
                  positions: 1,
                  isDefault: true
                },
                {
                  id: '3',
                  name: 'Трудовой договор',
                  description: 'Две подписи + печать HR',
                  documentType: 'Трудовой договор',
                  positions: 3,
                  isDefault: true
                }
              ].map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm flex items-center gap-2">
                        {template.name}
                        {template.isDefault && (
                          <Badge variant="secondary" className="text-xs">По умолчанию</Badge>
                        )}
                      </CardTitle>
                    </div>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    {/* Превью шаблона */}
                    <div className="relative bg-gray-50 rounded h-16 border">
                      <div className="absolute inset-1 bg-white rounded border">
                        {/* Примеры позиций */}
                        {template.id === '1' && (
                          <>
                            <div className="absolute bottom-1 right-1 w-4 h-2 bg-blue-200 border border-blue-400 rounded text-xs"></div>
                            <div className="absolute bottom-1 left-1 w-3 h-3 bg-green-200 border border-green-400 rounded-full"></div>
                          </>
                        )}
                        {template.id === '2' && (
                          <div className="absolute bottom-1 right-2 w-5 h-1 bg-blue-200 border border-blue-400 rounded"></div>
                        )}
                        {template.id === '3' && (
                          <>
                            <div className="absolute bottom-1 left-1 w-3 h-1 bg-blue-200 border border-blue-400 rounded"></div>
                            <div className="absolute bottom-1 right-1 w-3 h-1 bg-blue-200 border border-blue-400 rounded"></div>
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-200 border border-green-400 rounded-full"></div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{template.documentType}</span>
                      <span>{template.positions} позиций</span>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Eye" size={12} className="mr-1" />
                        Применить
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Copy" size={12} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                    <Icon name="Plus" size={20} />
                    <div className="text-center">
                      <div className="font-medium">Создать новый шаблон</div>
                      <div className="text-xs text-muted-foreground">Настройте расположение подписей</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                    <Icon name="Import" size={20} />
                    <div className="text-center">
                      <div className="font-medium">Импорт шаблона</div>
                      <div className="text-xs text-muted-foreground">Загрузить из файла</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Компонент управления шаблонами */}
        <SignatureTemplates
          isOpen={isSignatureTemplatesOpen}
          onClose={() => setIsSignatureTemplatesOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SignatureLibrary;