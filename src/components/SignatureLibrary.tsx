import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import SignatureTemplates from '@/components/SignatureTemplates';
import SignatureForm from '@/components/signature-library/SignatureForm';
import SealForm from '@/components/signature-library/SealForm';
import SignaturesList from '@/components/signature-library/SignaturesList';
import SealsList from '@/components/signature-library/SealsList';
import TemplatesTab from '@/components/signature-library/TemplatesTab';
import {
  SignatureLibraryProps,
  SignatureFormData,
  mockSignatures,
  mockSeals
} from '@/components/signature-library/types';

const SignatureLibrary = ({ isOpen, onClose, onSelectSignature, onSelectSeal }: SignatureLibraryProps) => {
  const [activeTab, setActiveTab] = useState('signatures');
  const [isCreateSignatureOpen, setIsCreateSignatureOpen] = useState(false);
  const [isCreateSealOpen, setIsCreateSealOpen] = useState(false);
  const [isSignatureTemplatesOpen, setIsSignatureTemplatesOpen] = useState(false);
  const [signatureFormData, setSignatureFormData] = useState<SignatureFormData>({
    name: '',
    position: '',
    style: 'handwritten',
    color: '#000000'
  });

  const handleCreateSignature = () => {
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
              <SignatureForm
                isOpen={isCreateSignatureOpen}
                onOpenChange={setIsCreateSignatureOpen}
                formData={signatureFormData}
                setFormData={setSignatureFormData}
                onSubmit={handleCreateSignature}
              />
            </div>

            <SignaturesList
              signatures={mockSignatures}
              onSelectSignature={handleSelectSignature}
            />
          </TabsContent>

          {/* Печати */}
          <TabsContent value="seals" className="space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Печати и штампы</h3>
                <p className="text-sm text-muted-foreground">Управление официальными печатями</p>
              </div>
              <SealForm
                isOpen={isCreateSealOpen}
                onOpenChange={setIsCreateSealOpen}
              />
            </div>

            <SealsList
              seals={mockSeals}
              onSelectSeal={handleSelectSeal}
            />
          </TabsContent>

          {/* Шаблоны расположения */}
          <TabsContent value="templates">
            <TemplatesTab
              onOpenSignatureTemplates={() => setIsSignatureTemplatesOpen(true)}
            />
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