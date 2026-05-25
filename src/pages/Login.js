import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function fazerLogin() {

        try {

            const resposta = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usuario,
                    email,
                    senha
                })
            });

            const dados = await resposta.json();

            if (dados.sucesso) {
                navigate('/Home');
            } else {
                alert('Usuário ou senha incorretos');
            }

        } catch (erro) {
            console.log(erro);
        }
    }

    return (
        <div>
            <div className='areaLogin-cadastro'>

                <h1 className='tituloLogin'>Entre na sua conta!</h1>
                <input className='InputDados' type='text' placeholder='Usuário' onChange={(e) => setUsuario(e.target.value)} />
                <input className='InputDados' type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input className='InputDados' type='password' placeholder='Senha' onChange={(e) => setSenha(e.target.value)} />

                <div className='areaBotoes'>
                    <div onClick={fazerLogin} className='botaoEntrarLogin-cadastro'>Entrar</div>
                    <div onClick={() => navigate('/Cadastro')} className='botaoEntrarLogin-cadastro' >Cadastrar</div>

                </div>

            </div>
        </div>
    );
}

export default Login;