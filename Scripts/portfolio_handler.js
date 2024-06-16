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
        clear_gallery();
        populate_gallery_models();
    });

    button_container.appendChild(button_art);
    button_container.appendChild(button_models);
    button_art.click();
}

function clear_gallery() {
    const gallery = document.getElementById('gallery');
    while (gallery.firstChild) {
        gallery.removeChild(gallery.lastChild);
    }
}

//#region Image Display

class gallery_image {
    constructor(href, alt_text, title) {
        this.title = title;
        this.alt_text = alt_text;
        this.href = href;
    }

    generateHTML() {
        return `<img src="${href}" alt="${alt_text}" ${(title !== "") ? `title="${title}"` : ""}>`;
    }
}

const displayGalleryImages = [
    new gallery_image(`${root}/portfolio/images/Khopesh-side-view.png`, "A 3D Image of an Egyptian Khopesh, made in blender", "Khopesh"),
    new gallery_image(`${root}/portfolio/images/Self_portrait.png`, "A self portrait of Yoav Lipshitz", "Self Portrait")
]

function populate_gallery_images() {
    const gallery = document.getElementById('gallery');
    displayGalleryImages.forEach((el) => {
        const image = document.createElement('img');
        image.src = el.href;
        image.alt = el.alt_text;
        if (el.title !== "") {
            image.title = el.title;
        }
        gallery.appendChild(image);
    });
}

//#endregion

//#region Model Display

class gallery_model {
    constructor(href, alt_text, poster_href) {
        this.href = href;
        this.alt_text = alt_text;
        this.poster_href = poster_href;
    }
}

const displayGalleryModels = [
    new gallery_model(`${root}/portfolio/models/Revolver_display.gltf`, "A 3D model of a golden revolver", `${root}/portfolio/models/posters/revolver_poster.png`)
]

{/* <model-viewer id="lazy-load" camera-controls touch-action="pan-y" reveal="manual"
                src="./models/Revolver/Revolver_display.gltf" ios-src="./models/Revolver/Revolver_display.gltf" alt="Revolver Model"
                camera-controls style="background-color: white;">
                <div id="lazy-load-poster" slot="poster" style="background-image: url('../../assets/poster-damagedhelmet.webp');"></div>
                <div id="button-load" slot="poster">Load 3D Model</div>
            </model-viewer>
            <script>
                document.querySelector('#button-load').addEventListener('click',
                  () => document.querySelector('#lazy-load').dismissPoster());
              </script> */}

function populate_gallery_models() {
    const gallery = document.getElementById('gallery');
    displayGalleryModels.forEach((el) => {
        const model = document.createElement('model-viewer');
        model.classList.add('lazy-load');
        model.setAttribute('camera-controls', true);
        model.src = el.href;
        model.setAttribute('ios-src', el.href);
        model.alt = el.alt_text;
        model.setAttribute('reveal', 'manual');
        
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

        gallery.appendChild(model);
    });
}

//#endregion