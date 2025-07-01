
// Validation functions
export const isValidArray = (data: any): data is any[] => {
  return Array.isArray(data) && data.length >= 0;
};

export function safeArrayCast<T>(data: any): T[] {
  if (isValidArray(data)) {
    return data.filter(item => item && typeof item === 'object' && 'id' in item);
  }
  return [];
}
