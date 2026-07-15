import React, { useState } from 'react';
import { Download, Clock, CheckCircle2, AlertTriangle, FileUp, Filter } from 'lucide-react';
import { StatusBadge } from '../CommonComponents';

const HISTORIAL_MOCK = [
  { id: 1, evento: 'Envío de Corrección', detalle: 'Se envió la corrección del informe de Noviembre 2024.', fecha: '05 Feb 2025, 04:30 PM', icono: 'upload', estado: 'En Revision' },
  { id: 2, evento: 'Informe Aprobado', detalle: 'El informe de Enero 2025 fue aprobado por Patricia Lozano.', fecha: '31 Ene 2025, 02:15 PM', icono: 'check', estado: 'Aprobado' },
  { id: 3, evento: 'Presentación de Informe', detalle: 'Se radicó el informe de Enero 2025 con formatos GC y GF.', fecha: '30 Ene 2025, 11:00 AM', icono: 'upload', estado: 'En Revision' },
  { id: 4, evento: 'Observación Registrada', detalle: 'Patricia Lozano solicitó correcciones en el informe de Noviembre 2024.', fecha: '25 Nov 2024, 03:00 PM', icono: 'alert', estado: 'Requiere Correcciones' },
  { id: 5, evento: 'Informe Aprobado', detalle: 'El informe de Octubre 2024 fue aprobado por Patricia Lozano.', fecha: '27 Oct 2024, 09:30 AM', icono: 'check', estado: 'Aprobado' },
];

export default function InstructorHistorial({ addToast }) {
  const [filtro, setFiltro] = useState('todos');

  const handleExportar = () => {
    addToast('Historial completo de auditoría exportado en formato CSV.');
  };

  const eventosFiltrados = HISTORIAL_MOCK.filter(e => {
    if (filtro === 'todos') return true;
    if (filtro === 'aprobado' && e.estado === 'Aprobado') return true;
    if (filtro === 'revision' && e.estado === 'En Revision') return true;
    if (filtro === 'correccion' && e.estado === 'Requiere Correcciones') return true;
    return false;
  });

  return (
    <div className="space-y-6 animate-fade-in text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">Historial de Transacciones</h2>
          <p className="text-xs text-gray-400 font-medium">Registro histórico de todas tus radicaciones y revisiones.</p>
        </div>
        <button
          onClick={handleExportar}
          className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 active:scale-[0.98] text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer w-fit shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-0.5"
        >
          <Download size={16} /> Exportar Historial
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 items-center glass-panel p-2 rounded-xl shadow-inner">
        <span className="text-xs text-teal-400 font-bold tracking-wider uppercase flex items-center gap-2 ml-2 mr-3">
          <Filter size={14} /> Filtrar por:
        </span>
        {['todos', 'aprobado', 'revision', 'correccion'].map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-4 py-2 text-xs font-bold rounded-lg capitalize transition-all duration-300 cursor-pointer ${
              filtro === f
                ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md shadow-teal-500/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {f === 'todos' ? 'Todos' : f === 'revision' ? 'En Revisión' : f === 'correccion' ? 'Correcciones' : f}
          </button>
        ))}
      </div>

      {/* Lista de Transacciones */}
      <div className="space-y-4 relative">
        <div className="absolute left-8 top-4 bottom-4 w-px bg-gradient-to-b from-teal-500/50 via-gray-700 to-transparent hidden sm:block"></div>
        {eventosFiltrados.length === 0 ? (
          <div className="text-center py-16 text-gray-400 glass-card rounded-2xl border-dashed">
            No se encontraron registros que coincidan con el filtro seleccionado.
          </div>
        ) : (
          eventosFiltrados.map((item, index) => (
            <div 
              key={item.id} 
              className="glass-card p-5 rounded-2xl flex items-start gap-5 hover:border-teal-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/10 transition-all duration-300 group relative z-10 sm:ml-4"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`p-3 rounded-xl shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300 ${
                item.icono === 'check' ? 'bg-gradient-to-br from-teal-900 to-teal-950 text-teal-400 border border-teal-500/30' :
                item.icono === 'alert' ? 'bg-gradient-to-br from-amber-900 to-amber-950 text-amber-400 border border-amber-500/30' :
                'bg-gradient-to-br from-blue-900 to-blue-950 text-blue-400 border border-blue-500/30'
              }`}>
                {item.icono === 'check' && <CheckCircle2 size={20} />}
                {item.icono === 'alert' && <AlertTriangle size={20} />}
                {item.icono === 'upload' && <FileUp size={20} />}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h4 className="font-bold text-base text-white">{item.evento}</h4>
                  <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-md border border-gray-700/50 shadow-inner">
                    <Clock size={12} className="text-teal-500/70" /> {item.fecha}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">{item.detalle}</p>
                <div className="pt-2">
                  <StatusBadge estado={item.estado} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
