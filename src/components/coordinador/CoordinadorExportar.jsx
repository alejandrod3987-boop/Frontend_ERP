import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Printer, Building2, HelpCircle, Loader2 } from 'lucide-react';

export default function CoordinadorExportar({ addToast }) {
  const [mes, setMes] = useState('Febrero 2025');
  const [area, setArea] = useState('todos');
  const [estado, setEstado] = useState('todos');
  const [loading, setLoading] = useState(null); // 'pdf', 'excel', 'print'

  const handleExport = (tipo) => {
    setLoading(tipo);
    setTimeout(() => {
      setLoading(null);
      if (tipo === 'pdf') {
        addToast('Reporte Consolidado en PDF descargado correctamente.');
      } else if (tipo === 'excel') {
        addToast('Reporte General en Excel generado y guardado.');
      } else if (tipo === 'print') {
        window.print();
      }
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in text-white">
      <div>
        <h2 className="text-xl font-bold">Consolidado y Exportación</h2>
        <p className="text-xs text-gray-400">Genera reportes unificados para contabilidad y supervisión.</p>
      </div>

      {/* Caja de Logotipo Institucional */}
      <div className="bg-gray-800 border border-gray-700 p-8 rounded-xl flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-extrabold shadow-lg shadow-teal-900/20">
          <Building2 size={36} />
        </div>
        <div>
          <h3 className="text-xl font-black text-white">CAEDPH Yamboro</h3>
          <p className="text-xs text-teal-400 font-semibold uppercase tracking-wider">Tecnoparque SENA - Neiva, Huila</p>
          <p className="text-[10px] text-gray-500 mt-1">Servicio Nacional de Aprendizaje • Dirección Regional Huila</p>
        </div>
      </div>

      {/* Panel de Parámetros */}
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl space-y-4">
        <h4 className="font-bold text-white text-sm border-b border-gray-750 pb-2 flex items-center gap-2">
          <HelpCircle size={16} className="text-teal-400" /> Parámetros del Reporte Consolidado
        </h4>

        <div className="grid gap-4 md:grid-cols-3 text-xs">
          <div>
            <label className="block text-gray-400 font-semibold mb-2">Seleccionar Mes</label>
            <select 
              value={mes} 
              onChange={(e) => setMes(e.target.value)} 
              className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white"
            >
              <option value="Enero 2025">Enero 2025</option>
              <option value="Febrero 2025">Febrero 2025</option>
              <option value="Marzo 2025">Marzo 2025</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 font-semibold mb-2">Filtrar por Área</label>
            <select 
              value={area} 
              onChange={(e) => setArea(e.target.value)} 
              className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white"
            >
              <option value="todos">Todas las áreas</option>
              <option value="software">Desarrollo de Software</option>
              <option value="robotica">Robótica</option>
              <option value="agro">Agroindustria</option>
              <option value="pecuario">Pecuario</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 font-semibold mb-2">Estado de Informes</label>
            <select 
              value={estado} 
              onChange={(e) => setEstado(e.target.value)} 
              className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white"
            >
              <option value="todos">Todos los estados</option>
              <option value="aprobados">Sólo aprobados</option>
              <option value="pendientes">Pendientes en revisión</option>
            </select>
          </div>
        </div>

        {/* Acciones de exportación */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-750">
          
          {/* Exportar PDF */}
          <button
            disabled={loading !== null}
            onClick={() => handleExport('pdf')}
            className="flex-1 py-3 bg-red-650 hover:bg-red-550 active:scale-[0.98] disabled:opacity-50 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-red-900/10"
          >
            {loading === 'pdf' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Compilando PDF...
              </>
            ) : (
              <>
                <FileText size={16} /> Exportar PDF (Contabilidad)
              </>
            )}
          </button>

          {/* Exportar Excel */}
          <button
            disabled={loading !== null}
            onClick={() => handleExport('excel')}
            className="flex-1 py-3 bg-teal-650 hover:bg-teal-555 active:scale-[0.98] disabled:opacity-50 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-teal-900/10"
          >
            {loading === 'excel' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Generando Libro...
              </>
            ) : (
              <>
                <FileSpreadsheet size={16} /> Exportar Excel (.xlsx)
              </>
            )}
          </button>

          {/* Imprimir */}
          <button
            disabled={loading !== null}
            onClick={() => handleExport('print')}
            className="py-3 px-6 border border-gray-600 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Printer size={16} /> Imprimir
          </button>

        </div>
      </div>

      <div className="bg-gray-900/40 p-4 border border-gray-800 rounded-lg text-[10px] text-gray-500 text-center leading-relaxed">
        * Nota: Los consolidados de exportación en Excel agrupan las cuentas bancarias de dispersión y Cédulas de Ciudadanía correspondientes para envío directo al área financiera regional del SENA.
      </div>
    </div>
  );
}
