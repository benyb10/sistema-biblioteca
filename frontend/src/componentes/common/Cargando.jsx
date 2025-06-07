import React from 'react';
import { Loader2 } from 'lucide-react';

const Cargando = ({ mensaje = 'Cargando...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
      <p className="text-gray-600">{mensaje}</p>
    </div>
  );
};

export default Cargando;