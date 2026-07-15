import React, { useState } from 'react';
import { Download, Clock, CheckCircle2, AlertTriangle, Search, Filter, Users } from 'lucide-react';
import { StatusBadge } from '../CommonComponents';

const HISTORIAL_REVISOR_MOCK = [
  { id: 1, evento: 'Aprobación de Informe', instructor: 'Carlos Eduardo Vargas Ríos', mes: 'Enero 2025', idInforme: 'INF-2025-01', fecha: '31 Ene 2025, 02:15 PM', tipo: 'aprobado' },
  { id: 2, evento: 'Aprobación de Informe', instructor: 'Carlos Eduardo Vargas Ríos', mes: 'Diciembre 2024', idInforme: 'INF-2024-12', fecha: '23 Dic 2024, 05:40 PM', tipo: 'aprobado' },
  { id: 3, evento: 'Solicitud de Corrección', instructor: 'Carlos Eduardo Vargas Ríos', mes: 'Noviembre 2024', idInforme: 'INF-2024-11', fecha: '25 Nov 2024, 03:00 PM', tipo: 'correccion' },
  { id: 4, evento: 'Aprobación de Informe', instructor: 'Carlos Eduardo Vargas Ríos', mes: 'Octubre 2024', idInforme: 'INF-2024-10', fecha: '27 Oct 2024, 09:30 AM', tipo: 'aprobado' },
  { id: 5, evento: 'Aprobación de Informe', instructor: 'Laura Milena Castillo', mes: 'Febrero 2025', idInforme: 'INF-2825-02-047', fecha: '11 Feb 2025, 10:15 AM', tipo: 'aprobado' },
];

export default function CoordinadorHistorial({ addToast }) {
  const [buscar, setBuscar] = useState('');
  const [filtro, setFiltro] = useState('todos');

  const handleExportar = () => {
    addToast('Descargando reporte histórico consolidado en formato Excel...');
  };

  const filtrados = HISTORIAL_REVISOR_MOCK.filter(item => {
    const matchesSearch = item.instructor.toLowerCase().includes(buscar.toLowerCase()) || item.idInforme.toLowerCase().includes(buscar.toLowerCase());
    const matchesFiltro = filtro === 'todos' || 
      (filtro === 'aprobado' && item.tipo === 'aprobado') ||
      (filtro === 'correccion' && item.tipo === 'correccion');
    return matchesSearch && matchesFiltro;
  });

  return (
    <div className="space-y-6 animate-fade-in text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">Bitácora de Decisiones</h2>
          <p className="text-xs text-gray-400 font-medium">Historial completo de revisiones, firmas y solicitudes registradas.</p>
        </div>
        <button
          onClick={handleExportar}
          className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 active:scale-[0.98] text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer w-fit shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-0.5"
        >
          <Download size={16} /> Exportar Reporte
        </button>
      </div>

      {/* Buscador y Filtros */}
      <div className="grid gap-5 sm:grid-cols-3 glass-panel p-5 rounded-2xl shadow-inner">
        <div className="relative sm:col-span-2 group">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-teal-500/70 group-focus-within:text-teal-400 transition-colors">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Buscar por instructor o ID de informe..."
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-900/60 border border-gray-700/50 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center gap-3 bg-gray-900/60 border border-gray-700/50 rounded-xl px-3 shadow-inner">
          <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1"><Filter size={12}/> Tipo:</span>
          <select 
            value={filtro} 
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full py-3 bg-transparent text-xs text-white focus:outline-none cursor-pointer font-medium appearance-none"
          >
            <option value="todos" className="bg-gray-900 text-white">Todos los eventos</option>
            <option value="aprobado" className="bg-gray-900 text-white">Aprobaciones</option>
            <option value="correccion" className="bg-gray-900 text-white">Correcciones</option>
          </select>
        </div>
      </div>

      {/* Tarjetas de Historial */}
      <div className="space-y-4 relative">
        <div className="absolute left-8 top-4 bottom-4 w-px bg-gradient-to-b from-teal-500/50 via-gray-700 to-transparent hidden sm:block"></div>
        {filtrados.length === 0 ? (
          <div className="text-center py-16 text-gray-400 glass-card rounded-2xl border-dashed">
            No se encontraron registros de auditoría.
          </div>
        ) : (
          filtrados.map((item, index) => (
            <div 
              key={item.id} 
              className="glass-card p-5 rounded-2xl flex items-start gap-5 hover:border-teal-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/10 transition-all duration-300 group relative z-10 sm:ml-4"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`p-3 rounded-xl shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300 ${
                item.tipo === 'aprobado' ? 'bg-gradient-to-br from-teal-900 to-teal-950 text-teal-400 border border-teal-500/30' : 'bg-gradient-to-br from-orange-900 to-orange-950 text-orange-400 border border-orange-500/30'
              }`}>
                {item.tipo === 'aprobado' ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h4 className="font-black text-base text-white">{item.evento}</h4>
                  <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-md border border-gray-700/50 shadow-inner">
                    <Clock size={12} className="text-teal-500/70" /> {item.fecha}
                  </span>
                </div>
                
                <div className="text-sm text-gray-400 font-medium bg-gray-900/40 p-3 rounded-xl border border-gray-800/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-inner">
                  <p className="flex items-center gap-2"><Users size={14} className="text-gray-500"/> <span className="text-white font-bold">{item.instructor}</span></p>
                  <p className="text-xs"><span className="text-teal-400 font-bold">{item.mes}</span> <span className="text-gray-600 mx-2">|</span> ID: <span className="font-mono text-[11px] text-gray-300 bg-black/30 px-1.5 py-0.5 rounded">{item.idInforme}</span></p>
                </div>

                <div className="pt-2">
                  <StatusBadge estado={item.tipo === 'aprobado' ? 'Aprobado' : 'Requiere Correcciones'} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
