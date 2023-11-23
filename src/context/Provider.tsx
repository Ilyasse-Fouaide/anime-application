import React from 'react'
import TypeContext from './TypeContext';

function Provider({ children }: { children: React.ReactNode }) {
  const [type, setType] = React.useState<string | null>("all");

  return (
    <TypeContext.Provider value={{ type, setType }}>
      {children}
    </TypeContext.Provider>
  )
}

export default Provider