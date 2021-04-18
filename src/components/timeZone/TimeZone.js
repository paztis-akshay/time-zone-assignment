import React , {useEffect, useState} from 'react';
import axios from 'axios';
import {GETZONESLISTURL} from '../../config/time-zone-config';
import {Dropdown} from '../dropdown/Dropdown';
import {DisplayTime} from '../displayTime/DisplayTime';

export const TimeZoneComponent = (props) => {

    const [selectedTimeZone, setSelectedTimeZone] = useState('');
    const [timeZones, setTimeZones] = useState([]);

    useEffect(() => {
        axios.get(GETZONESLISTURL, {crossdomain: true}).then(res => {
          setTimeZones(res.data.zones)
        })
        .catch((err => {
            console.log(err);
        }));
      }, []);

    const updateTimeZone = (item) => {
        setSelectedTimeZone(item);
    }

    return (
            <div className = 'box'>
                <Dropdown dropdownData={timeZones} updatedTimeZone={updateTimeZone}></Dropdown>
                {
                    selectedTimeZone ? <DisplayTime selectedZone={selectedTimeZone}></DisplayTime> : ''
                }
                
            </div>
    )
}

export default TimeZoneComponent;