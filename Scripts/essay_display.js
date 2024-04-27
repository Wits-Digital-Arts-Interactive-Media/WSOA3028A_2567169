export function expand_pdf(pdf_path) {
    //<iframe style="width: 1300px; height: 2000px;" src="Essays/Essay 1 UI and UX.pdf"></iframe>
    const articleHolder = document.getElementById("pdf_holder");
    const pdf_frame = document.createElement("iframe");
    pdf_frame.setAttribute('style', "width: 1300px; height: 2000px;")
    pdf_frame.setAttribute('src', pdf_path);
    articleHolder.replaceChildren(pdf_frame);
}