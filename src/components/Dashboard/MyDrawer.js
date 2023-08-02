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

export default function MyDrawer({ date }) {
    const drawer = useSelector(state => state.rootReducer.site.drawerOpen)
    const rainDataFiltered = useSelector(state => state.rootReducer.rain.rainDataFiltered)
    const uid = useSelector((state) => state.rootReducer.user.uid);
    const dispatch = useDispatch()

    useEffect(() => {
        getDataFromNetatmo(uid, '1hour')
    })

    return (
        <Drawer title={`Time for time ${ date }`} open={drawer}  onDismiss={() => dispatch(toggleDrawer({open: false, date: ''}))}>
            <p>Her har du en oversikt over når det regnet i løpet av den valgte dagen.</p>
            <Graph rainDataFiltered={rainDataFiltered} color='dark'/>
        </Drawer>
    )
}