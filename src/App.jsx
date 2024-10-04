import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const getCatImageUrl = (firstWord) =>
  `https://cataas.com/cat/says/${firstWord}?size=50&color=red`

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setimageUrl] = useState()

  // Primera vez que se monta el componente hacemos fetch de datos
  // Se añaden dependencias (setFact) en el [] cuando puedan cambiar (como el fact)
  // Se pone sin [] cuando queremos que se ejecute cada vez que se renderice el componente
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data
        setFact(fact)
      })
      .catch((error) => console.error(error))
  }, [])

  // Este useEffect es para recuperar la imagen cada vez que cambie el texto
  useEffect(() => {
    if (!fact) {
      return
    }

    const firstWord = fact.split(' ')[0]

    const CAT_ENDPOINT_IMAGE_URL = getCatImageUrl(firstWord)

    // Devuelv res en la primera promesa porque res.json() no estaba devolviendo la imagen de la API
    fetch(CAT_ENDPOINT_IMAGE_URL).then((res) => {
      if (!res.ok) {
        throw new Error('Error al devolver la imagen')
      }

      setimageUrl(CAT_ENDPOINT_IMAGE_URL)
    })
  }, [fact])

  return (
    <main>
      <h1>App</h1>
      {/* Renderizado condicional */}
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && (
          <img
            src={`${imageUrl}`}
            alt={`Extraccion de Imagen usando la primera palabra para ${fact}`}
          />
        )}
      </section>
    </main>
  )
}
