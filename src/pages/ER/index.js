import React from 'react'
import {useState} from 'react'
import { Layout} from 'antd';
import { Link } from "react-router-dom";
import './style.css';
import 'antd/dist/antd.css';
import StringInput from './component/stringInput';

const { Header, Content, Footer } = Layout;


export default function Home(){
    const [string, setString] = useState("");
    const [er, setER] = useState("");
    const [borderColor, setBorderColor] = useState("gray");

    function handleTeste(string){
        const expressaoRegular = new RegExp(er);
        console.log(string);
        console.log(er);
        if(string!==""){
            if(expressaoRegular.test(string)){
                setBorderColor("green");
            }
            else{
                setBorderColor("red");
            }
        }
        else{
            setBorderColor("gray")
        }
    }

    return(
        <>
        <Layout className="layout">
            <Header>
                <Link to='/'><h2 style={{color: 'white'}}>Voltar</h2></Link>
            </Header>
            <Content>
            <div className="er">
                <div>
                    <label htmlFor="ER">Expressão Regular</label>
                    <input 
                    id="ER"
                    type='text' 
                    onChange={(e)=>setER(e.target.value)}
                    style={{
                        height: '10vh',
                        width: '15vw',
                        fontSize: '2vw'
                    }}>
                    </input>
                </div>
                <div>
                    <label htmlFor="string">String</label>
                    <StringInput 
                    id="string" 
                    setString={handleTeste} 
                    borderColor={borderColor}>
                    </StringInput>
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