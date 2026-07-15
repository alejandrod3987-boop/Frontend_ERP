import React, { useState } from 'react';
import { Users, Mail, Phone, Calendar, ArrowRight, ShieldAlert, Award } from 'lucide-react';
import { StatusBadge, ProgressBar, Modal } from '../CommonComponents';

export default function CoordinadorInstructores({ instructores = [], informes = [] }) {
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDetails = (inst) => {
    // Buscar informes de este instructor
    const instInformes = informes.filter(inf => inf.instructorId === inst.id);
    setSelectedInstructor({
      ...inst,
      informesLista: instInformes
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in text-white">
      <div>
        <h2 className="text-xl font-bold">Registro de Instructores</h2>
        <p className="text-xs text-gray-400">Listado general de instructores asignados a tu coordinación.</p>
      </div>

      {/* Grid de Instructores */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {instructores.map((inst) => {
          // Iniciales
          const iniciales = inst.nombre
            .split(' ')
            .map(n => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();

          return (
            <div
              key={inst.id}
              className="glass-card p-6 rounded-2xl hover:border-teal-500/40 hover:shadow-xl hover:shadow-teal-900/10 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div className="space-y-5">
                {/* Cabecera Tarjeta */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-900 to-teal-950 border border-teal-500/30 flex items-center justify-center font-black text-teal-300 text-lg shadow-inner shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {iniciales}
                  </div>
                  <div>
                    <h3 className="font-black text-base text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 leading-tight">{inst.nombre}</h3>
                    <p className="text-[10px] text-gray-400 font-mono mt-1 bg-black/20 px-2 py-0.5 rounded w-fit">C.C. {inst.cedula}</p>
                  </div>
                </div>

                {/* Badges de Área y Estado */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-teal-950/60 text-teal-300 border border-teal-500/30 text-[10px] font-bold rounded-lg shadow-inner">
                    {inst.area}
                  </span>
                  <StatusBadge estado={inst.estado} />
                </div>

                {/* Métricas rápidas */}
                <div className="grid grid-cols-2 gap-4 text-xs py-4 border-y border-gray-700/50">
                  <div className="bg-gray-900/40 p-3 rounded-xl border border-gray-800/50">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider mb-1">Aprobación</span>
                    <span className="font-black text-teal-400 text-lg">{inst.tasaAprobacion}%</span>
                    <div className="mt-2">
                      <ProgressBar valor={inst.tasaAprobacion} color="bg-gradient-to-r from-teal-600 to-teal-400" />
                    </div>
                  </div>
                  <div className="bg-gray-900/40 p-3 rounded-xl border border-gray-800/50 text-right flex flex-col justify-between">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider mb-1">Informes</span>
                    <span className="font-black text-white text-lg">{inst.totalInformes}</span>
                    <span className="text-[9px] text-gray-500">radicados</span>
                  </div>
                </div>

                {/* Datos de contacto */}
                <div className="text-[11px] space-y-2 text-gray-400 font-medium bg-gray-900/20 p-3 rounded-xl border border-gray-800/30">
                  <p className="flex items-center gap-2 truncate hover:text-teal-300 transition-colors cursor-default">
                    <Mail size={14} className="text-teal-500/70" /> {inst.email}
                  </p>
                  <p className="flex items-center gap-2 hover:text-teal-300 transition-colors cursor-default">
                    <Phone size={14} className="text-teal-500/70" /> {inst.telefono}
                  </p>
                </div>
              </div>

              {/* Botón Ver Ficha */}
              <div className="mt-5 pt-4 border-t border-gray-700/50 flex justify-end">
                <button
                  onClick={() => openDetails(inst)}
                  className="w-full px-4 py-2.5 bg-gray-800 hover:bg-teal-900/30 active:scale-[0.98] border border-gray-700 hover:border-teal-500/50 text-teal-400 hover:text-teal-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  Ver Ficha Completa <ArrowRight size={14} />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* MODAL DETALLES DEL INSTRUCTOR */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ficha Técnica del Instructor"
      >
        {selectedInstructor ? (
          <div className="space-y-6 text-xs text-white">
            <div className="flex items-center gap-4 p-5 glass-panel border-teal-500/30 rounded-2xl shadow-lg">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-900 to-teal-950 border border-teal-500/40 flex items-center justify-center font-black text-teal-300 text-2xl shadow-inner shrink-0">
                {selectedInstructor.nombre.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
              </div>
              <div>
                <h4 className="font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-1">{selectedInstructor.nombre}</h4>
                <p className="text-gray-400 font-mono text-[11px] bg-black/20 px-2 py-0.5 rounded w-fit">C.C. {selectedInstructor.cedula}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="px-3 py-1 bg-teal-950/60 text-teal-300 text-[10px] font-bold rounded-lg border border-teal-500/30">
                    {selectedInstructor.area}
                  </span>
                  <StatusBadge estado={selectedInstructor.estado} />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 bg-gray-900/40 border border-gray-800/60 rounded-xl space-y-2 shadow-inner">
                <span className="text-[10px] text-teal-400 font-bold block uppercase tracking-wider mb-2">Datos de Contacto</span>
                <p className="flex items-center gap-2 text-gray-300"><Mail size={14} className="text-gray-500" /> {selectedInstructor.email}</p>
                <p className="flex items-center gap-2 text-gray-300"><Phone size={14} className="text-gray-500" /> {selectedInstructor.telefono}</p>
                <p className="flex items-center gap-2 text-gray-300"><Calendar size={14} className="text-gray-500" /> Ingreso: {selectedInstructor.fechaIngreso}</p>
              </div>

              <div className="p-4 bg-gray-900/40 border border-gray-800/60 rounded-xl space-y-2 shadow-inner">
                <span className="text-[10px] text-teal-400 font-bold block uppercase tracking-wider mb-2">Datos de Dispersión</span>
                <p className="flex justify-between"><span className="text-gray-500 font-medium">Banco:</span> <span className="font-semibold text-gray-200">{selectedInstructor.banco || 'Bancolombia'}</span></p>
                <p className="flex justify-between"><span className="text-gray-500 font-medium">Tipo:</span> <span className="font-semibold text-gray-200">{selectedInstructor.tipoCuenta || 'Ahorros'}</span></p>
                <p className="flex justify-between"><span className="text-gray-500 font-medium">Nº Cuenta:</span> <span className="font-mono text-gray-200">{selectedInstructor.numeroCuenta || '****3421'}</span></p>
              </div>
            </div>

            {/* Listado de Informes Recientes */}
            <div className="bg-gray-900/30 border border-gray-800/50 p-4 rounded-2xl">
              <span className="text-teal-400 font-bold block mb-3 uppercase text-[10px] tracking-wider flex items-center gap-2">
                <Award size={14} /> Últimos Informes Radicados
              </span>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                {selectedInstructor.informesLista?.length === 0 ? (
                  <p className="text-gray-500 italic text-center py-4 bg-gray-900/40 rounded-xl border border-dashed border-gray-700">No registra informes en el sistema.</p>
                ) : (
                  selectedInstructor.informesLista?.map(inf => (
                    <div key={inf.id} className="flex justify-between items-center p-3 glass-panel border border-gray-700/50 rounded-xl hover:border-gray-600 transition-colors">
                      <div>
                        <span className="font-bold text-sm text-white block mb-0.5">{inf.mes}</span>
                        <span className="text-[10px] text-gray-400 font-mono bg-black/20 px-1.5 py-0.5 rounded">ID: {inf.id}</span>
                        <span className="text-[10px] text-gray-500 ml-2">Entregado: {inf.fechaEntrega}</span>
                      </div>
                      <StatusBadge estado={inf.estado} />
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-end pt-5 border-t border-gray-700/50">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md active:scale-[0.98]"
              >
                Cerrar Ficha
              </button>
            </div>

          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">Cargando información...</div>
        )}
      </Modal>

    </div>
  );
}
