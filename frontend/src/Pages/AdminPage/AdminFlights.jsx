import useAdminPaginationReducer from "../../hooks/adminPaginationReduces";
import { useState, useEffect } from "react";
import AdminPagination from "../../Components/Admin/Pagination/AdminPagination";
import './AdminPage.css'
import { formatDate } from "../../utils/dateUtils";
import { dataStatus } from "../../utils/dataStatus";
import FlightForm from "../../Components/Admin/Flights/FlightForm";
import FlightDetailsModal from "../../Components/Admin/Modals/FlightDetailsModal";

const AdminFlights = () => {
    const [flights, setFlights] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const {state, dispatch} = useAdminPaginationReducer();
    const [showMakeFlight, setShowMakeFlight] = useState(false);
    const [flightData, setFlightData] = useState();
    const [showFlightDetails, setShowFlightDetails] = useState(false);

    useEffect(() => {
        const fetchFlights = async () => {
            dispatch({type: 'SET_DISABLED_NEXT_BTN', payload: true})
            dispatch({type: 'SET_DISABLED_PREV_BTN', payload: true})
            try{
                const response = await fetch(`/api/flight/flights?page=${state.currentPage}&&limit=50&&searchTerm=${searchTerm}`);
                if(response.ok){
                    const result = await response.json();
                    result.currentPage === result.totalPages || result.totalPages === 0 ? dispatch({type: 'SET_DISABLED_NEXT_BTN', payload: true}) :  dispatch({type: 'SET_DISABLED_NEXT_BTN', payload: false});
                    result.currentPage === 1 ? dispatch({type: 'SET_DISABLED_PREV_BTN', payload: true}) : dispatch({type: 'SET_DISABLED_PREV_BTN', payload: false});
                    dispatch({type: 'SET_TOTAL_PAGES', payload: result.totalPages});
                    setFlights(result.flights);
                }
            }catch(err){

            }
        }

        fetchFlights();

    },[state.currentPage, searchTerm])

    useEffect(() => {
        dispatch({type:'SET_CURRENT_PAGE', payload: 1})
    }, [searchTerm])

    useEffect(() => {
        document.title = "Flights | Admin";
    }, []);

    return (
        <main className="admin-page">
            {showMakeFlight && <FlightForm close={() => setShowMakeFlight(false)}/>}
            {showFlightDetails && <FlightDetailsModal flightData={flightData} close={() => setShowFlightDetails(false)}/>}
            <h1>Flights</h1>
            <input type="search" placeholder='Search' onChange={(e) => setSearchTerm(e.target.value)}/>
            <AdminPagination state={state} dispatch={dispatch} />
            <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Flight Number</th>
                        <th>Airline</th>
                        <th>Gate No</th>
                        <th>Departure</th>
                        <th>Departure Time</th>
                        <th>Arrival</th>
                        <th>Arrival Time</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {flights && flights.map(flight => {
                        const departureTime = formatDate(flight.departure.time);
                        const arrivalTime = formatDate(flight.arrival.time);

                        return (
                            <tr key={flight._id}>
                                <td>{flight._id}</td>
                                <td>{flight.flightNumber}</td>
                                <td>{flight.airline}</td>
                                <td>{flight.gate_number}</td>
                                <td>{flight.departure.airport} ({flight.departure.airport_code})</td>
                                <td>{departureTime}</td>
                                <td>{flight.arrival.airport} ({flight.arrival.airport_code})</td>
                                <td>{arrivalTime}</td>
                                {dataStatus(flight.status)}
                                <td>
                                    <button onClick={() => {
                                        setFlightData(flight)
                                        setShowFlightDetails(true)
                                    }}>
                                    <img src="/icons/eye (1).png"/>
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
            </div>
            <button className='add-btn' onClick={() => setShowMakeFlight(true)}>Make Flight</button>
        </main>
    )
}

export default AdminFlights