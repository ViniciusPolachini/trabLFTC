import React, {useState} from 'react'
import { Layout, Button} from 'antd';
import { Link } from "react-router-dom";
import './style.css';
import 'antd/dist/antd.css';
import Regra from './component/regra'
import StringInput from './component/stringInput'
import Item from 'antd/lib/list/Item';
const { Header, Content, Footer } = Layout;

export default function Home(){
    const [borderColor, setBorderColor] = useState("gray");
    const [regras, setRegras] = useState([
        {
            esquerda: 'S',
            direita: 'a|b'
    }
    ]);

    function handleAddRegra(){
        const aux = [...regras];
        aux.push({esquerda: '', direita: ''});
        setRegras(aux);
    }

    function handleRemoveRegra(){
        let aux = [...regras];
        aux.pop();
        setRegras(aux);
    }  

    function handleSetRegra(e ,index, lado){
        let aux = [...regras];
        if(lado==='esquerda'){
            aux[index].esquerda = e.target.value
        }
        else{
            aux[index].direita = e.target.value
        }
        setRegras(aux);
        console.log(regras);
    }

    function handleTeste(string){
        console.log(string)
        let texto = string
        let tipo = ''
        let aux = true;
        let teste = false;
        let input = regras[0];
        while(aux){
            const regra = input.direita.replace(/\s+/g, '').split('|');
            for(let i of regra){
                const stringAux = i.replace(/[^a-z]/g, '');
                tipo = tipo==='' ? 
                (i[i.length-1]===i[i.length-1].toUpperCase() ? 'direita':'esquerda')
                :(tipo);
                const prox = tipo=='direita' ? i.length-1:0;
                if(stringAux==texto.slice(0,stringAux.length)){
                    teste=true;
                    texto = texto.slice(stringAux.length);
                    input = regras.filter((value)=> {return value.esquerda===i[prox]});
                    if(input.length!=0){
                        input = input[0];
                    }
                    else{
                        aux=0;
                    }
                    break;
                }
                else{
                    teste=false;
                }
            }
            if(!teste){
                aux=false
            }
        }
        if(teste && texto.length===0){
            setBorderColor('green');
        }
        else{
            setBorderColor('red');
        }
    }


    return(
        <>
        <Layout className="layout">
            <Header>
                <Link to='/'><h2 style={{color: 'white'}}>Voltar</h2></Link>
            </Header>
            <Content>
            <div className="conteudoGR">
                <div className="GR">
                    <div className="regras">
                        {regras.map((item, index)=>{
                            return <Regra direita={item.direita} esquerda={item.esquerda} setRegra={handleSetRegra} index={index}></Regra>
                        })}
                    </div>
                    <div className='add'>
                        <Button onClick={()=>handleAddRegra()}>+</Button>
                        <Button onClick={()=>handleRemoveRegra()}>-</Button>
                    </div>
                </div>
                <div className="string">
                    <StringInput borderColor={borderColor} setString={handleTeste}></StringInput>
                </div>
            </div>
            </Content>
            <Footer style={{ textAlign: 'center', backgroundColor: 'gray' }}>
                <h3>Integrantes</h3>
                <br></br>
                <h4>Vinicius Polachini - 191251852</h4>
                <br></br>
                <h4>Gustavo Palmeira Zaia - 191252158</h4>
            </Footer>
        </Layout>
        </>
    );
}