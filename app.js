let botonCliente = document.getElementById('boton-cliente');

function cargarDatos(){
    /* Carga los datos de index.html */
    document.getElementById('nombre').value = persona.nombre;
    document.getElementById('apellido1').value = persona.apellido1;
    document.getElementById('apellido2').value = persona.apellido2;
    document.getElementById('nacionalidad').value = persona.nacionalidad;

    /* Carga el menú */
    menu = document.getElementById('menu').innerHTML;
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

botonCliente.addEventListener('click', function() {
    modificarDatos();
});

function modificarDatos() {
    persona.nombre = document.getElementById('nombre').value;
    persona.apellido1 = document.getElementById('apellido1').value;
    persona.apellido2 = document.getElementById('apellido2').value;
    persona.nacionalidad = document.getElementById('nacionalidad').value;
    console.log(persona);
}