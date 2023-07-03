import React, { useState, useEffect } from "react";
import './Dashboard.css';
import Total from "./Total";
import Tabell from "./Tabell";
import DatoFilter from "./DatoFilter";

export default function Dashboard() {
    const [rainData, setRainData] = useState('')
    const [rainDataFiltered, setRainDataFiltered] = useState('')
    const [totalRain, setTotalRain] = useState(0)
    
    function calculateTotalRain(list) {
        var totalRain = 0;
            list.forEach(element => {
                totalRain = totalRain + element.value
            });
            return totalRain
    }

      useEffect(() => {
        fetch('https://rain-collector.ew.r.appspot.com/data')
        .then(response => response.json())
        .then(list => {
            setTotalRain(calculateTotalRain(list))
            setRainData(list)
            setRainDataFiltered(list)
            return
        })
    }, []);

    const max = rainDataFiltered !== '' ? rainDataFiltered.reduce(function(prev, current) {
        return (prev.value > current.value) ? prev : current
    }) : ''

    function getDate(datoString) {
        const dateSplit = datoString.split("/")
            const day = parseInt(dateSplit[0], 10)
            const month = parseInt(dateSplit[1], 10)-1
            const year = parseInt(dateSplit[2], 10)
            return new Date(year, month, day)
    }

    function getDateReversed(datoString) {
        const dateSplit = datoString.split("-")
            const year = parseInt(dateSplit[0], 10)
            const month = parseInt(dateSplit[1], 10)-1
            const day = parseInt(dateSplit[2], 10)
            return new Date(year, month, day)
    }

    function filtrerDato(fraDato, tilDato) {
        const filteredData = rainData.filter(e => {
            const rainDate = getDate(e.key)
            const fraDatoDate = getDateReversed(fraDato)
            const tilDatoDate = getDateReversed(tilDato)
            
            return fraDatoDate <= rainDate && rainDate <= tilDatoDate
        })
        setRainDataFiltered(filteredData)
        setTotalRain(calculateTotalRain(filteredData))
    }

    function convertDateString(date) {
        const split = date.split('/')
        return split[2]+'-'+split[1]+'-'+split[0]
    }

    return(
        <div className="Dashboard">
            
            {rainDataFiltered !== '' ? <>
                <Total totalRain={totalRain}/>
                <p>Det har regnet <b>{rainDataFiltered.length}</b> dager mellom {rainDataFiltered[0].key} og {rainDataFiltered[rainDataFiltered.length-1].key} og dagen med mest regn var <b>{max.key}</b> med <b>{max.value}</b> mm!</p>
                <DatoFilter submit={filtrerDato} fraDato={convertDateString(rainDataFiltered[0].key)} tilDato={convertDateString(rainDataFiltered[rainDataFiltered.length-1].key)}/>
                <Tabell rainData={rainDataFiltered}/>
            </> : ''}
              
        </div>
    )
}