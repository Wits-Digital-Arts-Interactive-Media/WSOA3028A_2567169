let profile_rich_html =
    `<div class = 'container'>
        <div class = "h-card profile_info">
            <img class="pfp u-photo" src="/WSOA3028A_2567169/portfolio/images/Self_portrait.png" width=100vw alt="A self portrait of Yoav" title="Yoav Lipshitz">
            <div class = "text_info">
                <h1 class = "profile_header">Profile:_</h1>
                <span class="item"><span class="dBlue">Name</span>&nbsp;:&nbsp;<span class="lBlue p-name">Yoav Lipshitz</span></span>
                <a class="item" id = "mailto_link" href="mailto:2567169@students.wits.ac.za"><span class="dBlue u-email">Email</span>&nbsp;:&nbsp;<span class="lBlue">2567169@students.wits.ac.za</span></a>
                <span class="item"><span class="dBlue">Location</span>&nbsp;:&nbsp;<span class="lBlue p-org">University of the Witwatersrand</span></span>
                <span class="item"><span class="dBlue">City</span>&nbsp;:&nbsp;<span class="lBlue p-locality">Johannesburg</span></span>
                <span class="item"><span class="dBlue">Country</span>&nbsp;:&nbsp;<span class="lBlue p-country-name">South Africa</span></span>
            </div>
        </div>
    </div>`;

function inject_profile(location_id) {
    const container = document.getElementById(location_id);
    container.innerHTML = profile_rich_html;

    //Adding a listener to remove the coloring spans on mouse over and put them back when the mouse leaves on the mailto link
    const mailto_link = document.getElementById('mailto_link');
    //console.log(`mailto link is ${mailto_link.tagName}`)
    mailto_link.addEventListener('mouseenter', function (e) {
        remove_spans(mailto_link);
    });
    mailto_link.addEventListener('mouseleave', function (e) {
        add_spans(mailto_link);
    });
}

//Explicitly referencing each part of the link because this is a tailored function, it cannot be used elsewhere
function remove_spans(mailto_link = document.createElement('a')) {
    mailto_link.children[0].className = "";
    mailto_link.children[1].className = "p-name";
}

function add_spans(mailto_link = document.createElement('a')) {
    mailto_link.children[0].className = "dBlue";
    mailto_link.children[1].className = "lBlue p-name";
}

function doDomSetup() {
    inject_profile("profile_holder");
    document.addEventListener('wheel', (e) => fadeElements(e))
}

function fadeElements(e) {
    const profileHolder = document.getElementsByClassName('container')[0];
    //document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight)
    let scrollTop = document.documentElement.clientHeight + window.scrollY;
    console.clear();
    console.log(scrollTop);

    // Check if the user has scrolled down
    if (e.wheelDeltaY > 0) {
        profileHolder.style.opacity = 0.5;
    } else {
        profileHolder.style.opacity = 1;
    }
}

//racer function
if (document.readyState === "loading") {
    // If the document is still loading, add an event listener for DOMContentLoaded
    document.addEventListener("DOMContentLoaded", doDomSetup());
} else {
    // If the document has already loaded, call the function directly
    doDomSetup();
}

//window.onscroll = () => fadeElements();