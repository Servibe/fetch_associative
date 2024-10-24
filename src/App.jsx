import './App.css'
import { useCatFact } from './hooks/useCatFact'
import { useCatImage } from './hooks/useCatImage'

export function App () {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  console.log(imageUrl)

  const handleClick = async () => {
    refreshFact()
  }

  return (
    <main>
      <h1>App</h1>
      <button onClick={handleClick}>Get new fact</button>
      {/* Renderizado condicional */}
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`Extraccion de Imagen usando la primera palabra para ${fact}`}
          />
        )}
      </section>
    </main>
  )
}
