let profile_rich_html =
    `<div class = 'container'>
    <h1 class = "profile_header">Profile:_</h1>
    <p class = "h-card">
        <img class="pfp u-photo" src="/WSOA3028A_2567169/portfolio/images/Self_portrait.png" alt="A self portrait of Yoav" title="Yoav Lipshitz">
        <span class="item"><span class="dBlue">Name</span> : <span class="lBlue p-name">Yoav Lipshitz</span></span>
        <a class="item" href="mailto:2567169@students.wits.ac.za"><span class="dBlue u-email">Email</span> : <span class="lBlue">2567169@students.wits.ac.za</span></a>
        <span class="item"><span class="dBlue">Location</span> : <span class="lBlue p-org">University of the Witwatersrand</span></span>
        <span class="item"><span class="dBlue">City</span> : <span class="lBlue p-locality">Johannesburg</span></span>
        <span class="item"><span class="dBlue">Country</span> : <span class="lBlue p-country-name">South Africa</span></span>
    </p>
    </div>`;

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