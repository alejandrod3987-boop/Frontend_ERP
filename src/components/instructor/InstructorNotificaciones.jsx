import React, { useState } from 'react';
import { Bell, Check, MailOpen, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

export default function InstructorNotificaciones({ notificaciones = [], markAsRead, markAllAsRead, addToast }) {
  const [tab, setTab] = useState('todas'); // todas, no-leidas

  const filtered = notificaciones.filter(n => {
    if (tab === 'todas') return true;
    if (tab === 'no-leidas' && !n.leida) return true;
    return false;
  });

  const handleMark = (id) => {
    markAsRead(id);
    addToast('Notificación marcada como leída.');
  };

  const handleMarkAll = () => {
    markAllAsRead();
    addToast('Todas las notificaciones marcadas como leídas.');
  };

  const noLeidasCount = notificaciones.filter(n => !n.leida).length;

  return (
    <div className="space-y-6 animate-fade-in text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Notificaciones Recientes</h2>
          <p className="text-xs text-gray-400">Mantente al tanto de los comentarios de tus informes.</p>
        </div>
        
        {noLeidasCount > 0 && (
          <button
            onClick={handleMarkAll}
            className="px-3 py-1.5 border border-gray-600 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <MailOpen size={14} /> Marcar todas como leídas
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-700">
        <button
          onClick={() => setTab('todas')}
          className={`pb-3 text-xs font-bold border-b-2 px-3 transition-colors cursor-pointer ${
            tab === 'todas'
              ? 'border-teal-500 text-teal-400'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Todas ({notificaciones.length})
        </button>
        <button
          onClick={() => setTab('no-leidas')}
          className={`pb-3 text-xs font-bold border-b-2 px-3 transition-colors cursor-pointer ${
            tab === 'no-leidas'
              ? 'border-teal-500 text-teal-400'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          No Leídas ({noLeidasCount})
        </button>
      </div>

      {/* Lista */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-gray-800 border border-gray-700 rounded-xl">
            No tienes notificaciones en esta sección.
          </div>
        ) : (
          filtered.map((notif) => {
            const isUnread = !notif.leida;
            const isCorreccion = notif.tipo === 'correccion';
            
            // Bordes según tipo
            let borderClass = 'border-gray-700';
            if (isUnread) {
              borderClass = isCorreccion ? 'border-l-4 border-l-orange-500 border-y-gray-700 border-r-gray-700' : 'border-l-4 border-l-teal-500 border-y-gray-700 border-r-gray-700';
            }

            return (
              <div 
                key={notif.id}
                className={`bg-[#252b3b] border p-4 rounded-xl flex items-start gap-4 transition-all duration-200 ${
                  isUnread ? 'shadow-md shadow-teal-950/5' : 'opacity-70'
                } ${borderClass}`}
              >
                {/* Icono izquierdo */}
                <div className={`p-2 rounded-lg shrink-0 ${
                  notif.tipo === 'correccion' ? 'bg-orange-950 text-orange-400 border border-orange-900/40' :
                  notif.tipo === 'aprobado' ? 'bg-teal-950 text-teal-400 border border-teal-900/40' :
                  'bg-blue-950 text-blue-400 border border-blue-900/40'
                }`}>
                  {notif.tipo === 'correccion' && <AlertTriangle size={18} />}
                  {notif.tipo === 'aprobado' && <CheckCircle2 size={18} />}
                  {notif.tipo !== 'correccion' && notif.tipo !== 'aprobado' && <Info size={18} />}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm text-white">{notif.titulo}</h4>
                      {isUnread && (
                        <span className="bg-teal-900/60 text-teal-200 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-800/40">
                          Nueva
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium shrink-0">{notif.fecha}</span>
                  </div>
                  
                  <p className="text-xs text-gray-400 leading-relaxed">{notif.descripcion}</p>
                  
                  {notif.fechaExacta && (
                    <p className="text-[10px] text-gray-500">Fecha del evento: {notif.fechaExacta}</p>
                  )}

                  {isUnread && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleMark(notif.id)}
                        className="px-2.5 py-1 bg-teal-650 hover:bg-teal-650 text-white rounded text-[10px] font-semibold flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Check size={12} /> Marcar como leída
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
