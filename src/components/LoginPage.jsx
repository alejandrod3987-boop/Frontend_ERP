import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Zap, Clipboard, Building2, AlertCircle, User, Phone, CheckCircle2 } from 'lucide-react';

export default function LoginPage({ intentarLogin, registrarUsuario }) {
  // Estados para Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Estado para alternar entre Login y Registro
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Estados para Recuperar Contraseña
  const [isForgotPass, setIsForgotPass] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  // Estados para Registro
  const [regName, setRegName] = useState('');
  const [regCedula, setRegCedula] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setForgotSuccess('');

    if (!email || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    const result = intentarLogin(email, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setForgotSuccess('');

    if (!regName || !regCedula || !regEmail || !regPassword || !regPhone) {
      setError('Por favor, complete todos los campos de registro.');
      return;
    }

    if (!regEmail.toLowerCase().endsWith('@sena.edu.co')) {
      setError('El correo debe ser institucional con terminación @sena.edu.co.');
      return;
    }

    const newUser = {
      name: regName,
      cedula: regCedula,
      email: regEmail,
      password: regPassword,
      telefono: regPhone
    };

    const result = registrarUsuario(newUser);

    if (result.success) {
      setSuccess(result.message);
      setRegName('');
      setRegCedula('');
      setRegEmail('');
      setRegPassword('');
      setRegPhone('');
      
      setTimeout(() => {
        setIsRegistering(false);
        setEmail(newUser.email);
        setSuccess('');
      }, 2000);
    } else {
      setError(result.message);
    }
  };

  const handleForgotPass = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setError('Por favor, ingresa tu correo electrónico.');
      return;
    }
    setError('');
    setForgotSuccess('Si el correo está registrado, recibirás instrucciones para recuperar tu contraseña.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] p-4 transition-colors duration-350">
      <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-gray-200">

        {/* COLUMNA IZQUIERDA (bg-teal-700 / SENA branding) */}
        <div className="bg-teal-700 p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden">
          {/* Círculos decorativos abstractos de fondo para premium aesthetics */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-16 -mb-16"></div>

          <div className="relative z-10">
            {/* Ícono de edificio/reporte en caja negra */}
            <div className="inline-flex items-center justify-center p-3 bg-black rounded-xl mb-6 shadow-md border border-gray-800/30">
              <Building2 className="text-teal-400 w-8 h-8" />
            </div>

            {/* SIGIM */}
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">STIMI</h1>
            <p className="text-teal-200 text-sm font-semibold mb-6">
              Centro Agroempresarial y Desarrollo Pecuario del Huila
            </p>

            <p className="text-teal-100/90 leading-relaxed text-sm md:text-base">
              Sistema de Gestión y Aprobación de Informes Mensuales para el Centro Agroempresarial y Desarrollo Pecuario del Huila del Tecnoparque SENA.
            </p>
          </div>

          {/* Abajo: 3 íconos pequeños */}
          <div className="relative z-10 flex gap-6 mt-12 pt-6 border-t border-teal-600/50">
            <div className="flex items-center gap-2 text-teal-200 hover:text-white transition-colors duration-200 cursor-pointer group">
              <div className="p-1.5 rounded-lg bg-teal-850 group-hover:bg-teal-600 transition-colors">
                <Zap size={16} className="text-amber-400" />
              </div>
              <span className="text-xs font-medium">Agilidad</span>
            </div>
            <div className="flex items-center gap-2 text-teal-200 hover:text-white transition-colors duration-200 cursor-pointer group">
              <div className="p-1.5 rounded-lg bg-teal-850 group-hover:bg-teal-600 transition-colors">
                <CheckCircle2 size={16} />
              </div>
              <span className="text-xs font-medium">Transparencia</span>
            </div>
            <div className="flex items-center gap-2 text-teal-200 hover:text-white transition-colors duration-200 cursor-pointer group">
              <div className="p-1.5 rounded-lg bg-teal-850 group-hover:bg-teal-600 transition-colors">
                <Clipboard size={16} />
              </div>
              <span className="text-xs font-medium">Control</span>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA (Formulario de Login o Registro) */}
        <div className="bg-white p-8 md:p-12 flex flex-col justify-center border-l border-gray-200">
          <div className="max-w-md w-full mx-auto">

            {/* Mensajes de Notificación */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start gap-2.5 animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                <div>
                  <p className="font-semibold">Atención</p>
                  <p className="opacity-90">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-xs flex items-start gap-2.5 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Operación exitosa</p>
                  <p className="opacity-90">{success}</p>
                </div>
              </div>
            )}

            {isForgotPass ? (
              /* FORMULARIO DE RECUPERAR CONTRASEÑA */
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Recuperar contraseña</h2>
                <p className="text-gray-500 text-sm mb-6">Ingresa tu correo institucional</p>

                {forgotSuccess ? (
                  <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-xl text-green-800 text-xs flex flex-col items-center gap-3 animate-fade-in text-center">
                    <CheckCircle2 className="w-10 h-10 text-green-600 mb-1" />
                    <p className="font-semibold text-sm">¡Solicitud procesada!</p>
                    <p className="opacity-90">{forgotSuccess}</p>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPass} className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Correo Electrónico
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                          <Mail size={18} />
                        </span>
                        <input
                          type="email"
                          required
                          placeholder="correo@sena.edu.co"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all text-sm shadow-sm"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold shadow-md active:scale-[0.98] transition-all duration-200 mt-2 cursor-pointer"
                    >
                      Enviar enlace de recuperación
                    </button>
                  </form>
                )}

                <div className="mt-8 text-center">
                  <button
                    onClick={() => {
                      setIsForgotPass(false);
                      setForgotSuccess('');
                      setForgotEmail('');
                      setError('');
                    }}
                    className="text-xs text-gray-500 hover:text-gray-800 transition-colors cursor-pointer font-medium"
                  >
                    Volver al inicio de sesión
                  </button>
                </div>
              </div>
            ) : !isRegistering ? (
              /* FORMULARIO DE INICIO DE SESIÓN */
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Iniciar Sesión</h2>
                <p className="text-gray-500 text-sm mb-8">Accede a tu cuenta institucional</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Input Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                        <Mail size={18} />
                      </span>
                      <input
                        type="email"
                        required
                        placeholder="correo@sena.edu.co"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Input Password */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Contraseña
                      </label>
                      <button type="button" onClick={() => { setIsForgotPass(true); setError(''); setSuccess(''); }} className="text-xs text-teal-600 hover:text-teal-700 font-medium transition-colors cursor-pointer">
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                        <Lock size={18} />
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-11 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Botón de envío */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-teal-600/10 active:scale-[0.98] transition-all duration-200 mt-2 cursor-pointer"
                  >
                    Iniciar Sesión
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => {
                      setIsRegistering(true);
                      setError('');
                      setSuccess('');
                    }}
                    className="text-xs text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                  >
                    ¿No tienes una cuenta? <span className="text-teal-600 font-semibold">Regístrate aquí</span>
                  </button>
                </div>
              </div>
            ) : (
              /* FORMULARIO DE REGISTRO */
              <div className="animate-fade-in max-h-[80vh] overflow-y-auto pr-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">Crea tu Cuenta</h2>
                <p className="text-gray-500 text-sm mb-6">Regístrate en el sistema STIMI</p>

                <form onSubmit={handleRegister} className="space-y-4">
                  {/* Nombre Completo */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Nombre Completo
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                        <User size={18} />
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Diego Fernando Calderón"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Cédula */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Documento (Cédula)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                        <Clipboard size={18} />
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="Ej. 1023456789"
                        value={regCedula}
                        onChange={(e) => setRegCedula(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Correo Electrónico */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Correo Institucional
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                        <Mail size={18} />
                      </span>
                      <input
                        type="email"
                        required
                        placeholder="usuario@sena.edu.co"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Teléfono / Celular
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                        <Phone size={18} />
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="Ej. +57 312 456 7890"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Contraseña */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Contraseña
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                        <Lock size={18} />
                      </span>
                      <input
                        type="password"
                        required
                        placeholder="Crea tu contraseña"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm shadow-sm"
                      />
                    </div>
                  </div>



                  {/* Botón de Registro */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold shadow-md active:scale-[0.98] transition-all duration-200 mt-3 cursor-pointer"
                  >
                    Registrar Cuenta
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      setIsRegistering(false);
                      setError('');
                      setSuccess('');
                    }}
                    className="text-xs text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                  >
                    ¿Ya tienes una cuenta? <span className="text-teal-600 font-semibold">Inicia sesión aquí</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

