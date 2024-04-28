let profile_rich_html = [
    `<h1>Profile</h1>`,
    `<p class = "h-card">
        <img class="u-photo" src="/WSOA3028A_2567169/portfolio/images/Self_portrait.png" alt="A self portrait of Yoav" title="Yoav Lipshitz"><br>
        <span class="p-name">Yoav Lipshitz</span><br>
        <a class="u-email" href="mailto:2567169@students.wits.ac.za">2567169@students.wits.ac.za</a><br>
        <span class="p-org">University of the Witwatersrand</span><br>
        <span class="p-locality">Johannesburg</span><br>
        <span class="p-country-name">South Africa</span>
    </p>`,
];

export function inject_profile(location_id) {
    const container = document.getElementById(location_id);
    let literal = "";
    profile_rich_html.forEach(element => {
        literal += element;
    })
    container.innerHTML = literal;
}