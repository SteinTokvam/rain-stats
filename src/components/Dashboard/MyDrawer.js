import { Drawer } from '@entur/modal';
import '@entur/modal/dist/styles.css';
import '@entur/a11y/dist/styles.css';
import '@entur/button/dist/styles.css';
import '@entur/icons/dist/styles.css';
import '@entur/layout/dist/styles.css';
import '@entur/loader/dist/styles.css';
import '@entur/typography/dist/styles.css';

import { useDispatch, useSelector } from 'react-redux';
import { toggleDrawer } from '../../actions/Site';
import Graph from './Graph';
import { useEffect } from 'react';
import { getDataFromNetatmo } from '../../utils/Netatmo';
import { addHourlyRainData, removeHourlyData } from '../../actions/Rain';
import Spinner from '../Spinner';

export default function MyDrawer({ date, dateUnix }) {
    const drawer = useSelector(state => state.rootReducer.site.drawerOpen)
    const hourlyRainData = useSelector(state => state.rootReducer.rain.hourlyRainData)
    const uid = useSelector(state => state.rootReducer.user.uid);
    const dispatch = useDispatch()

    useEffect(() => {
        if(dateUnix === -1) {
            console.warn('Date to search rain data not set.')
            return
        }
        const date_begin = parseInt(dateUnix) - 43200
        const date_end = parseInt(date_begin) + 86400
        getDataFromNetatmo(uid, '1hour', date_begin, date_end).then(hourlyRain => {
            function formatHours(date, offsetOneHour) {//foramt date to show only hour number as string. prefixing a 0 if hour < 10
                const hour = offsetOneHour ? date.getHours() + 1 : date.getHours()
                return hour < 10 ? '0' + hour : hour 
            }

            const ret = hourlyRain.map(e => {return {key: formatHours(new Date(e.key)) + '-' + (formatHours(new Date(e.key), true)), value: e.value}})
            dispatch(addHourlyRainData(ret))
            return
        })
    }, [dispatch, uid, dateUnix])

    function renderGraph(){
        if(dateUnix === -1) {
            return <p>Kunne ikke hente regndata for denne dagen. Prøv igjen senere.</p>
        } 
        return (
        <>
            <p>Her har du en oversikt over når det regnet i løpet av den valgte dagen.</p>
            {hourlyRainData.length > 0 ? <Graph rainData={hourlyRainData} color='dark'/> : <Spinner />}
        </>
        )
    }

    function dismissDrawer() {
        dispatch(toggleDrawer({open: false, date: '', dateUnix: -1}))
        dispatch(removeHourlyData())
    }

    return (
        <Drawer title={`Time for time ${ date }`} open={drawer}  onDismiss={dismissDrawer}>
            {renderGraph()}
        </Drawer>
    )
}