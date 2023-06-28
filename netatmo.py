import requests
from datetime import datetime
from datetime import timedelta
import json
import firebase_admin
from firebase_admin import db

access_token = '5e0376d597d026000c293c9e|b84b2ba205592bb851f6ac13449bc1a3'
refresh_token = '5e0376d597d026000c293c9e|9fd3bc9060db3a1dd437a1e03e7952b7'
client_id = '649916fc00a931316f0c776e'
client_secret = '5GE72ATAJd44qhYxdOQrZixcPkq0ktTtKGzer'

base_url = 'https://api.netatmo.com'
format = '%d/%m/%Y'

def get_refresh_token(base_url , refresh_token, access_token, client_id, client_secret):#trenger access token og refresh token. dette vil man få returnert et nytt sett av som en må bruke videre.
    #test om man kan få nytt sett etter at det gamle har gått ut eller om man må setter opp refresh til når nå enn tokenet går ut

    endpoint = base_url + '/oauth2/token'

    payload = {
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
            'client_id': client_id,
            'client_secret': client_secret
        }
    
    response = requests.post(endpoint, data=payload)

    if(response.status_code == 200): 
        return response.json()['access_token']
    else:
        print('Kunne ikke refreshe token.')
        print(response.json())
        print(endpoint)

def call_api_with_bearer_token(bearer_token):
    url = base_url + '/api/getmeasure'
    headers = {
        'Authorization': f'Bearer {bearer_token}',
        'Content-Type': 'application/json'
    }

    params = {
        'device_id': '70:ee:50:3e:fc:82',
        'module_id': '05:00:00:07:e1:fa',
        'scale': '1day',
        'type': 'sum_rain',
        'optimize': 'false',
        'real_time': 'false'
    }
    
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(response.json())
        return None

def create_json_object(keys, values, format):
    if len(keys) != len(values):
        return None
    
    json_object = {}
    for key, value in zip(keys, values):
        json_object[key.strftime(format)] = value[0]
    
    return json_object

access_token = get_refresh_token(base_url, refresh_token, access_token, client_id, client_secret)

response_data = call_api_with_bearer_token(access_token)

if response_data is not None:
    datoer_i_epoch = []
    datoer_lesbar = []
    regn_pr_dag = []
    
    for r in response_data['body']:
        date = datetime.fromtimestamp(int(r))
        datoer_lesbar.append(date)
        datoer_i_epoch.append(r)

    for epoch in datoer_i_epoch:
        regn_pr_dag.append(response_data['body'][epoch])

    konvertert_til_lesbar_datoer = create_json_object(keys=datoer_lesbar, values=regn_pr_dag, format=format)
    
    cred_obj = firebase_admin.credentials.Certificate('rain-collector-firebase-admin-keys.json')
    default_app = firebase_admin.initialize_app(cred_obj, {
        'databaseURL': 'https://rain-collector-default-rtdb.europe-west1.firebasedatabase.app'
    })
    ref = db.reference("/rain")

    for elem in konvertert_til_lesbar_datoer:
        value = {'key': elem,
                 'value': konvertert_til_lesbar_datoer[elem]
                 }
        yesterday = datetime.today() - timedelta(days=1)
        
        if value['value'] > 0.0 and datetime.strptime(value['key'], format).strftime(format) == yesterday.strftime(format): 
            #ref.push().set(value)
            print('sent ' + str(value) + ' to firebase.')
        elif datetime.strptime(value['key'], format).strftime(format) == yesterday.strftime(format):
            print('Det regnet ikke i går, så ingenting å lagre ned.')

else:
    print('Feil ved API-kall.')



