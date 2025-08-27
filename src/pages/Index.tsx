import React from 'react';
import { Tabs } from '@/components/ui/tabs';
import Header from '@/components/dashboard/Header';
import Navigation from '@/components/dashboard/Navigation';
import TabsContentComponent from '@/components/dashboard/TabsContent';
import DialogsManager from '@/components/dashboard/DialogsManager';
import { useIndexState } from '@/hooks/useIndexState';

const Index = () => {
  const {
    activeTab,
    selectedDate,
    selectedTemplate,
    isTemplateDialogOpen,
    templateFormData,
    isExportDialogOpen,
    isSignatureLibraryOpen,
    isDocumentHistoryOpen,
    setActiveTab,
    setSelectedDate,
    setIsTemplateDialogOpen,
    setIsExportDialogOpen,
    setIsSignatureLibraryOpen,
    setIsDocumentHistoryOpen,
    handleTemplateSelect,
    handleFormFieldChange,
    generateDocument
  } = useIndexState();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <Navigation activeTab={activeTab} />

          <TabsContentComponent
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            isTemplateDialogOpen={isTemplateDialogOpen}
            onTemplateDialogChange={setIsTemplateDialogOpen}
            selectedTemplate={selectedTemplate}
            templateFormData={templateFormData}
            onTemplateSelect={handleTemplateSelect}
            onFormFieldChange={handleFormFieldChange}
            onGenerateDocument={generateDocument}
            onOpenSignatureLibrary={() => setIsSignatureLibraryOpen(true)}
            onOpenDocumentHistory={() => setIsDocumentHistoryOpen(true)}
          />
        </Tabs>

        <DialogsManager
          isExportDialogOpen={isExportDialogOpen}
          onExportDialogClose={() => setIsExportDialogOpen(false)}
          isSignatureLibraryOpen={isSignatureLibraryOpen}
          onSignatureLibraryClose={() => setIsSignatureLibraryOpen(false)}
          isDocumentHistoryOpen={isDocumentHistoryOpen}
          onDocumentHistoryClose={() => setIsDocumentHistoryOpen(false)}
          selectedTemplate={selectedTemplate}
          templateFormData={templateFormData}
        />
      </main>
    </div>
  );
};

export default Index;