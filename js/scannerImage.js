const _readers = ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader', 
		'code_39_vin_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader', 
		'i2of5_reader', '2of5_reader', 'code_93_reader']
let _reader = _readers

function startScanner() {
	let scanResult = document.getElementById('scanResult')
	let msgError = 'Didn´t possible read the code'
	let locates = [false, true]

	for (let i = 0; i < 2; i++) {
		Quagga.decodeSingle (
			{
				decoder: {
					readers: _reader // List of active readers
				},
				locate: locates[i], // try to locate the barcode in the image
				src: 'codebar.png?a' // or 'data:image/jpg;base64,' + data
			},
			function(result){
				if (result) {
					if (result.codeResult) {
						scanResult.innerHTML = 'Code: ' + result.codeResult.code
							+ '<br>Format' + result.codeResult.format
						return
					}
				}
			}
		);
	}
	scanResult.innerHTML = msgError
}

function setReader(e) {
	const option = e.value
	_reader = (option == '') ? _readers : [_readers[option]]
}

function back() {
	window.open('index.html', '_self')
}

