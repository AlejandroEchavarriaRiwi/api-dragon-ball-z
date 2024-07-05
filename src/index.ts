import {
    Welcome,
    Item,
} from "./interfaces/dragonBallZInterface.js";

const containerImg = document.querySelector(".container-img") as HTMLDivElement;
const body = document.querySelector("body") as HTMLBodyElement;

let currentPage = 1;
const charactersPerPage = 8;

document.addEventListener("DOMContentLoaded", async () => {
    await loadCharacters(currentPage);

    createPaginationButtons();
});

const getAllCharacters = async (page: number, limit: number): Promise<Item[]> => {
    const response = await fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=${limit}`);
    let data: Welcome = await response.json();

    return data.items;
};

const loadCharacters = async (page: number) => {
    containerImg.innerHTML = '';
    const data: Item[] = await getAllCharacters(page, charactersPerPage);

    data.forEach((character: Item) => {
        console.log(character);

        
        const characterCont = document.createElement("div") as HTMLDivElement;
        characterCont.classList.add("character-cont");


        const backgroundCont = document.createElement("div") as HTMLDivElement;
        const imagenCont = document.createElement("div") as HTMLDivElement;
        const informacion = document.createElement("div") as HTMLDivElement;
        backgroundCont.classList.add("backgroundCont");
        imagenCont.classList.add("imagenCont");
        informacion.classList.add("informacion");

        const name = document.createElement("p") as HTMLHeadingElement;
        const image = document.createElement("img") as HTMLImageElement;
        const ki = document.createElement("p") as HTMLParagraphElement;
        const maxki = document.createElement("p") as HTMLParagraphElement;
        const raza = document.createElement("p") as HTMLParagraphElement;
        const genero = document.createElement("p") as HTMLParagraphElement;
        const descripcion = document.createElement("p") as HTMLParagraphElement;
        const afiliacion = document.createElement("p") as HTMLParagraphElement;

        name.innerHTML = `${character.name}`;
        image.src = character.image;
        image.className = "image";
        ki.innerText = `Ki: ${character.ki}`;
        maxki.innerText = `MaxKi: ${character.maxKi}`;
        raza.innerHTML = `Raza: ${character.race}`;
        genero.innerText = `Genero: ${character.gender}`;
        descripcion.innerText = `Descripcion: ${character.description}`;
        afiliacion.innerText = `Afiliacion: ${character.affiliation}`;


        imagenCont.appendChild(image);
        informacion.appendChild(name);

        characterCont.appendChild(backgroundCont);
        backgroundCont.appendChild(imagenCont);
        characterCont.appendChild(informacion);

        containerImg.appendChild(characterCont);

        characterCont.addEventListener("click", (ev: Event) => {
            ev.preventDefault();

            const difuminado = document.createElement("div") as HTMLDivElement;
            const cuadroInformacion = document.createElement("div") as HTMLDivElement;

            difuminado.className = "difuminado";
            cuadroInformacion.className = "cuadro_informacion";

            cuadroInformacion.appendChild(name.cloneNode(true));
            cuadroInformacion.appendChild(ki.cloneNode(true));
            cuadroInformacion.appendChild(maxki.cloneNode(true));
            cuadroInformacion.appendChild(raza.cloneNode(true));
            cuadroInformacion.appendChild(genero.cloneNode(true));
            cuadroInformacion.appendChild(descripcion.cloneNode(true));
            cuadroInformacion.appendChild(afiliacion.cloneNode(true));

            difuminado.appendChild(cuadroInformacion);

            document.body.appendChild(difuminado);

            difuminado.style.position = 'fixed';
            difuminado.style.left = '0';
            difuminado.style.width = '100vw';
            difuminado.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Fondo semi-transparente

            const scrollY = window.scrollY || window.pageYOffset;
            const windowHeight = window.innerHeight;
            const difuminadoHeight = difuminado.clientHeight;

        
            difuminado.style.top = `${scrollY + windowHeight - difuminadoHeight}px`;

        
            document.body.style.overflow = 'hidden';

            difuminado.addEventListener('click', (ev) => {
                if (ev.target === difuminado) {
                    difuminado.remove();
                    document.body.style.overflow = '';
                }
            });
        });
    });
};

const createPaginationButtons = () => {
    const paginationContainer = document.createElement("div") as HTMLDivElement;
    paginationContainer.className = "pagination-container";

    const prevButton = document.createElement("button") as HTMLButtonElement;
    prevButton.innerText = "Anterior";
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            loadCharacters(currentPage);
        }
    });

    const nextButton = document.createElement("button") as HTMLButtonElement;
    nextButton.innerText = "Siguiente";
    nextButton.addEventListener("click", () => {
        currentPage++;
        loadCharacters(currentPage);
    });

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(nextButton);

    document.body.appendChild(paginationContainer);
};
