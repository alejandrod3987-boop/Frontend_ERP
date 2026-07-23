import React, { useState } from 'react';
import { UserPlus, UserX, UserCheck, Calendar, Mail, Phone, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Modal, StatusBadge } from '../CommonComponents';

export default function CoordinadorSolicitudes({ globalState, addToast }) {
  const { usuarios, aprobarUsuario, rechazarUsuario } = globalState;
  
  // Filter only pending users
  const pendientes = usuarios.filter(u => u.estado === 'Pendiente');
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('instructor');
  const [selectedArea, setSelectedArea] = useState('Desarrollo de Software');

  const openReview = (user) => {
    setSelectedUser(user);
    setSelectedRole('instructor');
    setSelectedArea('Desarrollo de Software');
    setIsModalOpen(true);
  };

  const handleAprobar = () => {
    if (!selectedUser) return;
    aprobarUsuario(selectedUser.id, selectedRole, selectedArea);
    setIsModalOpen(false);
  };

  const handleRechazar = () => {
    if (!selectedUser) return;
    if (window.confirm('¿Estás seguro de que deseas rechazar esta solicitud de registro? El usuario no podrá acceder al sistema.')) {
      rechazarUsuario(selectedUser.id);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      <div>
        <h2 className="text-xl font-bold">Solicitudes de Registro</h2>
        <p className="text-xs text-gray-500">Revisa y gestiona las cuentas pendientes de aprobación.</p>
      </div>

      {pendientes.length === 0 ? (
        <div className="text-center py-16 text-gray-400 bg-white shadow-sm rounded-2xl border border-gray-200 border-dashed">
          <UserCheck size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="font-medium text-gray-500">No hay solicitudes pendientes en este momento.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pendientes.map(user => (
            <div key={user.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg">
                  {user.name.charAt(0)}
                </div>
                <StatusBadge estado={user.estado} />
              </div>
              
              <h3 className="font-bold text-lg text-gray-800 mb-1">{user.name}</h3>
              <p className="text-xs text-gray-500 font-mono mb-4">C.C. {user.cedula}</p>
              
              <div className="space-y-2 mb-6">
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={16} className="text-teal-600" />
                  <span className="truncate">{user.email}</span>
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={16} className="text-teal-600" />
                  <span>{user.telefono}</span>
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} className="text-teal-600" />
                  <span>{user.fechaRegistro}</span>
                </p>
              </div>

              <button
                onClick={() => openReview(user)}
                className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <ShieldAlert size={18} className="text-amber-500" />
                Evaluar Solicitud
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal Evaluation */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Evaluación de Solicitud"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <h4 className="font-bold text-gray-800 text-lg mb-1">{selectedUser.name}</h4>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Documento</p>
                  <p className="text-sm font-mono text-gray-700">{selectedUser.cedula}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Fecha de Solicitud</p>
                  <p className="text-sm text-gray-700">{selectedUser.fechaRegistro}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Correo Electrónico</p>
                  <p className="text-sm text-gray-700 truncate">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Teléfono</p>
                  <p className="text-sm text-gray-700">{selectedUser.telefono}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Asignación de Permisos</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Rol en el Sistema
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-shadow"
                  >
                    <option value="instructor">Instructor</option>
                    <option value="coordinador">Coordinador</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Área Académica
                  </label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-shadow"
                  >
                    <option value="Desarrollo de Software">Desarrollo de Software</option>
                    <option value="Robótica">Robótica</option>
                    <option value="Agroindustria">Agroindustria</option>
                    <option value="Pecuario">Pecuario</option>
                    <option value="Telecomunicaciones">Telecomunicaciones</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={handleRechazar}
                className="flex-1 py-2.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <UserX size={18} />
                Rechazar
              </button>
              <button
                onClick={handleAprobar}
                className="flex-1 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md text-sm"
              >
                <CheckCircle2 size={18} />
                Aprobar y Asignar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
