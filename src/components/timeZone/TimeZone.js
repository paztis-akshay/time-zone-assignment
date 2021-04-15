import React, { Component } from 'react';

export default class TimeZoneComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTimeZone: {},
            timeZones: [],
            currTime: ''
        }

        this.updateTimeZone = this.updateTimeZone.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    componentDidMount() {
        fetch('http://api.timezonedb.com/v2.1/list-time-zone?key=XWSLLPX5RMIZ&format=json&zone=Europe').then(res => Promise.all([res.status, res.json()]))
        .then(([status, timeZoneData]) => {
          this.setState({
              timeZones: timeZoneData.zones
          })
        })
        .catch((err => {
            console.log(err);
        }));
    }

    updateSelectedTimeZone() {
        const {selectedTimeZone} = this.state;
        // eslint-disable-next-line no-useless-concat
        fetch('http://api.timezonedb.com/v2/get-time-zone?key=XWSLLPX5RMIZ&format=json&by=zone&zone=Europe/'+ `${selectedTimeZone.countryName}` ).then(
            res => Promise.all([res.status, res.json()])
        ).then(([status, currTime]) => {
            this.setState({currTime: currTime.formatted});
            this.updateTimeZone();
        })
    }

    updateTimeZone() {
        setInterval(() => {
            this.updateSelectedTimeZone();
        }, 5000)
    }

    handleDropdownChange(e) {
        this.setState({
            selectedTimeZone: e.target.value
        });
        this.updateSelectedTimeZone();
    }

    render() {
        const {timeZones, currTime} = this.state;
        return (
            <div className = 'box'>
                <div className = 'dropdown-box'>
                    <select id="dropdown" onChange={this.handleDropdownChange}>
                        {
                            timeZones.map((item, index) => {
                                return <option value={item.countryName}>{item.zoneName}</option>
                            })
                        }
                    </select>
                </div>
               {currTime.length ? <div>{currTime}</div> : ''}
            </div>
        )
    }
}