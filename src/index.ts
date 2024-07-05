import {
    Welcome,
    Item,
} from "./interfaces/dragonBallZInterface.js";

const containerImg = document.querySelector(".container-img") as HTMLDivElement;

document.addEventListener("DOMContentLoaded", async () => {
    const data: Item[] = await getAllCharacters();

    data.forEach((character: Item) => {
        console.log(character);

        // Crear contenedor principal para cada personaje
        const characterCont = document.createElement("div") as HTMLDivElement;
        characterCont.classList.add("character-cont");

        // Crear contenedor para la imagen y la información del personaje
        const backgroundCont = document.createElement("div") as HTMLDivElement;
        const imagenCont = document.createElement("div") as HTMLDivElement;
        const informacion = document.createElement("div") as HTMLDivElement;
        backgroundCont.classList.add("backgroundCont");
        imagenCont.classList.add("imagenCont");
        informacion.classList.add("informacion");

        // Crear y asignar elementos para la imagen y la información del personaje
        const name = document.createElement("p") as HTMLHeadingElement;
        const image = document.createElement("img") as HTMLImageElement;
        const ki = document.createElement("p") as HTMLParagraphElement;
        const maxki = document.createElement("p") as HTMLParagraphElement;
        const raza = document.createElement("p") as HTMLParagraphElement;

        name.innerHTML = `${character.name}`;
        image.src = character.image;
        image.className = "image";
        ki.innerText = `Ki: ${character.ki}`;
        maxki.innerText = `MaxKi: ${character.maxKi}`;
        raza.innerHTML = `<span>Raza:</span> ${character.race}`;

        // Añadir elementos a los contenedores correspondientes
        imagenCont.appendChild(image);
        informacion.appendChild(name);

        // Añadir contenedores al contenedor principal del personaje
        characterCont.appendChild(backgroundCont);
        backgroundCont.appendChild(imagenCont)
        characterCont.appendChild(informacion);

        // Añadir contenedor principal del personaje al contenedor principal de la página
        containerImg.appendChild(characterCont);

        characterCont.addEventListener("click", (ev:Event) => {
            ev.preventDefault();
            //crear contenedor para cada informacion extra de personaje
            const difuminado = document.createElement("div") as HTMLDivElement
            const cuadro_informacion = document.createElement("div") as HTMLDivElement



        })
    });



});

const getAllCharacters = async (): Promise<Item[]> => {
    const response = await fetch("https://dragonball-api.com/api/characters");
    let data: Welcome = await response.json();

    return data.items;
};
