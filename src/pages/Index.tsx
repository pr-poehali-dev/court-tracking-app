import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import ExportDialog from '@/components/ExportDialog';
import SignatureLibrary from '@/components/SignatureLibrary';
import DocumentHistory from '@/components/DocumentHistory';
import Header from '@/components/dashboard/Header';
import DashboardTab from '@/components/dashboard/DashboardTab';
import CasesTab from '@/components/dashboard/CasesTab';
import CalendarTab from '@/components/dashboard/CalendarTab';
import DocumentsTab from '@/components/dashboard/DocumentsTab';
import TemplatesTab from '@/components/dashboard/TemplatesTab';
import OtherTabs from '@/components/dashboard/OtherTabs';
import { DocumentTemplate } from '@/components/dashboard/types';

const Index = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-9 mb-8">
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
            <TabsTrigger value="history" className="flex items-center">
              <Icon name="History" size={16} className="mr-2" />
              История
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center">
              <Icon name="FileCheck" size={16} className="mr-2" />
              Шаблоны
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

          <TabsContent value="dashboard">
            <DashboardTab onOpenDocumentHistory={() => setIsDocumentHistoryOpen(true)} />
          </TabsContent>

          <TabsContent value="cases">
            <CasesTab />
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarTab selectedDate={selectedDate} onSelectDate={setSelectedDate} />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsTab />
          </TabsContent>

          <TabsContent value="templates">
            <TemplatesTab
              isTemplateDialogOpen={isTemplateDialogOpen}
              onTemplateDialogChange={setIsTemplateDialogOpen}
              selectedTemplate={selectedTemplate}
              templateFormData={templateFormData}
              onTemplateSelect={handleTemplateSelect}
              onFormFieldChange={handleFormFieldChange}
              onGenerateDocument={generateDocument}
            />
          </TabsContent>

          <TabsContent value="notifications">
            <OtherTabs 
              onOpenSignatureLibrary={() => setIsSignatureLibraryOpen(true)}
              onOpenDocumentHistory={() => setIsDocumentHistoryOpen(true)}
            />
          </TabsContent>

          <TabsContent value="statistics">
            <div className="space-y-6 fade-in">
              <OtherTabs 
                onOpenSignatureLibrary={() => setIsSignatureLibraryOpen(true)}
                onOpenDocumentHistory={() => setIsDocumentHistoryOpen(true)}
              />
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6 fade-in">
              <OtherTabs 
                onOpenSignatureLibrary={() => setIsSignatureLibraryOpen(true)}
                onOpenDocumentHistory={() => setIsDocumentHistoryOpen(true)}
              />
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="space-y-6 fade-in">
              <OtherTabs 
                onOpenSignatureLibrary={() => setIsSignatureLibraryOpen(true)}
                onOpenDocumentHistory={() => setIsDocumentHistoryOpen(true)}
              />
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-6 fade-in">
              <OtherTabs 
                onOpenSignatureLibrary={() => setIsSignatureLibraryOpen(true)}
                onOpenDocumentHistory={() => setIsDocumentHistoryOpen(true)}
              />
            </div>
          </TabsContent>
        </Tabs>

        <ExportDialog
          isOpen={isExportDialogOpen}
          onClose={() => setIsExportDialogOpen(false)}
          template={selectedTemplate}
          formData={templateFormData}
        />

        <SignatureLibrary
          isOpen={isSignatureLibraryOpen}
          onClose={() => setIsSignatureLibraryOpen(false)}
        />

        <DocumentHistory
          isOpen={isDocumentHistoryOpen}
          onClose={() => setIsDocumentHistoryOpen(false)}
        />
      </main>
    </div>
  );
};

export default Index;