import { useEffect, useState } from 'react'
import { getRandomFact } from '../services/facts'

// Custom Hook
export function useCatFact () {
  const [fact, setFact] = useState()

  const refreshFact = () => {
    getRandomFact().then((newFact) => setFact(newFact))
  }

  // Primera vez que se monta el componente hacemos fetch de datos
  // Se añaden dependencias (setFact) en el [] cuando puedan cambiar (como el fact)
  // Se pone sin [] cuando queremos que se ejecute cada vez que se renderice el componente
  useEffect(refreshFact, [])

  return { fact, refreshFact }
}
