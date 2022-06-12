export function Mensaje({mensajeX}) {
  return (
    <div className="
    bg-yellow-100 border 
    text-orange-700
    border-gray-400 
    px-4 py-3 rounded relative mb-2 text-center 
    shadow-md text-sm">
      <span className="sm:inline block" >{mensajeX.replace('Firebase:','','gi')}</span>
    </div>
  )
}

export function MensajeExito({mensajeX}) {
  return (
    <div className="
    bg-green-100 border 
    text-white-700
    border-gray-400 
    px-4 py-3 rounded relative mb-2 text-center 
    shadow-md text-sm">
      <span className="sm:inline block" >{mensajeX.replace('Firebase:','','gi')}</span>
    </div>
  )
}

