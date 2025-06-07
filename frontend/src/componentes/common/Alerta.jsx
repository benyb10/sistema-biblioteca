import React from 'react';
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';

const Alerta = ({ tipo = 'info', mensaje, onCerrar }) => {
  const configuraciones = {
    exito: {
      fondo: 'bg-green-50',
      borde: 'border-green-200',
      texto: 'text-green-800',
      icono: CheckCircle,
      colorIcono: 'text-green-400'
    },
    error: {
      fondo: 'bg-red-50',
      borde: 'border-red-200',
      texto: 'text-red-800',
      icono: XCircle,
      colorIcono: 'text-red-400'
    },
    advertencia: {
      fondo: 'bg-yellow-50',
      borde: 'border-yellow-200',
      texto: 'text-yellow-800',
      icono: AlertCircle,
      colorIcono: 'text-yellow-400'
    },
    info: {
      fondo: 'bg-blue-50',
      borde: 'border-blue-200',
      texto: 'text-blue-800',
      icono: Info,
      colorIcono: 'text-blue-400'
    }
  };

  const config = configuraciones[tipo];
  const IconComponent = config.icono;

  return (
    <div className={`rounded-md p-4 ${config.fondo} ${config.borde} border`}>
      <div className="flex">
        <IconComponent className={`h-5 w-5 ${config.colorIcono} mr-3 mt-0.5`} />
        <div className="flex-1">
          <p className={`text-sm ${config.texto}`}>{mensaje}</p>
        </div>
        {onCerrar && (
          <button
            onClick={onCerrar}
            className={`ml-3 ${config.texto} hover:opacity-75`}
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alerta;