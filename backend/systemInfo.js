import si from 'systeminformation';

export class SystemInfo {

    static async cpuInfo(){
        const cpu = await si.currentLoad();
        return {usage: cpu.currentLoad.toFixed(2),};
    }

    static async memoryInfo(){
        const memory = await si.mem();

        return {
            total: (memory.total / 1024 / 1024 / 1024).toFixed(2), // Convertido para GB
            used: ((memory.total - memory.available) / 1024 / 1024 / 1024).toFixed(2),
        }
    }

    static async diskInfo(){
        const disks = await si.fsSize();

        let used=0, total=0;
        disks.forEach((d) => {
            used  += (d.used / 1024 / 1024 / 1024); // Conversão pra GB
            total += (d.size / 1024 / 1024 / 1024);
        });

        return {used: used.toFixed(2), total: total.toFixed(2)};
    }

    static async getSystemInfo() {
        const cpu = await this.cpuInfo();
        const memory = await this.memoryInfo();
        const disk = await this.diskInfo();

        return {
            cpu, memory, disk
        }
    }
}