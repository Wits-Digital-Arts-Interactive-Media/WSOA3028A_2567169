function doDomSetup() {
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

    let previous_height = parseInt(main_container.style.bottom.substring(0, main_container.style.bottom.indexOf('v')));
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
    const icon = document.getElementById('nav_menu_icon');
    if (main_container.style.bottom === '0vh' && parseInt(main_container.style.bottom.substring(0, main_container.style.bottom.indexOf('v'))) > previous_height) {
        icon.classList.add('wiggle_scale');
    } else if (main_container.style.bottom !== '0vh') {
        icon.classList.remove('wiggle_scale');
    }
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