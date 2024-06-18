const root = "/WSOA3028A_2567169";

const menu_items = [
    { name: "Home", href: `${root}/index.html` },
    { name: "Portfolio", href: `${root}/portfolio/index.html` },
    { name: "Blogs", href: `${root}/blogs/index.html` },
    { name: "Essays", href: `${root}/essays/index.html` },
    { name: "Design", href: `${root}/design/index.html` }
];

export function initialise(currentPage = "") {
    if (!(typeof currentPage === 'string' || currentPage instanceof String)) return;
    const main = document.querySelector('header');
    const nav = document.createElement("nav");
    main.appendChild(nav);

    const icon_checkbox = document.createElement("input");
    icon_checkbox.type = 'checkbox';
    icon_checkbox.id = 'navigation_checkbox';
    if (window.matchMedia('only screen and (max-width: 780px)').matches) {
        icon_checkbox.checked = false;
    } else {
        icon_checkbox.checked = localStorage.getItem('navbar_open_state') === 'open';
    }
    icon_checkbox.addEventListener('change', () => toggle_open());

    nav.appendChild(icon_checkbox);
    const label = document.createElement('label');
    label.htmlFor = 'navigation_checkbox';

    const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgIcon.setAttribute("viewBox", "0 0 24 24");
    svgIcon.setAttribute("class", "svg-bars"); // Set a new class for the SVG icon
    svgIcon.id = 'nav_menu_icon';
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
    const menu = document.createElement("menu");
    menu.classList.add("nav_menu");
    menu.addEventListener('mouseleave', () => {
        icon_checkbox.click()
    })

    //populating list of pages with entries from menuItems array
    for (let menuItem of menu_items) {
        const li = document.createElement("li");

        if (currentPage != menuItem.name) {
            const associated_button = document.createElement('button');
            associated_button.innerText = menuItem.name;
            associated_button.addEventListener('click', () => {
                const a = document.createElement('a');
                a.href = menuItem.href;
                a.click();
            });
            li.appendChild(associated_button);
        } else {
            const p = document.createElement('span');
            p.innerText = menuItem.name;
            li.appendChild(p);
        }
        // if (currentPage != menuItem.name) {
        //     const a = document.createElement("a");
        //     a.innerText = menuItem.name;
        //     a.setAttribute("href", menuItem.href);
        //     li.appendChild(a);
        // } else {
        //     const a = document.createElement("a");
        //     a.innerText = menuItem.name;
        //     li.setAttribute('class', 'current_page_button');
        //     li.appendChild(a);
        // }
        menu.appendChild(li);
    }

    nav.appendChild(menu);
}

function toggle_open() {
    let new_state = localStorage.getItem('navbar_open_state') === 'open' ? 'closed' : 'open';
    localStorage.setItem('navbar_open_state', new_state);
    //console.log(new_state)
}

//initialise()