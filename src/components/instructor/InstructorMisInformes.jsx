import React, { useState } from 'react';
import { FileText, Download, Edit3, ArrowRight, Eye, AlertCircle } from 'lucide-react';
import { StatusBadge, Modal } from '../CommonComponents';

export default function InstructorMisInformes({ informes = [], updateInforme, addToast }) {
  const [selectedInforme, setSelectedInforme] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCorrectingOpen, setIsCorrectingOpen] = useState(false);
  const [correctionFile, setCorrectionFile] = useState(null);
  const [correctionComment, setCorrectionComment] = useState('');

  const openDetail = (inf) => {
    setSelectedInforme(inf);
    setIsDetailOpen(true);
  };

  const openCorrection = (inf) => {
    setSelectedInforme(inf);
    setIsCorrectingOpen(true);
    setCorrectionFile(null);
    setCorrectionComment('');
  };

  const handleCorrect = () => {
    if (!correctionFile) {
      alert('Por favor, seleccione un archivo de corrección simulado.');
      return;
    }

    // Actualizar el estado del informe en el componente global
    const updated = {
      ...selectedInforme,
      estado: 'En Revision',
      observacion: '',
      diasEspera: 1,
      fechaEntrega: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    updateInforme(updated);
    setIsCorrectingOpen(false);
    addToast(`Corrección "${correctionFile}" enviada exitosamente a coordinación.`);
  };

  const handleDescargar = (id) => {
    addToast(`Descargando copia PDF oficial del informe ${id}...`);
  };

  return (
    <div className="space-y-6 animate-fade-in text-white">
      <div>
        <h2 className="text-xl font-bold">Mis Informes Mensuales</h2>
        <p className="text-xs text-gray-400">Historial y estado de tus entregas contractuales.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {informes.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-gray-400 bg-gray-800 border border-gray-700 rounded-xl">
            Aún no has registrado informes. Dirígete a la sección "Cargar Informe".
          </div>
        ) : (
          informes.map((inf) => {
            const isCorreccion = inf.estado === 'Requiere Correcciones';
            
            return (
              <div 
                key={inf.id}
                className={`p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group ${
                  isCorreccion 
                    ? 'glass-premium border-amber-500/40 shadow-lg shadow-amber-900/10 hover:shadow-amber-500/20' 
                    : 'glass-card border-gray-700/50 hover:border-teal-500/40 hover:shadow-teal-900/10'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-gray-500 font-mono tracking-wider bg-black/20 px-2 py-1 rounded-md">{inf.id}</span>
                    <StatusBadge estado={inf.estado} />
                  </div>

                  <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-2">{inf.mes}</h3>
                  <p className="text-xs text-gray-400 mb-5 font-medium">
                    Entregado el: <span className="text-white font-bold">{inf.fechaEntrega}</span>
                  </p>

                  {isCorreccion && inf.observacion && (
                    <div className="mb-5 p-4 bg-amber-950/40 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex gap-3 shadow-inner">
                      <AlertCircle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5 animate-pulse" />
                      <div className="leading-relaxed">
                        <span className="font-extrabold uppercase tracking-wide block mb-1 text-amber-300">Observación:</span> {inf.observacion}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-5 border-t border-gray-700/50 mt-auto">
                  {isCorreccion ? (
                    <button
                      onClick={() => openCorrection(inf)}
                      className="flex-1 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 active:scale-[0.98] text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5"
                    >
                      <Edit3 size={16} /> Corregir
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDescargar(inf.id)}
                      className="flex-1 py-2.5 border border-gray-600 hover:border-teal-500/50 hover:bg-teal-900/20 text-gray-300 hover:text-teal-300 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download size={16} /> Descargar PDF
                    </button>
                  )}
                  
                  <button
                    onClick={() => openDetail(inf)}
                    className="px-4 py-2.5 border border-gray-600 hover:border-blue-500/50 hover:bg-blue-900/20 text-gray-300 hover:text-blue-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Eye size={16} /> Detalle
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL DETALLE */}
      <Modal 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
        title={`Detalle de Informe ${selectedInforme?.id}`}
      >
        {selectedInforme && (
          <div className="space-y-4 text-xs text-white">
            <div className="grid grid-cols-2 gap-3 bg-gray-900 p-3 rounded-lg border border-gray-800">
              <div>
                <span className="text-gray-400 block">Mes:</span>
                <span className="font-semibold">{selectedInforme.mes}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Estado:</span>
                <div className="mt-1">
                  <StatusBadge estado={selectedInforme.estado} />
                </div>
              </div>
              <div>
                <span className="text-gray-400 block">Fecha Entrega:</span>
                <span className="font-semibold">{selectedInforme.fechaEntrega}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Revisado Por:</span>
                <span className="font-semibold">{selectedInforme.revisadoPor || 'Pendiente'}</span>
              </div>
            </div>

            {selectedInforme.observacion && (
              <div className="p-3 bg-gray-900 border border-gray-800 rounded-lg">
                <span className="text-teal-400 font-bold block mb-1">Comentarios de Coordinación:</span>
                <p className="text-gray-300 leading-relaxed">{selectedInforme.observacion}</p>
              </div>
            )}

            <div>
              <span className="text-gray-400 font-bold block mb-2 uppercase tracking-wide">Archivos Asociados</span>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="flex items-center gap-1.5"><FileText size={14} className="text-teal-400" /> Informe_GC_Generado.pdf</span>
                  <button onClick={() => handleDescargar(selectedInforme.id)} className="text-teal-400 hover:underline">Descargar</button>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="flex items-center gap-1.5"><FileText size={14} className="text-teal-400" /> Soporte_Firmado_GF.pdf</span>
                  <button onClick={() => handleDescargar(selectedInforme.id)} className="text-teal-400 hover:underline">Descargar</button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-700">
              <button 
                onClick={() => setIsDetailOpen(false)}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-semibold text-xs transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL CORREGIR */}
      <Modal
        isOpen={isCorrectingOpen}
        onClose={() => setIsCorrectingOpen(false)}
        title={`Corregir Informe ${selectedInforme?.id}`}
      >
        {selectedInforme && (
          <div className="space-y-4 text-xs text-white">
            <div className="p-3 bg-amber-950/40 border border-amber-800/40 rounded-lg text-amber-200">
              <span className="font-bold block mb-1">Corrección Solicitada:</span>
              <p>{selectedInforme.observacion}</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-gray-400 font-semibold mb-2">Subir Documento Corregido (PDF)</label>
                {correctionFile ? (
                  <div className="p-3 bg-gray-900 border border-teal-600 rounded-lg flex items-center justify-between">
                    <span className="text-teal-400 font-medium flex items-center gap-1.5"><FileText size={14} /> {correctionFile}</span>
                    <button onClick={() => setCorrectionFile(null)} className="text-red-400 hover:underline">Quitar</button>
                  </div>
                ) : (
                  <div 
                    onClick={() => setCorrectionFile('Informe_GC_Corregido_Vargas.pdf')}
                    className="border-2 border-dashed border-gray-700 hover:border-teal-500 p-6 rounded-lg text-center cursor-pointer hover:bg-gray-750 transition-all"
                  >
                    <FileText className="mx-auto text-gray-500 w-8 h-8 mb-2" />
                    <p className="text-gray-400 font-semibold">Haz clic aquí para cargar tu archivo corregido</p>
                    <p className="text-[10px] text-gray-500">PDF con firmas estampadas (máx. 5MB)</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-400 font-semibold mb-2">Comentarios de Corrección (Opcional)</label>
                <textarea
                  rows="3"
                  value={correctionComment}
                  onChange={(e) => setCorrectionComment(e.target.value)}
                  placeholder="Detalla los cambios o ajustes solicitados que has realizado..."
                  className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white text-xs focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-gray-700">
              <button 
                onClick={() => setIsCorrectingOpen(false)}
                className="px-3 py-2 border border-gray-600 hover:bg-gray-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={handleCorrect}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Enviar Corrección
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
