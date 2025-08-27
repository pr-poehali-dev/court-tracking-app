import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface DocumentPreviewProps {
  content: string;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ content }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Предварительный просмотр</h3>
      <Card>
        <CardContent className="p-4">
          <div className="bg-white border rounded-lg shadow-sm p-6 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm font-mono">
              {content}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentPreview;