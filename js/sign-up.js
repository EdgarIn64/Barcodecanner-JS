function guardar() {
	window.open('login.html', '_self')
}

function cancelar() {
	window.open('login.html', '_self')
}

function validarNc() {
	const nc = document.getElementById("nc")
	let valor = nc.value
	if (valor.length != 4) {
		alert('El NC debe ser de 4 digitos');
		nc.value = '';
	}
}

function confirmarPassword() {
	const password = document.getElementById("password")
	const confirmar = document.getElementById("confirmar")
	
	if (password.value != '') {
		if (password.value != confirmar.value ) {
			alert('La confirmación de la contraseña no coincide')
			confirmar.value = ''
		}
	}
	else {
		alert('Escribe primero la contraseña')
		confirmar.value = ''
	}
	
}

function limpiarConfirmacion() {
	document.getElementById("confirmar").value = ''
}