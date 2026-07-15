import React, { useState } from 'react';
import { User, Mail, Shield, Bell, Settings, Award } from 'lucide-react';
import { StatusBadge } from '../CommonComponents';

export default function CoordinadorMiCuenta({ user = {}, addToast }) {
  const [toggles, setToggles] = useState({
    resumenDiario: true,
    masDosDias: true,
    correoSemanal: false
  });

  const handleToggle = (key, label) => {
    const newVal = !toggles[key];
    setToggles({
      ...toggles,
      [key]: newVal
    });
    addToast(`Preferencia "${label}" cambiada a: ${newVal ? 'Activada' : 'Desactivada'}`);
  };

  return (
    <div className="space-y-6 animate-fade-in text-white">
      <div>
        <h2 className="text-xl font-bold">Mi Cuenta y Configuración</h2>
        <p className="text-xs text-gray-400">Gestiona tus preferencias de notificación y datos de coordinación.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 text-xs">
        {/* Ficha Perfil Izquierda */}
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-teal-900 border border-teal-650 flex items-center justify-center text-teal-400 font-extrabold text-2xl shadow-inner">
            PL
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base">Patricia Lozano Coordinadora</h3>
            <p className="text-xs text-teal-450 font-semibold mt-1">Coordinadora Académica</p>
          </div>

          <div className="pt-2">
            <span className="px-3 py-1 bg-teal-600/20 text-teal-300 text-xs font-bold rounded-full border border-teal-500/30">
              Activo
            </span>
          </div>

          <div className="w-full pt-4 border-t border-gray-750 text-left space-y-2 text-gray-400">
            <p className="flex items-center gap-2 truncate">
              <Mail size={14} className="text-teal-400" />
              <span>coordinacion@caedph.sena.edu.co</span>
            </p>
            <p className="flex items-center gap-2">
              <Award size={14} className="text-teal-400" />
              <span>Centro de Formación Yamboro</span>
            </p>
          </div>
        </div>

        {/* Configuración Notificaciones Derecha */}
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl md:col-span-2 space-y-6">
          <div className="border-b border-gray-750 pb-3">
            <h3 className="font-bold text-teal-400 text-sm flex items-center gap-1.5">
              <Settings size={16} /> Preferencias del Sistema de Alertas
            </h3>
          </div>

          <div className="space-y-5">
            {/* Toggle 1 */}
            <div className="flex items-center justify-between p-3.5 bg-gray-900/60 rounded-xl border border-gray-800/80">
              <div>
                <p className="font-bold text-white text-xs">Recibir resumen diario de informes pendientes</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Envío automático cada mañana con el consolidado en espera.</p>
              </div>
              <button
                onClick={() => handleToggle('resumenDiario', 'Resumen diario')}
                className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 flex items-center cursor-pointer ${
                  toggles.resumenDiario ? 'bg-teal-600 justify-end' : 'bg-gray-750 justify-start'
                }`}
              >
                <div className="w-4 h-4 bg-white rounded-full shadow"></div>
              </button>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between p-3.5 bg-gray-900/60 rounded-xl border border-gray-800/80">
              <div>
                <p className="font-bold text-white text-xs">Notificaciones de informes con más de 2 días en espera</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Alertas prioritarias en panel para revisiones críticas.</p>
              </div>
              <button
                onClick={() => handleToggle('masDosDias', 'Informes en espera (+2 días)')}
                className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 flex items-center cursor-pointer ${
                  toggles.masDosDias ? 'bg-teal-600 justify-end' : 'bg-gray-750 justify-start'
                }`}
              >
                <div className="w-4 h-4 bg-white rounded-full shadow"></div>
              </button>
            </div>

            {/* Toggle 3 */}
            <div className="flex items-center justify-between p-3.5 bg-gray-900/60 rounded-xl border border-gray-800/80">
              <div>
                <p className="font-bold text-white text-xs">Correo semanal de estadísticas</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Gráficos de rendimiento de instructores y reportes consolidados.</p>
              </div>
              <button
                onClick={() => handleToggle('correoSemanal', 'Estadísticas semanales')}
                className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 flex items-center cursor-pointer ${
                  toggles.correoSemanal ? 'bg-teal-600 justify-end' : 'bg-gray-750 justify-start'
                }`}
              >
                <div className="w-4 h-4 bg-white rounded-full shadow"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
