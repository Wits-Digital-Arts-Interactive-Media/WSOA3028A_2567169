let is_open_arr = [];

let button_names = [
    'Essay 1: UI and UX',
    'Essay 2: Untitled',
    'Tiling Tester',
];

const root = "/WSOA3028A_2567169";

function expand_pdf(pdf_path, article_location, array_check_location) {
    //<iframe style="width: 1300px; height: 2000px;" src="Essays/Essay 1 UI and UX.pdf"></iframe>
    const article_holder = document.getElementById(article_location);
    if (is_open_arr[array_check_location]) {
        article_holder.replaceChildren("")
    } else {
        const pdf_frame = document.createElement("iframe");
        pdf_frame.setAttribute('style', "width: 100%; height: 80vh;")
        pdf_frame.setAttribute('src', pdf_path);
        article_holder.replaceChildren(pdf_frame);
    }
    is_open_arr[array_check_location] = !is_open_arr[array_check_location];
}

export function initialise() {
    const button_holder = document.getElementById("buttons");
    button_names.forEach(function (bName, index) {
        const new_button = document.createElement("button");
        new_button.classList.add("bordered_entry");
        new_button.innerText = bName;
        is_open_arr.push(false)
        //DOMContentLoaded may be called before all buttons have been added, so listeners are registered here instead
        new_button.addEventListener('click', function (e) {
            expand_pdf(`${root}/essays/Essay-${index + 1}.pdf`, `pdf_holder_${index + 1}`, index);
        });

        button_holder.appendChild(new_button);

        //FOR ASSIGNMENT SUBMISSION, QUESTION: for the future, is this button needed? There is a download button in some viewers but I'm not sure if it's global
        const download_button = document.createElement("button");
        const download_anchor = document.createElement("a");
        download_anchor.href = `${root}/essays/Essay-${index + 1}.pdf`;
        download_anchor.download = `${bName}_2567169`;
        download_anchor.innerText = `Download Essay ${index+1}`;
        download_button.appendChild(download_anchor);
        //download_button.innerHTML = `<a href="${root}/essays/Essay-${index + 1}.pdf" download>Download Essay ${index + 1}</a>`;
        download_button.classList.add("bordered_entry");

        const article_with_id = document.createElement("article");
        article_with_id.id = `pdf_holder_${index + 1}`;

        button_holder.appendChild(download_button);
        button_holder.appendChild(document.createElement("br"));
        button_holder.appendChild(article_with_id);
    });
}