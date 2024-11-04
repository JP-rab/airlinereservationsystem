import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import DatePicker from "react-datepicker"

const FlightFirstForm = ({state, dispatch, handleSubmit, close}) => {
    const { data: airports } = useFetch('/api/airport/airports')
    const [departure, setDeparture] = useState();
    const [arrival, setArrival] = useState();
    const [error, setError] = useState([]);
    const [showDepartureCountries, setShowDepartureCountries] = useState(false);
    const [showArrivalCountries, setShowArrivalCountries] = useState(false);
    const [departureCountry, setDepartureCountry] = useState('');
    const [arrivalCountry, setArrivalCountry] = useState('');
    const { data: countries} = useFetch('/api/countries');
    const [availablePlanes, setAvailablePlanes] = useState([]);
    const [availablePilots, setAvailablePilots] = useState([]);

    const validate = async (e) => {
        e.preventDefault();
        setError('');
        if(!state.departure.airport){
            setError('*Please select departure airport');
        }else if(!state.arrival.airport){
            setError('*Please select arrival airport');
        }else if(state.departure.airport === state.arrival.airport){
            setError('*Departure and Arrival airport cannot be the same');
        }else if(new Date(state.arrival.time) < new Date(new Date(state.departure.time).getTime() + 4 * 60 * 60 * 1000)){
            setError('*Arrival time must be at least 4 hours after Departure time');
        }else if(!state.captain){
            setError('*Please select captain');
        }else if(!state.co_pilot){
            setError('*Please select co-pilot')
        }else if(state.captain === state.co_pilot){
            setError('*The captain and co-pilot should not be the same')
        }else if(!state.airplane.id){
            setError('*Please select a airplane')
        }else{
            handleSubmit();
        }
    }

    useEffect(() => {
        console.log(state)
    }, [state])

    const fetchAvailablePlanes = async () => {
        try{
            const response = await fetch(`/api/airplane/airplanes/available?departureTime=${state.departure.time}&&departureAirport=${state.departure.airport}`)

            if(response.ok){
                setAvailablePlanes(await response.json())
            }else{
                setAvailablePlanes([]);
            }
        }catch(err){
            
        }
    }

    const fetchAvailablePilots = async () => {
        try{
            const response = await fetch(`/api/pilot/pilots/available?departureTime=${state.departure.time}&&departureAirport=${state.departure.airport}`)

            if(response.ok){
                setAvailablePilots(await response.json())
            }else{
                setAvailablePilots([]);
            }
        }catch(err){
            
        }
    }

    useEffect(() =>{
        dispatch({type: 'SET_AIRPLANE', payload: ''})
        dispatch({type: 'SET_CAPTAIN', payload: ''})
        dispatch({type: 'SET_CO_PILOT', payload: ''})
        if(state.departure.time && state.departure.airport){
            fetchAvailablePlanes();
            fetchAvailablePilots();
        }
    },[state.departure.time, state.departure.airport]);

    useEffect(() => {
        if(departure){
            const departureAirport = airports.airports.find(airport => airport.airport === departure)
            const payload = {
                airport: departureAirport.airport,
                airport_code: departureAirport.airport_code,
                city: departureAirport.city,
                country: departureAirport.country
            }
            dispatch({type: 'SET_DEPARTURE', payload })
        }
    },[departure])

    useEffect(() => {
        if(arrival){
            const arrivalAirport = airports.airports.find(airport => airport.airport === arrival)
            const payload = {
                airport: arrivalAirport.airport,
                airport_code: arrivalAirport.airport_code,
                city: arrivalAirport.city,
                country: arrivalAirport.country
            }
            dispatch({type: 'SET_ARRIVAL', payload })
        }
    },[arrival])

    return(
            <div className="container first-form">
            <span className='close'onClick={close}>X</span>
            <form onSubmit={validate}>
                <div style={{borderBottom: '1px solid rgb(225,225,225)', paddingBottom: '20px', marginBottom: '30px'}}>
                    <h3 style={{marginBottom: '10px'}}>Departure</h3>
                    <div className="inputs">
                        <div>
                            <p>Airport</p>
                            <div className="departure" 
                                onClick={() => {
                                    if(!departureCountry){
                                        setShowDepartureCountries(!showDepartureCountries)
                                    }else{
                                        setDepartureCountry('');
                                    }
                                }}
                            >
                                <span>{state.departure.airport ? state.departure.airport : 'Select'}</span>
                                {countries && showDepartureCountries && 
                                    <div className="dropdown">
                                    {countries.map(country => <div key={country.country} onClick={() => setDepartureCountry(country.country)}>{country.country}</div>)}
                                    </div>
                                }
                                {departureCountry && 
                                    <div className="dropdown">
                                        {airports.airports.filter(airport => airport.country === departureCountry)
                                        .map(airport =>  <div key={airport.airport} onClick={() => setDeparture(airport.airport)}>{airport.airport}</div>)}
                                    </div>
                                }
                            </div>
                        </div>
                        <div>
                            <p>Time</p>
                            <DatePicker 
                                selected={state.departure.time}
                                onChange={(date) => dispatch({type: 'SET_DEPARTURE_TIME', payload: date})}
                                showTimeSelect
                                dateFormat="Pp"
                                minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)} 
                            />
                        </div>
                    </div>

                    <h3 style={{marginBottom: '10px'}}>Arrival</h3>
                    <div className="inputs">
                        <div>
                            <p>Airport</p>
                            <div className="arrival" 
                                onClick={() => {
                                    if(!arrivalCountry){
                                       setShowArrivalCountries(!showArrivalCountries)
                                    }else{
                                        setArrivalCountry('')
                                    }
                                }}
                            >
                                <span>{state.arrival.airport ? state.arrival.airport : 'Select'}</span>
                                {countries && showArrivalCountries && 
                                    <div className="dropdown">
                                    {countries.map(country => <div key={country.country} onClick={() => setArrivalCountry(country.country)}>{country.country}</div>)}
                                    </div>
                                }
                                {arrivalCountry && 
                                    <div className="dropdown">
                                        {airports.airports.filter(airport => airport.country === arrivalCountry)
                                        .map(airport =>  <div key={airport.airport} onClick={() => setArrival(airport.airport)}>{airport.airport}</div>)}
                                    </div>
                                }
                            </div>
                        </div>
                        <div>
                            <p>Time</p>
                            <DatePicker 
                                selected={state.arrival.time}
                                onChange={(date) => dispatch({type: 'SET_ARRIVAL_TIME', payload: date})}
                                showTimeSelect
                                dateFormat="Pp"
                                minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)} 
                            />
                        </div>
                    </div>
                </div>
                <div className="inputs">
                    <div>
                        <p>Airline</p>
                        <select onChange={(e) => dispatch({type: 'SET_AIRLINE', payload: e.target.value})}>
                            <option value="PAL">PAL</option>
                            <option value="Cebu Pacific">Cebu Pacific</option>
                            <option value="Air Asia">Air Asia</option>
                            <option value="Skyjet">Skyjet</option>
                        </select> 
                    </div>
                    <div>
                        <p>Gate Number</p>
                        <input 
                            type="text" 
                            placeholder='A1' 
                            onChange={(e) => 
                                dispatch({type: 'SET_GATE_NUMBER', payload: e.target.value})
                            } 
                            required
                            style={{height: '25px', outline: 'none'}}
                        />
                    </div>
                </div>
                <div className="inputs">
                    <div>
                        <p>Captain</p>
                        <select onChange={(e) => 
                                dispatch({type: 'SET_CAPTAIN', payload: e.target.value})
                        }>
                        <option></option>
                        {availablePilots.length > 0 && availablePilots.map(pilot => 
                            <option key={pilot._id} value={pilot._id}>{pilot._id}</option>
                        )}
                        </select>
                    </div>
                    <div>
                        <p>Co-pilot</p>
                        <select onChange={(e) => 
                                dispatch({type: 'SET_CO_PILOT', payload: e.target.value})
                        }>
                        <option></option>
                        {availablePilots.length > 0 && availablePilots.map(pilot => 
                            <option key={pilot._id} value={pilot._id}>{pilot._id}</option>
                        )}
                        </select>
                    </div>
                </div>
                <div className="inputs">
                    <div>
                        <p>Airplane</p>
                        <select onChange={(e) => 
                                dispatch({type: 'SET_AIRPLANE', payload: e.target.value})
                        }>
                            <option></option>
                        {availablePlanes.length > 0 && availablePlanes.map(plane => 
                            <option key={plane._id} value={plane._id}>{plane._id}</option>
                        )}

                        </select>
                    </div>
                </div>
                <p style={{color: '#ff3131'}}>{error}</p>
                <input type="submit" className="next-btn" value='Next'/>
            </form>
            </div>
    )
}

export default FlightFirstForm