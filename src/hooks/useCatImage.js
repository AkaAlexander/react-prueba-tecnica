import { useEffect, useState } from "react";

//CUSTOM HOOK:
// - No puede estar en un if
// - Debe llamarse en el cuerpo del componenete
// - Podemos llamar hooks dentro de él
export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState();

  //Efecto para recuperar la imagen para cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return;

    const threeFirstWord = fact.split(" ", 3).join(" ");
    // const firstWord = fact.split(' ').slice(0,3).join(' ')
    // Separamos el texto en palabras separadas por espacio
    // Cogemos de la palabra num 0 a la 3
    // Las traemos y separamos por espacios
    // console.log(threeFirstWord)
    console.log(threeFirstWord);

    fetch(
      `https://cataas.com/cat/says/${threeFirstWord}?size=:size&color=:color&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        const { url } = response; //--> Recuperamos del objeto respuesta la URL para la imagen
        setImageUrl(url); //--> Asignamos al useState el valor de la url
      });
  }, [fact]); //--> Se va a actualizar cada vez que cambia el fact

  return { imageUrl };
} // Devuelve la imagen{ imageUrl: 'https://...'}
