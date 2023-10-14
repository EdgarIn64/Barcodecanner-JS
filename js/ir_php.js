function entrarFormulario() {
	const codigo = document.getElementById('codigo_barra').value
	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	const formulario = urlParams.get('formulario')
	let dir = queryString + '&codigo=' + codigo

	if (formulario == null)
		window.open('http://10.100.16.107/escaner/ord_prod/escaner.php' + dir, '_self')
	else {
		dir = queryString + '&orden=' + document.getElementById('codigo_barra').value
		window.open('http://10.100.16.107/escaner/ord_prod/' + formulario + '.php' + dir, '_self')
	}

}

function cancelar() {
	const dir = window.location.search
	const urlParams = new URLSearchParams(dir)
	const formulario = urlParams.get('formulario')

	if (formulario == null)
		window.open('http://10.100.16.107/escaner/ord_prod/escaner.php' + dir, '_self')
	else
		window.open('http://10.100.16.107/escaner/ord_prod/' + formulario +'.php' + dir, '_self')
}