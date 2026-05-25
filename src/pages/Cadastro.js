import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cadastro() {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function cadastrar() {

        try {

            const resposta = await fetch('http://localhost:3001/cadastro', {
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

            alert(dados.mensagem);

            navigate('/Login');

        } catch (erro) {
            console.log(erro);
        }
    }

    return (
        <div>
            <div className='areaLogin-cadastro'>

                <h1 className='tituloLogin'> Cadastre sua conta! </h1>

                <input className='InputDados' type='text' placeholder='Usuário' onChange={(e) => setUsuario(e.target.value)} />
                <input className='InputDados' type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input className='InputDados' type='password' placeholder='Senha' onChange={(e) => setSenha(e.target.value)} />

                <div className='areaBotoes'>
                    <div onClick={cadastrar} className='botaoEntrarLogin-cadastro'>Cadastrar </div>
                </div>

            </div>
        </div>
    );
}

export default Cadastro;