import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {GETTIMEZONEURL, INTERVAL} from '../../config/time-zone-config';

export const DisplayTime = (props) => {

    const [time, setTime] = useState('');
    const {selectedZone} = props;

    useEffect(() => {
        if(selectedZone.length) {
            getTime();
            setInterval(() => {
                getTime();
            }, INTERVAL);
        }
    }, []);

    function getTime() {
        axios.get(GETTIMEZONEURL + `${selectedZone}`, {crossdomain: true}).then(res =>  {
            setTime(res.data?.currTime?.formatted);
        });
    }

    return (
        <div>
            {time?.length ? <div>{time}</div> : ''}
        </div>
    )
}