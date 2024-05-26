import { is_mobile } from "./mobile_handling.js";

//svg code from https://www.svgrepo.com/svg/34350/left-arrow
function create_arrow_icon(rotation = 0) {
    const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgIcon.setAttribute('fill', '#f0ead6');
    svgIcon.setAttribute('viewBox', '0 0 330.002 330.002');
    svgIcon.setAttribute('transform', `rotate(${rotation})`);
    svgIcon.classList.add('dropdown_arrow');
    svgIcon.innerHTML = `
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier"> 
    <path id="XMLID_24_" d="M229.966,0.847c-6.011-2.109-12.698-0.19-16.678,4.784L93.288,155.635 c-4.382,5.478-4.382,13.263,0.001,18.741l120,149.996c2.902,3.628,7.245,5.63,11.716,5.63c1.658,0,3.336-0.276,4.962-0.847 c6.012-2.108,10.035-7.784,10.035-14.154v-300C240.001,8.63,235.978,2.955,229.966,0.847z M210.001,272.24l-85.79-107.235 l85.79-107.241V272.24z">
    </path> </g>`;
    return svgIcon;
}

//const holder so mobile checker method is only called once
const is_mobile_check = is_mobile(navigator.userAgent || navigator.vendor || window.opera);

//Global scope for access from multiple functions
const button_names = [
    "Blog 1: The Rise of AI",
    "Blog 2: Design Wireframes and Plans",
    "Blog 3: Semantic Markup and More Plans",
    "Blog 4: IxD Design",
    "Blog 5: Sites for UI and UX analysis",
    "Blog 6: Racial Justice, Gender Equality, and the Internet",
    "Blog 7: Web Dev as a South African",
    "Blog 8: A Close Reading on a Feminist Internet",
    "Blog 9: Colonialism and Modernity: How can they be reconciled?",
    "Blog 10: Digital Colonialities",
    "Blog 11: CSS Integration",
    "Blog 12: Proper Distance: Why is it Important?",
];

const button_keywords = [
    'AI, Turing Test, Twitter',
    'Design, Art, Wireframes',
    'Semantic Markup, Website Design, html5',
    'IxD, Design, Semantic Markup',
    'UI, UX, IxD, Design Analysis',
    'Social Justice, Internet Access, Systemic Bias, AI',
    'Internet Access, Systemic Bias, Human Rights',
    'Feminism, Gender equality, Social justice, Social media',
    'Decoloniality, Social Justice',
    'Discrimination, AGR',
    'CSS, Responsive Design, Accessibility',
    'Twitter, Leftism'
];

let richtexts_arr = [];

let is_open_arr = [];

//right now only redirects, but can have other functionality added later
export function initialise() {
    initialise_buttons();
    //read_entry(`${root}/blogs/Blog 1.txt`);
}

function initialise_buttons() {
    const root = "/WSOA3028A_2567169";
    //required to have an element with this ID
    const button_holder = document.getElementById("button_holder");

    const nav_bar = document.getElementById('blog_jumper');

    //Jump to top link
    const top_anchor = document.createElement('a');
    top_anchor.innerText = `Top`;
    top_anchor.href = `#top`;
    top_anchor.rel = "bookmark";
    top_anchor.classList.add('top_bookmark')
    nav_bar.appendChild(top_anchor);

    const button_menu = document.createElement("menu");
    nav_bar.appendChild(button_menu);

    const close_all_button = document.createElement("button");
    close_all_button.innerText = "Close all";
    close_all_button.classList.add("bordered_entry");
    close_all_button.id = "close_all_button";
    close_all_button.addEventListener('click', () => close_all());
    button_holder.appendChild(close_all_button);

    button_names.forEach(function (bName, index) {
        is_open_arr.push(false);
        let new_button = document.createElement("button");
        new_button.id = `blog_button_${index}`;
        new_button.classList.add("bordered_entry");
        new_button.classList.add('seperated_entry');
        new_button.classList.add('entry_button');
        //new_button.innerHTML = `<span class='green floated_text'>${bName}</span>${(index < button_keywords.length) ? `<br><span class='darkBlue floated_text'>Keywords:</span> <span class='lightBlue'>${button_keywords[index]}</span>` : ``}`;

        new_button.appendChild(create_arrow_icon(0));
        const title_text = document.createElement('span');
        title_text.classList.add('green', 'floated_text');
        title_text.innerText = bName;
        new_button.appendChild(title_text);
        new_button.appendChild(document.createElement('br'));

        if (index < button_keywords.length) {
            const keyword_text = document.createElement('span');
            keyword_text.classList.add('darkBlue', 'floated_text');
            keyword_text.innerText = 'Keywords:';
            const lighter_keywords = document.createElement('span');
            lighter_keywords.classList.add('lightBlue', 'floated_text');
            lighter_keywords.innerText = `${button_keywords[index]}`;
            new_button.appendChild(keyword_text);
            new_button.appendChild(lighter_keywords);
        }

        populate_summary(`${root}/blogs/blog-summaries/Blog-${index + 1}-Summary.txt`);

        // Add event listeners for each button after they have been created and appended to the DOM
        // This approach ensures that event listeners are added only after the buttons are available in the DOM,
        // avoiding null reference errors that may occur when trying to access elements before they are created.
        new_button.addEventListener('click', function (e) {
            read_entry(`${root}/blogs/blog-richtexts/Blog ${index + 1}.txt`, index);
        });

        if (!is_mobile_check) {
            new_button.addEventListener('mouseenter', function (e) {
                read_summary(index);
                //console.log(`Current scroll position is ${window.scrollY}`);
            });

            new_button.addEventListener('mouseleave', function (e) {
                clear_text(index);
            });
        }

        button_holder.appendChild(new_button);

        let article_holder = document.createElement("article");
        article_holder.id = `Blog_Holder_${index}`;
        article_holder.classList.add("h-entry");
        article_holder.classList.add('seperated_entry');
        button_holder.appendChild(article_holder);

        let corresponding_nav = document.createElement("li");
        /*let nav_anchor = document.createElement("a");
        nav_anchor.innerText = `${bName.substring(0, bName.indexOf(':'))}`;
        nav_anchor.href = `#${article_holder.id}`;
        nav_anchor.rel = "bookmark";
        corresponding_nav.appendChild(nav_anchor);*/
        corresponding_nav.innerText = `${bName.substring(0, bName.indexOf(':'))}`;
        corresponding_nav.addEventListener('click', () => jump_to_bookmark(article_holder.id));
        button_menu.appendChild(corresponding_nav);
    });
}

function jump_to_bookmark(holder_id) {
    const nav_anchor = document.createElement("a");
    nav_anchor.href = `#${holder_id}`;
    nav_anchor.rel = "bookmark";

    nav_anchor.click();
}

function clear_text(index) {
    if (is_open_arr[index]) return;
    //getting current scroll position
    let windowPosition = window.scrollY + 0;
    //console.log(`Current scroll position is ${window.scrollY}`);

    const blog_holder = document.getElementById(`Blog_Holder_${index}`);
    blog_holder.innerHTML = "";
    blog_holder.classList.remove("bordered_entry");
    blog_holder.classList.remove("sub_entry");
    //console.log(`New scroll position is ${window.scrollY}`);
    //Slightly adjusting the scroll position to fix weird positioning bug when content is collapsed
    if (windowPosition !== window.scrollY) {
        //console.log("The position of the scroll changed (summary collapse)");
        scrollBy(0, -0.00001);
    }
}

function close_all() {
    //console.log("Closing all blogs");
    is_open_arr.forEach(function (is_open, index) {
        if (is_open) {
            checker("", index);
        }
    });
}

//async function, executes when it can find the file at the specified filepath
function read_entry(filepath, index) {
    fetch(filepath)
        .then(response => response.text())
        .then(text => checker(text, index));
}

function populate_summary(filepath) {
    fetch(filepath)
        .then(response => response.text())
        .then(text => push_text(text));
}

function push_text(text) {
    richtexts_arr.push(text);
}

//Overhauled to pre-load summaries for embedding
function read_summary(index) {
    if (is_open_arr[index]) return;
    const blog_holder = document.getElementById(`Blog_Holder_${index}`);
    blog_holder.innerHTML = richtexts_arr[index];
    blog_holder.classList.add("bordered_entry")
    blog_holder.classList.add("sub_entry")
}

//from the async function, we now have the string from the inputted file path
function checker(file_text, index) {
    //console.log(`We now have ${file_text}`)

    //TODO: Fix issue of mouseover events breaking when the user gets pushed upwards due to a blog being collapsed - DONE
    const blog_holder = document.getElementById(`Blog_Holder_${index}`);
    const corresponding_button = document.getElementById(`blog_button_${index}`);
    const dropdown_svg = corresponding_button.getElementsByClassName('dropdown_arrow')[0];
    if (is_open_arr[index]) {
        blog_holder.innerHTML = "";
        //corresponding_button.innerText = `${button_names[index]}${(index < button_keywords.length) ? `\nKeywords: ${button_keywords[index]}` : ``}`;
        //corresponding_button.innerHTML = `<span class='green floated_text'>${button_names[index]}</span>${(index < button_keywords.length) ? `<br><span class='darkBlue floated_text'>Keywords:</span> <span class='lightBlue'>${button_keywords[index]}</span>` : ``}`;
        blog_holder.classList.remove("bordered_entry");
        blog_holder.classList.remove("sub_entry");
        dropdown_svg.setAttribute('transform', 'rotate(0)');
    } else {
        blog_holder.innerHTML = file_text// + `<nav style="text-align: center;"><a href = "#Top">Jump to top</a></nav>`;
        //corresponding_button.innerHTML = `<span class='purple'>Close ${button_names[index]}</span>`;
        blog_holder.classList.add("bordered_entry");
        blog_holder.classList.add("sub_entry");
        dropdown_svg.setAttribute('transform', 'rotate(-90)');
    }
    is_open_arr[index] = !is_open_arr[index];
}

//THIS IS A PERFECT EXAMPLE OF THE SUNK COST FALLACY

// function resize_buttons() {
//     button_names.forEach(function (name, index) {
//         let temp_button = document.getElementById(`blog_button_${index}`);
//         console.log(temp_button.offsetWidth);
//         temp_button.style.paddingRight = `${71.5 - px_to_vw(temp_button.offsetWidth)}vw`;
//     });
// }

// function px_to_vw(pixel_amount) {
//     return 100 * pixel_amount / document.documentElement.clientWidth;
// }

//racer function
if (document.readyState === "loading") {
    // If the document is still loading, add an event listener for DOMContentLoaded
    document.addEventListener("DOMContentLoaded", doDomSetup());
} else {
    // If the document has already loaded, call the function directly
    doDomSetup();
}

function doDomSetup() {
    //When the page was at the very bottom, sometimes content would be loaded and push everything upwards, this is a workaround
    window.onscroll = function () {
        if (document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight)) {
            //console.log("test")
            scrollBy(0, -1);
        }
    }
}

//window.onload = resize_buttons;