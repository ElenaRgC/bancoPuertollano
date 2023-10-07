let botonCliente;
let botonTarjeta;
let parrafoCliente;
let parrafoTarjeta;
let parrafoCuenta;
let botonRetirar;
let botonIngresar;
let inputRetirar;
let inputIngresar;

function cargarDatos(origen) {
    switch (origen) {
        case "index":
            if (localStorage.getItem("cliente")) {
                persona = JSON.parse(localStorage.getItem("cliente"));
            }

            document.getElementById("nombre").value = persona.nombre;
            document.getElementById("apellido1").value = persona.apellido1;
            document.getElementById("apellido2").value = persona.apellido2;
            document.getElementById("nacionalidad").value =
                persona.nacionalidad;

            botonCliente = document.getElementById("boton-cliente");
            parrafoCliente = document.getElementById("mensaje-cliente");

            botonCliente.addEventListener("click", function () {
                modificarDatos(validarDatos());
            });

            break;
        case "cuenta":
            if (localStorage.getItem("cuenta")) {
                cuenta = JSON.parse(localStorage.getItem("cuenta"));
            }

            document.getElementById("iban").value = cuenta.iban;
            document.getElementById("saldo").value = cuenta.saldo;

            parrafoCuenta = document.getElementById("mensaje-cuenta");
            botonRetirar = document.getElementById("botonRetirar");
            botonIngresar = document.getElementById("botonIngresar");
            inputRetirar = document.getElementById("retirar");
            inputIngresar = document.getElementById("ingresar");

            botonRetirar.addEventListener("click", function () {
                retirarDinero();
            });

            botonIngresar.addEventListener("click", function () {
                ingresarDinero();
            });

            inputRetirar.addEventListener("click", function () {
                campoBlancoIngresar();
            });

            inputIngresar.addEventListener("click", function () {
                campoBlancoRetirar();
            });

            break;
        case "tarjetas":
            if (localStorage.getItem("tarjetas")) {
                tarjetas = JSON.parse(localStorage.getItem("tarjetas"));
            }

            botonTarjeta = document.getElementById("boton-tarjeta");
            parrafoTarjeta = document.getElementById("mensaje-tarjeta");

            crearTabla();

            botonTarjeta.addEventListener("click", function () {
                guardarTarjeta(validarTarjeta());
                crearTabla();
            });

            break;
    }
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
    tarjetas: tarjetas,
};

// FUNCIONES ----------------------------

function modificarDatos(datos) {
    if (datos) {
        persona.nombre = datos.Nombre;
        persona.apellido1 = datos["Primer apellido"];
        persona.apellido2 = datos["Segundo apellido"];
        persona.nacionalidad = datos["Nacionalidad"];

        parrafoCliente.innerText = "Datos guardados correctamente.";
        parrafoCliente.setAttribute("class", "correcto");

        localStorage.setItem("cliente", JSON.stringify(persona));
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

        localStorage.setItem("tarjetas", JSON.stringify(tarjetas));
    }
}

function crearTabla() {
    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    for (let tarjeta of tarjetas) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.textContent = cuenta.iban;
        tr.appendChild(td);

        for (let dato in tarjeta) {
            if (dato != "cvv") {
                td = document.createElement("td");

                if (dato == "activa") {
                    if (tarjeta[dato]) {
                        td.textContent = "Sí";
                    } else {
                        td.textContent = "No";
                    }
                } else {
                    td.textContent = tarjeta[dato];
                }

                tr.appendChild(td);
            }
        }
        tabla.appendChild(tr);
    }
}

function retirarDinero() {
    var validacionExitosa = validarDineroRetirar();

    if (validacionExitosa) {
        var saldo = cuenta.saldo;
        var retirar = parseFloat(document.getElementById("retirar").value);

        cuenta.saldo = saldo - retirar;
        document.getElementById("saldo").value = cuenta.saldo;

        parrafoCuenta.innerText =
            "Retiro de " +
            retirar +
            " exitoso. Cantidad en la cuenta de " +
            cuenta.saldo;
        parrafoCuenta.setAttribute("class", "correcto");

        localStorage.setItem("cuenta", JSON.stringify(cuenta));
    }
}

function ingresarDinero() {
    var validacionExitosa = validarIngresoDinero();

    if (validacionExitosa) {
        var saldo = cuenta.saldo;

        var ingresar = parseFloat(document.getElementById("ingresar").value);

        cuenta.saldo = saldo + ingresar;
        document.getElementById("saldo").value = cuenta.saldo;

        parrafoCuenta.innerText =
            "Ingreso de " +
            ingresar +
            " exitoso. Cantidad en la cuenta de " +
            cuenta.saldo;
        parrafoCuenta.setAttribute("class", "correcto");

        localStorage.setItem("cuenta", JSON.stringify(cuenta));
    }
}

function campoBlancoRetirar() {
    document.getElementById("retirar").value = "";
}

function campoBlancoIngresar() {
    document.getElementById("ingresar").value = "";
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

    if (!patronTarjeta.test(tarjetaNueva.numero)) {
        mensaje += "El número de la tarjeta no sigue el siguiente formato: \n";
        mensaje += "XXXX XXXXX XXXXXX \n";
    }

    if (!patronCvv.test(tarjetaNueva.cvv)) {
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

    var patron = /^[0-9]+$/;

    if (!patron.test(retirar)) {
        parrafoCuenta.textContent = "Por favor, ingresa solo números";
        parrafoCuenta.setAttribute("class", "error");

        return false;
    }

    if (retirar > saldo) {
        parrafoCuenta.textContent =
            "No puedes retirar más dinero del que tienes en tu saldo.";
        parrafoCuenta.setAttribute("class", "error");
        return false;
    }
    parrafoCuenta.setAttribute("class", "correcto");
    return true;
}

function validarIngresoDinero() {
    var ingresar = document.getElementById("ingresar").value;

    var patron = /^[0-9]+$/;
    if (!patron.test(ingresar)) {
        parrafoCuenta.textContent = "Por favor, ingresa solo números";
        parrafoCuenta.setAttribute("class", "error");
        return false;
    }
    parrafoCuenta.setAttribute("class", "correcto");
    return true;
}
