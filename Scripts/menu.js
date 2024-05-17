const root = "/WSOA3028A_2567169";

const menu_items = [
    { name: "Home", href: `${root}/index.html` },
    { name: "Blog", href: `${root}/blogs/index.html` },
    { name: "Essays", href: `${root}/essays/index.html` },
    { name: "Portfolio", href: `${root}/portfolio/index.html` },
    { name: "Design", href: `${root}/design/index.html` }
];

export function initialise(currentPage = "") {
    if (!(typeof currentPage === 'string' || currentPage instanceof String)) return;
    // const title = document.querySelector("header > h1");
    // // Title styling here in the future
    // const title_anchor = document.createElement("a");
    // title_anchor.innerText = "2024 WSOA3028A";
    // title_anchor.setAttribute("id", "Top");

    // title.appendChild(title_anchor);
    const nav = document.querySelector("header > nav");

    const icon_checkbox = document.createElement("input");
    icon_checkbox.type = 'checkbox';
    icon_checkbox.id = 'navigation_checkbox';
    icon_checkbox.checked = localStorage.getItem('navbar_open_state') === 'open';
    icon_checkbox.addEventListener('change', () => toggle_open());

    nav.appendChild(icon_checkbox);
    const label = document.createElement('label');
    label.htmlFor = 'navigation_checkbox';

    const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgIcon.setAttribute("viewBox", "0 0 24 24");
    svgIcon.setAttribute("class", "svg-bars"); // Set a new class for the SVG icon
    svgIcon.innerHTML = `
        <path fill="#f0ead6" d="M3 12h18v2H3v-2zm0 6h18v2H3v-2zm0-12h18v2H3V6z"/>
    `;
    label.appendChild(svgIcon);

    // const icon = document.createElement('i');
    // icon.classList.add("fa-solid");
    // icon.classList.add("fa-bars");

    // label.appendChild(icon);
    nav.appendChild(label);

    //Changed from ul to menu because it is more semantically accurate
    const ul = document.createElement("menu");
    ul.classList.add("nav_menu");

    //populating list of pages with entries from menuItems array
    for (let menuItem of menu_items) {
        const li = document.createElement("li");
        if (currentPage != menuItem.name) {
            const a = document.createElement("a");
            a.innerText = menuItem.name;
            a.setAttribute("href", menuItem.href);
            li.appendChild(a);
        } else {
            const a = document.createElement("a");
            a.innerText = menuItem.name;
            li.appendChild(a);
        }
        ul.appendChild(li);
    }

    nav.appendChild(ul);
}

function toggle_open() {
    let new_state = localStorage.getItem('navbar_open_state') === 'open' ? 'closed' : 'open';
    localStorage.setItem('navbar_open_state', new_state);
    //console.log(new_state)
}

//initialise()