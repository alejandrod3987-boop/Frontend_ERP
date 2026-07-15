import React, { useEffect } from 'react';
import { CheckCircle, AlertTriangle, Clock, X, Info } from 'lucide-react';

/**
 * StatusBadge - Muestra un estado con los colores institucionales configurados.
 */
export function StatusBadge({ estado }) {
  let styles = 'bg-gray-800 text-gray-400 border border-gray-700 shadow-sm';
  let label = estado;

  switch (estado) {
    case 'Aprobado':
      styles = 'bg-teal-950/80 text-teal-300 border border-teal-700/60 shadow-md shadow-teal-900/20';
      break;
    case 'Pendiente de Entrega':
      styles = 'bg-amber-950/80 text-amber-300 border border-amber-700/60 shadow-md shadow-amber-900/20';
      break;
    case 'En Revision':
    case 'En Revisión':
      styles = 'bg-blue-950/80 text-blue-300 border border-blue-700/60 shadow-md shadow-blue-900/20';
      label = 'En Revisión';
      break;
    case 'Requiere Correcciones':
      styles = 'bg-orange-950/80 text-orange-300 border border-orange-700/60 shadow-md shadow-orange-900/20';
      break;
    case 'Activo':
      styles = 'bg-teal-900/60 text-teal-200 border border-teal-500/40 shadow-md shadow-teal-900/20';
      break;
    case 'Inactivo':
      styles = 'bg-gray-800/80 text-gray-400 border border-gray-700 shadow-sm';
      break;
    default:
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:brightness-110 ${styles}`}>
      {estado === 'Aprobado' && <CheckCircle size={12} />}
      {estado === 'Requiere Correcciones' && <AlertTriangle size={12} />}
      {(estado === 'En Revision' || estado === 'En Revisión') && <Clock size={12} />}
      {label}
    </span>
  );
}

/**
 * ProgressBar - Barra de progreso horizontal.
 */
export function ProgressBar({ valor, color = 'bg-teal-500' }) {
  // Asegurar que el valor esté entre 0 y 100
  const pct = Math.min(Math.max(valor, 0), 100);
  
  return (
    <div className="w-full bg-gray-700/50 rounded-full h-1.5 overflow-hidden shadow-inner">
      <div 
        className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${color}`} 
        style={{ width: `${pct}%` }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20 animate-pulse"></div>
      </div>
    </div>
  );
}

/**
 * Modal - Cuadro de diálogo modal que se superpone a la pantalla.
 */
export function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg glass-premium rounded-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700/50 bg-gray-800/30">
          <h3 className="text-lg font-bold text-white tracking-wide">{title}</h3>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer active:scale-95"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="px-6 py-5 max-h-[75vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Toast - Mensaje de confirmación temporal.
 */
export function Toast({ mensaje, tipo = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 glass-premium border-teal-500/40 rounded-xl shadow-2xl animate-slide-in-right text-white max-w-md">
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-teal-500/20 text-teal-400 shrink-0 shadow-inner">
        <CheckCircle size={18} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">{mensaje}</p>
      </div>
      <button 
        onClick={onClose}
        className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-all cursor-pointer shrink-0"
      >
        <X size={16} />
      </button>
    </div>
  );
}
