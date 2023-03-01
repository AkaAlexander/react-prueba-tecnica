import React, { useState } from "react"
import { useEffect } from "react"
import '../src/style.css'
import { getRandomFact } from "./services/facts"
import { useCatImage } from "./hooks/useCatImage"

//Ejemplo para ver imagen y fact
const CAT_ENDPOINT_FACT_URL = 'https://catfact.ninja/fact'
//const CAT_ENDPOINT_IMG_URL = `https://cataas.com/cat/says/${firstWord}?size=:size&color=:color&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/'

export function App () {
    const [fact, setFact] = useState()
    const { imageUrl} = useCatImage({ fact }) //--> Pasamos el hook como objeto

    //Efecto para recuperar la cita al cargar la página
    useEffect(() => {
      getRandomFact().then(newFact => setFact(newFact)) //--> Llamamos al método y seteamos el resultado al useState -> setFact
    }, []) //--> Se va a actualizar cada vez que haya algo entre [],
           //cada vez que se renderiza el componente , se ejecuta el efecto

    //Botón onClick que llama a la función y recupera un fact para setearlo al useState -> setFact
    const handleClick = async () => {
        const newFact = await getRandomFact()
        setFact(newFact)
    }

    return (
        <main>
                <h1>App de gatos</h1>
                <button onClick={handleClick}>New Fact</button>
            <section>
                {/* Renderizado condicional se muestra solo si hay fact */}
                {fact && <p> {fact}</p>}
                {/* Concatenamos el prefijo a la url para mostrar la imagen con las palabras */}
                {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`}alt={`Imagen extraida de las tres primeras palabras de ${fact}`}></img>}

            </section>
        </main>
    )
}