let botonCliente = document.getElementById('boton-cliente');
let botonTarjeta = document.getElementById('boton-tarjeta');
let parrafoCliente = document.getElementById('mensaje-cliente');

function cargarDatos() {
    /* Carga los datos de index.html */
    document.getElementById('nombre').value = persona.nombre;
    document.getElementById('apellido1').value = persona.apellido1;
    document.getElementById('apellido2').value = persona.apellido2;
    document.getElementById('nacionalidad').value = persona.nacionalidad;

    /* Carga el menú */
    let menu = document.getElementById('menu').innerHTML;
}

function cargarCabecera(dest) {
    document.getElementById(dest).innerHTML =
        '   <h1>BancoPuertollano</h1>    <ul>        <li><a href="index.html">Inicio</a></li>        <li><a href="infoCuenta.html">Informaci&#243;n Cuenta</a></li>             <li><a href="tarjetas.html">Tarjetas</a></li>    </ul>';
}

// OBJETOS ---------------------------

let persona = {
    nombre: 'Elena',
    apellido1: 'Rodríguez',
    apellido2: 'Calderón',
    nacionalidad: 'Española',
};

let tarjetas = [
    {
        numero: '1234 12345 123456',
        cvv: '123',
        activa: true,
    },
    {
        numero: '1234 12345 123457',
        cvv: '321',
        activa: false,
    },
];

crearTabla();

// LISTENERS --------------------------

botonCliente.addEventListener('click', function () {
    modificarDatos(validarDatos());
});

botonTarjeta.addEventListener('click', function () {
    guardarTarjeta(validarTarjeta());
    crearTabla();
});

// FUNCIONES ----------------------------

function modificarDatos(datos) {
    if (datos) {
        persona.nombre = datos['Nombre'];
        persona.apellido1 = datos['Primer apellido'];
        persona.apellido2 = datos['Segundo apellido'];
        persona.nacionalidad = datos['Nacionalidad'];

        parrafoCliente.innerText = 'Datos guardados correctamente.';
        parrafoCliente.setAttribute('class', 'correcto');
    }
}

function guardarTarjeta(tarjeta) {
    if (tarjeta) {
        tarjetas.push(tarjeta);
    }
}

function crearTabla() {
    let tabla = document.getElementById('tabla');
    tabla.innerHTML = '';

    for (let tarjeta of tarjetas) {
        let tr = document.createElement('tr');
        for (let dato in tarjeta) {
            let td = document.createElement('td');
            td.textContent = tarjeta[dato];
            tr.appendChild(td);
        }
        tabla.appendChild(tr);
    }
}

// VALIDACIONES -----------------------------

function validarDatos() {
    let patronNyA = /^[a-zA-Zá-úÁ-Ú\s]{3,20}$/;
    let patronNacionalidad = /^[a-zA-Zá-úÁ-Ú\s]{3,15}$/;
    let mensaje = '';

    let datosNuevos = {
        Nombre: document.getElementById('nombre').value.trim(),
        'Primer apellido': document.getElementById('apellido1').value.trim(),
        'Segundo apellido': document.getElementById('apellido2').value.trim(),
        Nacionalidad: document.getElementById('nacionalidad').value.trim(),
    };

    for (let dato in datosNuevos) {
        if (dato != 'Nacionalidad') {
            if (!patronNyA.test(datosNuevos[dato])) {
                mensaje += dato + ' debe tener entre 3 y 20 caracteres. \n';
            }
        } else {
            if (!patronNacionalidad.test(datosNuevos[dato])) {
                mensaje += dato + ' debe tener entre 3 y 15 caracteres. \n';
            }
        }
    }

    if (mensaje === '') {
        return datosNuevos;
    } else {
        parrafoCliente.innerText = mensaje;
        parrafoCliente.setAttribute('class', 'error');
        return false;
    }
}

function validarTarjeta() {
    let patronCvv = /^\d{3}$/;
    let patronTarjeta = /^\d{4}\s\d{5}\s\d{6}$/;
    let mensaje = '';

    let tarjetaNueva = {
        numero: document.getElementById('numero').value.trim(),
        cvv: document.getElementById('cvv').value.trim(),
        activa: document.getElementById('activa').checked,
    };

    if (!patronTarjeta.test(tarjetaNueva['numero'])) {
        mensaje += 'El número de la tarjeta no sigue el siguiente formato: \n';
        mensaje += 'XXXX XXXXX XXXXXX \n';
    }

    if (!patronCvv.test(tarjetaNueva['cvv'])) {
        mensaje += 'El CVV sólo puede estar compuesto de 3 números.';
    }

    if (mensaje == '') {
        return tarjetaNueva;
    } else {
        return false;
    }
}
