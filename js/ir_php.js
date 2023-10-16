const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const formulario = urlParams.get('formulario')
const host = urlParams.get('host')

function entrarFormulario() {
	const codigo = document.getElementById('codigo_barra').value
	let dir = queryString + '&codigo=' + codigo

	if (formulario == null)
		window.open('http://' + host + '/escaner/ord_prod/escaner.php' + dir, '_self')
	else {
		dir = queryString + '&orden=' + document.getElementById('codigo_barra').value
		window.open('http://' + host + '/escaner/ord_prod/' + formulario + '.php' + dir, '_self')
	}

}

function cancelar() {
	if (formulario == null)
		window.open('http://' + host + '/escaner/ord_prod/escaner.php' + queryString, '_self')
	else
		window.open('http://' + host + '/escaner/ord_prod/' + formulario +'.php' + queryString, '_self')
}


function entrarInventario() {
	const codigo = document.getElementById('codigo_barra').value
	let dir = queryString + '&codigo=' + codigo

	window.open('http://' + host + '/escaner/invF/escaner.php' + dir, '_self')
}

function cancelarInventario() {
	const dir = window.location.search

	window.open('http://' + host + '/escaner/invF/escaner.php' + dir, '_self')
}

