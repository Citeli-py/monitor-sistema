import express from 'express';
import path from 'path';

export class httpServer {
    constructor(port, filePath) {
        this.port = port || 3000;
        this.filePath = filePath || path.resolve('./frontend/index.html');
        this.app = express();
        this.app.use(express.static("frontend"))
    }

    configureRoutes() {
        this.app.get('/', (req, res) => {
            res.sendFile(this.filePath);
        });
    }

    start() {
        this.configureRoutes();
        this.app.listen(this.port, () => {
            console.log(`Servidor rodando em http://localhost:${this.port}`);
        });
    }
}
