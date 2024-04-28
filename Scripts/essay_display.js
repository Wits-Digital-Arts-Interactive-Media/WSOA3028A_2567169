let isOpenArr = [];

export function expand_pdf(pdf_path, article_location, array_check_location) {
    //<iframe style="width: 1300px; height: 2000px;" src="Essays/Essay 1 UI and UX.pdf"></iframe>
    const articleHolder = document.getElementById(article_location);
    if (isOpenArr[array_check_location]) {
        articleHolder.replaceChildren("")
    } else {
        const pdf_frame = document.createElement("iframe");
        pdf_frame.setAttribute('style', "width: 1300px; height: 2000px;")
        pdf_frame.setAttribute('src', pdf_path);
        articleHolder.replaceChildren(pdf_frame);
    }
    isOpenArr[array_check_location] = !isOpenArr[array_check_location];
}

let button_names = [
    'Essay 1: UI and UX',
    'Tiling Tester',
]

const root = "/WSOA3028A_2567169";

export function initialise() {
    const button_holder = document.getElementById("buttons");
    button_names.forEach(function (bName, index) {
        let newButton = document.createElement("button");
        newButton.innerText = bName;
        isOpenArr.push(false)
        newButton.addEventListener('click', () => {
            expand_pdf(`${root}/essays/Essay-${index+1}.pdf`, `pdf_holder_${index+1}`, index);
        })

        button_holder.appendChild(newButton);
        let expand_button = document.createElement("button");
        expand_button.innerHTML = `<a href="${root}/essays/Essay-${index+1}.pdf" download>Download Essay ${index+1}</a>`;

        let article_with_id = document.createElement("article");
        article_with_id.id = `pdf_holder_${index+1}`;

        button_holder.appendChild(expand_button);
        button_holder.appendChild(document.createElement("br"));
        button_holder.appendChild(article_with_id);
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