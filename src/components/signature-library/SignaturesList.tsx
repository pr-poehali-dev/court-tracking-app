import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { SignatureData, signatureStyles } from './types';

interface SignaturesListProps {
  signatures: SignatureData[];
  onSelectSignature: (signature: SignatureData) => void;
}

const SignaturesList: React.FC<SignaturesListProps> = ({ 
  signatures, 
  onSelectSignature 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {signatures.map(signature => (
        <Card key={signature.id} className="card-hover cursor-pointer" onClick={() => onSelectSignature(signature)}>
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
  );
};

export default SignaturesList;