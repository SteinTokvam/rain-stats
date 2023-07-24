import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFraDato, addTilDato } from "../actions/Date";
import { handleDates } from "../utils/DateUtil";


export default function DatoFilter(props){

    const fraDato = useSelector(state => state.rootReducer.date.fraDato);
    const tilDato = useSelector(state => state.rootReducer.date.tilDato);

    const dispatch = useDispatch();

    function submit(event) {
        event.preventDefault()
        if(fraDato > tilDato) {
            console.log("From date is after to date.")
        }
        props.submit(fraDato, tilDato, false)
    }

    function thisMonth(event) {
        const fra = new Date()
        const til = new Date(fra.getFullYear(), fra.getMonth()+1, 0)

        const dates = handleDates(event, fra, til)
        dispatch(addFraDato(dates.fra))
        dispatch(addTilDato(dates.til))

        props.submit(dates.fra, dates.til, false)
    }

    function lastMonth(event){
        const fra = new Date()
        fra.setMonth(fra.getMonth()-1)
        const til = new Date(fra.getFullYear(), fra.getMonth()+1, 0)

        const dates = handleDates(event, fra, til)
        dispatch(addFraDato(dates.fra))
        dispatch(addTilDato(dates.til))

        props.submit(dates.fra, dates.til, false)
    }

    function thisYear(event){
        const fra = new Date()
        fra.setMonth(0)
        const til = new Date()
        til.setDate(til.getDate()+1)

        const dates = handleDates(event, fra, til)
        dispatch(addFraDato(dates.fra))
        dispatch(addTilDato(dates.til))

        props.submit(dates.fra, dates.til, false)
    }

    function allData(event) {
        const fra = new Date(2010, 0, 1);
        fra.setMonth(0)
        const til = new Date()
        til.setDate(til.getDate()+1)

        const dates = handleDates(event, fra, til)
        dispatch(addFraDato(dates.fra))
        dispatch(addTilDato(dates.til))

        props.submit(dates.fra, dates.til, true)
    }

    return(
        <div>
            <form onSubmit={thisMonth}>
                <input type="submit" value='Denne måneden' />
            </form>
            <form onSubmit={lastMonth}>
                <input type="submit" value='Forrige måned' />
            </form>
            <form onSubmit={thisYear}>
                <input type="submit" value='I år' />
            </form>
            <form onSubmit={allData}>
                <input type="submit" value='All data' />
            </form>
            <form onSubmit={submit}>
                <input type="date" id="fraDato" name="fra-dato" value={fraDato} min={props.fraDato} max={tilDato} onChange={(e) => dispatch(addFraDato(e.target.value))}></input>
                <input type="date" id="tilDato" name="til-dato" value={tilDato} min={fraDato} max={props.tilDato} onChange={(e) => dispatch(addTilDato(e.target.value))}></input>
                <input type="submit" value="Filtrer" />
            </form>
        </div>
    )
    }