import './Spinner.css'

export default function Spinner() {
    return(
    <div className="forecast">
        <div className="forecast__rainy">
            <div className="forecast__rainy__rain forecast__rainy__rain--one" />
            <div className="forecast__rainy__rain forecast__rainy__rain--two" />
            <div className="forecast__rainy__rain forecast__rainy__rain--three" />
            <div className="forecast__rainy__rain forecast__rainy__rain--four" />
            <div className="forecast__rainy__cloud forecast__rainy__cloud--grey" />
        </div>
        <div className="forecast__label">Leter etter regnværsdager...</div>
  </div>
  )
}