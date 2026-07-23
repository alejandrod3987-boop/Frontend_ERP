import React, { useState } from 'react';
import { 
  LayoutDashboard, Upload, FileText, User, Clock, Bell, Moon, LogOut, Menu, X, Building, Sparkles 
} from 'lucide-react';

// Importar sub-pantallas
import InstructorDashboard from './instructor/InstructorDashboard';
import InstructorCargarInforme from './instructor/InstructorCargarInforme';
import InstructorMisInformes from './instructor/InstructorMisInformes';
import InstructorCumplimiento from './instructor/InstructorCumplimiento';
import InstructorHistorial from './instructor/InstructorHistorial';
import InstructorNotificaciones from './instructor/InstructorNotificaciones';
import InstructorMiCuenta from './instructor/InstructorMiCuenta';
import InstructorAsistenteIA from './instructor/InstructorAsistenteIA';

export default function InstructorView({ user, onLogout, globalState, addToast }) {
  const [sectionActive, setSectionActive] = useState('Dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Tema claro (identidad SENA) por defecto

  const { 
    informes, 
    addInforme, 
    updateInforme, 
    notificaciones, 
    markAsRead, 
    markAllAsRead,
    updateUser
  } = globalState;

  // Filtrar los informes correspondientes a este instructor (en el mock el instructorID es 1 para Carlos Vargas)
  const misInformes = informes.filter(inf => inf.instructorId === 1);

  // Cantidad de notificaciones no leídas
  const countNoLeidas = notificaciones.filter(n => !n.leida).length;

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Cargar Informe', icon: Upload },
    { name: 'Mis Informes', icon: FileText },
    { name: 'Asistente IA', icon: Sparkles },
    { name: 'Mi Cumplimiento', icon: User },
    { name: 'Historial', icon: Clock },
    { 
      name: 'Notificaciones', 
      icon: Bell, 
      badge: countNoLeidas > 0 ? countNoLeidas : null,
      badgeColor: 'bg-red-500 text-white'
    },
    { name: 'Mi Cuenta', icon: User }
  ];

  const handleMenuClick = (name) => {
    setSectionActive(name);
    setMobileMenuOpen(false);
  };

  const renderActiveSection = () => {
    switch (sectionActive) {
      case 'Dashboard':
        return (
          <InstructorDashboard 
            userName={user.name} 
            setSectionActive={setSectionActive} 
            notificaciones={notificaciones} 
          />
        );
      case 'Cargar Informe':
        return (
          <InstructorCargarInforme 
            addInforme={addInforme} 
            setSectionActive={setSectionActive} 
            addToast={addToast} 
          />
        );
      case 'Mis Informes':
        return (
          <InstructorMisInformes 
            informes={misInformes} 
            updateInforme={updateInforme} 
            addToast={addToast} 
          />
        );
      case 'Asistente IA':
        return <InstructorAsistenteIA addToast={addToast} />;
      case 'Mi Cumplimiento':
        return <InstructorCumplimiento />;
      case 'Historial':
        return <InstructorHistorial addToast={addToast} />;
      case 'Notificaciones':
        return (
          <InstructorNotificaciones 
            notificaciones={notificaciones} 
            markAsRead={markAsRead} 
            markAllAsRead={markAllAsRead} 
            addToast={addToast} 
          />
        );
      case 'Mi Cuenta':
        return (
          <InstructorMiCuenta 
            user={user} 
            onUpdateUser={updateUser} 
            addToast={addToast} 
          />
        );
      default:
        return <div className="text-white">Sección en construcción...</div>;
    }
  };

  return (
    <div className={`h-screen flex transition-colors duration-200 overflow-hidden ${darkMode ? 'dark-mode bg-[#0b0f19] text-white' : 'light-mode'}`}>
      
      {/* SIDEBAR ESCRITORIO (Fijo 220px) */}
      <aside className="hidden md:flex flex-col justify-between w-[220px] bg-[#151a26] border-r border-gray-800 shrink-0 select-none h-screen sticky top-0">
        <div>
          {/* Header Sidebar */}
          <div className="p-4 flex items-center gap-2.5 border-b border-gray-800/80">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white shrink-0 font-bold shadow-lg shadow-teal-600/30 border border-teal-400/20">
              <Building size={20} />
            </div>
            <div>
              <h2 className="font-extrabold text-xs text-white tracking-wide drop-shadow-sm">CAEDPH Yamboro</h2>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Portal Instructor</p>
            </div>
          </div>

          {/* Menú de Opciones */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = sectionActive === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => handleMenuClick(item.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-500/30 scale-[1.02] border border-teal-400/20' 
                      : 'text-gray-400 hover:bg-gray-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className={isActive ? 'text-white drop-shadow-sm' : 'text-gray-400 group-hover:text-white transition-colors'} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== null && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="p-3 border-t border-gray-850 space-y-1 bg-gray-900/20">
          {/* Toggle Modo Oscuro */}
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              addToast(`Tema cambiado a ${!darkMode ? 'Oscuro' : 'Claro'}`);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-all cursor-pointer"
          >
            <Moon size={16} />
            <span>Tema Oscuro</span>
            <div className={`ml-auto w-8 h-4 rounded-full p-0.5 transition-colors duration-200 flex ${darkMode ? 'bg-teal-600 justify-end' : 'bg-gray-700 justify-start'}`}>
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </button>

          {/* Cerrar Sesión */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-400 hover:bg-red-950/20 hover:text-red-400 rounded-lg transition-all cursor-pointer"
          >
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* SIDEBAR MÓVIL (Con botón de hamburguesa y deslizable) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          {/* Backdrop */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-300"
          ></div>
          
          {/* Contenido Sidebar */}
          <aside className="relative z-50 flex flex-col justify-between w-[220px] bg-[#151a26] border-r border-gray-800 h-full animate-fade-in shadow-2xl">
            <div>
              <div className="p-4 flex items-center justify-between border-b border-gray-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white shrink-0 font-bold shadow-lg shadow-teal-600/30 border border-teal-400/20">
                    <Building size={20} />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-xs text-white tracking-wide drop-shadow-sm">CAEDPH Yamboro</h2>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase">Portal Instructor</p>
                  </div>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-gray-400 hover:text-white rounded-lg"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="p-3 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = sectionActive === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleMenuClick(item.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-300 cursor-pointer ${
                        isActive 
                          ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-500/30 scale-[1.02] border border-teal-400/20' 
                          : 'text-gray-400 hover:bg-gray-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={16} className={isActive ? 'text-white drop-shadow-sm' : 'text-gray-400 transition-colors'} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge !== null && (
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-3 border-t border-gray-850 space-y-1 bg-gray-900/20">
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                  addToast(`Tema cambiado a ${!darkMode ? 'Oscuro' : 'Claro'}`);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-all cursor-pointer"
              >
                <Moon size={16} />
                <span>Tema Oscuro</span>
                <div className={`ml-auto w-8 h-4 rounded-full p-0.5 transition-colors duration-200 flex ${darkMode ? 'bg-teal-600 justify-end' : 'bg-gray-700 justify-start'}`}>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </button>

              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-400 hover:bg-red-950/20 hover:text-red-400 rounded-lg transition-all cursor-pointer"
              >
                <LogOut size={16} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ÁREA DE CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header Superior Móvil / Superior Escritorio */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 glass-premium border-b-0">
          <div className="flex items-center gap-3">
            {/* Botón hamburguesa móvil */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl md:hidden transition-all cursor-pointer"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight">{sectionActive}</h1>
          </div>

          {/* Información del Usuario */}
          <div className="flex items-center gap-3 select-none">
            <div className="text-right hidden sm:block">
              <span className="block text-xs font-bold text-white leading-none">{user.name}</span>
              <span className="text-[10px] text-teal-400 font-semibold leading-none">{user.email}</span>
            </div>
            
            <div className="w-8 h-8 rounded-lg bg-teal-900 border border-teal-700/60 flex items-center justify-center font-bold text-teal-400 text-xs shadow-inner">
              {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
          </div>
        </header>

        {/* Contenedor Interior */}
        <main className="flex-1 p-6 max-w-5xl w-full mx-auto">
          {renderActiveSection()}
        </main>
      </div>

    </div>
  );
}
