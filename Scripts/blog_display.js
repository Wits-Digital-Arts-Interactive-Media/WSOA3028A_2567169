const button_names = [
    "The Rise of AI",
    "Design Wireframes and Plans",
    "Semantic Markup and More Plans",
    "IxD and Design",
]

//const root = "/WSOA3028A_2567169";

function initialise_buttons() {
    const button_holder = document.getElementById("button_holder");
    button_names.forEach(function (bName, index) {
        let newButton = document.createElement("button");
        newButton.innerText = bName;
        newButton.addEventListener('click', () => {
                read_entry(`/blogs/Blog ${index + 1}.txt`);
        });
        button_holder.appendChild(newButton);
    });
}

export function initialise() {
    initialise_buttons();
    read_entry(`/blogs/Blog 1.txt`);
}

export function read_entry(filepath) {
    // console.log("called read entry")
    // let output ="";
    // const main = document.querySelector("body > main")
    // const [file] = filepath.files;
    // console.log(file)
    // if (filepath.files && filepath.files[0]) {
    //     console.log(filepath.files[0])
    // }

    fetch (filepath)
        .then(response => response.text())
        .then(text => checker(text))
}

//from the async function, we now have the string from the inputted file path
function checker(file_text) {
    //console.log(`We now have ${file_text}`)
    const main = document.querySelector("body > main");
    const artAnchor = document.createElement("article");
    artAnchor.innerHTML = file_text;
    main.replaceChildren(artAnchor)
}
