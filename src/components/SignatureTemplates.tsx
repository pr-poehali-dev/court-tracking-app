import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import TemplatesList from '@/components/signature-templates/TemplatesList';
import TemplateEditor from '@/components/signature-templates/TemplateEditor';
import { SignatureTemplate, SignaturePosition, mockTemplates } from '@/components/signature-templates/types';

interface SignatureTemplatesProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignatureTemplates: React.FC<SignatureTemplatesProps> = ({ isOpen, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<SignatureTemplate | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [templateForm, setTemplateForm] = useState({
    name: '',
    description: '',
    documentType: '',
    category: 'custom'
  });
  const [editorPositions, setEditorPositions] = useState<SignaturePosition[]>([]);

  const handleCreateTemplate = () => {
    setIsCreating(true);
    setTemplateForm({
      name: '',
      description: '',
      documentType: '',
      category: 'custom'
    });
    setEditorPositions([]);
  };

  const handleSaveTemplate = () => {
    console.log('Saving template:', templateForm, editorPositions);
    setIsCreating(false);
  };

  const handleCancelCreation = () => {
    setIsCreating(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Layout" size={24} />
            Шаблоны расположения подписей
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="templates">Шаблоны</TabsTrigger>
            <TabsTrigger value="editor">Редактор</TabsTrigger>
          </TabsList>

          {/* Список шаблонов */}
          <TabsContent value="templates">
            <TemplatesList
              templates={mockTemplates}
              onCreateTemplate={handleCreateTemplate}
              onSelectTemplate={setSelectedTemplate}
            />
          </TabsContent>

          {/* Редактор шаблонов */}
          <TabsContent value="editor" className="space-y-4 max-h-[70vh] overflow-hidden">
            <TemplateEditor
              isCreating={isCreating}
              templateForm={templateForm}
              setTemplateForm={setTemplateForm}
              editorPositions={editorPositions}
              setEditorPositions={setEditorPositions}
              onCreateTemplate={handleCreateTemplate}
              onSaveTemplate={handleSaveTemplate}
              onCancelCreation={handleCancelCreation}
            />
          </TabsContent>
        </Tabs>

        {/* Действия */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {isCreating ? 'Создание нового шаблона' : `${mockTemplates.length} шаблонов`}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Icon name="Import" size={16} className="mr-2" />
              Импорт
            </Button>
            <Button onClick={onClose}>
              Закрыть
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignatureTemplates;