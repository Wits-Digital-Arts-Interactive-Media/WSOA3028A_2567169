import { is_mobile } from "./mobile_handling.js";

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
];

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
    const button_menu = document.createElement("menu");
    nav_bar.appendChild(button_menu);

    button_names.forEach(function (bName, index) {
        is_open_arr.push(false);
        let new_button = document.createElement("button");
        new_button.id = `blog_button_${index}`;
        new_button.innerText = `${bName}${(index<button_keywords.length)? `\nKeywords:${button_keywords[index]}` : ``}`;

        // Add event listeners for each button after they have been created and appended to the DOM
        // This approach ensures that event listeners are added only after the buttons are available in the DOM,
        // avoiding null reference errors that may occur when trying to access elements before they are created.
        new_button.addEventListener('click', function (e) {
            read_entry(`${root}/blogs/blog-richtexts/Blog ${index + 1}.txt`, index);
        });

        if (!is_mobile_check) {
            new_button.addEventListener('mouseover', function (e) {
                read_summary(`${root}/blogs/blog-summaries/Blog-${index + 1}-Summary.txt`, index);
            });
    
            new_button.addEventListener('mouseleave', function (e) {
                clear_text(index);
            });
        }

        button_holder.appendChild(new_button);

        let article_holder = document.createElement("article");
        article_holder.id = `Blog_Holder_${index}`;
        article_holder.classList.add("h-entry");
        button_holder.appendChild(article_holder);

        let corresponding_nav = document.createElement("li");
        let nav_anchor = document.createElement("a");
        nav_anchor.innerText = `${bName}`;
        nav_anchor.href = `#${article_holder.id}`;
        nav_anchor.rel = "bookmark";
        corresponding_nav.appendChild(nav_anchor);
        button_menu.appendChild(corresponding_nav);
    });
}

function clear_text(index) {
    if (is_open_arr[index]) return;
    //getting current scroll position
    let windowPosition = window.scrollY + 0;

    const blog_holder = document.getElementById(`Blog_Holder_${index}`);
    blog_holder.innerHTML = "";
    //console.log(`Current scroll position is ${window.scrollY}`);
    //Slightly adjusting the scroll position to fix weird positioning bug when content is collapsed
    if (windowPosition !== window.scrollY) 
    {
        //console.log("The position of the scroll changed");
        scrollBy(0, -0.00001);
    }
    //scrollBy(0, -0.00001);
}

//async function, executes when it can find the file at the specified filepath
function read_entry(filepath, index) {
    fetch(filepath)
        .then(response => response.text())
        .then(text => checker(text, index));
}

function read_summary(filepath, index) {
    if (is_open_arr[index]) return;
    fetch(filepath)
        .then(response => response.text())
        .then(text => summary_display(text, index));
}

function summary_display(summary_text, index) {
    const blog_holder = document.getElementById(`Blog_Holder_${index}`);
    blog_holder.innerHTML = summary_text;
    //console.log(`Current scroll position is ${window.scrollY}`);
}

//from the async function, we now have the string from the inputted file path
function checker(file_text, index) {
    //console.log(`We now have ${file_text}`)

    //TODO: Fix issue of mouseover events breaking when the user gets pushed upwards due to a blog being collapsed - DONE
    const blog_holder = document.getElementById(`Blog_Holder_${index}`);
    let corresponding_button = document.getElementById(`blog_button_${index}`);
    if (is_open_arr[index]) {
        //getting current scroll position
        let windowPosition = window.scrollY + 0;

        blog_holder.innerHTML = "";
        corresponding_button.innerText = `${button_names[index]}${(index<button_keywords.length)? `\nKeywords:${button_keywords[index]}` : ``}`;

        //checking if the new scroll position is different from the one before
        if (windowPosition !== window.scrollY) {
        //console.log("The position of the scroll changed");
        //manually doing a small scroll to solve the issue, not sure why this works but it does
        scrollBy(0, -0.00001);
        }
    } else {
        blog_holder.innerHTML = file_text + `<nav style="text-align: center;"><a href = "#Top">Jump to top</a></nav>`;
        corresponding_button.innerText = `Close ${button_names[index]}`;
    }
    is_open_arr[index] = !is_open_arr[index];
}