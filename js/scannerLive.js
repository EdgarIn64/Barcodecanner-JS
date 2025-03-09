let _scannerIsRunning = false;
const _readers = ['code_128_reader', 'code_39_reader', 'code_39_vin_reader', 
		'ean_reader', 'ean_8_reader', 'upc_reader', 'upc_e_reader', 'codabar_reader', 
		'i2of5_reader', '2of5_reader', 'code_93_reader'];
let _reader = _readers;
let cont = 0;

function startScanner() {
	const barcode = document.getElementById('barcode');
	const format = document.getElementById('format');
	const result = document.getElementById('result');
	const btnChange = document.getElementById('btnChange');;
	const placeholder_scanner = document.getElementById('placeholder-scanner');

	// Quagga configuration
	Quagga.init({
		inputStream: {
			name: 'Live',
			type: 'LiveStream',
			target: document.querySelector('#scanner-container'),
			constraints: {
				width: 640,
				height: 300,
				facingMode: 'environment'
			},
		},
		decoder: {
			readers: _reader,
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
			return;
		}
		Quagga.start();

		// Set flag to is running
		_scannerIsRunning = true;
		btnChange.src = 'img/stop.png';
		placeholder_scanner.hidden = true;
	});

	// Sacnning barcode
	Quagga.onProcessed(function (result) {
		var drawingCtx = Quagga.canvas.ctx.overlay,
		drawingCanvas = Quagga.canvas.dom.overlay;

		if (result) {
			if (result.boxes) {
				let canvasWidth = parseInt(drawingCanvas.getAttribute('width'));
				let canvasHeight =parseInt(drawingCanvas.getAttribute('height'));
				drawingCtx.clearRect(0, 0, canvasWidth, canvasHeight);

				result.boxes.filter(function (box) {
					return box !== result.box;
				}).forEach(function (box) {
					Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'green', lineWidth: 2 });
				});
			}

			if (result.box)
				Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: '#00F', lineWidth: 2 });

			if (result.codeResult && result.codeResult.code)
				Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
		}
	});

	// Barcode dectected
	Quagga.onDetected(function (result) {
		// To prevent accommodation errors 
		cont++;
		if (cont > 10){
			format.value = result.codeResult.format;
			barcode.value = result.codeResult.code;
			cont = 0;
		}
	});
}

// Start/stop scanner
function startStopScanner() {
	const btnChange = document.getElementById('btnChange');
	const placeholder_scanner = document.getElementById('placeholder-scanner');
	if (_scannerIsRunning) {
		Quagga.stop();
		_scannerIsRunning = false;
		btnChange.src = 'img/play.png';
		placeholder_scanner.hidden = false;
	}
	else {
		startScanner();
	}
}

// Set the reader barcode option
function setReader(e) {
	const option = e.value;
	_reader = (option == '') ? _readers : [_readers[option]];

	// Reset scanner
	startStopScanner();
	startStopScanner();
}

// Show and save the results in a table
function showResult() {
	const results = document.getElementById('results');
	const barcode = document.getElementById('barcode');
	const format = document.getElementById('format');
	results.innerHTML += '<tr><td>Code: ' + barcode.value + '<br>Format: ' + format.value + '</td></tr>';
	barcode.value = format.value = '';
}

// Back to the index
function back() {
	window.open('index.html', '_self');
}
