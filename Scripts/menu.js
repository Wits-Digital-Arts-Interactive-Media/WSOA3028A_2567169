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
    const title = document.querySelector("header > h1");
    // Title styling here in the future
    const title_anchor = document.createElement("a");
    title_anchor.innerText = "2024 WSOA3028A";
    title_anchor.setAttribute("id", "Top");

    title.appendChild(title_anchor);
    const nav = document.querySelector("header > nav");
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

//initialise()