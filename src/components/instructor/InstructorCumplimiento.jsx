import React from 'react';
import { Award, TrendingUp, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const dataMockGrafico = [
  { mes: 'Ago 2024', aprobacion: 90 },
  { mes: 'Sep 2024', aprobacion: 92 },
  { mes: 'Oct 2024', aprobacion: 100 },
  { mes: 'Nov 2024', aprobacion: 80 }, // El mes que requirió corrección
  { mes: 'Dic 2024', aprobacion: 100 },
  { mes: 'Ene 2025', aprobacion: 100 },
  { mes: 'Feb 2025', aprobacion: 94 },
];

export default function InstructorCumplimiento() {
  return (
    <div className="space-y-6 animate-fade-in text-white">
      <div>
        <h2 className="text-xl font-bold">Mi Cumplimiento Institucional</h2>
        <p className="text-xs text-gray-400">Estadísticas de efectividad y tiempos de entrega de tus informes.</p>
      </div>

      {/* Card Central */}
      <div className="bg-teal-950/40 border border-teal-700/60 rounded-xl p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-teal-600/5 blur-2xl"></div>
        <div className="relative z-10 space-y-3">
          <div className="inline-flex p-3 bg-teal-900/60 rounded-full text-teal-400 border border-teal-700/50 mb-2">
            <Award size={32} />
          </div>
          <h3 className="text-2xl font-bold text-white">Tu Nivel de Cumplimiento</h3>
          
          <div className="my-3">
            <span className="px-3.5 py-1.5 bg-teal-600 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg shadow-teal-700/20">
              Excelente
            </span>
          </div>
          
          <p className="text-sm text-gray-300 max-w-md mx-auto">
            Has mantenido una tasa promedio de aprobación del <span className="text-teal-400 font-bold">94%</span> en los últimos 6 meses. ¡Buen trabajo!
          </p>
        </div>
      </div>

      {/* 4 Métricas */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {/* Metrica 1 */}
        <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center gap-3">
          <div className="p-2.5 bg-teal-950 text-teal-400 rounded-lg">
            <TrendingUp size={20} />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-semibold">Tasa Histórica</span>
            <p className="text-lg font-bold text-white">94%</p>
          </div>
        </div>

        {/* Metrica 2 */}
        <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center gap-3">
          <div className="p-2.5 bg-blue-950 text-blue-400 rounded-lg">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-semibold">Aprobados</span>
            <p className="text-lg font-bold text-white">34 informes</p>
          </div>
        </div>

        {/* Metrica 3 */}
        <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center gap-3">
          <div className="p-2.5 bg-amber-950 text-amber-400 rounded-lg">
            <Clock size={20} />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-semibold">En Espera</span>
            <p className="text-lg font-bold text-white">0.5 días</p>
          </div>
        </div>

        {/* Metrica 4 */}
        <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center gap-3">
          <div className="p-2.5 bg-purple-950 text-purple-400 rounded-lg">
            <Calendar size={20} />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-semibold">Puntualidad</span>
            <p className="text-lg font-bold text-white">100%</p>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-[#252b3b] border border-gray-700 p-5 rounded-xl">
        <h3 className="text-sm font-bold text-gray-300 mb-4 uppercase tracking-wider">Historial de Calificación de Aprobación (%)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataMockGrafico} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="mes" stroke="#9ca3af" fontSize={11} tickLine={false} />
              <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} domain={[50, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  borderColor: '#4b5563', 
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px'
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line 
                name="Eficiencia Mensual"
                type="monotone" 
                dataKey="aprobacion" 
                stroke="#39A900" 
                strokeWidth={3} 
                activeDot={{ r: 6 }} 
                dot={{ stroke: '#39A900', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
