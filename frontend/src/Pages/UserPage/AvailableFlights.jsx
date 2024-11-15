import { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch";
import { formatDate, formatToLongDate, getTime } from "../../utils/dateUtils";
import { formatPrice } from "../../utils/formatPrice";
import './Flights.css'
import './AvailableFlights.css'
import { useNavigate } from "react-router-dom";

const AvailableFlights = () => {
    const [limit, setLimit] = useState(5);
    const [flights, setFlights] = useState();
    const [selectedClass, setSelectedClass] = useState('Economy');
    const {data} = useFetch(`/api/flight/flights/available?limit=${limit}&&selectedClass=${selectedClass}`)
    const navigate = useNavigate();

    useEffect(() =>{
        if(data){
            setFlights(data);
        }
    },[data, limit, selectedClass])

    const utf8ToBase64 = (str) => {
        // Create a UTF-8 encoded byte array from the string
        const encoder = new TextEncoder();
        const uint8Array = encoder.encode(str);
    
        // Convert the byte array to a Base64 encoded string
        let binary = '';
        uint8Array.forEach(byte => binary += String.fromCharCode(byte));
        return btoa(binary);
    }

    const handleSelect = (flight) => {
        const params = {flights: [], price: 0, class: selectedClass}
        params.price = flight.classes.find(classObj => classObj.className === selectedClass).price
        console.log(flight)
        params.flights.push({ 
            id: flight._id,
            departure: flight.departure.airport,
            departure_code: flight.departure.airport_code,
            departure_time: formatDate(flight.departure.time),
            arrival: flight.arrival.airport,
            arrival_code: flight.arrival.airport_code,
            arrival_time: formatDate(flight.arrival.time),
            price: flight.classes.find(classObj => classObj.className === selectedClass).price,
        })
        const encoded = encodeURIComponent(utf8ToBase64(JSON.stringify(params)));
        navigate(`/user/booking?data=${encoded}`);
    }

    return (
        <div className="available-flights">
            <div>
            <h1>Available Flights</h1>
            <select onChange={(e) => setSelectedClass(e.target.value)}>
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First</option>
            </select>
            </div>
            <div className="container">
                {flights && flights.map(flight => 
                <div key={flight._id} className="flights-container">
                    <div>
                        <div className='flight'>
                            <img className='airline' src={`/icons/${flight.airline}.png`} alt="" />
                            <div>
                                <p>{formatToLongDate(flight.departure.time)} - Departure</p>
                                <h2>{getTime(flight.departure.time)}</h2>
                                <p>{flight.departure.airport} ({flight.departure.airport_code})</p>
                            </div>
                            <div className="mid-div">
                            <hr />
                            <img className='plane-icon' src="/icons/airplane.png" alt="" />
                            <hr />
                            </div>
                            <div>
                                <p>{formatToLongDate(flight.arrival.time)} - Arrival</p>
                                <h2>{getTime(flight.arrival.time)}</h2>
                                <p>{flight.arrival.airport} ({flight.arrival.airport_code})</p>
                            </div>
                            <h3 className="hours-difference">{
                            (parseFloat(new Date(flight.arrival.time) - new Date(flight.departure.time)) / (1000 * 60 * 60)).toLocaleString('en-US', {
                                minimumFractionDigits: 1,
                                maximumFractionDigits: 1
                            })
                            } hours
                            </h3>
                        </div>
                    </div>
                    <div>
                        <h4 style={{marginBottom: '5px'}}>{selectedClass}</h4>
                        <h2>{formatPrice(flight.classes.find(classObj => classObj.className === selectedClass).price)}</h2>
                        <button className="select-btn" onClick={() => handleSelect(flight)}>Select</button>
                    </div>
                </div>
                )}
            </div>
            {flights && <button onClick={() => setLimit(prev => prev += 5)} >See more</button>}
        </div>
    )
}

export default AvailableFlights