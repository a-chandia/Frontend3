$(document).ready(function() {
    $(".datepicker").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '1900:+0'
    });
    
    $("#cancelar").click(function() {
        resetForm();
    });
    
    
    $("#user-form").submit(function(e) {
        e.preventDefault();
        
        
        const isNombreValid = validateNombre();
        const isUsuarioValid = validateUsuario();
        const isFechaValid = validateFecha();
        const isEmailValid = validateEmail();
        const isSitioWebValid = validateSitioWeb();
        
        
        if (isNombreValid && isUsuarioValid && isFechaValid && isEmailValid && isSitioWebValid) {
            
            showSuccessModal();
        }
    });
    
    
    $("#nombre").on("input", validateNombre);
    $("#usuario").on("input", validateUsuario);
    $("#fecha").on("change", validateFecha);
    $("#email").on("input", validateEmail);
    $("#sitio-web").on("input", validateSitioWeb);
});

function resetForm() {
    // Limpiar campos
    $("#user-form")[0].reset();
    
    // Limpiar errores
    $(".error-message").hide();
    $(".form-control").removeClass("error");
}

function validateNombre() {
    const nombre = $("#nombre").val().trim();
    const $error = $("#nombre-error");
    
    if (nombre === "") {
        showError($error, "El nombre es requerido");
        return false;
    }
    
    hideError($error);
    return true;
}

function validateUsuario() {
    const usuario = $("#usuario").val().trim();
    const $error = $("#usuario-error");
    
    if (usuario === "") {
        showError($error, "El usuario es requerido");
        return false;
    }
    
    hideError($error);
    return true;
}

function validateFecha() {
    const fecha = $("#fecha").val().trim();
    const $error = $("#fecha-error");
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    
    if (fecha === "") {
        showError($error, "La fecha es requerida");
        return false;
    }
    
    if (!dateRegex.test(fecha)) {
        showError($error, "Formato inválido (dd/mm/aaaa)");
        return false;
    }
    
    // Validar que la fecha sea real
    const parts = fecha.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        showError($error, "Fecha no válida");
        return false;
    }
    
    hideError($error);
    return true;
}

function validateEmail() {
    const email = $("#email").val().trim();
    const $error = $("#email-error");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === "") {
        showError($error, "El email es requerido");
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showError($error, "Formato de email inválido");
        return false;
    }
    
    hideError($error);
    return true;
}

function validateSitioWeb() {
    const sitioWeb = $("#sitio-web").val().trim();
    const $error = $("#sitio-web-error");
    
    
    if (sitioWeb !== "") {
        try {
            new URL(sitioWeb.startsWith('http') ? sitioWeb : `https://${sitioWeb}`);
        } catch (e) {
            showError($error, "URL inválida");
            return false;
        }
    }
    
    hideError($error);
    return true;
}

function showError($element, message) {
    $element.text(message).show();
    $element.prev(".form-control").addClass("error");
}

function hideError($element) {
    $element.hide();
    $element.prev(".form-control").removeClass("error");
}

function showSuccessModal() {
    $("#success-modal").fadeIn();
    
    
    $(".close-modal, #modal-ok").click(function() {
        $("#success-modal").fadeOut();
        resetForm();
    });
}