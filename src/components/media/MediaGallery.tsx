
import React, { useState } from 'react';
import { X, Download, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useFileUpload } from '@/hooks/useFileUpload';

interface MediaFile {
  id: string;
  url: string;
  path: string;
  name: string;
  size: number;
  type: string;
  alt_text?: string;
  description?: string;
}

interface MediaGalleryProps {
  files: MediaFile[];
  onFileRemove: (fileId: string) => void;
  editable?: boolean;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({
  files,
  onFileRemove,
  editable = false
}) => {
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const { deleteFile } = useFileUpload();

  const handleDelete = async (file: MediaFile) => {
    const success = await deleteFile(file.path, file.id);
    if (success) {
      onFileRemove(file.id);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isImage = (type: string) => type.startsWith('image/');
  const isVideo = (type: string) => type.startsWith('video/');

  if (!files.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum arquivo enviado
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((file) => (
          <div key={file.id} className="relative group border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              {isImage(file.type) ? (
                <img
                  src={file.url}
                  alt={file.alt_text || file.name}
                  className="w-full h-full object-cover"
                />
              ) : isVideo(file.type) ? (
                <video
                  src={file.url}
                  className="w-full h-full object-cover"
                  muted
                />
              ) : (
                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 rounded flex items-center justify-center">
                    📄
                  </div>
                  <p className="text-xs text-gray-600 truncate">{file.name}</p>
                </div>
              )}
            </div>
            
            <div className="p-3">
              <p className="text-sm font-medium truncate" title={file.name}>
                {file.name}
              </p>
              <p className="text-xs text-gray-500">
                {formatFileSize(file.size)}
              </p>
            </div>

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-8 h-8 p-0"
                  onClick={() => setSelectedFile(file)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                
                {editable && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="w-8 h-8 p-0"
                    onClick={() => handleDelete(file)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de visualização */}
      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>{selectedFile?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedFile && (
            <div className="space-y-4">
              <div className="flex justify-center">
                {isImage(selectedFile.type) ? (
                  <img
                    src={selectedFile.url}
                    alt={selectedFile.alt_text || selectedFile.name}
                    className="max-w-full max-h-96 object-contain"
                  />
                ) : isVideo(selectedFile.type) ? (
                  <video
                    src={selectedFile.url}
                    controls
                    className="max-w-full max-h-96"
                  />
                ) : (
                  <div className="text-center p-8">
                    <p className="text-lg">Pré-visualização não disponível</p>
                    <Button
                      className="mt-4"
                      onClick={() => window.open(selectedFile.url, '_blank')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar Arquivo
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="space-y-2 text-sm">
                <p><strong>Tamanho:</strong> {formatFileSize(selectedFile.size)}</p>
                <p><strong>Tipo:</strong> {selectedFile.type}</p>
                {selectedFile.description && (
                  <p><strong>Descrição:</strong> {selectedFile.description}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MediaGallery;
