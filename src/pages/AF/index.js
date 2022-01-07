import React from 'react'
import {useState} from 'react'
import { Layout, Button} from 'antd';
import { Link } from "react-router-dom";
import './style.css';
import 'antd/dist/antd.css';
import StringInput from './component/stringInput';
import CytoscapeComponent from 'react-cytoscapejs';

const { Header, Content, Footer } = Layout;

const layout = { name: 'preset' };
export default function Home(){
    const [novaTransicao, setNovaTransicao] = useState({
        caracter:'',
        origem:'',
        destino:''
    });

    const [inputs, setInputs] = useState(['gray']);

    const [estados, setEstados] = useState([
    { data: { id: '0', label: 'q0' }, position: { x: 0, y: 0 }, style: {'backgroundColor': 'green'}}])

    const [transicoes, setTransicoes] = useState([])

    const [elementos, setElementos] = useState([...estados].concat([...transicoes]));

    function handleSetTransicao(e, campo){
        const transicao = {...novaTransicao};
        if(campo===0){
            transicao.caracter=e.target.value;
        }
        else if(campo===1){
            transicao.origem=e.target.value.slice(1);
        }
        else{
            transicao.destino=e.target.value.slice(1);
        }
        setNovaTransicao(transicao);
    }

    function testaCaracteres(caracter, transicao){
        const caracteres = transicao.split(',');
        for( let aux of caracteres){
            if(aux===caracter){
                return true;
            }
        }
        return false;
    }

    function handleTeste(string, index){
        let auxString = string;
        let caracter = '';
        let estado = estados.filter(value=>{return value.style.backgroundColor==='green'})
        let transicao = transicoes.filter(value=>{return estado[0].data.id===value.data.source});
        let aux = true;
        let teste = false;
        while(aux){
            caracter = auxString[0];
            transicao = transicao.filter(value=>{return testaCaracteres(caracter, value.data.label)});
            if(transicao.length===0){
                if(estado[0].style.backgroundColor==='red'){
                    teste=true;
                }
                else{
                    teste=false;
                }
                aux=false;
            }
            else{
                if(auxString.length!==0){
                    estado = estados.filter(value=>{
                    for(let i=0; i<transicao.length; i++)
                    {
                        if(value.data.id===transicao[i].data.target){
                            return true;
                        }
                    }
                    return false
                    });
                    transicao = transicoes.filter(value=>
                        {
                            for(let i=0; i<estado.length; i++)
                            {
                                if(estado[i].data.id===value.data.source){
                                    return true;
                                }
                            }
                            return false
                            }
                    );
                    auxString = auxString.slice(1);
                }
                else if(transicao.length===0){
                    teste = false;
                    aux = false;
                }
                else{
                    auxString = string;
                }
            }
        }
        const auxInput = [...inputs]
        if(auxString.length!==0 || !teste){
            auxInput[index] = 'red';
        } 
        else{
            auxInput[index] = 'green';
        }
        setInputs(auxInput);
    }

    function handleAddTransicao(){
        if(novaTransicao.origem!=='' && novaTransicao.destino!==''){
            const teste1 = estados.filter(value=>{ return (value.data.id===novaTransicao.origem)});
            const teste2 = estados.filter(value=>{ return (value.data.id===novaTransicao.destino)});
            if(teste1.length!==0 && teste2.length!==0){
                const aux = {
                    data: 
                    {id: `${novaTransicao.origem}-${novaTransicao.destino}`,
                    source: novaTransicao.origem, 
                    target: novaTransicao.destino, 
                    label: novaTransicao.caracter 
                }
                }
                const teste = transicoes.filter(value=>{ return (value.data.id===aux.data.id)});
                const aux1 = [...transicoes];
                const aux2 = [...elementos];
                if(teste.length!==0){
                    let i =0
                    aux.data.label= `${teste[0].data.label},${aux.data.label}`;
                    for(;aux1[i].data.id!==aux.data.id;i++);
                    aux1[i]=aux;
                    i=0;
                    for(;aux2[i].data.id!==aux.data.id;i++);
                    aux2[i]=aux;
                }
                else{
                    aux1.push(aux);
                    aux2.push(aux);
                }
                setTransicoes(aux1);
                setElementos(aux2);
            }
            else{
                alert('Algum dos estados de entrada não existem')
            }
        }
        else{
            alert('Defina a origem e o destino');
        }
    }

    function handleReset(){
        const data = [{ data: { id: '0', label: 'q0' }, position: { x: 0, y: 0 }, style: {'backgroundColor': 'green'}}]
        setEstados(data);
        setElementos(data);
        setTransicoes([]);
    }

    function handleAddInput(){
        const aux = [...inputs];
        aux.push('gray');
        setInputs(aux);
    }

    function handleRemoveInput(){
        const aux = [...inputs];
        aux.pop();
        setInputs(aux);
    }

    function handleAddEstado(tipo){
        const style = tipo!==0 ? (tipo===1 ? {'backgroundColor': 'green'}:{'backgroundColor': 'red'}):{'backgroundColor': 'gray'};
        let i;
        for(i = 0; i<estados.length-1; i++){
            if(parseInt(estados[i].data.id)+1!==parseInt(estados[i+1].data.id)){
                break;
            }
        }
        const estado = {
            data:{ id: `${i+1}`, label: `q${i+1}`},
            position:{x:0, y:0},
            style: style
        }
        const aux = [...estados];
        const aux2 = [...elementos];
        aux.push(estado);
        aux2.push(estado);
        setEstados(aux);
        setElementos(aux2);
    }

    return(
        <>
        <Layout className="layout">
            <Header>
                <Link to='/'><h2 style={{color: 'white'}}>Voltar</h2></Link>
            </Header>
            <Content>
            <div className="AF">
            <CytoscapeComponent 
            elements={elementos} 
            layout={layout}  
            style={ { width: '50vw', height: '70vh', border: 'solid 2px blue'}}
            stylesheet={[{
                selector: 'node',
                style: {
                  'background-color': 'style(backgroundColor)',
                  'label': 'data(label)' 
                }
              },
              
              {
                selector: 'edge',
                style: {
                  'width': 3,
                  'curve-style': 'unbundled-bezier',
                  'line-color': '#ccc',
                  'target-arrow-color': '#ccc',
                  'label': 'data(label)',
                  'target-arrow-shape': 'triangle' 
              }}] 
            }
            />
            <div className="inputs">
                <label htmlFor='Estados'>Estado:</label>
                <div id="Estados">
                    <Button onClick={()=>handleAddEstado(0)}>Adicionar Estado</Button>
                    <Button onClick={()=>handleAddEstado(1)}>Adicionar Estado inicial</Button>
                    <Button onClick={()=>handleAddEstado(2)}>Adicionar Estado final</Button>
                </div>
                <label htmlFor='Transicoes'>Transição:</label>
                <div id="Transicoes">
                    <Button onClick={()=>handleAddTransicao()}>Adicionar transicao</Button>
                    <label htmlFor='caracter'>Caracter:</label>
                    <input onChange={(e)=>handleSetTransicao(e,0)} className='inputTransicao' id='caracter' type='text'></input>
                    <label htmlFor='ini'>Origem:</label>
                    <input onChange={(e)=>handleSetTransicao(e,1)}  className='inputTransicao' id='ini' type='text'></input>
                    <label htmlFor='Transicoes'>Destino:</label>
                    <input onChange={(e)=>handleSetTransicao(e,2)}  className='inputTransicao' id='fim' type='text'></input>
                </div>
                <label htmlFor='Teste'>Texto:</label>
                <div id='Teste'>
                    <div id='inputsTeste'>
                    {inputs.map((borderColor, index)=>{
                        return <StringInput index={index} setString={handleTeste} borderColor={borderColor}></StringInput>
                    })}
                    </div>
                    <div id='inputsAdd'>
                        <Button onClick={()=>handleAddInput()}>+</Button>
                        <Button onClick={()=>handleRemoveInput()}>-</Button>
                    </div>
                </div>
                <Button onClick={()=>handleReset()} id='Reset'>Reset</Button>
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