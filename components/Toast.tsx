// src/components/Toast.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, ShoppingCart, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'cart';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const getIcon = (type: ToastType) => {
        switch (type) {
            case 'success': return <CheckCircle className="text-green-400" size={22} />;
            case 'error': return <XCircle className="text-red-400" size={22} />;
            case 'cart': return <ShoppingCart className="text-yellow-400" size={22} />;
        }
    };

    const getBgColor = (type: ToastType) => {
        switch (type) {
            case 'success': return 'border-green-500/30 bg-green-500/10';
            case 'error': return 'border-red-500/30 bg-red-500/10';
            case 'cart': return 'border-yellow-500/30 bg-yellow-500/10';
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-24 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-xl animate-slide-up ${getBgColor(toast.type)}`}
                    >
                        {getIcon(toast.type)}
                        <span className="text-white font-medium text-sm">{toast.message}</span>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="ml-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
