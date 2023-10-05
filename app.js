let botonCliente = document.getElementById('boton-cliente');
let botonTarjeta = document.getElementById('boton-tarjeta');

function cargarDatos(){
    /* Carga los datos de index.html */
    document.getElementById('nombre').value = persona.nombre;
    document.getElementById('apellido1').value = persona.apellido1;
    document.getElementById('apellido2').value = persona.apellido2;
    document.getElementById('nacionalidad').value = persona.nacionalidad;

    /* Carga el menú */
    let menu = document.getElementById('menu').innerHTML;
}

function cargarCabecera(dest){  
 document.getElementById(dest).innerHTML = '   <h1>BancoPuertollano</h1>    <ul>        <li><a href="index.html">Inicio</a></li>        <li><a href="infoCuenta.html">Informaci&#243;n Cuenta</a></li>             <li><a href="tarjetas.html">Tarjetas</a></li>    </ul>' 
}

// OBJETOS ---------------------------

let persona = {
    'nombre': 'Elena',
    'apellido1': 'Rodríguez',
    'apellido2': 'Calderón',
    'nacionalidad': 'Española'
};

let tarjetas = [
    {
        'numero': '1234 12345 123456',
        'cvv': '123',
        'activa': true,
    },
    {
        'numero': '1234 12345 123457',
        'cvv': '321',
        'activa': false,
    },
];

// LISTENERS --------------------------

botonCliente.addEventListener('click', function() {
    modificarDatos(validarDatos());
});

/* botonTarjeta.addEventListener('click', function() {
    guardarTarjeta();
}); */

// FUNCIONES ----------------------------

function modificarDatos(datos) {

    if (datos) {
        persona.nombre = datos.nombre;
        persona.apellido1 = datos.apellido1;
        persona.apellido2 = datos.apellido2;
        persona.nacionalidad = datos.nacionalidad;
    }
}

function guardarTarjeta() {

    let nuevaTarjeta = {
        'numero':document.getElementById('numero').value,
        'cvv': document.getElementById('cvv').value,
        'activa': document.getElementById('activa').checked,
    };

    tarjetas.push(nuevaTarjeta);
}

// VALIDACIONES -----------------------------

function validarDatos() {
    let patronNyA = /^[a-zA-Zá-úÁ-Ú\s]{3,20}$/;
    let patronNacionalidad = /^[a-zA-Zá-úÁ-Ú\s]{3,15}$/;
    let mensaje = "";

    let datosNuevos = {
        'nombre': document.getElementById('nombre').value.trim(),
        'apellido1': document.getElementById('apellido1').value.trim(),
        'apellido2': document.getElementById('apellido2').value.trim(),
        'nacionalidad': document.getElementById('nacionalidad').value.trim()
    };

    for (let dato in datosNuevos) {
        if (dato != 'nacionalidad') {
            if(!patronNyA.test(datosNuevos[dato])) {
                mensaje += datosNuevos[dato] + " debe tener entre 3 y 20 caracteres. \n";
            }
        } else {
            if(!patronNacionalidad.test(datosNuevos[dato])) {
                mensaje += datosNuevos[dato] + " debe tener entre 3 y 15 caracteres. \n";
            }
        }
    }

    if (mensaje === "") {
            return datosNuevos;
    } else {
            return false;
    }

}