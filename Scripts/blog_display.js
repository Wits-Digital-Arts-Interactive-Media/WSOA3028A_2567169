const button_names = [
    "The Rise of AI",
    "Design Wireframes and Plans",
    "Semantic Markup and More Plans",
    "IxD Design",
]

let isOpenArr = [];

const root = "/WSOA3028A_2567169";

function initialise_buttons() {
    const button_holder = document.getElementById("button_holder");
    button_names.forEach(function (bName, index) {
        isOpenArr.push(false);
        let newButton = document.createElement("button");
        newButton.id = `blog_button_${index}`
        newButton.innerText = bName;
        newButton.addEventListener('click', () => {
            read_entry(`${root}/blogs/Blog ${index + 1}.txt`, index);
        });

        newButton.addEventListener('mouseover', () => {
            read_summary(`${root}/blogs/Blog-${index + 1}-Summary.txt`, index);
        });

        newButton.addEventListener('mouseleave', () => {
            clear_text(index);
        });

        button_holder.appendChild(newButton);

        let article_holder = document.createElement("article");
        article_holder.id = `Blog_Holder_${index}`;
        button_holder.appendChild(article_holder);
    });
}

export function initialise() {
    initialise_buttons();
    //read_entry(`${root}/blogs/Blog 1.txt`);
}

function clear_text(index) {
    if (isOpenArr[index]) return;
    const blog_holder = document.getElementById(`Blog_Holder_${index}`);
    blog_holder.innerHTML = "";
}

//async function, executes when it can find the file at the specified filepath
function read_entry(filepath, index) {
    fetch (filepath)
        .then(response => response.text())
        .then(text => checker(text, index))
}

function read_summary(filepath, index) {
    if (isOpenArr[index]) return;
    fetch (filepath)
        .then(response => response.text())
        .then(text => summary_display(text, index))
}

function summary_display(summary_text, index) {
    const blog_holder = document.getElementById(`Blog_Holder_${index}`);
    blog_holder.innerHTML = summary_text;
}
//from the async function, we now have the string from the inputted file path
function checker(file_text, index) {
    //console.log(`We now have ${file_text}`)
    // const main = document.querySelector("body > main");
    // const artAnchor = document.createElement("article");
    // artAnchor.innerHTML = file_text;
    // main.replaceChildren(artAnchor)
    const blog_holder = document.getElementById(`Blog_Holder_${index}`);
    let corresponding_button = document.getElementById(`blog_button_${index}`)
    if (isOpenArr[index]) {
        blog_holder.innerHTML = "";
        corresponding_button.innerText = button_names[index];
    } else {
        blog_holder.innerHTML = file_text;
        corresponding_button.innerText = "Close";
    }
    isOpenArr[index] = !isOpenArr[index];
}
