import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import DashboardTab from './DashboardTab';
import CasesTab from './CasesTab';
import TimelineTab from './TimelineTab';
import TasksTab from './TasksTab';
import ClientsTab from './ClientsTab';
import LawyersTab from './LawyersTab';
import BillingTab from './BillingTab';
import ExpensesTab from './ExpensesTab';
import CalendarTab from './CalendarTab';
import DocumentsTab from './DocumentsTab';
import TemplatesTab from './TemplatesTab';
import OtherTabs from './OtherTabs';
import { DocumentTemplate } from './types';

interface TabsContentProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  isTemplateDialogOpen: boolean;
  onTemplateDialogChange: (open: boolean) => void;
  selectedTemplate: DocumentTemplate | null;
  templateFormData: Record<string, string>;
  onTemplateSelect: (template: DocumentTemplate) => void;
  onFormFieldChange: (fieldName: string, value: string) => void;
  onGenerateDocument: () => void;
  onOpenSignatureLibrary: () => void;
  onOpenDocumentHistory: () => void;
}

const TabsContentComponent: React.FC<TabsContentProps> = ({
  selectedDate,
  onSelectDate,
  isTemplateDialogOpen,
  onTemplateDialogChange,
  selectedTemplate,
  templateFormData,
  onTemplateSelect,
  onFormFieldChange,
  onGenerateDocument,
  onOpenSignatureLibrary,
  onOpenDocumentHistory
}) => {
  return (
    <>
      <TabsContent value="dashboard">
        <DashboardTab onOpenDocumentHistory={onOpenDocumentHistory} />
      </TabsContent>

      <TabsContent value="cases">
        <CasesTab />
      </TabsContent>

      <TabsContent value="timeline">
        <TimelineTab />
      </TabsContent>

      <TabsContent value="tasks">
        <TasksTab />
      </TabsContent>

      <TabsContent value="clients">
        <ClientsTab />
      </TabsContent>

      <TabsContent value="lawyers">
        <LawyersTab />
      </TabsContent>

      <TabsContent value="billing">
        <BillingTab />
      </TabsContent>

      <TabsContent value="expenses">
        <ExpensesTab />
      </TabsContent>

      <TabsContent value="calendar">
        <CalendarTab selectedDate={selectedDate} onSelectDate={onSelectDate} />
      </TabsContent>

      <TabsContent value="documents">
        <DocumentsTab />
      </TabsContent>

      <TabsContent value="templates">
        <TemplatesTab
          isTemplateDialogOpen={isTemplateDialogOpen}
          onTemplateDialogChange={onTemplateDialogChange}
          selectedTemplate={selectedTemplate}
          templateFormData={templateFormData}
          onTemplateSelect={onTemplateSelect}
          onFormFieldChange={onFormFieldChange}
          onGenerateDocument={onGenerateDocument}
        />
      </TabsContent>

      <TabsContent value="notifications">
        <OtherTabs 
          onOpenSignatureLibrary={onOpenSignatureLibrary}
          onOpenDocumentHistory={onOpenDocumentHistory}
        />
      </TabsContent>

      <TabsContent value="statistics">
        <div className="space-y-6 fade-in">
          <OtherTabs 
            onOpenSignatureLibrary={onOpenSignatureLibrary}
            onOpenDocumentHistory={onOpenDocumentHistory}
          />
        </div>
      </TabsContent>

      <TabsContent value="settings">
        <div className="space-y-6 fade-in">
          <OtherTabs 
            onOpenSignatureLibrary={onOpenSignatureLibrary}
            onOpenDocumentHistory={onOpenDocumentHistory}
          />
        </div>
      </TabsContent>

      <TabsContent value="profile">
        <div className="space-y-6 fade-in">
          <OtherTabs 
            onOpenSignatureLibrary={onOpenSignatureLibrary}
            onOpenDocumentHistory={onOpenDocumentHistory}
          />
        </div>
      </TabsContent>

      <TabsContent value="history">
        <div className="space-y-6 fade-in">
          <OtherTabs 
            onOpenSignatureLibrary={onOpenSignatureLibrary}
            onOpenDocumentHistory={onOpenDocumentHistory}
          />
        </div>
      </TabsContent>
    </>
  );
};

export default TabsContentComponent;