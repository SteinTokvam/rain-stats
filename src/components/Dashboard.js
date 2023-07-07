import React, { useEffect } from "react";
import './Dashboard.css';
import Total from "./Total";
import Tabell from "./Tabell";
import DatoFilter from "./DatoFilter";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { addTotalRain, addRainData, addRainDataFiltered } from '../actions';


export default function Dashboard() {
    const rainData = useSelector((state) => state.rootReducer.rain.rainData);
    const rainDataFiltered = useSelector((state) => state.rootReducer.rain.rainDataFiltered);
    const totalRain = useSelector((state) => state.rootReducer.rain.totalRain);
    
    const dispatch = useDispatch();

    function calculateTotalRain(list) {
        var totalRain = 0;
            list.forEach(element => {
                totalRain = totalRain + element.value
            });
            return totalRain
    }

      useEffect(() => {
        fetch('https://rain-stats-serverless.vercel.app/api/data')
        .then(response => response.json())
        .then(list => {
            dispatch(addTotalRain(calculateTotalRain(list)))
            dispatch(addRainData(list))
            dispatch(addRainDataFiltered(list))
            return
        })
    }, [dispatch]);

    const max = rainDataFiltered.length > 0 ? rainDataFiltered.reduce(function(prev, current) {
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
        dispatch(addRainDataFiltered(filteredData))
        dispatch(addTotalRain(calculateTotalRain(filteredData)))
    }

    function convertDateString(date) {
        const split = date.split('/')
        return split[2]+'-'+split[1]+'-'+split[0]
    }

    const renderChart = (
        <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={rainDataFiltered}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="key" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#8884d8" name="Nedbør" fillOpacity={1} fill="url(#colorUv)" />
            <Legend verticalAlign="top" height={36}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      );

    return(
        <div className="Dashboard">
            {rainDataFiltered.length > 0 ? <>
                <Total totalRain={totalRain}/>
                <p>Det har regnet <b>{rainDataFiltered.length}</b> dager mellom {rainDataFiltered[0].key} og {rainDataFiltered[rainDataFiltered.length-1].key} og 
                dagen med mest regn var <b>{max.key}</b> med <b>{max.value}</b> mm!</p>
                <p>Det har regnet <b>{(totalRain/rainDataFiltered.length).toFixed(2)}</b> i snitt for hver regndag.</p>
                <DatoFilter submit={filtrerDato} fraDato={convertDateString(rainDataFiltered[0].key)} tilDato={convertDateString(rainDataFiltered[rainDataFiltered.length-1].key)}/>
                {renderChart}
                <Tabell rainData={rainDataFiltered}/>
            </> : ''}
            </div>
    )
}