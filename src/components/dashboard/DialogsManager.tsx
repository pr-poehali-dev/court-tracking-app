import React from 'react';
import ExportDialog from '@/components/ExportDialog';
import SignatureLibrary from '@/components/SignatureLibrary';
import DocumentHistory from '@/components/DocumentHistory';
import { DocumentTemplate } from './types';

interface DialogsManagerProps {
  isExportDialogOpen: boolean;
  onExportDialogClose: () => void;
  isSignatureLibraryOpen: boolean;
  onSignatureLibraryClose: () => void;
  isDocumentHistoryOpen: boolean;
  onDocumentHistoryClose: () => void;
  selectedTemplate: DocumentTemplate | null;
  templateFormData: Record<string, string>;
}

const DialogsManager: React.FC<DialogsManagerProps> = ({
  isExportDialogOpen,
  onExportDialogClose,
  isSignatureLibraryOpen,
  onSignatureLibraryClose,
  isDocumentHistoryOpen,
  onDocumentHistoryClose,
  selectedTemplate,
  templateFormData
}) => {
  return (
    <>
      <ExportDialog
        isOpen={isExportDialogOpen}
        onClose={onExportDialogClose}
        template={selectedTemplate}
        formData={templateFormData}
      />

      <SignatureLibrary
        isOpen={isSignatureLibraryOpen}
        onClose={onSignatureLibraryClose}
      />

      <DocumentHistory
        isOpen={isDocumentHistoryOpen}
        onClose={onDocumentHistoryClose}
      />
    </>
  );
};

export default DialogsManager;