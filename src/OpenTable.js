import React, { useState, useEffect, Fragment } from 'react';
import { getOpenTableDate, getOpenTableTime } from './util/dateUtil';
import DatePicker from 'react-date-picker';
import axios from 'axios'

const getOpenTableTimes = (restaurantCode, partySize, requestedDate, requestedTime) => {
    return axios.post("https://multitool-api.herokuapp.com/opentable", {
                    "restaurantCode": restaurantCode,
                    "partySize": partySize.toString(),
                    "requestedDate": requestedDate,
                    "requestedTime": requestedTime
            })
}

const OpenTable = () => {
    let [times, setTimes] = useState([]);
    let [loading, setLoading] = useState(true)
    let [date, setDate] = useState(new Date())
    let [time, setTime] = useState('20:00:00')
    let [partySize, setPartySize] = useState(6)

    const restaurantCode = "tao-downtown-new-york";
    useEffect(() => {
            handleUpdateTimes();
      }, []);

    const handleUpdateTimes = () => {
        setLoading(true);
        getOpenTableTimes(restaurantCode, partySize, getOpenTableDate(date), getOpenTableTime(date, time)).then(response => {
            setTimes(response.data)
            setLoading(false)
          });
    }

    return (
        <Fragment>
            <div>{restaurantCode}</div>
            <form>
            <select defaultValue={partySize} id="partySize" name="partySize" onChange={e => setPartySize(e.target.value)}>
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5 People</option>
                <option value="6">6 People</option>
                <option value="7">7 People</option>
                <option value="8">8 People</option>
                <option value="9">9 People</option>
                <option value="10">10 People</option>
            </select>
            <br />
            <DatePicker
                onChange={(d) => setDate(d)}
                value={date}/>
            <br />
            <select defaultValue={time} id="time" name="time" onChange={e => setTime(e.target.value)}>
                <option value="00:00:00">12:00 am</option>
                <option value="01:00:00">1:00 am</option>
                <option value="02:00:00">2:00 am</option>
                <option value="03:00:00">3:00 am</option>
                <option value="04:00:00">4:00 am</option>
                <option value="05:00:00">5:00 am</option>
                <option value="06:00:00">6:00 am</option>
                <option value="07:00:00">7:00 am</option>
                <option value="08:00:00">8:00 am</option>
                <option value="09:00:00">9:00 am</option>
                <option value="10:00:00">10:00 am</option>
                <option value="11:00:00">11:00 am</option>
                <option value="12:00:00">12:00 pm</option>
                <option value="13:00:00">1:00 pm</option>
                <option value="14:00:00">2:00 pm</option>
                <option value="15:00:00">3:00 pm</option>
                <option value="16:00:00">4:00 pm</option>
                <option value="17:00:00">5:00 pm</option>
                <option value="18:00:00">6:00 pm</option>
                <option value="19:00:00">7:00 pm</option>
                <option value="20:00:00">8:00 pm</option>
                <option value="21:00:00">9:00 pm</option>
                <option value="22:00:00">10:00 pm</option>
                <option value="23:00:00">11:00 pm</option>
            </select>
            </form>
            <hr/>
            <div>{partySize}</div>
            <div>{getOpenTableDate(date)}</div>
            <div>{getOpenTableTime(date, time)}</div>
            <hr/>
            <button onClick={handleUpdateTimes}>Update Times</button>
            {
            loading 
                ? <div>loading...</div> 
                : times.data.length ? <div>{times.data}</div> : 'Still no available times :('
            }
        </Fragment>
    )
}

export default OpenTable;