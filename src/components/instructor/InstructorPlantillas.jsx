import React from 'react';
import { Download, FileText, FileSpreadsheet, Layers, Info } from 'lucide-react';

const PLANTILLAS_MOCK = [
  { id: 1, titulo: 'Formato GC-002: Informe Mensual', tipo: 'DOCX', tamaño: '240 KB', desc: 'Formato estándar de reporte mensual de actividades bajo el sistema de calidad institucional SENA.', icon: 'doc' },
  { id: 2, titulo: 'Formato GF-015: Certificado de Cobro', tipo: 'XLSX', tamaño: '180 KB', desc: 'Plantilla de control de cobro mensual requerida para la radicación de cuenta del contratista.', icon: 'sheet' },
  { id: 3, titulo: 'Bitácora de Seguimiento de Etapa Productiva', tipo: 'PDF', tamaño: '1.2 MB', desc: 'Formato oficial de control de bitácoras de aprendices asignados a etapa productiva.', icon: 'pdf' },
  { id: 4, titulo: 'Planeación Pedagógica Guía de Aprendizaje', tipo: 'DOCX', tamaño: '310 KB', desc: 'Plantilla estructurada para guías de aprendizaje y plan de formación de fichas lectivas.', icon: 'doc' },
];

export default function InstructorPlantillas({ addToast }) {
  const handleDescarga = (titulo) => {
    addToast(`Descargando plantilla: "${titulo}"...`);
  };

  return (
    <div className="space-y-6 animate-fade-in text-white">
      <div>
        <h2 className="text-xl font-bold">Plantillas Oficiales GC y GF</h2>
        <p className="text-xs text-gray-400">Descarga los formatos oficiales vigentes requeridos por el Tecnoparque SENA.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {PLANTILLAS_MOCK.map((plant) => (
          <div key={plant.id} className="bg-gray-800 border border-gray-700 p-5 rounded-xl hover:border-gray-600 transition-all duration-200 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="p-2.5 bg-gray-900 rounded-lg text-teal-400 border border-gray-750">
                  {plant.icon === 'sheet' ? <FileSpreadsheet size={22} /> : 
                   plant.icon === 'pdf' ? <Layers size={22} /> : 
                   <FileText size={22} />}
                </div>
                <span className="text-[10px] font-bold bg-teal-950 text-teal-400 px-2 py-0.5 rounded border border-teal-900/60 font-mono">
                  {plant.tipo} | {plant.tamaño}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm mb-1">{plant.titulo}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{plant.desc}</p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-750 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[10px] text-gray-500">
                <Info size={12} className="text-teal-500" />
                <span>Versión V4.0 (Vigente 2025)</span>
              </div>
              <button
                onClick={() => handleDescarga(plant.titulo)}
                className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 active:scale-[0.98] text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Download size={12} /> Descargar Plantilla
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
