const formulario = document.querySelector("[data-form]");
const inputs = document.querySelectorAll("[data-input]");
const labels = document.querySelectorAll("[data-label]");
const btn = document.querySelector("[data-btn]");


const expresiones = {
    nombre: /^[a-zA-Z-ZÀ-ÿ\s]{3,40}$/, 
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{4,12}$/,
};

const validarCampos = {
    firstName: false,
    lastName: false,
    email: false,
    password: false
};

const comprobarInput = (e) => {
    switch(e.target.name) {
        case "firstName":
            validarInput(expresiones.nombre, e.target, "firstName");
        break;
        case "lastName": 
            validarInput(expresiones.nombre, e.target, "lastName");
        break;
        case "email":
            validarInput(expresiones.correo, e.target, "email");
        break;
        case "password":
            validarInput(expresiones.password, e.target, "password");
        break;
    }
};

inputs.forEach((input, index) => {
    input.addEventListener("keyup", comprobarInput);
    input.addEventListener("blur", comprobarInput);

    
    input.addEventListener("focus", () => {
        const clickedLabel = labels[index];

        clickedLabel.classList.add("placeholder-active");
    });
    input.addEventListener("blur", () => {
        const clickedLabel = labels[index];

        if(input.value === "") {
            clickedLabel.classList.remove("placeholder-active");
        } else {
            clickedLabel.classList.add("placeholder-active");
        }
        
    });
});

const validarInput = (expresion, input, campo) => {
    if(expresion.test(input.value)) {
        document.querySelector(`#form__${campo} .icon-error`).classList.remove("active");
        document.querySelector(`#form__${campo} .error-message`).classList.remove("active");
        document.querySelector(`#form__${campo} .input`).classList.remove("input-error")
        validarCampos[campo] = true;
    } else {
        document.querySelector(`#form__${campo} .icon-error`).classList.add("active");
        document.querySelector(`#form__${campo} .error-message`).classList.add("active");
        validarCampos[campo] = false;
    }
};

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if(validarCampos.firstName && validarCampos.lastName && validarCampos.email && validarCampos.password) {
        formulario.reset();
        labels.forEach((label) => {
            label.classList.remove("placeholder-active");
        });
        validarCampos.firstName = false;
        validarCampos.lastName = false;
        validarCampos.email = false;
        validarCampos.password = false;
    } else {
        document.querySelectorAll(".icon-error").forEach((icono) => {
            icono.classList.add("active");
        });
        document.querySelectorAll(".error-message").forEach((message) => {
            message.classList.add("active");
        });
        document.querySelectorAll(".input").forEach((input) => {
            input.classList.add("input-error");
        });
        document.querySelectorAll(".placeholder").forEach((place) => {
            place.classList.add("placeholder-active");
        });
    }
})