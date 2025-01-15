
export class WebSocketClient {
    constructor(url, reconnectInterval = 2000) {
        this.url = url;
        this.reconnectInterval = reconnectInterval;
        this.ws = null;
        this.isConnected = false;
        this.onMessageCallback = null;
    }

    // Inicia a conexão WebSocket
    connect() {
        console.log(`Conectando ao WebSocket em ${this.url}...`);
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            this.isConnected = true;
            this.updateStatus();
            console.log('Conexão com WebSocket estabelecida.');
        };

        this.ws.onmessage = (event) => {
            if (this.onMessageCallback) {
                const data = JSON.parse(event.data);
                this.onMessageCallback(data);
            } else {
                console.warn('Nenhum callback definido para mensagens.');
            }
        };

        this.ws.onerror = (err) => {
            console.error('Erro no WebSocket:', err);
        };

        this.ws.onclose = () => {
            console.warn('Conexão com WebSocket perdida. Tentando reconectar...');
            this.isConnected = false;
            this.updateStatus();
            setTimeout(() => this.connect(), this.reconnectInterval);
        };
    }

    // Define o callback para mensagens recebidas
    onMessage(callback) {
        this.onMessageCallback = callback;
    }

    // Envia uma mensagem para o servidor
    send(data) {
        if (this.isConnected && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
        } else {
            console.warn('Não é possível enviar a mensagem. WebSocket não está conectado.');
        }
    }

    updateStatus() {
        const statusCircle = document.getElementById("status-circle");
        const statusText = document.getElementById("status-text");
        if (this.isConnected) {
            statusText.innerText = 'Ativo';
            statusCircle.style.backgroundColor = 'green';
        } else {
            statusCircle.style.backgroundColor = 'red';
            statusText.innerText = 'Inativo';
        }
    }
};
