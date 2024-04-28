export function expand_pdf(pdf_path) {
    //<iframe style="width: 1300px; height: 2000px;" src="Essays/Essay 1 UI and UX.pdf"></iframe>
    const articleHolder = document.getElementById("pdf_holder");
    const pdf_frame = document.createElement("iframe");
    pdf_frame.setAttribute('style', "width: 1300px; height: 2000px;")
    pdf_frame.setAttribute('src', pdf_path);
    articleHolder.replaceChildren(pdf_frame);
}

let button_names = [
    'Essay 1: UI and UX',
]

export function initialise() {
    const button_holder = document.getElementById("buttons");
    button_names.forEach(function (bName, index) {
        let newButton = document.createElement("button");
        newButton.innerText = bName;
        newButton.addEventListener('click', () => {
            expand_pdf(`/essays/Essay ${index+1}.pdf`);
        })
        button_holder.appendChild(newButton);
    })
}

// const button_holder = document.getElementById("button_holder");
//     button_names.forEach(function (bName, index) {
//         let newButton = document.createElement("button");
//         newButton.innerText = bName;
//         newButton.addEventListener('click', () => {
//                 read_entry(`/Blogs/Blog ${index + 1}.txt`);
//         });
//         button_holder.appendChild(newButton);
//     });