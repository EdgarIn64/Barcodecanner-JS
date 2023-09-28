function entrarUsuario() {
	window.open('escaner.html', '_self')
}

function nuevoUsuario() {
	const adminDiv = document.getElementById('adminDiv')
	const listaUsuarios = document.getElementById('listaUsuarios')
	const pass = document.getElementById('pass')
	const btnEntrar = document.getElementById('btnEntrar')
	const btnNuevo = document.getElementById('btnNuevo')

	adminDiv.style.display = "block"
	listaUsuarios.disabled = true
	pass.disabled = true
	btnEntrar.disabled = true
	btnNuevo.disabled = true
}

function entrarAdmin() {
	window.open('sign-up.html', '_self')
}

function cancelar() {
	const adminDiv = document.getElementById('adminDiv')
	const listaUsuarios = document.getElementById('listaUsuarios')
	const pass = document.getElementById('pass')
	const btnEntrar = document.getElementById('btnEntrar')
	const btnNuevo = document.getElementById('btnNuevo')


	adminDiv.style.display = "none"
	listaUsuarios.disabled = false
	pass.disabled = false
	btnEntrar.disabled = false
	btnNuevo.disabled = false
}

