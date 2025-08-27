import React from 'react';
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
    <div>
      {/* Диалоги временно отключены */}
    </div>
  );
};

export default DialogsManager;