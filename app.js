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

botonCliente.addEventListener('click', function() {
    modificarDatos();
});

botonTarjeta.addEventListener('click', function() {
    guardarTarjeta();
});

function modificarDatos() {
    persona.nombre = document.getElementById('nombre').value;
    persona.apellido1 = document.getElementById('apellido1').value;
    persona.apellido2 = document.getElementById('apellido2').value;
    persona.nacionalidad = document.getElementById('nacionalidad').value;
    console.log(persona);
}

function guardarTarjeta() {

    let nuevaTarjeta = {
        'numero':document.getElementById('numero').value,
        'cvv': document.getElementById('cvv').value,
        'activa': document.getElementById('activa').checked,
    };

    tarjetas.push(nuevaTarjeta);
}