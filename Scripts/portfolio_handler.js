import { is_mobile } from "./mobile_handling.js";

const root = "/WSOA3028A_2567169";

let is_art_open = false;

export function initialise() {
    let button_container = document.getElementById('button_container');

    let button_art = document.createElement('button');
    button_art.innerText = 'Art';
    button_art.addEventListener('click', () => {
        if (is_art_open) return;
        is_art_open = true;
        button_art.classList.add('selected_tab');
        button_models.classList.remove('selected_tab');
        let divisions = 2;
        if (window.matchMedia('only screen and (max-width: 780px)').matches) {
            divisions = 1;
        }
        applyTopBorderToFirstChildren('.gallery_item', divisions);
        set_gallery_amount_horizontal(divisions);
        set_gallery_amount_vertical(Math.ceil(displayGalleryImages.length/divisions));
        clear_gallery();
        populate_gallery_images();
    });

    let button_models = document.createElement('button');
    button_models.innerText = '3D Renders';
    button_models.addEventListener('click', () => {
        if (!is_art_open) return;
        is_art_open = false;
        button_models.classList.add('selected_tab');
        button_art.classList.remove('selected_tab');
        let divisions = 1;
        applyTopBorderToFirstChildren('.gallery_item', divisions);
        set_gallery_amount_horizontal(divisions);
        set_gallery_amount_vertical(Math.ceil(displayGalleryModels.length/divisions));
        clear_gallery();
        populate_gallery_models();
    });

    button_container.appendChild(button_art);
    button_container.appendChild(button_models);
    button_art.click();
}

function applyTopBorderToFirstChildren(selector, x) {
    //creating or finding a stylesheet that we can add rules to
    let styleSheet = document.getElementById('var_stylesheet');
    if (!styleSheet) {
        styleSheet = document.createElement('style');
        styleSheet.id = 'var_stylesheet';
        styleSheet.setAttribute('type', "text/css");
        document.head.appendChild(styleSheet);
    }

    let rules = '';

    for (let i=1; i<=x; i++) {
        rules += `${selector}:nth-child(${i}), `;
    }

    //removing last two characters
    rules = rules.slice(0, -2) + `{
    border-top: 1px solid; 
    padding-top: 5%;
    }`;

    styleSheet.innerText = rules;
}

function clear_gallery() {
    const gallery = document.getElementById('gallery');
    while (gallery.firstChild) {
        gallery.removeChild(gallery.lastChild);
    }
}

function set_gallery_amount_vertical(display_amount) {
    //gettting the root for css variable access
    let root = document.querySelector(':root');

    root.style.setProperty('--div_amount_vertical', display_amount);
}

function set_gallery_amount_horizontal(display_amount) {
    let root = document.querySelector(':root');

    root.style.setProperty('--div_amount_horizontal', display_amount);
}

//#region Image Display

class gallery_image {
    constructor(href, alt_text, title) {
        this.title = title;
        this.alt_text = alt_text;
        this.href = href;
    }
}

const displayGalleryImages = [
    new gallery_image(`${root}/portfolio/images/Self_portrait.png`, "A self portrait of Yoav Lipshitz", "Self Portrait"),
    new gallery_image(`${root}/portfolio/images/Escaping-the-fire.jpg`, "A digital drawing of a hand reaching up, sorrounded by embers", "Escaping the Fire"),
    new gallery_image(`${root}/portfolio/images/Flower.jpg`, "A traditional drawing of a metal flower", "Metallic Petals"),
    new gallery_image(`${root}/portfolio/images/Adoption.jpg`, "A traditional drawing of a mother and her adopted son", "Adoption"),
    new gallery_image(`${root}/portfolio/images/eye.jpg`, 'A traditional drawing of an eye', "Eye"),
    new gallery_image(`${root}/portfolio/images/Mother's-day.jpg`, 'A watercolour painting of a rose', "Birthday")

]

function populate_gallery_images() {
    const gallery = document.getElementById('gallery');
    displayGalleryImages.forEach((el) => {
        const container = document.createElement('div');
        container.classList.add('gallery_item');

        const image = document.createElement('img');
        image.src = el.href;
        image.alt = el.alt_text;
        if (el.title !== "") {
            image.title = el.title;
        }

        const image_title = document.createElement('p');
        image_title.innerText = el.title;

        container.appendChild(image);
        container.appendChild(image_title);
        gallery.appendChild(container);
    });
}

//#endregion

//#region Model Display

class gallery_model {
    constructor(href, alt_text, poster_href, title, has_animation) {
        this.href = href;
        this.alt_text = alt_text;
        this.poster_href = poster_href;
        this.title = title;
        this.has_animation = has_animation;
    }
}

const displayGalleryModels = [
    new gallery_model(`${root}/portfolio/models/Revolver_display.gltf`, "A 3D model of a golden revolver", `${root}/portfolio/models/posters/revolver_poster.png`, 'Golden Revolver'),
    new gallery_model(`${root}/portfolio/models/Cigar_Case_display.glb`, "A 3D model of a cigar case", `${root}/portfolio/models/posters/Cigar_Case_Flame.png`, 'Cigar Case'),
    new gallery_model(`${root}/portfolio/models/SkullDrake_display.glb`, "A 3D model of a Skull Drake", `${root}/portfolio/models/posters/SkullDrake_poster.jpg`, 'Skull Drake', true),
    new gallery_model(`${root}/portfolio/models/khopesh_display.glb`, "A 3D model of an Egyptian Khopesh", `${root}/portfolio/models/posters/Khopesh_poster.png`, 'Khopesh'),
]

function populate_gallery_models() {
    const gallery = document.getElementById('gallery');
    displayGalleryModels.forEach((el) => {
        const container = document.createElement('div');
        container.classList.add('gallery_item');

        const model = document.createElement('model-viewer');
        model.classList.add('lazy-load');
        model.setAttribute('camera-controls', true);
        model.src = el.href;
        model.setAttribute('ios-src', el.href);
        model.alt = el.alt_text;
        model.setAttribute('reveal', 'manual');
        model.setAttribute('autoplay', el.has_animation);
        model.setAttribute('shadow-intensity', 1)
        
        const placeholder_poster = document.createElement('div');
        placeholder_poster.classList.add('lazy-load-poster');
        placeholder_poster.slot = 'poster';
        placeholder_poster.style = `background-image: url('${el.poster_href}');`
        model.appendChild(placeholder_poster);

        const load_button = document.createElement('button');
        load_button.classList.add('button-load');
        load_button.slot = 'poster';
        load_button.innerText = 'Load 3D Model';

        load_button.addEventListener('click', () => {
            model.dismissPoster();
        });

        model.appendChild(load_button);

        const image_title = document.createElement('p');
        image_title.innerText = el.title;

        container.appendChild(model);
        container.appendChild(image_title);
        gallery.appendChild(container);
    });
}

//#endregion