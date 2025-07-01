
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pt-CV', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('pt-CV', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'published':
    case 'active':
    case 'success':
      return 'bg-green-100 text-green-800';
    case 'draft':
    case 'inactive':
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'archived':
    case 'failed':
    case 'error':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusLabel = (status: string): string => {
  const statusLabels: { [key: string]: string } = {
    published: 'Publicado',
    draft: 'Rascunho',
    archived: 'Arquivado',
    active: 'Ativo',
    inactive: 'Inativo',
    pending: 'Pendente',
    success: 'Sucesso',
    failed: 'Falhado',
    error: 'Erro'
  };

  return statusLabels[status.toLowerCase()] || status;
};

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos
    .replace(/[^a-z0-9 -]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

export const sortByDate = (items: any[], dateField: string, ascending: boolean = false): any[] => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a[dateField]).getTime();
    const dateB = new Date(b[dateField]).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

export const groupByField = (items: any[], field: string): { [key: string]: any[] } => {
  return items.reduce((groups, item) => {
    const key = item[field];
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
};
