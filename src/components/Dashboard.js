import React, { useEffect } from "react";
import './Dashboard.css';
import Total from "./Total";
import Tabell from "./Tabell";
import DatoFilter from "./DatoFilter";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { addTotalRain, addRainData, addRainDataFiltered } from '../actions/Rain';
import { addFraDato, addTilDato } from '../actions/Date';
import Spinner from "./Spinner";
import { toast } from "react-hot-toast";

export default function Dashboard() {
    const rainData = useSelector((state) => state.rootReducer.rain.rainData);
    const rainDataFiltered = useSelector((state) => state.rootReducer.rain.rainDataFiltered);
    const totalRain = useSelector((state) => state.rootReducer.rain.totalRain);

    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(document.location.search)

    function calculateTotalRain(list) {
        var totalRain = 0;
            list.forEach(element => {
                totalRain = totalRain + element.value
            });
            return totalRain
    }

      useEffect(() => {
        fetch('https://rain-stats-serverless.vercel.app/api/netatmo/refresh')
        .then(response => response.json())
        .then(list => {
            dispatch(addTotalRain(calculateTotalRain(list)))
            dispatch(addRainData(list))
            dispatch(addRainDataFiltered(list))
            dispatch(addFraDato(convertDateString(list[0].key)));
            dispatch(addTilDato(convertDateString(list[list.length-1].key)));
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

        if(filteredData.length > 0) {
            dispatch(addRainDataFiltered(filteredData))
            dispatch(addTotalRain(calculateTotalRain(filteredData)))
        } else {
            toast.error('Det finnes ingen regndager mellom disse datoene.')
        }
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

    function getQueryCode() {
        const uuid = window.sessionStorage.getItem("uuid");
        if(uuid === searchParams.get('state')) {
            console.log('UUID er lik.');
            fetch('http://localhost:3000/api/netatmo/token', {
                method: 'POST',
                body: JSON.stringify({'auth_code': searchParams.get('code')})
            }).then(r => r.json())
            .then(r => console.log(r))
        } else if(searchParams.get('error') === 'access_denied') {
            console.log('Brukeren aksepterte ikke at vi kan hente data fra netatmo')
        } else {
            console.error('UUID er IKKE like! ' + uuid + ' fra netatmo: ' + searchParams.get('state'))
        }
    }

    return(
        <div className="Dashboard">
            {rainDataFiltered.length > 0 ? <>
               { getQueryCode()}
                <Total totalRain={totalRain}/>
                <p>Det har regnet <b>{rainDataFiltered.length}</b> dager mellom {rainDataFiltered[0].key} og {rainDataFiltered[rainDataFiltered.length-1].key} og 
                dagen med mest regn var <b>{max.key}</b> med <b>{max.value}</b> mm!</p>
                <p>Det har regnet <b>{(totalRain/rainDataFiltered.length).toFixed(2)}</b> i snitt for hver regndag.</p>
                <DatoFilter submit={filtrerDato} fraDato={convertDateString(rainData[0].key)} tilDato={convertDateString(rainData[rainData.length-1].key)}/>
                {renderChart}
                <Tabell rainData={rainDataFiltered}/>
            </> : <Spinner />}
            </div>
    )
}