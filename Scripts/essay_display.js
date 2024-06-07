let is_open_arr = [];

let button_names = [
    'Essay 1: UI and UX',
    'Essay 2: Digital Colonialities',
];

const root = "/WSOA3028A_2567169";

function expand_pdf(pdf_path, article_location, array_check_location) {
    //<iframe style="width: 1300px; height: 2000px;" src="Essays/Essay 1 UI and UX.pdf"></iframe>
    const article_holder = document.getElementById(article_location);
    if (is_open_arr[array_check_location]) {
        article_holder.replaceChildren("")
    } else {
        const pdf_frame = document.createElement("iframe");
        pdf_frame.setAttribute('style', "width: 75vw; height: 80vh;");
        pdf_frame.setAttribute('src', pdf_path);
        article_holder.replaceChildren(pdf_frame);
    }
    is_open_arr[array_check_location] = !is_open_arr[array_check_location];
}

export function initialise() {
    const button_holder = document.getElementById("essay_buttons");
    button_names.forEach(function (bName, index) {
        const new_button = document.createElement("button");
        new_button.classList.add("bordered_entry");
        new_button.classList.add("essay_entry");
        new_button.innerText = bName;
        is_open_arr.push(false)
        //DOMContentLoaded may be called before all buttons have been added, so listeners are registered here instead
        new_button.addEventListener('click', function (e) {
            expand_pdf(`${root}/essays/Essay-${index + 1}.pdf`, `pdf_holder_${index + 1}`, index);
        });

        button_holder.appendChild(new_button);

        const download_button = document.createElement("button");
        //This is bad practice for accessibility
        //const download_anchor = document.createElement("a");
        //download_anchor.href = `${root}/essays/Essay-${index + 1}.pdf`;
        //download_anchor.download = `${bName}_2567169`;
        //download_anchor.innerText = `Download Essay ${index+1}`;
        //download_button.appendChild(download_anchor);
        download_button.innerText = `Download Essay ${index+1}`;
        download_button.classList.add("bordered_entry");
        download_button.classList.add('essay_download_button');
        download_button.addEventListener('click', () => do_download(`${root}/essays/Essay-${index + 1}.pdf`, `${bName}_2567169`))

        const article_with_id = document.createElement("article");
        article_with_id.id = `pdf_holder_${index + 1}`;

        button_holder.appendChild(article_with_id);
        button_holder.appendChild(download_button);
        button_holder.appendChild(document.createElement("br"));
    });

    function do_download(file_path, download_name) {
        //creating a temporary anchor
        const download_anchor = document.createElement("a");
        download_anchor.href = file_path;
        download_anchor.download = download_name;

        //clicking the anchor to do the download
        download_anchor.click();
    }
}