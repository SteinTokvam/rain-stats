
export function convertDateString(date) {
    const split = date.split('/')
    return split[2]+'-'+split[1]+'-'+split[0]
}

export function dayMonthYear(date) {
    const split = date.split('-');
    return `${split[2]}/${split[1]}/${split[0]}`
}

export function getDateReversed(datoString) {
    const dateSplit = datoString.split("-")
        const year = parseInt(dateSplit[0], 10)
        const month = parseInt(dateSplit[1], 10)-1
        const day = parseInt(dateSplit[2], 10)
        return new Date(year, month, day)
}

export function getDate(datoString) {
    const dateSplit = datoString.split("/")
        const day = parseInt(dateSplit[0], 10)
        const month = parseInt(dateSplit[1], 10)-1
        const year = parseInt(dateSplit[2], 10)
        return new Date(year, month, day)
}

export function handleDates(event, fra, til) {
    event.preventDefault();
    
    const fraMonth = fra.getMonth() + 1 < 10 ? '0' + (fra.getMonth() + 1) : fra.getMonth() + 1 + '';
    const tilMonth = (til.getMonth()+1 < 10 ? '0' + (til.getMonth()+1) : til.getMonth()+1);

    const fraString = fra.getFullYear() + '-' + fraMonth + '-01';
    const tilString = til.getFullYear() + '-' + tilMonth + '-' + (til.getDate() < 10 ? '0' + til.getDate() : til.getDate());

    return {fra: fraString, til: tilString};
}