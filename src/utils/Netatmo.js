import { base_url } from "./Urls";

export function getDataFromNetatmo(uid, scale, date_begin, date_end) {

    return fetch(`${base_url.backend}/api/netatmo/refresh`,
    {
            method: 'POST',
            body: JSON.stringify({
                refresh_token: !uid ? window.sessionStorage.getItem('uid') : uid,
                scale: scale,
                date_begin: 0,
                date_end: date_end
            })
    }
    )
    .then(response => response.json())
}