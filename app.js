let botonCliente = document.getElementById("boton-cliente");
let botonTarjeta = document.getElementById("boton-tarjeta");
let parrafoCliente = document.getElementById("mensaje-cliente");
let parrafoTarjeta = document.getElementById("mensaje-tarjeta");

let menu;

function cargarDatos() {
    /*document.getElementById('idPersona').value = persona.id
    document.getElementById('nombre').value = persona.nombre
    document.getElementById('apellido1').value = persona.apellido1
    document.getElementById('apellido2').value = persona.apellido2
    document.getElementById('nacionalidad').value = persona.nacionalidad*/
    menu = document.getElementById("menu").innerHTML;
}

function cargarCabecera() {
    document.getElementById("menu").innerHTML =
        '   <h1>BancoPuertollano</h1>    <ul>        <li><a href="index.html">Inicio</a></li>        <li><a href="infoCuenta.html">Informaci&#243;n Cuenta</a></li>             <li><a href="tarjetas.html">Tarjetas</a></li>    </ul>';
}

// OBJETOS ---------------------------

let persona = {
    nombre: "Elena",
    apellido1: "Rodríguez",
    apellido2: "Calderón",
    nacionalidad: "Española",
};

let tarjetas = [
    {
        numero: "1234 12345 123456",
        cvv: "123",
        activa: true,
    },
    {
        numero: "1234 12345 123457",
        cvv: "321",
        activa: false,
    },
];

let cuenta = {
    iban: "ES21 1465 0100 72 2030876293",
    saldo: 500,
};

crearTabla();

// LISTENERS --------------------------

botonCliente.addEventListener("click", function () {
    modificarDatos(validarDatos());
});

botonTarjeta.addEventListener("click", function () {
    guardarTarjeta(validarTarjeta());
    crearTabla();
});

// FUNCIONES ----------------------------

function modificarDatos(datos) {
    if (datos) {
        persona.nombre = datos["Nombre"];
        persona.apellido1 = datos["Primer apellido"];
        persona.apellido2 = datos["Segundo apellido"];
        persona.nacionalidad = datos["Nacionalidad"];

        parrafoCliente.innerText = "Datos guardados correctamente.";
        parrafoCliente.setAttribute("class", "correcto");
    }
}

function guardarTarjeta(tarjeta) {
    if (tarjeta) {
        tarjetas.push(tarjeta);
        parrafoTarjeta.innerText = "Tarjeta guardada correctamente.";
        parrafoTarjeta.setAttribute("class", "correcto");

        document.getElementById("numero").value = "";
        document.getElementById("cvv").value = "";
        document.getElementById("activa").checked = false;
    }
}

function crearTabla() {
    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    for (let tarjeta of tarjetas) {
        let tr = document.createElement("tr");
        for (let dato in tarjeta) {
            let td = document.createElement("td");
            td.textContent = tarjeta[dato];
            tr.appendChild(td);
        }
        tabla.appendChild(tr);
    }
}

function retirarDinero() {
    var validacionExitosa = validarDineroRetirar();

    if (validacionExitosa) {
        var saldo = cuenta.saldo;
        var retirar = parseFloat(document.getElementById("retirar").value);

        var nuevoSaldo = saldo - retirar;
        document.getElementById("saldo").value = "" + nuevoSaldo;

        document.getElementById("retirar").value = "";

        var mensaje = document.getElementById("mensaje");
        mensaje.textContent =
            "Retiro de " +
            retirar +
            " exitoso. Cantidad en la cuenta de " +
            nuevoSaldo;
    }
}

function ingresarDinero() {
    var validacionExitosa = validarIngresoDinero();

    if (validacionExitosa) {
        var saldo = cuenta.saldo;

        var ingresar = parseFloat(document.getElementById("ingresar").value);

        var nuevoSaldo = saldo + ingresar;
        document.getElementById("saldo").value = nuevoSaldo;

        document.getElementById("ingresar").value = "";

        var mensaje = document.getElementById("mensaje");
        mensaje.textContent =
            "Ingreso de " +
            ingresar +
            " exitoso. Cantidad en la cuenta de " +
            nuevoSaldo;
    }
}

// VALIDACIONES -----------------------------

function validarDatos() {
    let patronNyA = /^[a-zA-Zá-úÁ-Ú\s]{3,20}$/;
    let patronNacionalidad = /^[a-zA-Zá-úÁ-Ú\s]{3,15}$/;
    let mensaje = "";

    let datosNuevos = {
        Nombre: document.getElementById("nombre").value.trim(),
        "Primer apellido": document.getElementById("apellido1").value.trim(),
        "Segundo apellido": document.getElementById("apellido2").value.trim(),
        Nacionalidad: document.getElementById("nacionalidad").value.trim(),
    };

    for (let dato in datosNuevos) {
        if (dato != "Nacionalidad") {
            if (!patronNyA.test(datosNuevos[dato])) {
                mensaje += dato + " debe tener entre 3 y 20 caracteres. \n";
            }
        } else {
            if (!patronNacionalidad.test(datosNuevos[dato])) {
                mensaje += dato + " debe tener entre 3 y 15 caracteres. \n";
            }
        }
    }

    if (mensaje === "") {
        return datosNuevos;
    } else {
        parrafoCliente.innerText = mensaje;
        parrafoCliente.setAttribute("class", "error");
        return false;
    }
}

function validarTarjeta() {
    let patronCvv = /^\d{3}$/;
    let patronTarjeta = /^\d{4}\s\d{5}\s\d{6}$/;
    let mensaje = "";

    let tarjetaNueva = {
        numero: document.getElementById("numero").value.trim(),
        cvv: document.getElementById("cvv").value.trim(),
        activa: document.getElementById("activa").checked,
    };

    if (!patronTarjeta.test(tarjetaNueva["numero"])) {
        mensaje += "El número de la tarjeta no sigue el siguiente formato: \n";
        mensaje += "XXXX XXXXX XXXXXX \n";
    }

    if (!patronCvv.test(tarjetaNueva["cvv"])) {
        mensaje += "El CVV sólo puede estar compuesto de 3 números.";
    }

    if (mensaje == "") {
        return tarjetaNueva;
    } else {
        parrafoTarjeta.innerText = mensaje;
        parrafoTarjeta.setAttribute("class", "error");
        return false;
    }
}

function validarDineroRetirar() {
    var saldo = cuenta.saldo;
    var retirar = document.getElementById("retirar").value;
    var msg = document.getElementById("mensaje");

    var patron = /^[0-9]+$/;

    if (!patron.test(retirar)) {
        msg.textContent = "Por favor, ingresa solo números";
        return false;
    }

    if (retirar > saldo) {
        msg.textContent =
            "No puedes retirar más dinero del que tienes en tu saldo.";
        return false;
    }
    return true;
}

function validarIngresoDinero() {
    var ingresar = document.getElementById("ingresar").value;
    var msg = document.getElementById("mensaje");

    var patron = /^[0-9]+$/;
    if (!patron.test(ingresar)) {
        msg.textContent = "Por favor, ingresa solo números";
        return false;
    }
    return true;
}
