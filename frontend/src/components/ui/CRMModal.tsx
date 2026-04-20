import React, { ReactNode, useEffect, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { cn } from '@/lib/utils';
import { useForm, FormProvider } from 'react-hook-form'; // Assuming react-hook-form

interface CRMModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onSubmit?: () => void;
  formId?: string;
  defaultValues?: Record<string, any>;
}

export function CRMModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  loading = false,
  size = 'lg',
  onSubmit,
  formId = 'crm-form',
  defaultValues = {}
}: CRMModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on outside click / ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const methods = useForm({ defaultValues });

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        ref={dialogRef}
        className={cn(
          'max-w-md sm:max-w-lg p-0 animate-in fade-in-0 zoom-in-95 duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-200',
          size === 'sm' && 'max-w-sm',
          size === 'md' && 'max-w-md',
          size === 'lg' && 'max-w-lg',
          size === 'xl' && 'max-w-4xl'
        )}
        onInteractOutside={onClose}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-foreground to-primary/70 bg-clip-text text-transparent">
                {title}
              </DialogTitle>
              {description && (
                <DialogDescription className="text-sm text-muted-foreground mt-1">
                  {description}
                </DialogDescription>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Content */}
        <FormProvider {...methods}>
          <form id={formId} onSubmit={methods.handleSubmit(onSubmit || (() => {}))}>
            <div 
              className="p-6 max-h-[500px] overflow-y-auto" 
              onClick={handleContentClick}
            >
              {children}
            </div>
          </form>
        </FormProvider>

        {/* Footer */}
        {(footer || onSubmit) && (
          <DialogFooter className="p-6 pt-0 border-t border-border gap-2 bg-muted/50">
            {footer}
            <Button 
              type="submit" 
              form={formId}
              className="ml-auto" 
              disabled={loading}
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                'Salvar Alterações'
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Example Usage Component (for forms)
interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  children?: ReactNode;
}

export function CRMFormField({ name, label, type = 'text', children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
      </Label>
      {type === 'select' ? (
        children
      ) : (
<Input id={name} />
      )}
    </div>
  );
}

