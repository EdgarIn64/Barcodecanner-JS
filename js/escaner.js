var _scannerIsRunning = false;
	
function startScanner() {
	const codigo_barra = document.getElementById('codigo_barra')
	const resultado = document.getElementById('resultado')
//	const blacklist = ['#', "'", ',', '&', ':', '+', '"', '>', '%', '!', '?']
	const whiteList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-'.split('');

	Quagga.init({
		inputStream: {
			name: "Live",
			type: "LiveStream",
			target: document.querySelector('#scanner-container'),
			constraints: {
				width: 640,
				height: 350,
				facingMode: "environment"
			},
		},
		decoder: {
			readers: [
				"code_128_reader",
				"code_39_reader",
				"code_39_vin_reader"
			],
			debug: {
				showCanvas: true,
				showPatches: true,
				showFoundPatches: true,
				showSkeleton: true,
				showLabels: true,
				showPatchLabels: true,
				showRemainingPatchLabels: true,
				boxFromPatches: {
					showTransformed: true,
					showTransformedBox: true,
					showBB: true
				}
			}
		},
	}, function (err) {
		if (err) {
			console.log(err);
			return
		}
		console.log("Initialization finished. Ready to start");
		Quagga.start();

		// Set flag to is running
		_scannerIsRunning = true;
	});

	Quagga.onProcessed(function (result) {
		var drawingCtx = Quagga.canvas.ctx.overlay,
		drawingCanvas = Quagga.canvas.dom.overlay;

		if (result) {
			if (result.boxes) {
				let canvasWidth = parseInt(drawingCanvas.getAttribute("width"));
				let canvasHeight =parseInt(drawingCanvas.getAttribute("height"));
				drawingCtx.clearRect(0, 0, canvasWidth, canvasHeight);

				result.boxes.filter(function (box) {
					return box !== result.box;
				}).forEach(function (box) {
					Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
				});
			}

			if (result.box)
				Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });

			if (result.codeResult && result.codeResult.code)
				Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
		}
	});

	Quagga.onDetected(function (result) {
		let codigo = result.codeResult.code
		if (codigo.length < 15) {
			let continuar = true
/*
			for (let i=0; i < blacklist.length; i++) {
				if (codigo.includes(blacklist[i])) {
					console.log(codigo)
					continuar = false
					break
				}
			}
   */
			for (let i=0; i < codigo.length; i++) {
				if (!whiteList.includes(codigo[i])) {
					continuar = false
					break
				}
			}
			if (continuar) {
				codigo_barra.value = codigo
				document.getElementById('btnBuscar').click()
			}
		}
	});
}

// Change page scanner
function changePageScanner() {
	window.open('escaner_camara.html', '_self');
}


// Start/stop scanner
function startStopScanner() {
	if (_scannerIsRunning) {
		Quagga.stop()
		_scannerIsRunning = false
		btnChange.src = 'img/play.png'
	}
	else {
		startScanner();
		btnChange.src = 'img/stop.png'		
	}
}

function mostrarArea(area) {
	const escanerSeccion = document.getElementById('escanerSeccion')
	const areaNombre = document.getElementById('areaNombre')

	if (escanerSeccion.hidden = true) {
		escanerSeccion.hidden = false
		document.getElementById('tituloTemporal').hidden = true
	}
	areaNombre.innerHTML = area

	document.getElementById('almacen').style.backgroundColor = "#F3F3F3"
	document.getElementById('wip').style.backgroundColor = "#F3F3F3"
	document.getElementById('rechazos').style.backgroundColor = "#F3F3F3"

	switch (area) {
		case "Almacén": document.getElementById('almacen').style.backgroundColor = "#FDFDFD"
		break
		case "WIP": document.getElementById('wip').style.backgroundColor = "#FDFDFD"
		break
		case "Rechazos": document.getElementById('rechazos').style.backgroundColor = "#FDFDFD"
		break
	}
}

function entrarFormulario() {
	window.open('formulario-misc.html', '_self')
}

function cancelar() {
	window.open('escaner.html', '_self')
}
