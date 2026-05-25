import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();

    const irParaSobre = (pagina) => {
        navigate(pagina);
    };

    return (
        <div>
            <h1 className='tituloHome'>Página Inicial</h1>

            <div className='areaBotoes'>
                <div onClick={() => irParaSobre('/Login')} className='botaoEntrarLogin-cadastro'>Login</div>
                <div onClick={() => irParaSobre('/cadastro')} className='botaoEntrarLogin-cadastro'>Cadastro</div>
            </div>
        </div>
    )
}

export default Home
