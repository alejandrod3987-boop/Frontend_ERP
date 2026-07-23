import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import InstructorView from './components/InstructorView';
import CoordinadorView from './components/CoordinadorView';
import { Toast } from './components/CommonComponents';

const defaultUsuarios = [
  { id: 1, name: "Diego Fernando Calderon", nombre: "Diego Fernando Calderon", cedula: "1023456789", email: "instructor@sena.edu.co", password: "1234", telefono: "+57 310 234 5678", area: "Desarrollo de Software", fechaIngreso: "15 Mar 2022", estado: "Activo", banco: "Bancolombia", tipoCuenta: "Ahorros", numeroCuenta: "****3421", role: "instructor", totalInformes: 34, tasaAprobacion: 94 },
  { id: 2, name: "Janier Andres Ballesteros", nombre: "Janier Andres Ballesteros", cedula: "1098765432", email: "janier.ballesteros@sena.edu.co", password: "1234", telefono: "+57 315 876 5432", area: "Desarrollo de Software", fechaIngreso: "20 Ene 2023", estado: "Activo", role: "instructor", totalInformes: 18, tasaAprobacion: 89 },
  { id: 3, name: "Willsom Martines", nombre: "Willsom Martines", cedula: "1087654321", email: "willsom.martines@sena.edu.co", password: "1234", telefono: "+57 320 123 4567", area: "Desarrollo de Software", fechaIngreso: "10 Jun 2021", estado: "Activo", role: "instructor", totalInformes: 22, tasaAprobacion: 86 },
  { id: 4, name: "Dairo Johani Samboni", nombre: "Dairo Johani Samboni", cedula: "1076543210", email: "dairo.samboni@sena.edu.co", password: "1234", telefono: "+57 312 987 6543", area: "Desarrollo de Software", fechaIngreso: "05 Sep 2020", estado: "Inactivo", role: "instructor", totalInformes: 31, tasaAprobacion: 92 },
  { id: 99, name: "Patricia Lozano", nombre: "Patricia Lozano", cedula: "1010101010", email: "coordinador@sena.edu.co", password: "1234", telefono: "+57 300 000 0000", role: "coordinador", estado: "Activo" }
];

const mockInformes = [
  { id: "INF-2025-01", instructorId: 1, mes: "Enero 2025", estado: "Aprobado", fechaEntrega: "30 Ene 2025", fechaRevision: "31 Ene 2025", revisadoPor: "Coord. Patricia Lozano", observacion: "Informe completo y bien documentado. Excelente trabajo." },
  { id: "INF-2024-12", instructorId: 1, mes: "Diciembre 2024", estado: "Aprobado", fechaEntrega: "22 Dic 2024", fechaRevision: "23 Dic 2024", revisadoPor: "Coord. Patricia Lozano", observacion: "Buen trabajo. Todas las actividades bien documentadas." },
  { id: "INF-2024-11", instructorId: 1, mes: "Noviembre 2024", estado: "Requiere Correcciones", fechaEntrega: "18 Nov 2024", fechaRevision: "25 Nov 2024", revisadoPor: "Coord. Patricia Lozano", observacion: "Por favor incluir más detalles sobre las actividades de la semana 3. Faltan evidencias fotográficas de los talleres prácticos realizados." },
  { id: "INF-2024-10", instructorId: 1, mes: "Octubre 2024", estado: "Aprobado", fechaEntrega: "27 Oct 2024", revisadoPor: "Coord. Patricia Lozano" },
  { id: "INF-2825-02-047", instructorId: 2, mes: "Febrero 2025", estado: "En Revision", fechaEntrega: "08 Feb 2025", diasEspera: 3 },
  { id: "INF-2825-02-046", instructorId: 3, mes: "Febrero 2025", estado: "En Revision", fechaEntrega: "07 Feb 2025", diasEspera: 4 },
];

const mockNotificaciones = [
  { id: 1, tipo: "correccion", titulo: "Correcciones Solicitadas - Noviembre 2024", descripcion: "La coordinadora ha solicitado correcciones en tu informe de Noviembre 2024. Por favor incluir más detalles sobre las actividades de la semana 3 y añadir evidencias fotográficas.", fecha: "Hace 2 días", fechaExacta: "03 Feb 2025, 10:30 AM", leida: false, informeId: "INF-2024-11" },
  { id: 2, tipo: "aprobado", titulo: "Informe Aprobado - Enero 2025", descripcion: "Tu informe de Enero 2025 ha sido aprobado. Excelente trabajo.", fecha: "Hace 5 días", fechaExacta: "31 Ene 2025, 2:15 PM", leida: false, informeId: "INF-2025-01" },
  { id: 3, tipo: "recordatorio", titulo: "Recordatorio - Próximo Informe", descripcion: "El informe de Febrero 2025 vence el 20 de marzo.", fecha: "Hace 1 semana", fechaExacta: "29 Ene 2025, 9:00 AM", leida: true },
];

function App() {
  const [usuario, setUsuario] = useState(null);
  
  // Centralized Users Database State
  const [usuarios, setUsuarios] = useState(() => {
    const saved = localStorage.getItem('sigim_usuarios');
    if (saved) return JSON.parse(saved);
    return defaultUsuarios;
  });

  const [informes, setInformes] = useState(mockInformes);
  const [notificaciones, setNotificaciones] = useState(mockNotificaciones);
  const [toast, setToast] = useState(null);

  // Sync users to local storage
  useEffect(() => {
    localStorage.setItem('sigim_usuarios', JSON.stringify(usuarios));
  }, [usuarios]);

  const addToast = (mensaje) => setToast(mensaje);

  // Authentication Logic
  const intentarLogin = (email, password) => {
    const lowerEmail = email.toLowerCase();
    const matchedUser = usuarios.find(u => u.email.toLowerCase() === lowerEmail && u.password === password);
    
    if (matchedUser) {
      if (matchedUser.estado === 'Pendiente') {
        return { success: false, message: 'Tu cuenta aún está pendiente de aprobación por parte del Coordinador.' };
      }
      if (matchedUser.estado === 'Rechazado') {
        return { success: false, message: 'Tu solicitud de registro fue rechazada. Comunícate con el Coordinador para más información.' };
      }
      
      setUsuario(matchedUser);
      addToast(`¡Bienvenido al sistema, ${matchedUser.name}!`);
      return { success: true };
    }
    return { success: false, message: 'Credenciales inválidas. Verifica tu correo y contraseña.' };
  };

  const registrarUsuario = (newUser) => {
    const emailExists = usuarios.some(u => u.email.toLowerCase() === newUser.email.toLowerCase());
    if (emailExists) return { success: false, message: 'Este correo institucional ya está registrado.' };

    const userWithDefaults = {
      ...newUser,
      id: Date.now(),
      estado: 'Pendiente',
      role: null,
      area: null,
      fechaRegistro: new Date().toLocaleDateString('es-CO'),
      fechaAprobacion: null,
      aprobadoPor: null,
      nombre: newUser.name, // Ensure compat with instructores map
      totalInformes: 0,
      tasaAprobacion: 0
    };

    setUsuarios([userWithDefaults, ...usuarios]);
    return { success: true, message: '¡Registro exitoso! Tu solicitud ha sido enviada y está pendiente de aprobación.' };
  };

  const aprobarUsuario = (id, role, area) => {
    setUsuarios(usuarios.map(u => 
      u.id === id 
        ? { ...u, estado: 'Activo', role, area, fechaAprobacion: new Date().toLocaleDateString('es-CO'), aprobadoPor: usuario?.name }
        : u
    ));
    addToast('Usuario aprobado exitosamente.');
  };

  const rechazarUsuario = (id) => {
    setUsuarios(usuarios.map(u => 
      u.id === id ? { ...u, estado: 'Rechazado' } : u
    ));
    addToast('Solicitud rechazada.');
  };

  const handleLogout = () => {
    setUsuario(null);
    setToast(null);
  };

  const addInforme = (nuevoInforme) => setInformes([nuevoInforme, ...informes]);
  const updateInforme = (updatedInforme) => setInformes(informes.map(inf => inf.id === updatedInforme.id ? updatedInforme : inf));
  const addNotificacion = (newNotif) => setNotificaciones([newNotif, ...notificaciones]);
  const markAsRead = (id) => setNotificaciones(notificaciones.map(n => n.id === id ? { ...n, leida: true } : n));
  const markAllAsRead = () => setNotificaciones(notificaciones.map(n => ({ ...n, leida: true })));
  
  const updateUser = (updatedUser) => {
    setUsuario({ ...usuario, name: updatedUser.name });
    setUsuarios(usuarios.map(u => u.id === usuario.id ? { ...u, name: updatedUser.name, nombre: updatedUser.name } : u));
  };

  // Derive instructores for other components
  const instructores = usuarios.filter(u => u.role === 'instructor');

  const globalState = {
    usuarios,
    informes,
    instructores,
    notificaciones,
    addInforme,
    updateInforme,
    addNotificacion,
    markAsRead,
    markAllAsRead,
    updateUser,
    aprobarUsuario,
    rechazarUsuario
  };

  return (
    <>
      {!usuario ? (
        <LoginPage intentarLogin={intentarLogin} registrarUsuario={registrarUsuario} />
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

      {toast && <Toast mensaje={toast} onClose={() => setToast(null)} />}
    </>
  );
}

export default App;
