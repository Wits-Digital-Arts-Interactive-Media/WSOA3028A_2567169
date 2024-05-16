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
    document.addEventListener('wheel', (e) => fadeElements(e));
    document.addEventListener('touchstart', (e) => record_start(e));
    document.addEventListener('touchmove', (e) => record_touch_move(e));
}

let start_y = 0;
function record_start(e) {
    start_y = e.touches[0].clientY;
    //console.log(`start value:${start_y}`);
}

let current_y = 0;
let is_swiping_up = false;
function record_touch_move(e) {
    let endY = e.touches[0].clientY;
    let deltaY = start_y - endY;
    let checker_flag = false;
    if (current_y > 0) {
        is_swiping_up = true;
        checker_flag = true;
    } else if (current_y < 0) {
        is_swiping_up = false;
        checker_flag = true;
    }

    if (checker_flag) {
        if (is_swiping_up && current_y-deltaY > 0) {
            start_y = e.touches[0].clientY;
            deltaY = 0;
        }

        if (!is_swiping_up && current_y-deltaY < 0) {
            start_y = e.touches[0].clientY;
            deltaY = 0;
        }
    }
    let inputted_val
    if (deltaY !== 0) {
        inputted_val = deltaY - current_y;
    } else {
        inputted_val = 0;
    }
    current_y = deltaY;
    //console.log(`change value:${inputted_val}`);
    fadeElements({ touch_y: inputted_val }, true)
}

function fadeElements(e, is_touch = false) {
    const sub_container = document.getElementsByClassName('container')[0];
    const main_container = document.getElementById('profile_holder');
    const intros_container = document.getElementById('intros');

    // Check if the user has scrolled down
    // if (e.wheelDeltaY < 0) {
    //     //This container has a style of 'some number'vh, so we must deformat that,
    //     //then add an amount, then reformat it
    //     //main_container.style.bottom += '10vh';
    //     let raw_height = add_view_height(main_container.style.bottom, e.wheelDeltaY*scroll_sensitivity);
    //     let new_element_height = `${raw_height}vh`;
    //     main_container.style.bottom = new_element_height;
    //     //console.log(map(raw_height, -100, 0, 0, 1));
    //     sub_container.style.opacity = map(raw_height, -50, 0, 0, 1);
    //     intros_container.style.opacity = map(raw_height, -100, -50, 1, 0);
    // } else {
    //     //scrolled down
    //     sub_container.style.opacity = 1;
    //     let raw_height = add_view_height(main_container.style.bottom, e.wheelDeltaY*scroll_sensitivity);
    //     let new_element_height = `${raw_height}vh`;
    //     main_container.style.bottom = new_element_height;
    //     //console.log(map(raw_height, -100, 0, 0, 1));
    //     sub_container.style.opacity = map(raw_height, -50, 0, 0, 1);
    //     intros_container.style.opacity = map(raw_height, -100, -50, 1, 0);
    // }
    let move_amount = 0
    let scroll_sensitivity = 0.1;
    let touch_scroll_sensitivity = 0.1;
    if (!is_touch) {
        move_amount = -e.wheelDeltaY * scroll_sensitivity;
    } else {
        move_amount = e.touch_y * touch_scroll_sensitivity;
        console.log(`moving by ${move_amount}`)
    }
    let raw_height = add_view_height(main_container.style.bottom, move_amount);
    let new_element_height = `${raw_height}vh`;
    main_container.style.bottom = new_element_height;
    //console.log(map(raw_height, -100, 0, 0, 1));
    sub_container.style.opacity = map(raw_height, -50, 0, 0, 1);
    intros_container.style.opacity = map(raw_height, -100, -50, 1, 0);
}

//https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function map(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function add_view_height(current_amount = "", add_amount = 0, upper_limit = 0, lower_limit = -100) {
    let no_vh = parseInt(current_amount.substring(0, current_amount.indexOf('v')));
    let return_val = no_vh + add_amount;
    if (return_val > upper_limit) {
        return_val = upper_limit;
    } else if (return_val < lower_limit) {
        return_val = lower_limit
    }
    return return_val;
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