import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField'
import styled from 'styled-components';

const Button = styled.button`
    padding: 10px;
    background-color:#1cbdb2;
    border-radius: 5px;
    color: white;  
    font-size: 18px;
`;

function CadastroCategoria(){
    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: '',
    }
    
    const [categorias, setCategorias] = useState([]);
    const [values, setValues] = useState(valoresIniciais);
    
    function setValue(chave, valor){
        setValues({
            ...values,
            [chave]: valor,
        })
    }
    
    function handleChange(infosDoEvento) {
        setValue(
            infosDoEvento.target.getAttribute('name'),
            infosDoEvento.target.value
        );
    }
    
    useEffect(() => {
            const URL = 'https://pianoflix.herokuapp.com/categorias'; 
            fetch(URL)
            .then(async (respostaDoServer) => {
                const resposta = await respostaDoServer.json();
                setCategorias([
                    ...resposta,
                ])
            })
    }, [])

    return (
        <PageDefault>
            <h1>
                Cadastro de Categoria: 
                {values.nome}
            </h1>

            <form onSubmit={function handleSubmit(infosDoEvento){
                infosDoEvento.preventDefault();
                setCategorias([
                    ...categorias,
                    values
                ]);

                setValues(valoresIniciais)
            }}>
                
                <FormField 
                    label="Nome da Categoria"
                    type="text"
                    name="nome"
                    value={values.nome}
                    onChange={handleChange}
                />
                
                <FormField 
                    label="Descrição"
                    type="textarea"
                    name="descricao"
                    value={values.descricao}
                    onChange={handleChange}
                />
                
                <FormField 
                    label="Cor"
                    type="color"
                    name="cor"
                    value={values.cor}
                    onChange={handleChange}
                />

                <Button>
                    Cadastrar
                </Button>
            </form>

            {categorias.length === 0 && (
                <div>
                    Loading...                
                </div>
            )}

            <ul>
                {categorias.map((categoria) => (
                    <li key={`${categoria.titulo}`}>
                        {categoria.titulo}
                    </li>
                ))}
            </ul>

            <Link to="/">
                Voltar para a página inicial
            </Link>
        </PageDefault>
    )
}

export default CadastroCategoria;
