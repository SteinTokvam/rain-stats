import React, { useEffect } from "react";
import './Dashboard.css';
import Total from "./Total";
import Tabell from "./Tabell";
import DatoFilter from "./DatoFilter";
import { useSelector, useDispatch } from 'react-redux';
import { addTotalRain, addRainData, addRainDataFiltered } from '../../actions/Rain';
import { addFraDato, addTilDato } from '../../actions/Date';
import Spinner from "../Spinner";
import { toast } from "react-hot-toast";
import { logOut } from "../../actions/User";
import { useNavigate } from "react-router-dom";
import { convertDateString, dayMonthYear, getDate, getDateReversed } from "../../utils/DateUtil";
import { getQueryCode } from "../../utils/NetatmoAuth";
import { getRefreshTokenFromFirebase } from "../../utils/firebase";
import { base_url } from "../../utils/Urls";
import Graph from "./Graph";
import { getDataFromNetatmo } from "../../utils/Netatmo";

export default function Dashboard() {
    const rainData = useSelector((state) => state.rootReducer.rain.rainData);
    const dateUnix = useSelector((state) => state.rootReducer.rain.dateUnix)
    const rainDataFiltered = useSelector((state) => state.rootReducer.rain.rainDataFiltered);
    const totalRain = useSelector((state) => state.rootReducer.rain.totalRain);
    const uid = useSelector((state) => state.rootReducer.user.uid);

    const fraDato = useSelector(state => state.rootReducer.date.fraDato);
    const tilDato = useSelector(state => state.rootReducer.date.tilDato);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function calculateTotalRain(rainData) {
        var totalRain = 0;
            rainData.forEach(element => {
                totalRain = totalRain + element.value
            });
            return totalRain
    }

      useEffect(() => {
        function fetchRainData() {
            
            getDataFromNetatmo(uid, '1day')
            .then(rain => {
                console.log(rain)
                dispatch(addTotalRain(calculateTotalRain(rain)))
                dispatch(addRainData(rain))
                dispatch(addRainDataFiltered(rain))
                dispatch(addFraDato(convertDateString(rain[0].key)));
                dispatch(addTilDato(convertDateString(rain[rain.length-1].key)));
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

                            dispatch(logOut())
                            window.location.replace(base_url.redirect_uri)//skitten måte å gjøre det på.. appen krasjer på login skjermen.. denne linjen tvinger en reload i stedet for
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
                    console.log(currentUrl)
                    window.location.replace(currentUrl[0])
                }
                fetchRainData()
            }
        })

    }, [dispatch, uid, navigate]);

    const max = rainDataFiltered.length > 0 ? rainDataFiltered.reduce(function(prev, current) {
        return (prev.value > current.value) ? prev : current
    }) : ''

    function filtrerDato(fraDato, tilDato, useDateFromData) {//TODO: se på å sette til dato
        const keptIndexes = []
        const filteredData = rainData.filter((e, i) => {
            const rainDate = getDate(e.key)
            const fraDatoDate = getDateReversed(fraDato)
            const tilDatoDate = getDateReversed(tilDato)
            
            const filter = fraDatoDate <= rainDate && rainDate <= tilDatoDate

            if(filter) {
                keptIndexes.push(i)
            }
            return filter
        })

        if(useDateFromData) {
            const split = filteredData[0].key.split('/')
            const reversed = `${split[2]}-${split[1]}-${split[0]}`

            dispatch(addFraDato(reversed))
        }

        if(filteredData.length > 0) {
            dispatch(addRainDataFiltered(filteredData.toReversed()))
            dispatch(addTotalRain(calculateTotalRain(filteredData)))
        } else {
            dispatch(addFraDato(convertDateString(rainDataFiltered[0].key)))
            dispatch(addTilDato(convertDateString(rainDataFiltered[rainDataFiltered.length-1].key)))
            toast.error('Det finnes ingen regndager mellom disse datoene.')
        }
    }

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
                <Graph rainData={rainDataFiltered.toReversed()} color='light'/>
                <Tabell rainData={rainDataFiltered}/>
                
            </> : <Spinner />}
            </div>
    )
}