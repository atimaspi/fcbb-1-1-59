
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';

interface SettingFormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  type?: 'input' | 'textarea' | 'email';
  placeholder?: string;
  icon?: React.ReactNode;
  rows?: number;
}

const SettingFormField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  onSave, 
  type = 'input', 
  placeholder,
  icon,
  rows = 3
}: SettingFormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {icon && <span className="inline mr-2">{icon}</span>}
        {label}
      </Label>
      {type === 'textarea' ? (
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
        />
      ) : (
        <Input
          id={id}
          type={type === 'email' ? 'email' : 'text'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={onSave}
        className="mt-2"
      >
        <Save className="h-3 w-3 mr-1" />
        Salvar
      </Button>
    </div>
  );
};

export default SettingFormField;
