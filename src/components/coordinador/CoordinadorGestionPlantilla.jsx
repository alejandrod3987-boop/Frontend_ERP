import React, { useState } from 'react';
import { Check, Edit, FileText, Plus, Trash2, HelpCircle } from 'lucide-react';
import { StatusBadge, Modal } from '../CommonComponents';

const OBLIGACIONES_PRESET = [
  "Orientar la formación y acompañar de forma permanente a los aprendices en sus procesos formativos.",
  "Participar y apoyar los procesos de inducción a aprendices en el centro de formación.",
  "Informar y orientar el cumplimiento del decreto de bienestar al aprendiz (Ley 397 de 2013) y reglamento del aprendiz.",
  "Elaborar, ejecutar y hacer seguimiento al proyecto de formación y planeación pedagógica.",
  "Registrar en el SOFIA Plus la asistencia diaria y los juicios de evaluación académica oportuna.",
  "Elaborar y entregar a los aprendices las guías de aprendizaje programadas en el plan formativo.",
  "Diligenciar y entregar los instrumentos de evaluación necesarios para la etapa lectiva.",
  "Reportar al coordinador académico las novedades académicas y deserción de aprendices.",
  "Subir pantallazos del portafolio del instructor en SOFIA Plus debidamente diligenciado.",
  "Dar cumplimiento a la normativa de formación complementaria o virtual según las directrices vigentes.",
  "Realizar seguimiento a la etapa productiva cuando sea asignado por la coordinación académica.",
  "Cuidar y salvaguardar los bienes y equipos del SENA asignados para el desarrollo formativo.",
  "Apoyar la ejecución de las actividades de bienestar al aprendiz de la institución.",
  "Participar en las reuniones de equipo ejecutor, comités de evaluación y académicas de la sede.",
  "Mantener actualizados los planes de mejoramiento de los aprendices con bajo rendimiento.",
  "Reportar oportunamente los incidentes y riesgos en los ambientes de aprendizaje del centro.",
  "Cumplir con las directrices de calidad y control interno aplicables al proceso formativo."
];

export default function CoordinadorGestionPlantilla({ addToast }) {
  const [obligaciones, setObligaciones] = useState(OBLIGACIONES_PRESET);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingList, setEditingList] = useState([]);
  const [newItem, setNewItem] = useState('');

  const openEditor = () => {
    setEditingList([...obligaciones]);
    setNewItem('');
    setIsEditOpen(true);
  };

  const handleRemoveItem = (idx) => {
    setEditingList(editingList.filter((_, i) => i !== idx));
  };

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    setEditingList([...editingList, newItem.trim()]);
    setNewItem('');
  };

  const handleItemChange = (idx, value) => {
    const updated = [...editingList];
    updated[idx] = value;
    setEditingList(updated);
  };

  const savePlantilla = () => {
    if (editingList.length === 0) {
      alert('La plantilla debe tener al menos una obligación.');
      return;
    }
    setObligaciones(editingList);
    setIsEditOpen(false);
    addToast('Plantilla institucional de informe GC actualizada con éxito.');
  };

  return (
    <div className="space-y-6 animate-fade-in text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Gestión de Plantilla de Informe (GC)</h2>
          <p className="text-xs text-gray-400">Configura la lista de obligaciones institucionales obligatorias.</p>
        </div>

        <button
          onClick={openEditor}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-500 active:scale-[0.98] text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-all cursor-pointer w-fit"
        >
          <Edit size={14} /> Editar Plantilla
        </button>
      </div>

      {/* Info Status Banner */}
      <div className="bg-gray-800 border border-gray-700 p-5 rounded-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-950 text-teal-400 rounded-lg border border-teal-900/60">
            <FileText size={24} />
          </div>
          <div>
            <span className="font-extrabold text-sm block">Plantilla Única de Contratistas CAEDPH</span>
            <span className="text-xs text-gray-400">Total obligaciones activas: <span className="font-bold text-white">{obligaciones.length}</span></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-teal-600 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow shadow-teal-900/20">
            Activa
          </span>
        </div>
      </div>

      {/* Listado de Obligaciones */}
      <div className="space-y-3">
        {obligaciones.map((ob, idx) => (
          <div 
            key={idx}
            className="bg-[#252b3b] border border-gray-700 p-4 rounded-xl flex items-start gap-3 hover:border-gray-650 transition-colors"
          >
            <div className="w-5 h-5 rounded-full bg-teal-950 border border-teal-800 text-teal-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-inner">
              <Check size={12} strokeWidth={3} />
            </div>
            <div>
              <p className="text-xs text-gray-300 font-medium leading-relaxed">
                <span className="text-teal-400 font-bold mr-1.5">{idx + 1}.</span> {ob}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL EDITOR DE PLANTILLA */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Editar Plantilla de Obligaciones"
      >
        <div className="space-y-4 text-xs text-white">
          <p className="text-gray-400 leading-relaxed">
            Modifica la redacción de las obligaciones o agrega nuevas que los instructores deberán sustentar mensualmente.
          </p>

          {/* Agregar Nueva */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Escribe una nueva obligación..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="flex-1 p-2 bg-gray-900 border border-gray-700 rounded-lg text-xs text-white focus:outline-none focus:border-teal-500"
            />
            <button
              onClick={handleAddItem}
              className="px-3 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Plus size={14} /> Agregar
            </button>
          </div>

          {/* Listado de edición */}
          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {editingList.map((ob, idx) => (
              <div key={idx} className="flex gap-2 items-start bg-gray-950 p-2 rounded border border-gray-800">
                <span className="font-bold text-teal-400 mt-2.5 shrink-0 text-center w-5">{idx + 1}</span>
                <textarea
                  rows="2"
                  value={ob}
                  onChange={(e) => handleItemChange(idx, e.target.value)}
                  className="flex-1 p-1 bg-transparent text-white text-[11px] focus:outline-none focus:ring-1 focus:ring-teal-700/60 rounded leading-tight font-sans resize-none"
                />
                <button
                  onClick={() => handleRemoveItem(idx)}
                  className="p-1.5 text-red-400 hover:text-white hover:bg-red-950/40 rounded transition-colors shrink-0 mt-1 cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-700">
            <button
              onClick={() => setIsEditOpen(false)}
              className="px-3 py-2 border border-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={savePlantilla}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-bold transition-colors cursor-pointer"
            >
              Guardar Plantilla
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
