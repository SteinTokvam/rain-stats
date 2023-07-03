import React, { useState } from "react";

export default function DatoFilter(props){

    const [fraDato, setFraDato] = useState(props.fraDato)
    const [tilDato, setTilDato] = useState(props.tilDato)

    function submit(event) {
        event.preventDefault(event.target.value)
        props.submit(fraDato, tilDato)
    }

    return(
        <form onSubmit={submit}>
            <input type="date" id="fraDato" name="fra-dato" value={fraDato} onChange={(e) => setFraDato(e.target.value)}></input>
            <input type="date" id="tilDato" name="til-dato" value={tilDato} onChange={(e) => setTilDato(e.target.value)}></input>
            <input type="submit" value="Submit" />
        </form>
    )
    }