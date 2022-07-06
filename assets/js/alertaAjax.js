const formularios_ajax = document.querySelectorAll(".FormularioAjax");

/*----------  Funcion enviar formularios ajax - Send ajax forms function ----------*/
function enviar_formulario_ajax(e) {
    e.preventDefault();

    let data = new FormData(this);
    let method = this.getAttribute("method");
    let action = this.getAttribute("action");
    let tipo = this.getAttribute("data-form");

    let encabezados = new Headers();

    let config = {
        method: method,
        headers: encabezados,
        mode: 'cors',
        cache: 'no-cache',
        body: data
    };
    fetch(action, config)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            return alertas_ajax(respuesta);
        });

}


/*----------  Funcion listar formularios - List forms function ----------*/
formularios_ajax.forEach(formularios => {
    formularios.addEventListener("submit", enviar_formulario_ajax);
});


/*----------  Funcion mostrar alertas - Show alerts function ----------*/
function alertas_ajax(alerta) {
    if (alerta.Alerta === "simple") {
        Swal.fire({
            title: alerta.Titulo,
            text: alerta.Texto,
            icon: alerta.Icon,
            confirmButtonText: alerta.TxtBtn,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    } else if (alerta.Alerta === "recargar") {
        Swal.fire({
            title: alerta.Titulo,
            text: alerta.Texto,
            icon: alerta.Icon,
            confirmButtonText: alerta.TxtBtn,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        }).then((result) => {
            if (result.value) {
                location.reload();
            }
        });
    } else if (alerta.Alerta === "limpiar") {
        Swal.fire({
            title: alerta.Titulo,
            text: alerta.Texto,
            icon: alerta.Icon,
            confirmButtonText: alerta.TxtBtn,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        }).then((result) => {
            if (result.value) {
                document.querySelector(".FormularioAjax").reset();
                $('#form-user').load('./app/views/content/page/user-list/ #form-user');
                $('#form-user').load('./app/views/content/page/user-update/ #form-user');
                $('#navbar-fixed').load('./app/views/content/include/navbar/ #navbar-fixed');
                document.getElementById("administrador_usuario").value = "";
                document.getElementById("administrador_clave").value = "";
            }
        });
    } else if (alerta.Alerta === "venta") {
        Swal.fire({
            title: alerta.Titulo,
            text: alerta.Texto,
            icon: alerta.Icon,
            confirmButtonText: alerta.TxtBtn
        }).then((result) => {
            if (result.value) {
                document.querySelector('#sale-barcode-input').value = "";
            }
        });
    } else if (alerta.Alerta === "redireccionar") {
        window.location.href = alerta.URL;
    }
}