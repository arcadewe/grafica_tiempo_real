const express = require('express');
const cors = require('cors');
const mariadb = require('mariadb');
const https = require('https');
const fs = require('fs');

const app = express();
app.use(cors());

const pool = mariadb.createPool({
    host: '192.168.1.211',
    user: 'User',
    password: 'Trial1',
    database: 'universidad',
    connectionLimit: 5
});

app.get('/api/alumnos', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM alumno');
        res.json(rows);
    } catch (err) {
        res.status(500).json([]); // Devuelve un array vacío en caso de error
    } finally {
        if (conn) conn.release();
    }
});

const options = {
    key: fs.readFileSync('realtime-graph-app/src/clave-privada.key'),
    cert: fs.readFileSync('realtime-graph-app/src/certificado.crt')
};

https.createServer(options, app).listen(3000, () => {
    console.log('Servidor HTTPS corriendo en https://0.0.0.0:3000');
});

//https://arcadewe.github.io/grafica_tiempo_real/realtime-graph-app/src/index.html