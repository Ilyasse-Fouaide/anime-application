import React from 'react'
import TypeContext from './TypeContext';

function Provider({ children }: { children: React.ReactNode }) {
  const [type, setType] = React.useState<string | null>("Ahmed");

  return (
    <TypeContext.Provider value={{ type, setType }}>
      {children}
    </TypeContext.Provider>
  )
}

export default Provider