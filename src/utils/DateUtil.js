
//TODO: se på å fjerne en av metodene som konverterer TIL Date() og heller konverter til rett string format og så til Date(). Se også på navngivningen til metodene.

export function convertDateString(date) {//konverterer dd/mm/yyyy til yyyy-mm-dd
    const split = date.split('/')
    return split[2]+'-'+split[1]+'-'+split[0]
}

export function dayMonthYear(date) {//konverterer yyyy-mm-dd til dd/mm/yyy
    const split = date.split('-');
    return `${split[2]}/${split[1]}/${split[0]}`
}

export function getDateReversed(datoString) {//konverterer yyyy-mm-dd til Date()
    const dateSplit = datoString.split("-")
        const year = parseInt(dateSplit[0], 10)
        const month = parseInt(dateSplit[1], 10)-1
        const day = parseInt(dateSplit[2], 10)
        return new Date(year, month, day)
}

export function getDate(datoString) {//konverterer dd/mm/yyyy til Date()
    const dateSplit = datoString.split("/")
        const day = parseInt(dateSplit[0], 10)
        const month = parseInt(dateSplit[1], 10)-1
        const year = parseInt(dateSplit[2], 10)
        return new Date(year, month, day)
}

export function handleDates(event, fra, til) {//tar inn fra og til Date() og konverterer til dd-mm-yyyy i et objekt med fra og til
    event.preventDefault();
    
    const fraMonth = fra.getMonth() + 1 < 10 ? '0' + (fra.getMonth() + 1) : fra.getMonth() + 1 + '';
    const tilMonth = (til.getMonth()+1 < 10 ? '0' + (til.getMonth()+1) : til.getMonth()+1);

    const fraString = fra.getFullYear() + '-' + fraMonth + '-01';
    const tilString = til.getFullYear() + '-' + tilMonth + '-' + (til.getDate() < 10 ? '0' + til.getDate() : til.getDate());

    return {fra: fraString, til: tilString};
}