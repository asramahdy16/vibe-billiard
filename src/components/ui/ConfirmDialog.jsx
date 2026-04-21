import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle, X } from 'lucide-react';

const ConfirmDialog = ({ 
  isOpen, 
  title, 
  message, 
  variant = 'warning', 
  confirmText = 'Ya, Konfirmasi',
  cancelText = 'Batal',
  onConfirm, 
  onCancel,
  isLoading = false
}) => {
  const configs = {
    danger: {
      icon: <AlertTriangle className="h-6 w-6 text-error" />,
      iconBg: "bg-error/10",
      btnClass: "bg-error text-on-error hover:bg-error/90 glow-error",
      ringClass: "ring-error/20"
    },
    warning: {
      icon: <AlertTriangle className="h-6 w-6 text-tertiary" />,
      iconBg: "bg-tertiary/10",
      btnClass: "bg-tertiary text-on-tertiary hover:bg-tertiary/90 glow-tertiary",
      ringClass: "ring-tertiary/20"
    },
    info: {
      icon: <Info className="h-6 w-6 text-primary" />,
      iconBg: "bg-primary/10",
      btnClass: "bg-primary text-on-primary hover:bg-primary/90 glow-primary",
      ringClass: "ring-primary/20"
    },
    success: {
      icon: <CheckCircle className="h-6 w-6 text-tertiary" />,
      iconBg: "bg-tertiary/10",
      btnClass: "bg-tertiary text-on-tertiary hover:bg-tertiary/90 glow-tertiary",
      ringClass: "ring-tertiary/20"
    }
  };

  const current = configs[variant] || configs.warning;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={!isLoading ? onCancel : undefined}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className={`relative w-full max-w-md card-elevated p-6 shadow-2xl ring-1 ${current.ringClass} overflow-hidden`}
          >
            {/* Background Glow */}
            <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 ${current.iconBg.replace('/10', '')}`} />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-2xl ${current.iconBg} flex items-center justify-center mb-6 ring-4 ring-surface-container-high`}>
                {current.icon}
              </div>
              
              <h3 className="text-xl font-bold text-on-surface mb-2">{title}</h3>
              <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
                {message}
              </p>

              <div className="flex gap-3 w-full">
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={isLoading}
                  className="flex-1 btn-secondary !py-3 !px-4 disabled:opacity-50"
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`flex-1 !py-3 !px-4 rounded-xl font-bold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${current.btnClass}`}
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    confirmText
                  )}
                </button>
              </div>
            </div>
            
            <button 
              onClick={onCancel}
              disabled={isLoading}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
