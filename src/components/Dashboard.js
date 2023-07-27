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
import { logOut } from "../actions/User";
import { useNavigate } from "react-router-dom";
import { convertDateString, dayMonthYear, getDate, getDateReversed } from "../utils/DateUtil";
import { getQueryCode, hasSavedUUID } from "../NetatmoAuth";
import { getRefreshTokenFromFirebase } from "../firebase";

export default function Dashboard() {
    const rainData = useSelector((state) => state.rootReducer.rain.rainData);
    const rainDataFiltered = useSelector((state) => state.rootReducer.rain.rainDataFiltered);
    const totalRain = useSelector((state) => state.rootReducer.rain.totalRain);
    const uid = useSelector((state) => state.rootReducer.user.uid);

    const fraDato = useSelector(state => state.rootReducer.date.fraDato);
    const tilDato = useSelector(state => state.rootReducer.date.tilDato);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function calculateTotalRain(list) {
        var totalRain = 0;
            list.forEach(element => {
                totalRain = totalRain + element.value
            });
            return totalRain
    }

      useEffect(() => {
        function fetchRainData() {
            
            fetch('https://rain-stats-serverless.vercel.app/api/netatmo/refresh',
            {
                    method: 'POST',
                    body: JSON.stringify({
                        refresh_token: !uid ? window.sessionStorage.getItem('uid') : uid
                    })
            }
            )
            .then(response => response.json())
            .then(list => {
                console.log(list)
                dispatch(addTotalRain(calculateTotalRain(list)))
                dispatch(addRainData(list))
                dispatch(addRainDataFiltered(list))
                dispatch(addFraDato(convertDateString(list[0].key)));
                dispatch(addTilDato(convertDateString(list[list.length-1].key)));
                return
            })
        }
        getRefreshTokenFromFirebase(!uid ? window.sessionStorage.getItem('uid') : uid)
        .then(token => {
            if(token.error) {
                getQueryCode().then(res => {
                    if(res) {
                        if(res.error) {
                            console.error(`Failed to get authorization code from Netatmo.`)
                            window.sessionStorage.clear()
                            //toast.error('Du godto ikke bruk av dine Netatmo data. Logger ut...')
                            dispatch(logOut())
                            window.location.replace('http://localhost:3001')//skitten måte å gjøre det på.. appen krasjer på login skjermen.. denne linjen tvinger en reload i stedet for
                            return
                        }
                        sessionStorage.setItem('auth_code', res)
                        console.log('går til /coderecieved')
                        navigate('/coderecieved')
                    }
                })
            } else {
                const currentUrl = window.location.href.split('?')
                if(currentUrl.length > 1) {
                    const endpoint = currentUrl[1].split('#')
                    console.log(currentUrl)
                    window.location.replace(currentUrl[0])
                }
                fetchRainData()
            }
        })

        //fetchRainData()
    }, [dispatch, uid]);

    const max = rainDataFiltered.length > 0 ? rainDataFiltered.reduce(function(prev, current) {
        return (prev.value > current.value) ? prev : current
    }) : ''

    function filtrerDato(fraDato, tilDato, useDateFromData) {
        const filteredData = rainData.filter(e => {
            const rainDate = getDate(e.key)
            const fraDatoDate = getDateReversed(fraDato)
            const tilDatoDate = getDateReversed(tilDato)
            
            return fraDatoDate <= rainDate && rainDate <= tilDatoDate
        })

        if(useDateFromData) {
            const split = filteredData[0].key.split('/')
            const reversed = `${split[2]}-${split[1]}-${split[0]}`

            dispatch(addFraDato(reversed))
        }

        if(filteredData.length > 0) {
            dispatch(addRainDataFiltered(filteredData))
            dispatch(addTotalRain(calculateTotalRain(filteredData)))
        } else {
            toast.error('Det finnes ingen regndager mellom disse datoene.')
        }
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

    function handleLogOut(event){
        event.preventDefault();
        dispatch(logOut())
        window.sessionStorage.clear()
        navigate('/login', true)
    }

    return(
        <div className="Dashboard">
            {rainDataFiltered.length > 0 ?
            <>
                <form onSubmit={handleLogOut}>
                    <input type="submit" value="Logg ut" />
                </form>
                <Total totalRain={totalRain}/>
                <p>Det har regnet <b>{rainDataFiltered.length}</b> dager mellom {rainDataFiltered[0].key === fraDato ? fraDato : dayMonthYear(fraDato)} og {dayMonthYear(tilDato)} og
                dagen med mest regn var <b>{max.key}</b> med <b>{max.value}</b> mm!</p>
                <p>Det har regnet <b>{(totalRain/rainDataFiltered.length).toFixed(2)}</b> i snitt for hver regndag.</p>
                <DatoFilter submit={filtrerDato} fraDato={convertDateString(rainData[0].key)} tilDato={convertDateString(rainData[rainData.length-1].key)}/>
                {renderChart}
                <Tabell rainData={rainDataFiltered}/>
            </> : <Spinner />}
            </div>
    )
}