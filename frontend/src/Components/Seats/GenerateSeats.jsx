import { useEffect, useRef, useState } from "react";
import './Seats.css'

const GenerateSeats = ({flightData}) =>{
    const [flight, setFlight] = useState();
    const [sumOfColumns, setSumOfColumns] = useState();
    const [columns, setColumns] = useState();
    let index = 0;

    useEffect(() => {
        const setData = async () => {
            try{
                const response = await fetch(`/api/airplane/${flightData.airplane.id}`);
                if(response.ok){
                    const result = await response.json();
                    setFlight({...flightData, airplane: result})
                    }
            }catch(err){
            }
        }
        setData();
    }, [flightData])

    useEffect(() => {
        if(flight){
            const planeColumns = flight.airplane.columns.split('x').map(column => parseInt(column, 10));
            setSumOfColumns(planeColumns.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
            setColumns(planeColumns);
        }   
    }, [flight])

    return (
        <div className="seats">
            <p>I</p>
            <hr />
            {flight && sumOfColumns && 
            <div className='seats-rows-container' style={{gridTemplateColumns: `repeat(${sumOfColumns}, 1fr)`}}>
                {
                    flight.classes.map((classObj) => 
                        classObj.seats.map((seat) =>{
                            const position = seat.seatNumber.charAt(0).toUpperCase().charCodeAt(0) - 64;
                            if(position % columns[index] === 0 && index !== columns.length){
                                index ++;
                            }else{
                                index = 0;
                            }
                            return <button 
                                key={seat._id} 
                                style={{
                                    marginLeft: position === 1 ? '30px' : '', 
                                    marginRight: position % columns[index] === 0 && index !== columns.length ? '30px' : ''
                                }} 
                                value={seat.seatNumber}>
                                {seat.seatNumber}
                            </button>
                        })
                    )
                }
            </div>}
        </div>
    );

}

export default GenerateSeats;