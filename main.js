import { servidorWebSocket } from "./backend/servidorWebSocket.js";
import { SystemInfo } from "./backend/systemInfo.js";

import { httpServer } from "./backend/httpServer.js";

// Configuração do servidor WebSocket
const PORT = 8080;
const servidorWss = new servidorWebSocket(PORT);

// Exemplo de uso
const server = new httpServer(5500);
server.start();

// Intervalo para transmissão de dados (a cada 1 segundo)
setInterval(async () => {
    const message = await SystemInfo.getSystemInfo();
    servidorWss.broadcastInfo(message);
}, 1000);
