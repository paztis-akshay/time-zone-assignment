import React , {useEffect, useState} from 'react';
import axios from 'axios';
import {GETTIMEZONEURL, INTERVAL, GETZONESLISTURL} from '../../config/time-zone-config';

export const TimeZoneComponent = (props) => {

    const [selectedTimeZone, setSelectedTimeZone] = useState('');
    const [timeZones, setTimeZones] = useState([]);
    const [currTime, setCurrTime] = useState('');

    useEffect(() => {
        axios.get(GETZONESLISTURL, {crossdomain: true}).then(res => {
          setTimeZones(res.data.zones)
        })
        .catch((err => {
            console.log(err);
        }));
      }, []);

    function getTimeZone(selectedZone) {
        axios.get(GETTIMEZONEURL + `${selectedZone}`, {crossdomain: true}).then(res =>  {
            setCurrTime(res.data?.currTime?.formatted);
        });
    }

    useEffect(() => {
        if(selectedTimeZone.length) {
            getTimeZone(selectedTimeZone);
            setInterval(() => {
                getTimeZone(selectedTimeZone);
            }, INTERVAL);
        }
    }, [selectedTimeZone]);

    function handleDropdownChange(e) {
        setSelectedTimeZone(e.target.value);
    }

    return (
            <div className = 'box'>
                    <select id="dropdown" value={selectedTimeZone} onChange={handleDropdownChange}>
                        {
                            timeZones.map((item, index) => {
                                return <option key={index} value={item.countryName}>{item.zoneName}</option>
                            })
                        }
                    </select>
                {currTime?.length ? <div>{props.currTime}</div> : ''}
            </div>
    )
}

export default TimeZoneComponent;