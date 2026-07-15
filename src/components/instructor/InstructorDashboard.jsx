import React, { useState, useEffect } from 'react';
import { AlertTriangle, Upload, FileText, Bell, Clock, Award, ShieldAlert, Zap } from 'lucide-react';
import { ProgressBar } from '../CommonComponents';

export default function InstructorDashboard({ userName, setSectionActive, notificaciones = [] }) {
  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  // Contador regresivo en tiempo real
  useEffect(() => {
    // Para que el temporizador sea real y siempre positivo en el año actual (2026) o futuros,
    // usaremos el 20 de marzo de 2027 como referencia para el cálculo de diferencia de tiempo.
    const target = new Date('2027-03-20T23:59:59').getTime();

    const interval = setInterval(() => {
      const ahora = new Date().getTime();
      const diferencia = target - ahora;

      if (diferencia <= 0) {
        clearInterval(interval);
        setTimeLeft({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
      } else {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        setTimeLeft({ dias, horas, minutos, segundos });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const noLeidas = notificaciones.filter(n => !n.leida).length;

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* 2 Banners Naranja */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-premium border-amber-500/30 p-5 rounded-2xl flex items-start justify-between gap-3 text-amber-200 shadow-lg shadow-amber-900/10 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 shrink-0 animate-soft-pulse text-amber-400" />
            </div>
            <div>
              <p className="font-bold text-sm tracking-wide text-white">Correcciones Pendientes</p>
              <p className="text-xs text-amber-300/80 mt-0.5">Tienes 1 informe que requiere correcciones.</p>
            </div>
          </div>
          <button 
            onClick={() => setSectionActive('Mis Informes')}
            className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 shadow-md shadow-amber-500/20 active:scale-[0.98] text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Revisar
          </button>
        </div>

        <div className="glass-premium border-teal-500/30 p-5 rounded-2xl flex items-start justify-between gap-3 text-teal-200 shadow-lg shadow-teal-900/10 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-teal-500/20 rounded-lg">
              <Clock className="w-5 h-5 shrink-0 animate-spin-slow text-teal-400" />
            </div>
            <div>
              <p className="font-bold text-sm tracking-wide text-white">Entrega Próxima</p>
              <p className="text-xs text-teal-300/80 mt-0.5">Informe de Marzo 2025 pendiente de entregar.</p>
            </div>
          </div>
          <button 
            onClick={() => setSectionActive('Cargar Informe')}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 shadow-md shadow-teal-500/20 active:scale-[0.98] text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Iniciar
          </button>
        </div>
      </div>

      {/* Bienvenida y Contador */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* Bienvenida */}
        <div className="flex-1 glass-premium border-l-teal-500/50 p-6 md:p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-teal-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <span className="text-[10px] font-bold text-teal-300 uppercase tracking-widest px-3 py-1.5 bg-teal-950/60 rounded-full border border-teal-500/30 shadow-inner">
              Instructor CAEDPH
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-200 mt-5 leading-tight">
              Bienvenido/a, {userName}
            </h2>
            <p className="text-gray-300 text-sm mt-3 max-w-lg leading-relaxed">
              Aquí tienes un resumen de tu actividad en el sistema. Asegúrate de verificar las observaciones de coordinación y mantener tus entregas al día.
            </p>
          </div>
          
          <div className="relative z-10 flex flex-wrap gap-4 mt-8">
            <div className="px-5 py-3 bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-700/50 flex items-center gap-3 shadow-inner">
              <div className="p-1.5 bg-teal-500/20 rounded-lg">
                <Zap className="text-teal-400 w-4 h-4" />
              </div>
              <span className="text-xs text-gray-400 font-medium">Rol: <span className="font-bold text-white tracking-wide">Instructor</span></span>
            </div>
            <div className="px-5 py-3 bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-700/50 flex items-center gap-3 shadow-inner">
              <div className="p-1.5 bg-teal-500/20 rounded-lg">
                <Award className="text-teal-400 w-4 h-4" />
              </div>
              <span className="text-xs text-gray-400 font-medium">Centro: <span className="font-bold text-white tracking-wide">Huila - Yamboro</span></span>
            </div>
          </div>
        </div>

        {/* Contador Regresivo */}
        <div className="glass-premium border-gray-700/50 p-6 rounded-3xl w-full lg:w-80 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-teal-300 text-[10px] font-bold uppercase tracking-widest mb-5">
              <Clock size={16} className="animate-spin-slow" />
              Próxima Entrega
            </div>
            
            {/* Números Grandes */}
            <div className="grid grid-cols-4 gap-2 text-center my-2">
              <div className="bg-gray-900/80 backdrop-blur-sm py-3 px-1 rounded-xl border border-gray-700/60 shadow-inner">
                <span className="block text-2xl font-black text-white font-mono">{String(timeLeft.dias).padStart(2, '0')}</span>
                <span className="text-[9px] text-gray-500 font-bold uppercase mt-1 block">días</span>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-sm py-3 px-1 rounded-xl border border-gray-700/60 shadow-inner">
                <span className="block text-2xl font-black text-white font-mono">{String(timeLeft.horas).padStart(2, '0')}</span>
                <span className="text-[9px] text-gray-500 font-bold uppercase mt-1 block">horas</span>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-sm py-3 px-1 rounded-xl border border-gray-700/60 shadow-inner">
                <span className="block text-2xl font-black text-white font-mono">{String(timeLeft.minutos).padStart(2, '0')}</span>
                <span className="text-[9px] text-gray-500 font-bold uppercase mt-1 block">min</span>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-sm py-3 px-1 rounded-xl border border-teal-500/30 shadow-inner">
                <span className="block text-2xl font-black text-teal-400 font-mono animate-pulse">{String(timeLeft.segundos).padStart(2, '0')}</span>
                <span className="text-[9px] text-teal-500/70 font-bold uppercase mt-1 block">seg</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-700/50 flex justify-between items-center text-xs relative z-10">
            <span className="text-gray-400 font-medium">Fecha límite:</span>
            <span className="font-bold text-white bg-teal-600/20 px-3 py-1 rounded-lg border border-teal-500/30 shadow-sm">20 Mar 2025</span>
          </div>
        </div>
      </div>

      {/* 3 Accesos Rápidos */}
      <div className="grid gap-4 md:grid-cols-3">
        <div 
          onClick={() => setSectionActive('Cargar Informe')}
          className="glass-card p-5 rounded-2xl hover:border-teal-500/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/20 transition-all duration-300 cursor-pointer group flex items-center gap-4"
        >
          <div className="p-3.5 bg-gradient-to-br from-teal-900 to-teal-950 text-teal-400 rounded-xl group-hover:scale-110 transition-transform shadow-inner border border-teal-800/50">
            <Upload size={22} />
          </div>
          <div>
            <h3 className="font-bold text-white group-hover:text-teal-400 transition-colors text-sm">Cargar Informe</h3>
            <p className="text-xs text-gray-400 mt-0.5">Genera y sube tus formatos GC y GF.</p>
          </div>
        </div>

        <div 
          onClick={() => setSectionActive('Mis Informes')}
          className="glass-card p-5 rounded-2xl hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300 cursor-pointer group flex items-center gap-4"
        >
          <div className="p-3.5 bg-gradient-to-br from-blue-900 to-blue-950 text-blue-400 rounded-xl group-hover:scale-110 transition-transform shadow-inner border border-blue-800/50">
            <FileText size={22} />
          </div>
          <div>
            <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors text-sm">Mis Informes</h3>
            <p className="text-xs text-gray-400 mt-0.5">Revisa aprobaciones e informes previos.</p>
          </div>
        </div>

        <div 
          onClick={() => setSectionActive('Notificaciones')}
          className="glass-card p-5 rounded-2xl hover:border-amber-500/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-900/20 transition-all duration-300 cursor-pointer group flex items-center gap-4"
        >
          <div className="p-3.5 bg-gradient-to-br from-amber-900 to-amber-950 text-amber-400 rounded-xl group-hover:scale-110 transition-transform relative shadow-inner border border-amber-800/50">
            <Bell size={22} />
            {noLeidas > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-gray-900 rounded-full animate-pulse shadow-glow"></span>
            )}
          </div>
          <div>
            <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors text-sm">Notificaciones</h3>
            <p className="text-xs text-gray-400 mt-0.5">{noLeidas} nuevas notificaciones en espera.</p>
          </div>
        </div>
      </div>

      {/* 3 Métricas */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Tasa de Aprobación */}
        <div className="glass-panel p-6 rounded-2xl hover:border-teal-500/30 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tasa de Aprobación</span>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">75%</span>
          </div>
          <p className="text-xs text-gray-400 mb-5 font-medium">Informes aprobados en primer intento</p>
          <ProgressBar valor={75} color="bg-gradient-to-r from-teal-500 to-teal-300" />
        </div>

        {/* Entregas Puntuales */}
        <div className="glass-panel p-6 rounded-2xl hover:border-blue-500/30 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Entregas Puntuales</span>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">100%</span>
          </div>
          <p className="text-xs text-gray-400 mb-5 font-medium">Cumplimiento de fechas de cierre</p>
          <ProgressBar valor={100} color="bg-gradient-to-r from-blue-600 to-blue-400" />
        </div>

        {/* Tiempo de Revisión */}
        <div className="glass-panel p-6 rounded-2xl hover:border-purple-500/30 transition-colors flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tiempo de Revisión</span>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">2.5d</span>
          </div>
          <p className="text-xs text-gray-400 mt-1 font-medium">Tiempo promedio de respuesta de coordinación</p>
          <div className="mt-4 flex gap-1.5 items-center text-[10px] font-semibold text-gray-400 bg-gray-900/60 p-2 rounded-xl border border-gray-800/80 shadow-inner">
            <Clock size={14} className="text-purple-400" />
            <span>Última revisión: Hace 2 días</span>
          </div>
        </div>
      </div>

    </div>
  );
}
