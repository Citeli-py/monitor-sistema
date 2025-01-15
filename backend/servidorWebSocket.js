// Importando bibliotecas necessárias
import WebSocket, { WebSocketServer } from 'ws';


export class servidorWebSocket {

    constructor(porta){
        this.porta = porta;
        this.wss = new WebSocketServer({ port: porta });
        console.log(`Servidor WebSocket rodando na porta ${porta}`);

        // Evento de conexão
        this.wss.on('connection', ws => {
            console.log('Novo cliente conectado');

            ws.on('close', () => {
                console.log('Cliente desconectado');
            });
        });
    }

    async broadcastInfo(message){
        const string_message = JSON.stringify(message);

        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) 
                client.send(string_message);
        });
    }
};
