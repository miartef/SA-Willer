const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// CONEXÃO COM O POSTGRESQL / NEON
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// TESTE DE CONEXÃO
app.get('/api/dados', async (req, res) => {

    try {

        const result = await pool.query('SELECT NOW()');

        res.json({
            mensagem: 'Conexão bem-sucedida!',
            horario: result.rows[0].now
        });

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            erro: 'Erro ao conectar ao banco'
        });

    }

});

// CADASTRO
app.post('/cadastro', async (req, res) => {

    try {

        const { usuario, email, senha } = req.body;

        // Verifica se email já existe
        const usuarioExistente = await pool.query(
            `
            SELECT * FROM Clientes
            WHERE email = $1
            `,
            [email]
        );

        if (usuarioExistente.rows.length > 0) {

            return res.status(400).json({
                mensagem: 'Usuário já cadastrado'
            });

        }

        // Insere usuário no banco
        await pool.query(
            `
            INSERT INTO Clientes (usuarios, email, senha)
            VALUES ($1, $2, $3)
            `,
            [usuario, email, senha]
        );

        res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso!'
        });

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            mensagem: 'Erro ao cadastrar usuário'
        });

    }

});

// LOGIN
app.post('/login', async (req, res) => {

    try {

        const { email, senha } = req.body;

        const resultado = await pool.query(
            `
            SELECT * FROM Clientes
            WHERE email = $1 AND senha = $2
            `,
            [email, senha]
        );

        if (resultado.rows.length > 0) {

            res.status(200).json({
                sucesso: true,
                mensagem: 'Login realizado com sucesso!',
                usuario: resultado.rows[0].usuarios
            });

        } else {

            res.status(401).json({
                sucesso: false,
                mensagem: 'Email ou senha incorretos'
            });

        }

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao fazer login'
        });

    }

});

// INICIAR SERVIDOR
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});