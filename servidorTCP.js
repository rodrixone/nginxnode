const net = require('net');
const puerto = 8888;
iniciarServidor();

function iniciarServidor() {
	const server = net.createServer();
	server.listen(puerto, 'localhost', () => {
		const address = server.address();
		const port = address.port;
		const ipaddr = address.address;
		console.log(" - SERVIDOR TCP INICIADO - ");
	});

	const sockets = [];
	server.on('connection', (sock) => {
		sockets.push(sock);
		sock.on('data', data => {
			console.log("Mensaje recibido:");
			//`Mensaje recibido: ${data.toString()} de ${sock.remoteAddress}:${sock.remotePort}`
			var datr = data.toString().toUpperCase();
			var s = "";
			if(datr=='FECHA')
				s = getfecha();
			else if(datr == 'INFS')
				s = "Direccion del socket:"+sock.remoteAddress+" puerto del socket: "+sock.remotePort;
			else if(datr == 'SLIM')
				s = "I'm the slim shady I'm the real shady";
			else
				s = "Solicitud no valida";
			const response = s+"\n";
			const dataBuffer = Buffer.from(response);
			sockets.forEach((sock, index, array) => {
				sock.write(dataBuffer);
				console.log("Dato enviado!!!");
			});
		});
		sock.on('close', data => {
			let index = sockets.findIndex( o => {
				return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
			});
			if (index !== -1) {
				sockets.splice(index, 1);
			}
		});
	});
	server.on('error', (error) => {
		console.log("error", error);
		server.close();
	});
}

function selec(req){
	var s = req.toUpperCase();
	if(s=='FECHA')
		s = getfecha();
	else if(s == 'INFS')
		s = "Informacion del socket: ";
	return s;
}

function getfecha(){
	var d = new Date();
	return "Fecha:"+d.getDay()+"/"+d.getMonth()+"/"+d.getYear()+" Hora: "+d.getHours()+":"+d.getMinutes();
}