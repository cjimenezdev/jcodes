$(".preloader").fadeOut(1900, function() {
    $(this).remove();
    $("#page").css({ "display": "flex" });
});
const moon_sun = document.querySelector(".moon_sun");
moon_sun.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        //cuando el cuerpo tiene la clase 'dark' actualmente
        moon_sun.querySelector(".moon").classList.add("d-none");
        moon_sun.querySelector(".sun").classList.toggle("d-none");
        localStorage.setItem("dark-mode", "true"); //almacenar estos datos si el modo oscuro está activado
    } else {
        localStorage.setItem("dark-mode", "false"); //almacenar estos datos si el modo oscuro está desactivado
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

//Sidenav//

const menu = document.querySelector(".navbar-toggler");
const toggler = document.querySelector(".btn-toggle");

const sidebarMenu = document.querySelector(".nav-links"),
    sidebarLi = sidebarMenu.querySelectorAll(".links");

menu.addEventListener("click", () => {
    document.querySelector(".sidebar").classList.add("show");
    document.querySelector(".sidebar").classList.remove("hide");
});
toggler.addEventListener("click", () => {
    document.querySelector(".sidebar").classList.add("hide");
    document.querySelector(".sidebar").classList.remove("show");
});

for (var i = 0; i < sidebarLi.length; i++) {
    sidebarLi[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("enable");
        current[0].className = current[0].className.replace("enable", "");
        this.className += " enable";
    });
}

$(document).ready(function() {
    $(".links").on("click", function(e) {
        var currentID = $(this).attr("id");
        sessionStorage.setItem("enable", currentID);
    });

    var activeTab = sessionStorage.getItem("enable");
    if (activeTab != "") {
        $("#" + activeTab).addClass("enable");
    } else {
        $("#" + activeTab).removeClass("enable");
    }
});


/**
 * Función Calendario
 **/

let calendar = document.querySelector('.calendar')

const month_names = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month

    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = { value: currDate.getMonth() }
let curr_year = { value: currDate.getFullYear() }

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}


/**
 * Graficos
 **/

graficos();

function graficos() {

    $.ajax({
        url: "../app/ajax/graficoAjax.php",
        method: "POST",
    }).done(function(respuesta) {
        if (respuesta.length > 0) {
            var periodos = [];
            var tiempos = [];
            var data = JSON.parse(respuesta);
            for (let i = 0; i < data.length; i++) {
                periodos.push(data[i][1]);
                tiempos.push(data[i][10]);
            }
            cargarGrafico(periodos, tiempos, 'pie', 'Usuarios', 'ventas');
        }
    })
}

function cargarGrafico(periodos, tiempos, tipo, encabezado, id) {
    const ctx = document.getElementById(id).getContext("2d");
    const myChart = new Chart(ctx, {
        type: tipo,
        data: {
            labels: periodos,
            datasets: [{
                label: encabezado,
                data: tiempos,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(201, 203, 207)',
                    'rgb(54, 162, 235)'
                ]
            }]
        },
    });
}
