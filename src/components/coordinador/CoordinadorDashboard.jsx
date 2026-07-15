import React, { useState, useEffect } from 'react';
import { AlertTriangle, Users, ClipboardCheck, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dataMockGraficoCoord = [
  { mes: 'Oct 2024', aprobados: 4, correcciones: 0 },
  { mes: 'Nov 2024', aprobados: 3, correcciones: 1 },
  { mes: 'Dic 2024', aprobados: 4, correcciones: 0 },
  { mes: 'Ene 2025', aprobados: 4, correcciones: 0 },
  { mes: 'Feb 2025', aprobados: 2, correcciones: 2 },
];

export default function CoordinadorDashboard({ setSectionActive, informes = [], instructores = [] }) {
  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  // Temporizador regresivo fecha límite entregas
  useEffect(() => {
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

  const totalPendientes = informes.filter(inf => inf.estado === 'En Revision' || inf.estado === 'En Revisión').length;
  const totalInstructoresActivos = instructores.filter(i => i.estado === 'Activo').length;

  return (
    <div className="space-y-6 animate-fade-in text-white">
      
      {/* Banners Naranja / Alerta */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-premium border-amber-500/30 p-5 rounded-2xl flex items-start justify-between gap-3 text-amber-200 shadow-lg shadow-amber-900/10 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 shrink-0 animate-soft-pulse text-amber-400" />
            </div>
            <div>
              <p className="font-bold text-sm tracking-wide text-white">Informes por Revisar</p>
              <p className="text-xs text-amber-300/80 mt-0.5">Tienes {totalPendientes} informes mensuales esperando tu evaluación académica.</p>
            </div>
          </div>
          <button 
            onClick={() => setSectionActive('Revisar Informes')}
            className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 shadow-md shadow-amber-500/20 active:scale-[0.98] text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Revisar
          </button>
        </div>

        <div className="glass-premium border-teal-500/30 p-5 rounded-2xl flex items-start justify-between gap-3 text-teal-200 shadow-lg shadow-teal-900/10 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-teal-500/20 rounded-lg">
              <CheckCircle className="w-5 h-5 shrink-0 animate-soft-pulse text-teal-400" />
            </div>
            <div>
              <p className="font-bold text-sm tracking-wide text-white">Plantilla Contractual Activa</p>
              <p className="text-xs text-teal-300/80 mt-0.5">La plantilla vigente incluye 17 obligaciones obligatorias.</p>
            </div>
          </div>
          <button 
            onClick={() => setSectionActive('Gestión de Plantilla GC')}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 shadow-md shadow-teal-500/20 active:scale-[0.98] text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Ver Plantilla
          </button>
        </div>
      </div>

      {/* Panel Superior y Contador */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* Card Alerta */}
        <div className="flex-1 glass-premium border-l-red-500/50 p-6 md:p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden shadow-2xl bg-gradient-to-br from-red-950/40 to-[#1a1f2e]">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
          
          <div className="relative z-10">
            <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest px-3 py-1.5 bg-red-950/60 rounded-full border border-red-500/30 shadow-inner">
              Alerta de Demora
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-red-200 mt-5 leading-tight flex items-center gap-3">
              <AlertTriangle className="text-red-500 animate-bounce shrink-0" size={32} />
              Informes con más de 3 días
            </h2>
            <p className="text-gray-300 text-sm mt-3 max-w-lg leading-relaxed font-medium">
              Hay 2 informes del mes de Febrero 2025 que llevan más de 3 días hábiles en estado de revisión y requieren tu aprobación inmediata para no retrasar la nómina de los contratistas.
            </p>
          </div>
          
          <div className="relative z-10 flex flex-wrap gap-3 mt-8">
            <span className="px-4 py-2 bg-red-950/60 backdrop-blur-md border border-red-800/50 rounded-xl text-[11px] text-red-200 font-mono shadow-inner flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
              INF-2825-02-047 (3 días)
            </span>
            <span className="px-4 py-2 bg-red-950/60 backdrop-blur-md border border-red-800/50 rounded-xl text-[11px] text-red-200 font-mono shadow-inner flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
              INF-2825-02-046 (4 días)
            </span>
          </div>
        </div>

        {/* Contador Regresivo */}
        <div className="glass-premium border-gray-700/50 p-6 rounded-3xl w-full lg:w-80 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-teal-300 text-[10px] font-bold uppercase tracking-widest mb-5">
              <Clock size={16} className="animate-spin-slow" />
              Fecha Límite Entregas
            </div>
            
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
            <span className="text-gray-400 font-medium">Límite Instructores:</span>
            <span className="font-bold text-white bg-teal-600/20 px-3 py-1 rounded-lg border border-teal-500/30 shadow-sm">20 Mar 2025</span>
          </div>
        </div>
      </div>

      {/* 4 Métricas */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {/* Pendientes */}
        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 hover:border-amber-500/30 transition-colors">
          <div className="p-3 bg-gradient-to-br from-amber-900 to-amber-950 text-amber-400 rounded-xl shadow-inner border border-amber-800/50">
            <ClipboardCheck size={24} />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Por Revisar</span>
            <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">{totalPendientes}</p>
          </div>
        </div>

        {/* Tasa Aprobacion */}
        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 hover:border-teal-500/30 transition-colors">
          <div className="p-3 bg-gradient-to-br from-teal-900 to-teal-950 text-teal-400 rounded-xl shadow-inner border border-teal-800/50">
            <TrendingUp size={24} />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Aprobación</span>
            <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">91.5%</p>
          </div>
        </div>

        {/* Instructores */}
        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 hover:border-blue-500/30 transition-colors">
          <div className="p-3 bg-gradient-to-br from-blue-900 to-blue-950 text-blue-400 rounded-xl shadow-inner border border-blue-800/50">
            <Users size={24} />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Activos</span>
            <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">{totalInstructoresActivos}</p>
          </div>
        </div>

        {/* Respuesta */}
        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 hover:border-purple-500/30 transition-colors">
          <div className="p-3 bg-gradient-to-br from-purple-900 to-purple-950 text-purple-400 rounded-xl shadow-inner border border-purple-800/50">
            <Clock size={24} />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">T. Respuesta</span>
            <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">2.2d</p>
          </div>
        </div>
      </div>

      {/* Gráfico BarChart */}
      <div className="glass-premium border-gray-700/50 p-6 rounded-3xl shadow-xl">
        <h3 className="text-xs font-black text-teal-400 mb-6 uppercase tracking-widest flex items-center gap-2">
          <TrendingUp size={16} /> Histórico de Evaluaciones por Mes
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataMockGraficoCoord} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} opacity={0.3} />
              <XAxis dataKey="mes" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#ffffff0a' }}
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  borderColor: 'rgba(55, 65, 81, 0.5)', 
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '20px', fontWeight: 'bold' }} />
              <Bar name="Aprobados" dataKey="aprobados" fill="url(#colorTeal)" radius={[6, 6, 0, 0]} />
              <Bar name="Correcciones Solicitadas" dataKey="correcciones" fill="url(#colorOrange)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="colorTeal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#39A900" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#2c8700" stopOpacity={0.8}/>
                </linearGradient>
                <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#c2410c" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
