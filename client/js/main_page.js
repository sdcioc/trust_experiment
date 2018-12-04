

function main_page_enter() {
    document.getElementById("main_page").hidden = false;
}

function main_page_exit() {
    document.getElementById("main_page").hidden = true;
}

function main_page_start_task(arg) {
    console.log(arg);
}