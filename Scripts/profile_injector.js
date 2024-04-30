let profile_rich_html =
    `<h1>Profile</h1>
    <p class = "h-card">
        <img class="u-photo" src="/WSOA3028A_2567169/portfolio/images/Self_portrait.png" alt="A self portrait of Yoav" title="Yoav Lipshitz"><br>
        <span class="p-name">Yoav Lipshitz</span><br>
        <a class="u-email" href="mailto:2567169@students.wits.ac.za">2567169@students.wits.ac.za</a><br>
        <span class="p-org">University of the Witwatersrand</span><br>
        <span class="p-locality">Johannesburg</span><br>
        <span class="p-country-name">South Africa</span>
    </p>`;

function inject_profile(location_id) {
    const container = document.getElementById(location_id);
    container.innerHTML = profile_rich_html;
}

//racer function
if (document.readyState === "loading") {
    // If the document is still loading, add an event listener for DOMContentLoaded
    document.addEventListener("DOMContentLoaded", inject_profile("profile_holder"));
} else {
    // If the document has already loaded, call the function directly
    inject_profile("profile_holder");
}