function cargarDatos(){
    /*document.getElementById('idPersona').value = persona.id
    document.getElementById('nombre').value = persona.nombre
    document.getElementById('apellido1').value = persona.apellido1
    document.getElementById('apellido2').value = persona.apellido2
    document.getElementById('nacionalidad').value = persona.nacionalidad*/
    menu = document.getElementById('menu').innerHTML
}

function cargarCabecera(dest){  
 document.getElementById(dest).innerHTML = '   <h1>BancoPuertollano</h1>    <ul>        <li><a href="index.html">Inicio</a></li>        <li><a href="infoCuenta.html">Informaci&#243;n Cuenta</a></li>             <li><a href="tarjetas.html">Tarjetas</a></li>    </ul>' 
}

function retirarDinero(){
    var validacionExitosa = validarDineroRetirar()

    if (validacionExitosa){
        var saldo = document.getElementById('saldo').value 
        var retirar = document.getElementById('retirar').value

        var nuevoSaldo = saldo - retirar
        nuevoSaldo = document.getElementById('saldo').value

        document.getElementById('retirar').value = ''

        var mensaje = document.getElementById('mensaje')
        mensaje.textContent = 'Retiro exitoso.'
    }
}