import React from "react";
import './Total.css'

export default function Total({totalRain}) {
    return(
    <div className="Total">
        <h3>{totalRain.toFixed(1)} mm</h3>
        <p>Total nedbør</p>
    </div>
    )
}