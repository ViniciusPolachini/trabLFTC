import React from 'react'
import 'antd/dist/antd.css';

const style={
    container:{
        display: 'flex',
        flexDirection: 'row'
    },
    input:{
        height: '10vh',
        width: '15vw',
        fontSize: '2vw',
    }
}

export default function Regra({esquerda, direita, setRegra, index}){
    return(
        <div style={style.container}>
            <input style={style.input} value={esquerda} onChange={(e)=>setRegra(e, index, 'esquerda')} type='text'>
            </input>
            <h3>{"->"}</h3>
            <input style={style.input} value={direita} onChange={(e)=>setRegra(e, index, 'direita')} type='text'></input>
        </div>
    );
}