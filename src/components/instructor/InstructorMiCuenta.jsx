import React, { useState } from 'react';
import { User, Phone, MapPin, Mail, CreditCard, Shield, Edit, Info, Check } from 'lucide-react';
import { StatusBadge } from '../CommonComponents';

export default function InstructorMiCuenta({ user = {}, onUpdateUser, addToast }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    nombre: user.name || 'Carlos Eduardo Vargas Ríos',
    telefono: '+57 310 234 5678',
    direccion: 'Cra 8 #15-20, Neiva, Huila',
    banco: 'Bancolombia',
    numeroCuenta: '****3421',
    tipoCuenta: 'Ahorros',
    cedula: '1023456789'
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false);
    
    // Simular guardado
    if (onUpdateUser) {
      onUpdateUser({
        ...user,
        name: form.nombre
      });
    }
    
    addToast('Perfil actualizado correctamente.');
  };

  return (
    <div className="space-y-6 animate-fade-in text-white">
      <div>
        <h2 className="text-xl font-bold">Mi Cuenta</h2>
        <p className="text-xs text-gray-400">Administra tus datos de contacto y facturación institucional.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Columna Izquierda: Tarjeta de Estado */}
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-teal-900 border border-teal-600 flex items-center justify-center text-teal-400 font-extrabold text-2xl shadow-inner">
            {form.nombre.split(' ').map(n => n[0]).slice(0,2).join('')}
          </div>
          <div>
            <h3 className="font-bold text-white text-base">{form.nombre}</h3>
            <p className="text-xs text-gray-400 font-mono mt-1">C.C. {form.cedula}</p>
          </div>
          
          <div className="pt-2">
            <span className="px-3 py-1 bg-teal-600/20 text-teal-300 text-xs font-bold rounded-full border border-teal-500/30">
              Activo
            </span>
          </div>

          <div className="w-full pt-4 border-t border-gray-750 text-left text-xs space-y-2 text-gray-400">
            <p className="flex items-center gap-2">
              <Mail size={14} className="text-teal-400" />
              <span>{user.email || 'carlos.vargas@sena.edu.co'}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone size={14} className="text-teal-400" />
              <span>{form.telefono}</span>
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={14} className="text-teal-400" />
              <span>{form.direccion}</span>
            </p>
          </div>
        </div>

        {/* Columna Derecha: Detalles Editables */}
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl md:col-span-2">
          <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-6">
            <h3 className="font-bold text-teal-400 text-sm flex items-center gap-1.5">
              <Shield size={16} /> Información Profesional y Bancaria
            </h3>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 active:scale-[0.98] text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
              >
                <Edit size={12} /> Editar Perfil
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(false)}
                  className="px-2.5 py-1.5 border border-gray-600 hover:bg-gray-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Check size={12} /> Guardar
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-2 text-xs">
            <div>
              <label className="block text-gray-400 font-semibold mb-1">Nombre Completo</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                disabled={!editing}
                onChange={handleChange}
                className={`w-full p-2.5 rounded-lg bg-gray-900 text-white border transition-all ${
                  editing ? 'border-teal-500 focus:outline-none' : 'border-gray-800 text-gray-400 cursor-not-allowed'
                }`}
              />
            </div>
            
            <div>
              <label className="block text-gray-400 font-semibold mb-1">Teléfono Móvil</label>
              <input
                type="text"
                name="telefono"
                value={form.telefono}
                disabled={!editing}
                onChange={handleChange}
                className={`w-full p-2.5 rounded-lg bg-gray-900 text-white border transition-all ${
                  editing ? 'border-teal-500 focus:outline-none' : 'border-gray-800 text-gray-400 cursor-not-allowed'
                }`}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-400 font-semibold mb-1">Dirección Residencia</label>
              <input
                type="text"
                name="direccion"
                value={form.direccion}
                disabled={!editing}
                onChange={handleChange}
                className={`w-full p-2.5 rounded-lg bg-gray-900 text-white border transition-all ${
                  editing ? 'border-teal-500 focus:outline-none' : 'border-gray-800 text-gray-400 cursor-not-allowed'
                }`}
              />
            </div>

            <div className="border-t border-gray-700/60 pt-4 md:col-span-2 mt-2">
              <h4 className="font-bold text-white mb-3 text-xs flex items-center gap-1">
                <CreditCard size={14} className="text-teal-400" /> Información de Dispersión de Fondos
              </h4>
            </div>

            <div>
              <label className="block text-gray-400 font-semibold mb-1">Entidad Bancaria</label>
              <input
                type="text"
                name="banco"
                value={form.banco}
                disabled={!editing}
                onChange={handleChange}
                className={`w-full p-2.5 rounded-lg bg-gray-900 text-white border transition-all ${
                  editing ? 'border-teal-500 focus:outline-none' : 'border-gray-800 text-gray-400 cursor-not-allowed'
                }`}
              />
            </div>

            <div>
              <label className="block text-gray-400 font-semibold mb-1">Número de Cuenta</label>
              <input
                type="text"
                name="numeroCuenta"
                value={form.numeroCuenta}
                disabled={!editing}
                onChange={handleChange}
                className={`w-full p-2.5 rounded-lg bg-gray-900 text-white border transition-all ${
                  editing ? 'border-teal-500 focus:outline-none' : 'border-gray-800 text-gray-400 cursor-not-allowed'
                }`}
              />
            </div>
          </form>
        </div>
      </div>

      {/* Banner de Info Fijo */}
      <div className="p-4 bg-teal-950/30 border border-teal-800/40 rounded-xl text-teal-200 text-xs flex gap-3 items-start">
        <Info className="w-5 h-5 shrink-0 text-teal-400 mt-0.5" />
        <div>
          <span className="font-extrabold uppercase block mb-1">¿Necesitas actualizar información sensible?</span>
          Para modificar tu cédula, datos bancarios principales o correos institucionales, comunícate con la coordinación administrativa del centro:
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 font-mono text-[11px] text-teal-300">
            <span>• coordinacion@caedph.sena.edu.co</span>
            <span>• Tel: (608) 836-5678 Ext. 101</span>
          </div>
        </div>
      </div>

    </div>
  );
}
