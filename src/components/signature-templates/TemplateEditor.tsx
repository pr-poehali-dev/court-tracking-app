import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import TemplateForm from './TemplateForm';
import VisualEditor from './VisualEditor';
import { SignaturePosition } from './types';

interface TemplateEditorProps {
  isCreating: boolean;
  templateForm: {
    name: string;
    description: string;
    documentType: string;
    category: string;
  };
  setTemplateForm: React.Dispatch<React.SetStateAction<{
    name: string;
    description: string;
    documentType: string;
    category: string;
  }>>;
  editorPositions: SignaturePosition[];
  setEditorPositions: React.Dispatch<React.SetStateAction<SignaturePosition[]>>;
  onCreateTemplate: () => void;
  onSaveTemplate: () => void;
  onCancelCreation: () => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({
  isCreating,
  templateForm,
  setTemplateForm,
  editorPositions,
  setEditorPositions,
  onCreateTemplate,
  onSaveTemplate,
  onCancelCreation
}) => {
  const addSignaturePosition = (type: 'signature' | 'stamp' | 'seal') => {
    const newPosition: SignaturePosition = {
      id: `pos_${Date.now()}`,
      type,
      x: 50,
      y: 50,
      width: type === 'signature' ? 25 : 15,
      height: type === 'signature' ? 8 : 15,
      label: type === 'signature' ? 'Новая подпись' : 
             type === 'stamp' ? 'Новая печать' : 'Новая печать',
      required: false
    };
    setEditorPositions([...editorPositions, newPosition]);
  };

  const updatePosition = (id: string, updates: Partial<SignaturePosition>) => {
    setEditorPositions(prev => 
      prev.map(pos => pos.id === id ? { ...pos, ...updates } : pos)
    );
  };

  const removePosition = (id: string) => {
    setEditorPositions(prev => prev.filter(pos => pos.id !== id));
  };

  if (isCreating) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <TemplateForm
          templateForm={templateForm}
          setTemplateForm={setTemplateForm}
          editorPositions={editorPositions}
          addSignaturePosition={addSignaturePosition}
          removePosition={removePosition}
          onSave={onSaveTemplate}
          onCancel={onCancelCreation}
        />

        <VisualEditor
          editorPositions={editorPositions}
          updatePosition={updatePosition}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <Icon name="FileText" size={48} className="mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium mb-2">Создайте новый шаблон</h3>
        <p className="text-muted-foreground mb-4">
          Настройте расположение подписей и печатей для ваших документов
        </p>
        <Button onClick={onCreateTemplate}>
          <Icon name="Plus" size={16} className="mr-2" />
          Создать шаблон
        </Button>
      </div>
    </div>
  );
};

export default TemplateEditor;