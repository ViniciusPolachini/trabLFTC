import React from 'react'
import 'antd/dist/antd.css';

export default function StringInput({borderColor, setString}){
    return(
        <>
            <input 
            type='text' 
            onChange={(e)=>setString(e.target.value)}
            style={{
                borderColor: borderColor,
                border: '2px solid',
                height: '10vh',
                width: '15vw',
                fontSize: '2vw',
            }}
            >
            </input>
        </>
    );
}