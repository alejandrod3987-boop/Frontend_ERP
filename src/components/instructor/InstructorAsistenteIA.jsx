import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageSquarePlus } from 'lucide-react';

const mockHistory = [
  {
    id: 1,
    role: 'ia',
    content: '¡Hola! Soy tu Asistente IA del SENA. Puedo ayudarte a redactar tus actividades, resumir informes, o resolver dudas sobre el formato de presentación. ¿En qué te puedo ayudar hoy?'
  },
  {
    id: 2,
    role: 'user',
    content: '¿Puedes mejorar la redacción de esta actividad? "hice una clase sobre react con los aprendices y les enseñe los hooks básicos"'
  },
  {
    id: 3,
    role: 'ia',
    content: 'Claro. Aquí tienes una versión más profesional para tu informe:\n\n"Orientación de sesión formativa enfocada en la biblioteca React, abordando los fundamentos y la implementación práctica de Hooks básicos (useState, useEffect) con el fin de fortalecer las competencias técnicas de los aprendices."'
  },
  {
    id: 4,
    role: 'user',
    content: 'Resume este informe.'
  },
  {
    id: 5,
    role: 'ia',
    content: 'Este informe describe las actividades desarrolladas durante el período contractual, destacando el cumplimiento del 100% de los resultados de aprendizaje programados. Se evidencia la ejecución de 4 talleres prácticos, la evaluación de 25 evidencias en la plataforma ZAJuna, y la participación activa en el comité de área académica.'
  }
];

export default function InstructorAsistenteIA({ addToast }) {
  const [messages, setMessages] = useState(mockHistory);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue
    };

    setMessages([...messages, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Mock response delay
    setTimeout(() => {
      const iaResponse = {
        id: Date.now() + 1,
        role: 'ia',
        content: '...'
      };
      setMessages(prev => [...prev, iaResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleNewConversation = () => {
    setMessages([{
      id: Date.now(),
      role: 'ia',
      content: '¡Hola de nuevo! ¿En qué más puedo asistirte hoy?'
    }]);
    addToast('Nueva conversación iniciada.');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col animate-fade-in text-slate-800 max-w-5xl mx-auto">

      {/* Cabecera del Chat */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            <Sparkles className="text-teal-500" size={24} />
            Asistente IA
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Resuelve dudas y optimiza la redacción de tus informes con inteligencia artificial.
          </p>
        </div>
        <button
          onClick={handleNewConversation}
          className="px-4 py-2 bg-white border border-gray-200 hover:border-teal-300 hover:bg-teal-50 text-teal-700 font-bold rounded-xl flex items-center gap-2 text-xs transition-all shadow-sm"
        >
          <MessageSquarePlus size={16} />
          Nueva Conversación
        </button>
      </div>

      {/* Contenedor Principal del Chat */}
      <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">

        {/* Área de Mensajes */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm mt-1 border ${msg.role === 'user'
                ? 'bg-teal-600 text-white border-teal-700'
                : 'bg-white text-teal-600 border-gray-200'
                }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={18} />}
              </div>

              {/* Burbuja de Mensaje */}
              <div className={`p-4 rounded-2xl shadow-sm text-sm whitespace-pre-wrap leading-relaxed ${msg.role === 'user'
                ? 'bg-teal-600 text-white rounded-tr-none'
                : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none'
                }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {/* Indicador de "Escribiendo..." simulado */}
          {isTyping && (
            <div className="flex gap-4 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-white text-teal-600 border border-gray-200 flex items-center justify-center shrink-0 shadow-sm mt-1">
                <Bot size={18} />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-gray-100 rounded-tl-none shadow-sm flex items-center gap-1.5 h-[52px]">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Área de Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              className="w-full pl-5 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-shadow text-gray-800"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className={`absolute right-2 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${!inputValue.trim() || isTyping
                ? 'text-gray-400 bg-transparent'
                : 'bg-teal-600 text-white shadow-md hover:bg-teal-500 hover:shadow-lg active:scale-95'
                }`}
            >
              <Send size={18} className={inputValue.trim() && !isTyping ? 'ml-0.5' : ''} />
            </button>
          </form>
          <div className="text-center mt-3">
            <span className="text-[10px] text-gray-400 font-medium">El Asistente IA puede cometer errores. Considera verificar la información importante.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
