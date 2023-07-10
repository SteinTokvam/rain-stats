import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFraDato, addTilDato } from "../actions/Date";


export default function DatoFilter(props){

    const fraDato = useSelector(state => state.rootReducer.date.fraDato);
    const tilDato = useSelector(state => state.rootReducer.date.tilDato);

    const dispatch = useDispatch();

    function submit(event) {
        event.preventDefault(event.target.value)
        props.submit(fraDato, tilDato)
    }

    return(
        <form onSubmit={submit}>
            <input type="date" id="fraDato" name="fra-dato" value={fraDato} min={props.fraDato} max={props.tilDato} onChange={(e) => dispatch(addFraDato(e.target.value))}></input>
            <input type="date" id="tilDato" name="til-dato" value={tilDato} min={props.fraDato} max={props.tilDato} onChange={(e) => dispatch(addTilDato(e.target.value))}></input>
            <input type="submit" value="Filtrer" />
        </form>
    )
    }