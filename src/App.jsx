import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import InstructorView from './components/InstructorView';
import CoordinadorView from './components/CoordinadorView';
import { Toast } from './components/CommonComponents';

const mockInstructores = [
  { id: 1, nombre: "Diego Fernando Calderon", cedula: "1023456789",
    email: "diego.calderon@sena.edu.co", telefono: "+57 310 234 5678",
    area: "Desarrollo de Software", fechaIngreso: "15 Mar 2022",
    estado: "Activo", banco: "Bancolombia", tipoCuenta: "Ahorros",
    numeroCuenta: "****3421", totalInformes: 34, tasaAprobacion: 94 },
  { id: 2, nombre: "Janier Andres Ballesteros", cedula: "1098765432",
    email: "janier.ballesteros@sena.edu.co", telefono: "+57 315 876 5432",
    area: "Desarrollo de Software", fechaIngreso: "20 Ene 2023", estado: "Activo",
    totalInformes: 18, tasaAprobacion: 89 },
  { id: 3, nombre: "Willsom Martines", cedula: "1087654321",
    email: "willsom.martines@sena.edu.co", telefono: "+57 320 123 4567",
    area: "Desarrollo de Software", fechaIngreso: "10 Jun 2021",
    estado: "Activo", totalInformes: 22, tasaAprobacion: 86 },
  { id: 4, nombre: "Dairo Johani Samboni", cedula: "1076543210",
    email: "dairo.samboni@sena.edu.co", telefono: "+57 312 987 6543",
    area: "Desarrollo de Software", fechaIngreso: "05 Sep 2020", estado: "Inactivo",
    totalInformes: 31, tasaAprobacion: 92 },
];

const mockInformes = [
  { id: "INF-2025-01", instructorId: 1, mes: "Enero 2025", estado: "Aprobado",
    fechaEntrega: "30 Ene 2025", fechaRevision: "31 Ene 2025",
    revisadoPor: "Coord. Sergio Jaramillo",
    observacion: "Informe completo y bien documentado. Excelente trabajo." },
  { id: "INF-2024-12", instructorId: 1, mes: "Diciembre 2024", estado: "Aprobado",
    fechaEntrega: "22 Dic 2024", fechaRevision: "23 Dic 2024",
    revisadoPor: "Coord. Sergio Jaramillo",
    observacion: "Buen trabajo. Todas las actividades bien documentadas." },
  { id: "INF-2024-11", instructorId: 1, mes: "Noviembre 2024",
    estado: "Requiere Correcciones",
    fechaEntrega: "18 Nov 2024", fechaRevision: "25 Nov 2024",
    revisadoPor: "Coord. Sergio Jaramillo",
    observacion: "Por favor incluir más detalles sobre las actividades de la semana 3. Faltan evidencias fotográficas de los talleres prácticos realizados." },
  { id: "INF-2024-10", instructorId: 1, mes: "Octubre 2024", estado: "Aprobado",
    fechaEntrega: "27 Oct 2024", revisadoPor: "Coord. Sergio Jaramillo" },
  { id: "INF-2825-02-047", instructorId: 2, mes: "Febrero 2025",
    estado: "En Revision", fechaEntrega: "08 Feb 2025", diasEspera: 3 },
  { id: "INF-2825-02-046", instructorId: 3, mes: "Febrero 2025",
    estado: "En Revision", fechaEntrega: "07 Feb 2025", diasEspera: 4 },
];

const mockNotificaciones = [
  { id: 1, tipo: "correccion",
    titulo: "Correcciones Solicitadas - Noviembre 2024",
    descripcion: "La coordinadora ha solicitado correcciones en tu informe de Noviembre 2024. Por favor incluir más detalles sobre las actividades de la semana 3 y añadir evidencias fotográficas.",
    fecha: "Hace 2 días", fechaExacta: "03 Feb 2025, 10:30 AM",
    leida: false, informeId: "INF-2024-11" },
  { id: 2, tipo: "aprobado",
    titulo: "Informe Aprobado - Enero 2025",
    descripcion: "Tu informe de Enero 2025 ha sido aprobado. Excelente trabajo.",
    fecha: "Hace 5 días", fechaExacta: "31 Ene 2025, 2:15 PM",
    leida: false, informeId: "INF-2025-01" },
  { id: 3, tipo: "recordatorio",
    titulo: "Recordatorio - Próximo Informe",
    descripcion: "El informe de Febrero 2025 vence el 20 de marzo.",
    fecha: "Hace 1 semana", fechaExacta: "29 Ene 2025, 9:00 AM",
    leida: true },
  { id: 4, tipo: "aprobado",
    titulo: "Informe Aprobado - Diciembre 2024",
    descripcion: "Tu informe de Diciembre 2024 fue aprobado.",
    fecha: "Hace 2 meses", leida: true },
  { id: 5, tipo: "sistema",
    titulo: "Bienvenido al sistema",
    descripcion: "Tu cuenta ha sido activada exitosamente.",
    fecha: "Hace 3 meses", leida: true },
];

function App() {
  const [usuario, setUsuario] = useState(null);
  const [instructores, setInstructores] = useState(mockInstructores);
  const [informes, setInformes] = useState(mockInformes);
  const [notificaciones, setNotificaciones] = useState(mockNotificaciones);
  
  // Estado para notificaciones Toast
  const [toast, setToast] = useState(null);

  const addToast = (mensaje) => {
    setToast(mensaje);
  };

  const handleLogin = (user) => {
    setUsuario(user);
    addToast(`¡Bienvenido al sistema, ${user.name}!`);
  };

  const handleLogout = () => {
    setUsuario(null);
    setToast(null);
  };

  const addInforme = (nuevoInforme) => {
    setInformes([nuevoInforme, ...informes]);
  };

  const updateInforme = (updatedInforme) => {
    setInformes(informes.map(inf => inf.id === updatedInforme.id ? updatedInforme : inf));
  };

  const addNotificacion = (newNotif) => {
    setNotificaciones([newNotif, ...notificaciones]);
  };

  const markAsRead = (id) => {
    setNotificaciones(notificaciones.map(n => n.id === id ? { ...n, leida: true } : n));
  };

  const markAllAsRead = () => {
    setNotificaciones(notificaciones.map(n => ({ ...n, leida: true })));
  };

  const updateUser = (updatedUser) => {
    setUsuario({
      ...usuario,
      name: updatedUser.name
    });
  };

  const globalState = {
    informes,
    instructores,
    notificaciones,
    addInforme,
    updateInforme,
    addNotificacion,
    markAsRead,
    markAllAsRead,
    updateUser
  };

  return (
    <>
      {/* Sistema de Rutas Condicional por Estado */}
      {!usuario ? (
        <LoginPage onLogin={handleLogin} />
      ) : usuario.role === 'instructor' ? (
        <InstructorView 
          user={usuario} 
          onLogout={handleLogout} 
          globalState={globalState} 
          addToast={addToast} 
        />
      ) : (
        <CoordinadorView 
          user={usuario} 
          onLogout={handleLogout} 
          globalState={globalState} 
          addToast={addToast} 
        />
      )}

      {/* Alerta flotante Toast */}
      {toast && (
        <Toast mensaje={toast} onClose={() => setToast(null)} />
      )}
    </>
  );
}

export default App;
