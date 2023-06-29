import React, { useState, useEffect } from "react";
import './Dashboard.css';
import Total from "./Total";
import Tabell from "./Tabell";

export default function Dashboard() {
    const [rainData, setRainData] = useState('')
    const [totalRain, setTotalRain] = useState(0)
    
      useEffect(() => {
        fetch('http://localhost:6001/data')
        .then(response => response.json())
        .then(list => {
            var totalRain = 0;
            list.forEach(element => {
                totalRain = totalRain + element.value
            });
            setTotalRain(totalRain)
            setRainData(list)
            return
        })
    }, []);

    const max = rainData !== '' ? rainData.reduce(function(prev, current) {
        return (prev.value > current.value) ? prev : current
    }) : ''

    return(
        <div className="Dashboard">
            {rainData !== '' ? <>
                <Total totalRain={totalRain}/>
                <p>Det har regnet <b>{rainData.length}</b> dager og dagen med mest regn var <b>{max.key}</b> med <b>{max.value}</b> mm!</p>
                <Tabell rainData={rainData}/>
            </> : ''}
              
        </div>
    )
}