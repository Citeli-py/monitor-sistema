import { CPUChart, MemoryChart, StorageChart } from "./components/graficos.js";
import { WebSocketClient } from "./components/webSocketClient.js";

const mode = localStorage.getItem("mode");
// Obter modo escuro de sessão passada
document.body.classList.toggle(mode);

// Modo escuro
const dark_mode_btn = document.getElementById('darkModeToggle');
if(mode === "dark-mode")
    dark_mode_btn.checked = true;

dark_mode_btn.addEventListener('click', () => {
    // Alterna a classe dark-mode no body
    if(localStorage.getItem("mode") !== "dark-mode")
        localStorage.setItem("mode", "dark-mode");

    document.body.classList.toggle('dark-mode');
});


// Instanciar os gráficos
const cpuChart = new CPUChart();
const memoryChart = new MemoryChart();
const storageChart = new StorageChart();

// Uso da classe WebSocketClient
const wsClient = new WebSocketClient('ws://100.94.42.63:8080');

// Configurar o callback para processar mensagens recebidas
wsClient.onMessage((data) => {
    console.log(data);
    cpuChart.updateData(data);
    memoryChart.updateData(data);
    storageChart.updateData(data);
});

// Estabelecer a conexão
wsClient.connect();