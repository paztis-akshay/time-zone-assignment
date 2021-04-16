import React , {useEffect, useState} from 'react';
import axios from 'axios';
import {GETTIMEZONEURL, INTERVAL} from '../../config/time-zone-config';

export const TimeZoneComponent = (props) => {

    const [selectedTimeZone, setSelectedTimeZone] = useState({});
    const [timeZones, setTimeZones] = useState([]);
    const [currTime, setCurrTime] = useState('');

    useEffect(() => {
        axios.get(GETTIMEZONEURL, {crossdomain: true}).then(res => {
          setTimeZones(res.data.zones)
        })
        .catch((err => {
            console.log(err);
        }));
      }, []);

    function updateSelectedTimeZone() {
        // eslint-disable-next-line no-useless-concat
        axios.get(GETTIMEZONEURL + '/' + `${selectedTimeZone.countryName}`, {crossdomain: true}).then(res =>  {
            setCurrTime(res.data.currTime.formatted);
            updateTimeZone();
        })
    }

    function updateTimeZone() {
        setInterval(() => {
            updateSelectedTimeZone();
        }, INTERVAL)
    }

    function handleDropdownChange(e) {
        setSelectedTimeZone(e);
        updateSelectedTimeZone();
    }

    return (
            <div className = 'box'>
                <div className = 'dropdown-box'>
                    <select id="dropdown" onChange={e => handleDropdownChange(e.target.value)}>
                        {
                            timeZones.map((item, index) => {
                                return <option key={index} value={item.counryName}>{item.zoneName}</option>
                            })
                        }
                    </select>
                </div>
                {currTime.length ? <div>{props.currTime}</div> : ''}
            </div>
    )
}

export default TimeZoneComponent;