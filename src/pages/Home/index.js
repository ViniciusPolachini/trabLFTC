import React from 'react'
import { Layout, Button } from 'antd';
import './home.css';
import 'antd/dist/antd.css';
import { Link } from "react-router-dom";
const { Header, Content, Footer } = Layout;

export default function Home(){
    return(
        <>
        <Layout className="layout">
            <Header>
                <h2 style={{color: 'white'}}>Trabalho LFTC</h2>
            </Header>
            <Content>
            <div className="nav">
                <Button className='btn' type="primary"><Link to='/AF'>AF</Link></Button>
                <Button className='btn' type="primary"><Link to='/ER'>ER</Link></Button>
                <Button className='btn' type="primary"><Link to='/GR'>GR</Link></Button>
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