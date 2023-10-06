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

let cuenta = {
    'iban': 'ES21 1465 0100 72 2030876293',
    'saldo': 500
}

function retirarDinero(){
    var validacionExitosa = validarDineroRetirar()

    if (validacionExitosa){
        var saldo = cuenta.saldo
        var retirar = parseFloat(document.getElementById('retirar').value)
        
        var nuevoSaldo = saldo - retirar
        document.getElementById('saldo').value = "" + nuevoSaldo

        document.getElementById('retirar').value = ''

        var mensaje = document.getElementById('mensaje')
        mensaje.textContent = 'Retiro de ' + retirar + ' exitoso. Cantidad en la cuenta de ' + nuevoSaldo
    }
}

function validarDineroRetirar(){
    var saldo = cuenta.saldo
    var retirar = document.getElementById('retirar').value
    var msg = document.getElementById('mensaje')

    var patron = /^[0-9]+$/

    if (!patron.test(retirar)){
        msg.textContent = "Por favor, ingresa solo números"
        return false
    }
    
    if (retirar > saldo){
        msg.textContent = "No puedes retirar más dinero del que tienes en tu saldo."
        return false
    }
    return true
}

function ingresarDinero(){
    var validacionExitosa = validarIngresoDinero()

    if (validacionExitosa){
        var saldo = cuenta.saldo

        var ingresar = parseFloat(document.getElementById('ingresar').value)


        var nuevoSaldo = saldo + ingresar
        document.getElementById('saldo').value = nuevoSaldo

        document.getElementById('ingresar').value = ''

        var mensaje = document.getElementById('mensaje')
        mensaje.textContent = 'Ingreso de ' + ingresar + ' exitoso. Cantidad en la cuenta de ' + nuevoSaldo
    }
}

function validarIngresoDinero(){
    var ingresar = document.getElementById('ingresar').value
    var msg = document.getElementById('mensaje')

    var patron = /^[0-9]+$/
    if (!patron.test(ingresar)){
        msg.textContent = "Por favor, ingresa solo números"
        return false
    }
    return true
}
