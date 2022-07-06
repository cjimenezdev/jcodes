/**
 * Función vista previa imagen
 */
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input"),
    dropView = dropArea.querySelector(".preview");
let file;
button.onclick = () => {
    input.click();
};
input.addEventListener("change", function() {
    file = this.files[0];
    dropArea.classList.add("active");
    showFile();
});

dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0];
    showFile();
    validarImagen(obj);
});

function showFile() {
    let fileType = file.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            let imgTag = `<img src="${fileURL}" alt="image">`;
            dropView.innerHTML = imgTag;
        };
        fileReader.readAsDataURL(file);
    } else {
        Swal.fire({
            text: "Formato de la imagen inválido",
            icon: 'warning',
            showCancelButton: false,
            showDenyButton: false,
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: "Aceptar"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(action, config)
                    .then(respuesta => respuesta.json())
                    .then(respuesta => {
                        return alertas_ajax(respuesta);
                    });

            }
        });
        dropArea.classList.remove("active");
    }
}

function validarImagen(obj) {
    var uploadFile = obj.files[0];

    if (!window.FileReader) {
        alert('El navegador no soporta la lectura de archivos');
        return;
    }

    if (!(/\.(jpg|png|gif)$/i).test(uploadFile.name)) {
        alert('El archivo a adjuntar no es una imagen');
    } else {
        var img = new Image();
        img.onload = function() {
            if (this.width.toFixed(0) != 200 && this.height.toFixed(0) != 200) {
                alert('Las medidas deben ser: 200 * 200');
            } else if (uploadFile.size > 20000) {
                alert('El peso de la imagen no puede exceder los 200kb')
            } else {
                alert('Imagen correcta :)')
            }
        };
        img.src = URL.createObjectURL(uploadFile);
    }
}


/**
 * Mostrar sub-sidebar*
 **/

const nav_profile = document.querySelector(".show-profile");
const btn_profile = document.querySelector(".hide-profile");

nav_profile.addEventListener("click", () => {
    document.querySelector(".nav-profile").classList.add("show");
    document.querySelector(".nav-profile").classList.remove("hide");
    document.querySelector(".mask").classList.remove("hide");
    document.querySelector(".mask").classList.add("show");
});
btn_profile.addEventListener("click", () => {
    document.querySelector(".nav-profile").classList.add("hide");
    document.querySelector(".nav-profile").classList.remove("show");
    document.querySelector(".mask").classList.add("hide");
    document.querySelector(".mask").classList.remove("show");
});