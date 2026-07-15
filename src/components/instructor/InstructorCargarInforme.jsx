import React, { useState } from 'react';
import { Plus, Trash2, FileText, CheckCircle, Upload, Save, ArrowRight, ArrowLeft } from 'lucide-react';

const OBLIGACIONES_SENA = [
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

export default function InstructorCargarInforme({ addInforme, setSectionActive, addToast }) {
  const [paso, setPaso] = useState(1); // 1: Generar GC, 2: Cargar GF
  const [subTab, setSubTab] = useState('datos'); // datos, obligaciones, desplazamientos, resumen

  // Datos Generales
  const [datosGenerales, setDatosGenerales] = useState({
    contrato: '4120-2025-08',
    mes: 'Febrero 2025',
    supervisor: 'Patricia Lozano Coordinadora',
    sede: 'Sede Principal - Yamboro',
    nombre: 'Carlos Eduardo Vargas Ríos',
    cedula: '1023456789'
  });

  // Obligaciones (actividades realizadas por cada una de las 17)
  const [actividades, setActividades] = useState(
    OBLIGACIONES_SENA.reduce((acc, _, idx) => {
      acc[idx] = 'Actividades desarrolladas con normalidad y evidencias cargadas en el portafolio.';
      return acc;
    }, {})
  );

  // Desplazamientos
  const [desplazamientos, setDesplazamientos] = useState([
    { id: 1, fecha: '2025-02-12', origen: 'Pitalito', destino: 'Garzón', objeto: 'Acompañamiento técnico de proyectos productivos', viaticos: '120000' }
  ]);

  // Carga de Archivos Paso 2
  const [archivos, setArchivos] = useState({
    gc: null,
    gf: null,
    cert: null
  });

  const handleDatoChange = (e) => {
    setDatosGenerales({
      ...datosGenerales,
      [e.target.name]: e.target.value
    });
  };

  const handleActividadChange = (idx, value) => {
    setActividades({
      ...actividades,
      [idx]: value
    });
  };

  const agregarDesplazamiento = () => {
    const nuevo = {
      id: Date.now(),
      fecha: '',
      origen: '',
      destino: '',
      objeto: '',
      viaticos: '0'
    };
    setDesplazamientos([...desplazamientos, nuevo]);
  };

  const eliminarDesplazamiento = (id) => {
    setDesplazamientos(desplazamientos.filter(d => d.id !== id));
  };

  const handleDesplazamientoChange = (id, campo, valor) => {
    setDesplazamientos(
      desplazamientos.map(d => d.id === id ? { ...d, [campo]: valor } : d)
    );
  };

  const handleArchivoChange = (key, name) => {
    setArchivos({
      ...archivos,
      [key]: name
    });
    addToast(`Archivo "${name}" cargado simulado correctamente.`);
  };

  const guardarBorrador = () => {
    addToast('Borrador guardado exitosamente en el sistema.');
  };

  const cargarBorrador = () => {
    addToast('Borrador cargado exitosamente.');
  };

  const generarPDF = () => {
    addToast('Generando archivo PDF del Informe GC... Descargado.');
  };

  const enviarInformeCompleto = () => {
    if (!archivos.gc || !archivos.gf || !archivos.cert) {
      alert('Por favor, simule la carga de los tres documentos obligatorios del Paso 2 antes de enviar.');
      return;
    }

    // Estructurar el nuevo informe
    const nuevoInforme = {
      id: `INF-2025-02-${Math.floor(Math.random() * 900) + 100}`,
      instructorId: 1, // Carlos Eduardo Vargas Ríos
      mes: datosGenerales.mes,
      estado: 'En Revision',
      fechaEntrega: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }),
      diasEspera: 1,
      contrato: datosGenerales.contrato,
      supervisor: datosGenerales.supervisor,
      sede: datosGenerales.sede,
      actividades: actividades,
      desplazamientos: desplazamientos
    };

    addInforme(nuevoInforme);
    addToast('¡Informe mensual enviado a revisión de coordinación con éxito!');
    setSectionActive('Mis Informes');
  };

  return (
    <div className="space-y-6 animate-fade-in text-white">
      
      {/* Pasos Selector */}
      <div className="flex border-b border-gray-700/50 glass-premium rounded-t-2xl overflow-hidden">
        <button
          onClick={() => setPaso(1)}
          className={`flex-1 py-4 text-center font-bold border-b-2 text-sm transition-all duration-300 cursor-pointer ${
            paso === 1
              ? 'border-teal-400 bg-teal-500/10 text-teal-300 shadow-inner'
              : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Paso 1: Generar Informe GC
        </button>
        <button
          onClick={() => setPaso(2)}
          className={`flex-1 py-4 text-center font-bold border-b-2 text-sm transition-all duration-300 cursor-pointer ${
            paso === 2
              ? 'border-teal-400 bg-teal-500/10 text-teal-300 shadow-inner'
              : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Paso 2: Cargar Informe GF
        </button>
      </div>

      {paso === 1 ? (
        // ================= PASO 1 =================
        <div className="space-y-6 animate-slide-in-right">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-4 rounded-xl shadow-lg border-l-4 border-l-teal-500">
            <div>
              <h2 className="text-lg font-bold">Generación del Formato de Informe de Actividades (GC)</h2>
              <p className="text-xs text-gray-400">Completa la información contractual y detalla tus 17 obligaciones.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={cargarBorrador}
                className="px-4 py-2 border border-gray-600 hover:bg-gray-700 active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                Cargar Borrador
              </button>
              <button 
                onClick={guardarBorrador}
                className="px-4 py-2 border border-teal-600/50 hover:bg-teal-900/30 active:scale-[0.98] text-teal-300 text-xs font-semibold rounded-xl transition-all cursor-pointer animate-soft-pulse"
              >
                Guardar Borrador
              </button>
              <button 
                onClick={generarPDF}
                className="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 shadow-md shadow-teal-500/20 active:scale-[0.98] text-white text-xs font-bold rounded-xl transition-all cursor-pointer hover:-translate-y-0.5"
              >
                Generar PDF
              </button>
            </div>
          </div>

          {/* Sub-tabs */}
          <div className="flex flex-wrap gap-2 glass-panel p-1.5 rounded-xl border border-gray-700/50 shadow-inner">
            {['datos', 'obligaciones', 'desplazamientos', 'resumen'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSubTab(tab)}
                className={`px-4 py-2 text-xs font-bold rounded-lg capitalize transition-all duration-300 cursor-pointer ${
                  subTab === tab
                    ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md shadow-teal-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab === 'datos' ? 'Datos Generales' : tab === 'obligaciones' ? '17 Obligaciones' : tab}
              </button>
            ))}
          </div>

          {/* CONTENIDO SUB-TABS */}
          <div className="animate-slide-up">
          {subTab === 'datos' && (
            <div className="glass-premium border-gray-700/50 p-6 md:p-8 rounded-2xl space-y-6 shadow-xl">
              <h3 className="text-base font-bold text-teal-400 border-b border-gray-750 pb-2">Información Contractual</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Ciudad y Departamento (Solo lectura)</label>
                  <input type="text" readOnly value="Neiva, Huila" className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Mes del Informe</label>
                  <select name="mes" value={datosGenerales.mes} onChange={handleDatoChange} className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500">
                    <option value="Enero 2025">Enero 2025</option>
                    <option value="Febrero 2025">Febrero 2025</option>
                    <option value="Marzo 2025">Marzo 2025</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Año (Solo lectura)</label>
                  <input type="text" readOnly value="2025" className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Número de Contrato</label>
                  <input type="text" name="contrato" value={datosGenerales.contrato} onChange={handleDatoChange} className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Nombre del Supervisor/Coordinador</label>
                  <input type="text" name="supervisor" value={datosGenerales.supervisor} onChange={handleDatoChange} className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Nombre de la Sede</label>
                  <input type="text" readOnly value={datosGenerales.sede} className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Nombre Completo del Contratista</label>
                  <input type="text" name="nombre" value={datosGenerales.nombre} onChange={handleDatoChange} className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Cédula de Ciudadanía</label>
                  <input type="text" name="cedula" value={datosGenerales.cedula} onChange={handleDatoChange} className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500" />
                </div>
              </div>
            </div>
          )}

          {subTab === 'obligaciones' && (
            <div className="space-y-4">
              <div className="glass-panel border-teal-500/30 p-5 rounded-2xl text-teal-200 text-xs shadow-lg shadow-teal-900/10">
                <span className="font-extrabold uppercase block mb-2 tracking-wider text-teal-400">Evidencias Requeridas</span>
                Escribe en el campo de texto de cada obligación los logros, metas y evidencias de soporte alcanzados durante este mes.
              </div>
              <div className="grid gap-4">
                {OBLIGACIONES_SENA.map((ob, idx) => (
                  <div key={idx} className="glass-card p-5 rounded-2xl transition-all duration-300 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-900/10 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500/50 group">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-8 h-8 rounded-full bg-teal-950 text-teal-400 flex items-center justify-center font-bold text-xs shrink-0 border border-teal-800/60 shadow-inner">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-teal-400 font-semibold text-sm leading-relaxed">{ob}</p>
                      </div>
                    </div>
                    <textarea
                      rows="2"
                      value={actividades[idx] || ''}
                      onChange={(e) => handleActividadChange(idx, e.target.value)}
                      placeholder="Describa aquí las actividades realizadas y evidencias correspondientes..."
                      className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white text-xs focus:outline-none focus:border-teal-500 transition-all font-sans"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {subTab === 'desplazamientos' && (
            <div className="space-y-4 bg-gray-800 border border-gray-700 p-6 rounded-xl">
              <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                <div>
                  <h3 className="font-bold text-white text-sm">Registro de Comisiones y Desplazamientos</h3>
                  <p className="text-xs text-gray-400">Registra traslados externos o de acompañamiento institucional.</p>
                </div>
                <button
                  onClick={agregarDesplazamiento}
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus size={14} /> Agregar Desplazamiento
                </button>
              </div>

              {desplazamientos.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-xs">
                  No se han registrado desplazamientos en el informe de este mes.
                </div>
              ) : (
                <div className="space-y-4">
                  {desplazamientos.map((d, index) => (
                    <div key={d.id} className="bg-gray-900 border border-gray-800 p-4 rounded-lg relative grid gap-4 md:grid-cols-5 items-end">
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Fecha</label>
                        <input
                          type="date"
                          value={d.fecha}
                          onChange={(e) => handleDesplazamientoChange(d.id, 'fecha', e.target.value)}
                          className="w-full p-2 bg-gray-800 border border-gray-750 rounded text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Origen</label>
                        <input
                          type="text"
                          placeholder="Ciudad Origen"
                          value={d.origen}
                          onChange={(e) => handleDesplazamientoChange(d.id, 'origen', e.target.value)}
                          className="w-full p-2 bg-gray-800 border border-gray-750 rounded text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Destino</label>
                        <input
                          type="text"
                          placeholder="Ciudad Destino"
                          value={d.destino}
                          onChange={(e) => handleDesplazamientoChange(d.id, 'destino', e.target.value)}
                          className="w-full p-2 bg-gray-800 border border-gray-750 rounded text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Objeto de la Comisión</label>
                        <input
                          type="text"
                          placeholder="Explicación del viaje"
                          value={d.objeto}
                          onChange={(e) => handleDesplazamientoChange(d.id, 'objeto', e.target.value)}
                          className="w-full p-2 bg-gray-800 border border-gray-750 rounded text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="flex-1">
                          <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Viáticos ($)</label>
                          <input
                            type="number"
                            value={d.viaticos}
                            onChange={(e) => handleDesplazamientoChange(d.id, 'viaticos', e.target.value)}
                            className="w-full p-2 bg-gray-800 border border-gray-750 rounded text-xs text-white focus:outline-none focus:border-teal-500"
                          />
                        </div>
                        <button
                          onClick={() => eliminarDesplazamiento(d.id)}
                          className="p-2 bg-red-950/40 text-red-400 hover:bg-red-900/60 rounded border border-red-800/40 hover:text-white transition-colors cursor-pointer mt-5"
                          title="Eliminar"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {subTab === 'resumen' && (
            <div className="glass-premium border-teal-500/20 p-6 md:p-8 rounded-2xl space-y-6 shadow-xl">
              <h3 className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-200 border-b border-gray-700/50 pb-3 tracking-wide">Vista Previa del Informe</h3>
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-900/60 p-4 rounded-lg border border-gray-800">
                  <p><span className="text-gray-400">Contratista:</span> <span className="text-white font-semibold">{datosGenerales.nombre}</span></p>
                  <p><span className="text-gray-400">Cédula:</span> <span className="text-white font-semibold">{datosGenerales.cedula}</span></p>
                  <p><span className="text-gray-400">Contrato:</span> <span className="text-white font-semibold">{datosGenerales.contrato}</span></p>
                  <p><span className="text-gray-400">Mes Evaluado:</span> <span className="text-teal-400 font-semibold">{datosGenerales.mes}</span></p>
                  <p><span className="text-gray-400">Supervisor:</span> <span className="text-white font-semibold">{datosGenerales.supervisor}</span></p>
                  <p><span className="text-gray-400">Sede:</span> <span className="text-white font-semibold">{datosGenerales.sede}</span></p>
                </div>
                
                <div>
                  <h4 className="font-bold text-white mb-2 text-xs uppercase text-teal-400">Resumen de Obligaciones Diligenciadas:</h4>
                  <div className="p-3 bg-gray-900/45 rounded-lg border border-gray-800/60">
                    <p>Total de obligaciones completadas: <span className="text-teal-400 font-bold">17 / 17</span></p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-2 text-xs uppercase text-teal-400">Desplazamientos del Mes:</h4>
                  {desplazamientos.length === 0 ? (
                    <p className="text-gray-500 italic">No registrados.</p>
                  ) : (
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                      {desplazamientos.map((d, index) => (
                        <li key={d.id}>
                          <strong>{d.fecha || 'Sin fecha'}</strong>: {d.origen || '...'} a {d.destino || '...'} - {d.objeto || '...'} (${Number(d.viaticos).toLocaleString()})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-5 border-t border-gray-700/50">
                <button
                  onClick={() => setPaso(2)}
                  className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/20 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Continuar al Paso 2 <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      ) : (
        // ================= PASO 2 =================
        <div className="glass-premium border-gray-700/50 p-6 md:p-8 rounded-3xl space-y-8 animate-slide-in-right shadow-2xl">
          <div className="flex justify-between items-center border-b border-gray-700/50 pb-4">
            <div>
              <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-200 tracking-wide">Carga de Documentos Firmados (GF)</h2>
              <p className="text-xs text-gray-400">Para radicar formalmente, sube las plantillas generadas y firmadas digitalmente.</p>
            </div>
            <button
              onClick={() => setPaso(1)}
              className="px-3 py-1.5 border border-gray-600 hover:bg-gray-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ArrowLeft size={14} /> Volver al Paso 1
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Archivo 1 */}
            <div className="glass-card p-6 rounded-2xl flex flex-col justify-between items-center text-center hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-900/10 hover:-translate-y-1 transition-all duration-300 group">
              <div className="p-4 bg-teal-900/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <FileText className="text-teal-400 w-10 h-10" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">1. Formato GC Firmado</p>
                <p className="text-[10px] text-gray-400 mb-5 mt-1">Formato del informe en PDF firmado</p>
              </div>
              
              {archivos.gc ? (
                <span className="text-xs text-teal-300 font-bold bg-teal-900/40 px-4 py-2 rounded-xl border border-teal-500/40 flex items-center gap-2 w-full justify-center shadow-inner">
                  <CheckCircle size={14} className="text-teal-400" /> {archivos.gc}
                </span>
              ) : (
                <button
                  onClick={() => handleArchivoChange('gc', 'Informe_GC_Firmado_Vargas.pdf')}
                  className="px-4 py-2.5 bg-gray-800 hover:bg-teal-600/20 hover:border-teal-500 text-teal-300 font-bold text-xs rounded-xl border border-gray-600 transition-all cursor-pointer w-full flex items-center justify-center gap-2"
                >
                  <Upload size={16} /> Subir PDF
                </button>
              )}
            </div>

            {/* Archivo 2 */}
            <div className="glass-card p-6 rounded-2xl flex flex-col justify-between items-center text-center hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-900/10 hover:-translate-y-1 transition-all duration-300 group">
              <div className="p-4 bg-teal-900/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <FileText className="text-teal-400 w-10 h-10" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">2. Formato GF Firmado</p>
                <p className="text-[10px] text-gray-400 mb-5 mt-1">Certificación de cobro mensual firmado</p>
              </div>

              {archivos.gf ? (
                <span className="text-xs text-teal-300 font-bold bg-teal-900/40 px-4 py-2 rounded-xl border border-teal-500/40 flex items-center gap-2 w-full justify-center shadow-inner">
                  <CheckCircle size={14} className="text-teal-400" /> {archivos.gf}
                </span>
              ) : (
                <button
                  onClick={() => handleArchivoChange('gf', 'Formato_GF_Cobro_Firmado.pdf')}
                  className="px-4 py-2.5 bg-gray-800 hover:bg-teal-600/20 hover:border-teal-500 text-teal-300 font-bold text-xs rounded-xl border border-gray-600 transition-all cursor-pointer w-full flex items-center justify-center gap-2"
                >
                  <Upload size={16} /> Subir PDF
                </button>
              )}
            </div>

            {/* Archivo 3 */}
            <div className="glass-card p-6 rounded-2xl flex flex-col justify-between items-center text-center hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-900/10 hover:-translate-y-1 transition-all duration-300 group">
              <div className="p-4 bg-teal-900/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <FileText className="text-teal-400 w-10 h-10" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">3. Certificado Supervisión</p>
                <p className="text-[10px] text-gray-400 mb-5 mt-1">Certificación de cumplimiento mensual</p>
              </div>

              {archivos.cert ? (
                <span className="text-xs text-teal-300 font-bold bg-teal-900/40 px-4 py-2 rounded-xl border border-teal-500/40 flex items-center gap-2 w-full justify-center shadow-inner">
                  <CheckCircle size={14} className="text-teal-400" /> {archivos.cert}
                </span>
              ) : (
                <button
                  onClick={() => handleArchivoChange('cert', 'Certificado_Cumplimiento_Febrero.pdf')}
                  className="px-4 py-2.5 bg-gray-800 hover:bg-teal-600/20 hover:border-teal-500 text-teal-300 font-bold text-xs rounded-xl border border-gray-600 transition-all cursor-pointer w-full flex items-center justify-center gap-2"
                >
                  <Upload size={16} /> Subir PDF
                </button>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-gray-400 text-center sm:text-left font-medium">
              * Todos los archivos deben estar en formato PDF y no superar los 5MB.
            </span>
            <button
              onClick={enviarInformeCompleto}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 active:scale-[0.98] text-white font-bold rounded-xl text-sm shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
            >
              <CheckCircle size={18} /> Enviar Informe a Coordinación
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
