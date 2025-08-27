import { useState } from 'react';
import { DocumentTemplate } from '@/components/dashboard/types';

export const useIndexState = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [templateFormData, setTemplateFormData] = useState<Record<string, string>>({});
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isSignatureLibraryOpen, setIsSignatureLibraryOpen] = useState(false);
  const [isDocumentHistoryOpen, setIsDocumentHistoryOpen] = useState(false);

  const handleTemplateSelect = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setIsTemplateDialogOpen(true);
    setTemplateFormData({});
  };

  const handleFormFieldChange = (fieldName: string, value: string) => {
    setTemplateFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const generateDocument = () => {
    setIsTemplateDialogOpen(false);
    setIsExportDialogOpen(true);
  };

  return {
    // State
    activeTab,
    selectedDate,
    selectedTemplate,
    isTemplateDialogOpen,
    templateFormData,
    isExportDialogOpen,
    isSignatureLibraryOpen,
    isDocumentHistoryOpen,
    
    // Setters
    setActiveTab,
    setSelectedDate,
    setIsTemplateDialogOpen,
    setIsExportDialogOpen,
    setIsSignatureLibraryOpen,
    setIsDocumentHistoryOpen,
    
    // Handlers
    handleTemplateSelect,
    handleFormFieldChange,
    generateDocument
  };
};