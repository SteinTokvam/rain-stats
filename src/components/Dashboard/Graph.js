import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Graph({rainData}) {

    return(
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
            <AreaChart
                data={rainData}
                margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
                }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor='#67a1d4' stopOpacity={0.8}/>
                    <stop offset="95%" stopColor='#67a1d4' stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="key" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke='#67a1d4' name="Nedbør" fillOpacity={1} fill='url(#colorUv)' />
                <Legend verticalAlign="top" height={36}/>
            </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}