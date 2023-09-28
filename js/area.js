function habilitarBoton() {
	const btnArea = document.getElementById('btnArea')
	btnArea.disabled = false
}

function irLogin() {
	const areas = document.getElementById('areas')
	window.open("login.html?area=" + areas.value, "_self")
}