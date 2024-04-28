/*<li>Home</li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="essays.html">Essays</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href="design.html">Design</a></li>*/
//todo Place the rest of the menu items

// const root = "/WSOA3028A_2567169";

// const menuItems = [
//     { name: "Home", href: `${root}/index.html` },
//     { name: "Blog", href: `${root}/blogs/index.html` },
//     { name: "Essays", href: `${root}/essays/index.html` },
//     { name: "Portfolio", href: `${root}/portfolio/index.html` },
//     { name: "Design", href: `${root}/design/index.html` }
// ]

// export function initialise(currentPage = "") {
//     if (!(typeof currentPage === 'string' || currentPage instanceof String)) return;
//     const title = document.querySelector("header > h1")
//     // Title styling here in the future
//     const titleAnchor = document.createElement("a")
//     titleAnchor.innerText = "2024 WSOA3028A"
//     titleAnchor.setAttribute("id", "Top")

//     title.appendChild(titleAnchor)
//     const nav = document.querySelector("header > nav")
//     const ul = document.createElement("ul")

//     //populating list of pages with entries from menuItems array
//     for (let menuItem of menuItems) {
//         const li = document.createElement("li")
//         if (currentPage != menuItem.name) {
//             const a = document.createElement("a")
//             a.innerText = menuItem.name
//             a.setAttribute("href", menuItem.href)
//             li.appendChild(a)
//         } else {
//             const a = document.createElement("a")
//             a.innerText = menuItem.name
//             li.appendChild(a)
//         }
//         ul.appendChild(li)
//     }

//     nav.appendChild(ul)
// }

//initialise()

const root = "/WSOA3028A_2024"

const menuItems = [
    { name: "Home", href: root + "/index.html" },
    //Type Coercion - it is taking a const, adding it to a string and making it the string it expects
    { name: "Blog", href: `${root}/blogs/index.html` },
    //back-tick syntax (template strings) `...` - allows the use of whitespace, ", ', interpolation, and substitution
    //allows for string interpolation ${ } - automatically replaces variables and expressions with real values
    { name: "Essays", href: `${root}/essays/index.html` },
    { name: "Portfolio", href: `${root}/portfolio/index.html` },
    { name: "Design", href: `${root}/design/index.html` },
]
export function initialise(currentPage) {
    const nav = document.querySelector("header > nav")
    const ul = document.createElement("ul")
    for (let menuItem of menuItems) {
        const li = document.createElement("li")
        if (currentPage != menuItem.name) {
            const a = document.createElement("a")
            a.innerText = menuItem.name
            a.setAttribute("href", menuItem.href)
            li.appendChild(a)
        } else { li.innerText = menuItem.name }
        ul.appendChild(li)
    }
    nav.appendChild(ul)
}
