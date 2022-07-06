var state = false;
var document,
    $,
    localStorage,
    modal = document.getElementById("staticBackdrop1"),
    user_pass_1 = document.getElementById("password"),
    user_pass_2 = document.getElementById("user_pass_2"),
    conte_form = document.getElementById("content-form"),
    btn_modal = document.getElementById("forgot-btn"),
    btn_close = document.getElementById("btn-close"),
    error = document.getElementById("error_msg"),
    msg_error = document.getElementById("msg_login");
/**
 * Función que se ejecuta una vez cargada la página *
 **/
$(window).load(function() {
    $("#pre-login").fadeOut(1900, function() {
        $(this).remove();
        $("#login").css({ "display": "flex" });
    });
});
/**
 * Función que se ejecuta autocompletado *
 **/
$("#name").disableAutoFill();
/**
 * Función que se ejecuta dark-mode *
 **/
const moon_sun = document.querySelector(".moon_sun");
moon_sun.addEventListener("click", function() {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        //cuando el cuerpo tiene la clase 'dark' actualmente
        moon_sun.querySelector(".moon").classList.add("d-none");
        moon_sun.querySelector(".sun").classList.toggle("d-none");
        localStorage.setItem("dark-mode", "true");
    } else {
        localStorage.setItem("dark-mode", "false");
        moon_sun.querySelector(".sun").classList.add("d-none");
        moon_sun.querySelector(".moon").classList.toggle("d-none");
    }
});

if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark");
    moon_sun.querySelector(".sun").classList.toggle("d-none");
    moon_sun.querySelector(".moon").classList.toggle("d-none");
} else {
    document.body.classList.remove("dark");
}
/**
 * Función que se ejecuta showPassword *
 **/

function toggle() {
    if (state) {
        document.getElementById("password").setAttribute("type", "password");
        document.getElementById("eye").style.color = "#7a797e";
        state = false;
    } else {
        document.getElementById("password").setAttribute("type", "text");
        document.getElementById("eye").style.color = "#5887ef";
        state = true;
    }
}

function toggle_pass() {
    if (state) {
        document.getElementById("user_pass_2").setAttribute("type", "password");
        document.getElementById("eyes").style.color = "#7a797e";
        state = false;
    } else {
        document.getElementById("user_pass_2").setAttribute("type", "text");
        document.getElementById("eyes").style.color = "#5887ef";
        state = true;
    }
}

btn_modal.addEventListener("click", function() {
    if (user_pass_1.value !== "" || user_pass_2.value !== "") {

        if (user_pass_1.value === user_pass_2.value) {
            modal.style.opacity = 1;
            modal.classList.toggle("d-none");
            btn_close.classList.toggle("d-none");
            conte_form.style.opacity = 0;
        }
    } else {
        error.style.display = "flex";
        msg_error.innerText = "Campos obligatorios vacíos";
    }
    if (user_pass_1.value !== user_pass_2.value) {
        error.style.display = "flex";
        msg_error.innerText = "Las contraseñas no coinciden";
    }
});

btn_close.addEventListener("click", function() {
    modal.style.opacity = 0;
    modal.classList.toggle("d-none");
    btn_close.classList.toggle("d-none");
    conte_form.style.opacity = 1;
});