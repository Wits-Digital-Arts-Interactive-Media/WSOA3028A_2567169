export function initialise() {
    let button_container = document.getElementById('button_container');

    let button_art = document.createElement('button');

    let button_models = document.createElement('button');

    button_container.appendChild(button_art);
    button_container.appendChild(button_models);
}