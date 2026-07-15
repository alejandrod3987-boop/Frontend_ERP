import React, { useState } from 'react';
import { ClipboardCheck, CheckCircle2, AlertTriangle, Eye, Clock, X, FileText, ChevronRight } from 'lucide-react';
import { StatusBadge, Modal } from '../CommonComponents';

export default function CoordinadorRevisar({ informes = [], instructores = [], updateInforme, addNotificacion, addToast }) {
  const [tab, setTab] = useState('pendiente'); // pendiente, aprobado, correccion
  const [selectedInforme, setSelectedInforme] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [observacion, setObservacion] = useState('');
  const [isConfirmAprobar, setIsConfirmAprobar] = useState(false);

  // Obtener nombre del instructor por id
  const getInstructorName = (id) => {
    const inst = instructores.find(i => i.id === id);
    return inst ? inst.nombre : 'Instructor Desconocido';
  };

  const getInstructorArea = (id) => {
    const inst = instructores.find(i => i.id === id);
    return inst ? inst.area : 'General';
  };

  // Contadores
  const countPendientes = informes.filter(i => i.estado === 'En Revision' || i.estado === 'En Revisión').length;
  const countAprobados = informes.filter(i => i.estado === 'Aprobado').length;
  const countCorrecciones = informes.filter(i => i.estado === 'Requiere Correcciones').length;

  const informesFiltrados = informes.filter(inf => {
    if (tab === 'pendiente') return inf.estado === 'En Revision' || inf.estado === 'En Revisión';
    if (tab === 'aprobado') return inf.estado === 'Aprobado';
    if (tab === 'correccion') return inf.estado === 'Requiere Correcciones';
    return false;
  });

  const openReview = (inf) => {
    setSelectedInforme(inf);
    setObservacion('');
    setIsConfirmAprobar(false);
    setIsReviewOpen(true);
  };

  const handleAprobar = () => {
    if (!selectedInforme) return;

    const updated = {
      ...selectedInforme,
      estado: 'Aprobado',
      fechaRevision: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }),
      revisadoPor: 'Coord. Patricia Lozano',
      observacion: 'Informe aprobado satisfactoriamente por la coordinación académica.'
    };

    updateInforme(updated);

    // Agregar notificación al instructor
    addNotificacion({
      id: Date.now(),
      tipo: 'aprobado',
      titulo: `Informe Aprobado - ${selectedInforme.mes}`,
      descripcion: `Tu informe de ${selectedInforme.mes} ha sido aprobado exitosamente por la coordinadora Patricia Lozano.`,
      fecha: 'Hace un momento',
      fechaExacta: new Date().toLocaleString('es-CO'),
      leida: false,
      informeId: selectedInforme.id
    });

    setIsReviewOpen(false);
    addToast(`El informe ${selectedInforme.id} ha sido Aprobado.`);
  };

  const handleSolicitarCorrecciones = () => {
    if (!selectedInforme) return;
    if (!observacion.trim()) {
      alert('Por favor, ingresa los detalles o motivos de la corrección.');
      return;
    }

    const updated = {
      ...selectedInforme,
      estado: 'Requiere Correcciones',
      fechaRevision: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }),
      revisadoPor: 'Coord. Patricia Lozano',
      observacion: observacion
    };

    updateInforme(updated);

    // Agregar notificación de corrección al instructor
    addNotificacion({
      id: Date.now(),
      tipo: 'correccion',
      titulo: `Correcciones Solicitadas - ${selectedInforme.mes}`,
      descripcion: `Se requieren correcciones en el informe de ${selectedInforme.mes}. Observación: "${observacion}"`,
      fecha: 'Hace un momento',
      fechaExacta: new Date().toLocaleString('es-CO'),
      leida: false,
      informeId: selectedInforme.id
    });

    setIsReviewOpen(false);
    addToast(`Se han solicitado correcciones para el informe ${selectedInforme.id}.`);
  };

  return (
    <div className="space-y-6 animate-fade-in text-white">
      <div>
        <h2 className="text-xl font-bold">Evaluación y Aprobación de Informes</h2>
        <p className="text-xs text-gray-400">Revisa los formatos GC y GF radicados por los instructores a tu cargo.</p>
      </div>

      {/* 3 Contadores Superiores */}
      <div className="grid gap-4 grid-cols-3">
        <div 
          onClick={() => setTab('pendiente')}
          className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-1 ${
            tab === 'pendiente' 
              ? 'glass-premium border-amber-500/50 shadow-lg shadow-amber-900/20 scale-[1.02]' 
              : 'glass-card border-gray-700/50 hover:border-amber-500/30 hover:shadow-xl'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-gray-400 uppercase font-extrabold tracking-wider">Pendientes</span>
            <Clock size={18} className={`${tab === 'pendiente' ? 'text-amber-400 animate-spin-slow' : 'text-gray-500 group-hover:text-amber-400'}`} />
          </div>
          <p className={`text-3xl font-black mt-3 ${tab === 'pendiente' ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200' : 'text-gray-300'}`}>{countPendientes}</p>
        </div>

        <div 
          onClick={() => setTab('aprobado')}
          className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-1 ${
            tab === 'aprobado' 
              ? 'glass-premium border-teal-500/50 shadow-lg shadow-teal-900/20 scale-[1.02]' 
              : 'glass-card border-gray-700/50 hover:border-teal-500/30 hover:shadow-xl'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-gray-400 uppercase font-extrabold tracking-wider">Aprobados</span>
            <CheckCircle2 size={18} className={`${tab === 'aprobado' ? 'text-teal-400' : 'text-gray-500 group-hover:text-teal-400'}`} />
          </div>
          <p className={`text-3xl font-black mt-3 ${tab === 'aprobado' ? 'text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200' : 'text-gray-300'}`}>{countAprobados}</p>
        </div>

        <div 
          onClick={() => setTab('correccion')}
          className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-1 ${
            tab === 'correccion' 
              ? 'glass-premium border-orange-500/50 shadow-lg shadow-orange-900/20 scale-[1.02]' 
              : 'glass-card border-gray-700/50 hover:border-orange-500/30 hover:shadow-xl'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-gray-400 uppercase font-extrabold tracking-wider">En Corrección</span>
            <AlertTriangle size={18} className={`${tab === 'correccion' ? 'text-orange-400 animate-pulse' : 'text-gray-500 group-hover:text-orange-400'}`} />
          </div>
          <p className={`text-3xl font-black mt-3 ${tab === 'correccion' ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200' : 'text-gray-300'}`}>{countCorrecciones}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700/50">
        <button
          onClick={() => setTab('pendiente')}
          className={`pb-4 text-xs font-bold border-b-2 px-6 transition-all duration-300 cursor-pointer flex-1 sm:flex-none text-center ${
            tab === 'pendiente' ? 'border-amber-500 text-amber-400 bg-amber-500/5' : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          En Revisión ({countPendientes})
        </button>
        <button
          onClick={() => setTab('aprobado')}
          className={`pb-4 text-xs font-bold border-b-2 px-6 transition-all duration-300 cursor-pointer flex-1 sm:flex-none text-center ${
            tab === 'aprobado' ? 'border-teal-500 text-teal-400 bg-teal-500/5' : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Aprobados ({countAprobados})
        </button>
        <button
          onClick={() => setTab('correccion')}
          className={`pb-4 text-xs font-bold border-b-2 px-6 transition-all duration-300 cursor-pointer flex-1 sm:flex-none text-center ${
            tab === 'correccion' ? 'border-orange-500 text-orange-400 bg-orange-500/5' : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Correcciones ({countCorrecciones})
        </button>
      </div>

      {/* Listado */}
      <div className="space-y-4">
        {informesFiltrados.length === 0 ? (
          <div className="text-center py-16 text-gray-400 glass-card rounded-2xl border-dashed">
            No hay informes en esta sección actualmente.
          </div>
        ) : (
          informesFiltrados.map((inf) => (
            <div key={inf.id} className="glass-card p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 hover:border-teal-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/10 transition-all duration-300">
              <div className="space-y-2 w-full sm:w-auto">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-bold bg-black/30 px-2.5 py-1 rounded-md tracking-widest font-mono text-gray-400 shadow-inner">{inf.id}</span>
                  <StatusBadge estado={inf.estado} />
                </div>
                <h4 className="font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">{getInstructorName(inf.instructorId)}</h4>
                <p className="text-xs text-teal-400 font-bold">{getInstructorArea(inf.instructorId)} • <span className="text-gray-400 font-medium">Mes: <span className="text-white">{inf.mes}</span></span></p>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 bg-gray-900/50 w-fit px-2 py-1 rounded mt-1 border border-gray-800/50">
                  <Clock size={10} /> 
                  <span>Radicado el: {inf.fechaEntrega} {inf.diasEspera && <span className="text-amber-500 font-semibold ml-1">• Espera: {inf.diasEspera} días</span>}</span>
                </div>
              </div>

              <button
                onClick={() => openReview(inf)}
                className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 active:scale-[0.98] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-0.5 mt-2 sm:mt-0"
              >
                <Eye size={16} /> Revisar
              </button>
            </div>
          ))
        )}
      </div>

      {/* MODAL REVISIÓN COMPLETA */}
      <Modal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        title={`Revisión de Informe ${selectedInforme?.id}`}
      >
        {selectedInforme && (
          <div className="space-y-5 text-xs text-white">
            
            {/* Cabecera */}
            <div className="p-3 bg-gray-900 border border-gray-800 rounded-lg">
              <p className="text-gray-400">Instructor:</p>
              <p className="text-sm font-bold text-white mb-1">{getInstructorName(selectedInforme.instructorId)}</p>
              <p className="text-teal-400 font-semibold text-[10px]">{getInstructorArea(selectedInforme.instructorId)} | Contrato: {selectedInforme.contrato || '4120-2025-08'}</p>
            </div>

            {/* Documentos Cargados */}
            <div className="space-y-2">
              <span className="text-gray-400 font-semibold block uppercase text-[10px]">Archivos del Instructor</span>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="flex items-center gap-2 p-2 bg-gray-900 rounded border border-gray-800 font-mono text-[10px]">
                  <FileText className="text-teal-400 shrink-0" size={14} />
                  <span className="truncate">Informe_GC_Firmado.pdf</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-900 rounded border border-gray-800 font-mono text-[10px]">
                  <FileText className="text-teal-400 shrink-0" size={14} />
                  <span className="truncate">Soporte_GF_Cobro.pdf</span>
                </div>
              </div>
            </div>

            {/* Simulación del flujo de Calificación */}
            {!isConfirmAprobar ? (
              <div className="space-y-4 border-t border-gray-700/60 pt-4">
                <h4 className="font-bold text-white text-xs uppercase text-teal-400">Evaluar Documento</h4>
                <p className="text-gray-450 leading-relaxed">
                  ¿El informe cumple con la totalidad de los soportes y el desarrollo de las 17 obligaciones del Tecnoparque SENA?
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsConfirmAprobar(true)}
                    className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg hover:shadow-teal-600/10"
                  >
                    <CheckCircle2 size={16} /> Aprobar Informe
                  </button>
                  <button
                    onClick={() => setIsConfirmAprobar('reprobar')}
                    className="flex-1 py-2.5 border border-orange-655 hover:bg-orange-950/20 text-orange-400 font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <AlertTriangle size={16} /> Solicitar Corrección
                  </button>
                </div>
              </div>
            ) : isConfirmAprobar === 'reprobar' ? (
              <div className="space-y-3 border-t border-gray-700/60 pt-4 animate-fade-in">
                <h4 className="font-bold text-orange-400 text-xs uppercase flex items-center gap-1">
                  <AlertTriangle size={14} /> Observaciones para Corrección
                </h4>
                <p className="text-gray-400">Escribe detalladamente las correcciones o evidencias faltantes que el instructor debe subsanar:</p>
                <textarea
                  rows="3"
                  value={observacion}
                  onChange={(e) => setObservacion(e.target.value)}
                  placeholder="Por favor detallar evidencias para la semana X, adjuntar soportes..."
                  className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white text-xs focus:outline-none focus:border-teal-500"
                />
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setIsConfirmAprobar(false)}
                    className="flex-1 py-2 border border-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    Volver
                  </button>
                  <button
                    onClick={handleSolicitarCorrecciones}
                    className="flex-1 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-bold transition-colors cursor-pointer"
                  >
                    Solicitar Correcciones
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 border-t border-gray-700/60 pt-4 text-center animate-fade-in">
                <CheckCircle2 className="mx-auto text-teal-400 w-12 h-12 animate-soft-pulse" />
                <h4 className="font-bold text-white text-sm uppercase">Confirmar Aprobación</h4>
                <p className="text-gray-400 max-w-sm mx-auto">
                  Al confirmar, se certificará el informe mensual de actividades. Esto habilitará la radicación de cobro oficial.
                </p>
                <div className="flex gap-2 pt-4 justify-center">
                  <button
                    onClick={() => setIsConfirmAprobar(false)}
                    className="px-4 py-2 border border-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAprobar}
                    className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-bold transition-colors cursor-pointer"
                  >
                    Aprobar Informe
                  </button>
                </div>
              </div>
            )}

          </div>
        )}
      </Modal>
    </div>
  );
}
