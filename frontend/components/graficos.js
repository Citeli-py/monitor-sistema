class BaseChart {
    constructor(canvasId, chartConfig) {
        this.canvasId = canvasId;
        this.chartConfig = chartConfig;
        this.chartInstance = this.createChart();
    }

    createChart() {
        return new Chart(document.getElementById(this.canvasId), this.chartConfig);
    }

    updateData(data) {
        console.warn('updateData method not implemented for this chart.');
    }
}

export class CPUChart extends BaseChart {
    constructor() {
        super('cpuChart', {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'CPU (%)',
                    data: [],
                    borderColor: 'blue',
                    fill: false,
                    tension: 0.1,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: 'Tempo' } },
                    y: { title: { display: true, text: 'Uso (%)' }, suggestedMin: 0, suggestedMax: 100 }
                }
            }
        });
        this.maxDataLen = 20;
    }

    updateData(data) {
        const timeStamp = new Date().toLocaleTimeString();
        const cpuUsage = parseFloat(data.cpu.usage);

        const labels = this.chartInstance.data.labels;
        const dataset = this.chartInstance.data.datasets[0].data;

        if (labels.length >= this.maxDataLen) {
            labels.shift();
            dataset.shift();
        }

        labels.push(timeStamp);
        dataset.push(cpuUsage);
        this.chartInstance.update();
    }
}

export class MemoryChart extends BaseChart {
    constructor() {
        super('memoryChart', {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Memória Usada (GB)',
                    data: [],
                    borderColor: 'green',
                    fill: false,
                    tension: 0.1,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: 'Tempo' } },
                    y: { title: { display: true, text: 'Memória (GB)' } }
                }
            }
        });
        this.maxDataLen = 20;
    }

    updateData(data) {
        const timeStamp = new Date().toLocaleTimeString();
        const memoryUsed = parseFloat(data.memory.used);

        const labels = this.chartInstance.data.labels;
        const dataset = this.chartInstance.data.datasets[0].data;

        this.chartInstance.options.scales.y.suggestedMax = data.memory.total;
        this.chartInstance.options.scales.y.suggestedMin = 0;

        if (labels.length >= this.maxDataLen) {
            labels.shift();
            dataset.shift();
        }

        labels.push(timeStamp);
        dataset.push(memoryUsed);
        this.chartInstance.update();
    }
}

export class StorageChart extends BaseChart {
    constructor() {
        super('storageChart', {
            type: 'doughnut',
            data: {
                labels: ["Used", "Available"],
                datasets: [{
                    label: 'Armazenamento (GB)',
                    data: [],
                    backgroundColor: ['Red', 'Green'],
                }]
            },
            options: {
                responsive: true,
            }
        });
    }

    updateData(data) {
        const usedStorage = data.disk.used;
        const availableStorage = data.disk.total - usedStorage;

        this.chartInstance.data.datasets[0].data = [usedStorage, availableStorage];
        this.chartInstance.update();
    }
}