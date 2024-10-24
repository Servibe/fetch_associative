import { useEffect, useState } from 'react'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/'

// Custom Hook
export function useCatImage ({ fact }) {
  const [imageUrl, setimageUrl] = useState()

  // Este useEffect es para recuperar la imagen cada vez que cambie el texto
  useEffect(() => {
    if (!fact) {
      return
    }

    const threeFirstWords = fact.split(' ', 3).join(' ')

    // Devuelv res en la primera promesa porque res.json() no estaba devolviendo la imagen de la API
    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red`)
      .then((res) => res.json())
      .then((response) => {
        const { url } = response

        setimageUrl(url)
      })
  }, [fact])

  return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` }
}
