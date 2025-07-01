
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, Image as ImageIcon, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useFileUpload } from '@/hooks/useFileUpload';

interface FileUploaderProps {
  onFileUpload: (file: any) => void;
  entityType?: string;
  entityId?: string;
  allowedTypes?: string[];
  maxFiles?: number;
  folder?: string;
  className?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileUpload,
  entityType,
  entityId,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  maxFiles = 5,
  folder = '',
  className = ''
}) => {
  const { uploadFile, uploading, progress } = useFileUpload({
    folder,
    allowedTypes
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles.slice(0, maxFiles)) {
      const uploadedFile = await uploadFile(file, entityType, entityId);
      if (uploadedFile) {
        onFileUpload(uploadedFile);
      }
    }
  }, [uploadFile, onFileUpload, entityType, entityId, maxFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxFiles,
    disabled: uploading
  });

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="w-8 h-8" />;
    if (type.startsWith('video/')) return <Video className="w-8 h-8" />;
    return <FileText className="w-8 h-8" />;
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-cv-blue bg-blue-50'
            : 'border-gray-300 hover:border-cv-blue hover:bg-gray-50'
        } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          <Upload className="w-12 h-12 text-gray-400" />
          
          {uploading ? (
            <div className="w-full max-w-xs">
              <p className="text-sm text-gray-600 mb-2">Enviando arquivo...</p>
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-gray-500 mt-1">{Math.round(progress)}%</p>
            </div>
          ) : (
            <>
              <div>
                <p className="text-lg font-medium text-gray-700">
                  {isDragActive ? 'Solte os arquivos aqui' : 'Arraste arquivos ou clique para selecionar'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Máximo {maxFiles} arquivo(s). Tipos aceitos: {allowedTypes.map(type => 
                    type.split('/')[1].toUpperCase()
                  ).join(', ')}
                </p>
              </div>
              
              <Button type="button" variant="outline">
                Selecionar Arquivos
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
