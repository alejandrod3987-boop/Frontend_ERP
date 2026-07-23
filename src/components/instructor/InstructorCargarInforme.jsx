import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, X, AlertCircle } from 'lucide-react';

export default function InstructorCargarInforme({ addToast, setSectionActive }) {
  const [selectedFileGC, setSelectedFileGC] = useState(null);
  const [selectedFileGF, setSelectedFileGF] = useState(null);
  const [mes, setMes] = useState('Febrero');
  const [anio, setAnio] = useState('2025');
  const [isUploading, setIsUploading] = useState(false);

  // Simular selección de archivo GC
  const handleFileSelectGC = () => {
    setSelectedFileGC({
      name: `GC_Informe_${mes}_${anio}.pdf`,
      size: '1.2 MB',
      type: 'application/pdf'
    });
  };

  // Simular selección de archivo GF
  const handleFileSelectGF = () => {
    setSelectedFileGF({
      name: `GF_Informe_${mes}_${anio}.pdf`,
      size: '0.8 MB',
      type: 'application/pdf'
    });
  };

  const handleRemoveFileGC = () => setSelectedFileGC(null);
  const handleRemoveFileGF = () => setSelectedFileGF(null);

  // Simular envío de informe
  const handleEnviarInforme = () => {
    if (!selectedFileGC || !selectedFileGF) {
      addToast('Error: Debes adjuntar ambos documentos (GC y GF) antes de enviar.');
      return;
    }

    setIsUploading(true);
    
    // Simular tiempo de carga
    setTimeout(() => {
      setIsUploading(false);
      addToast('Informes enviados correctamente. Pendiente de revisión por el Coordinador.');
      setSectionActive('Mis Informes');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto text-slate-800">
      
      {/* Cabecera */}
      <div>
        <h2 className="text-2xl font-black text-gray-800">Cargar Informe Mensual</h2>
        <p className="text-sm text-gray-500 mt-1">
          Adjunte el informe correspondiente al período contractual para ser revisado por el Coordinador.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-8">
        
        {/* Periodo Selection */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Mes del Informe</label>
            <select 
              value={mes}
              onChange={(e) => setMes(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            >
              {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Año</label>
            <select 
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>

        {/* Información Contractual - Solo Lectura */}
        <div className="bg-teal-50/50 p-6 rounded-xl border border-teal-100">
          <h3 className="text-sm font-bold text-teal-800 uppercase tracking-wider mb-4 flex items-center gap-2">
            <AlertCircle size={16} /> Información Contractual
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-[10px] text-teal-600 font-bold uppercase">Nº Contrato</p>
              <p className="font-mono text-sm text-slate-700">4120-2025-08</p>
            </div>
            <div>
              <p className="text-[10px] text-teal-600 font-bold uppercase">Coordinador</p>
              <p className="font-semibold text-sm text-slate-700 truncate">Patricia Lozano</p>
            </div>
            <div>
              <p className="text-[10px] text-teal-600 font-bold uppercase">Centro</p>
              <p className="font-semibold text-sm text-slate-700 truncate">CAEDPH</p>
            </div>
            <div>
              <p className="text-[10px] text-teal-600 font-bold uppercase">Sede</p>
              <p className="font-semibold text-sm text-slate-700">Yamboro</p>
            </div>
          </div>
        </div>

        {/* Zonas de Carga (Drag & Drop Mock) */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Documento GC */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-3">Documento GC (Gestión de Centro)</h3>
            
            {!selectedFileGC ? (
              <div 
                onClick={handleFileSelectGC}
                className="border-2 border-dashed border-gray-300 hover:border-teal-500 bg-gray-50 hover:bg-teal-50/30 rounded-2xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer group h-48"
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-teal-500 group-hover:scale-110 transition-all mb-4 border border-gray-100">
                  <Upload size={24} />
                </div>
                <p className="text-sm text-gray-700 font-semibold mb-1 group-hover:text-teal-700 transition-colors">Seleccionar archivo GC</p>
                <p className="text-xs text-gray-400">PDF, máximo 5MB</p>
              </div>
            ) : (
              <div className="border border-teal-200 bg-teal-50/50 rounded-2xl p-6 flex items-center justify-between animate-fade-in shadow-sm h-48">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                    <FileText size={24} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-gray-800 truncate" title={selectedFileGC.name}>{selectedFileGC.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 font-mono">{selectedFileGC.size}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span className="text-[10px] uppercase font-bold text-teal-600 flex items-center gap-1">
                        <CheckCircle2 size={12} /> Listo
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleRemoveFileGC}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-red-100 ml-2 shrink-0"
                  title="Eliminar archivo GC"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Documento GF */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-3">Documento GF (Gestión Formativa)</h3>
            
            {!selectedFileGF ? (
              <div 
                onClick={handleFileSelectGF}
                className="border-2 border-dashed border-gray-300 hover:border-teal-500 bg-gray-50 hover:bg-teal-50/30 rounded-2xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer group h-48"
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-teal-500 group-hover:scale-110 transition-all mb-4 border border-gray-100">
                  <Upload size={24} />
                </div>
                <p className="text-sm text-gray-700 font-semibold mb-1 group-hover:text-teal-700 transition-colors">Seleccionar archivo GF</p>
                <p className="text-xs text-gray-400">PDF, máximo 5MB</p>
              </div>
            ) : (
              <div className="border border-teal-200 bg-teal-50/50 rounded-2xl p-6 flex items-center justify-between animate-fade-in shadow-sm h-48">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                    <FileText size={24} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-gray-800 truncate" title={selectedFileGF.name}>{selectedFileGF.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 font-mono">{selectedFileGF.size}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span className="text-[10px] uppercase font-bold text-teal-600 flex items-center gap-1">
                        <CheckCircle2 size={12} /> Listo
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleRemoveFileGF}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-red-100 ml-2 shrink-0"
                  title="Eliminar archivo GF"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Botón de Envío */}
        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleEnviarInforme}
            disabled={!selectedFileGC || !selectedFileGF || isUploading}
            className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 ${
              !selectedFileGC || !selectedFileGF || isUploading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white shadow-teal-500/25 hover:shadow-lg hover:-translate-y-0.5'
            }`}
          >
            {isUploading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Procesando...
              </span>
            ) : (
              <>
                <Upload size={18} />
                Enviar Informe
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
