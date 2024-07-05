var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const containerImg = document.querySelector(".container-img");
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getAllCharacters();
    data.forEach((character) => {
        console.log(character);
        // Crear contenedor principal para cada personaje
        const characterCont = document.createElement("div");
        characterCont.classList.add("character-cont");
        // Crear contenedor para la imagen y la información del personaje
        const backgroundCont = document.createElement("div");
        const imagenCont = document.createElement("div");
        const informacion = document.createElement("div");
        backgroundCont.classList.add("backgroundCont");
        imagenCont.classList.add("imagenCont");
        informacion.classList.add("informacion");
        // Crear y asignar elementos para la imagen y la información del personaje
        const name = document.createElement("p");
        const image = document.createElement("img");
        const ki = document.createElement("p");
        const maxki = document.createElement("p");
        const raza = document.createElement("p");
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
        backgroundCont.appendChild(imagenCont);
        characterCont.appendChild(informacion);
        // Añadir contenedor principal del personaje al contenedor principal de la página
        containerImg.appendChild(characterCont);
        characterCont.addEventListener("click", (ev) => {
            ev.preventDefault();
            //crear contenedor para cada informacion extra de personaje
            const difuminado = document.createElement("div");
            const cuadro_informacion = document.createElement("div");
        });
    });
}));
const getAllCharacters = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("https://dragonball-api.com/api/characters");
    let data = yield response.json();
    return data.items;
});
export {};
