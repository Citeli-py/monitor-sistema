# Sistema de Monitoramento de Computadores com WebSocket

Este projeto é uma aplicação para monitoramento em tempo real de computadores. Ele exibe informações como uso de CPU, memória e armazenamento utilizando WebSocket para comunicação entre backend e frontend. O sistema foi projetado para ser leve e acessível via VPN.

---

## Funcionalidades

### Backend

- Coleta de informações do sistema usando a biblioteca `systeminformation`.
- Transmissão de dados em tempo real via WebSocket.

### Frontend

- Interface web moderna e responsiva.
- Gráficos dinâmicos utilizando `Chart.js` para:
  - Uso de CPU e memória ao longo do tempo.
  - Armazenamento total e utilizado (gráfico de pizza).
- Indicação do estado do computador (ativo/inativo) com um indicador visual.
- Suporte a modo claro e escuro.
- Reconexão automática ao WebSocket em caso de perda de conexão.

---

## Tecnologias Utilizadas

### Backend

- Node.js
- WebSocket
- systeminformation

### Frontend

- HTML5 e CSS3
- JavaScript ES6+
- Chart.js

---

## Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior).
- NPM (gerenciador de pacotes do Node.js).
- VPN configurada para acessar o backend.

### Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/Citeli-py/monitor-sistema.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```

### Frontend

1. Navegue para a pasta do frontend:
   ```bash
   cd frontend
   ```
2. Abra o arquivo `index.html` no navegador ou sirva-o em um servidor estático.

---

## Melhorias Futuras

- Controle remoto do computador (ligar/desligar).
- Suporte a múltiplos computadores monitorados.
- Histórico de monitoramento com gráficos persistentes.
- Notificações e alertas para condições críticas de uso.


