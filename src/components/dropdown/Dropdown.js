import React, {useState} from 'react';

export const Dropdown = (props) => {

    const {dropdownData} = props;

    const [selectedTimeZone, setSelectedTimeZone] = useState('');

    function handleDropdownChange(e) {
        setSelectedTimeZone(e.target.value);
        props.updatedTimeZone(e.target.value);
    }

    return (
        <div>
            <select id="dropdown" value={selectedTimeZone} onChange={handleDropdownChange}>
                {
                    dropdownData.map((item, index) => {
                        return <option key={index} value={item.countryName}>{item.zoneName}</option>
                    })
                }
            </select>
        </div>
    )
}