const express = require('express');
const cors = require('cors');
const mariadb = require('mariadb');

const app = express();
app.use(cors());

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
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
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) conn.release();
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});