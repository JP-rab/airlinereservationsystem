
export const searchFlight = async(state) => {
    const searchData = state.flights.map(flight => {
        return{
            departureCountry: flight.FromCountry,
            departureCity: flight.FromCity,
            arrivalCountry: flight.ToCountry,
            arrivalCity: flight.ToCity,
            departureTime: flight.DepartureTime
        }
    });

    try{
        const response = await fetch('/api/flight/search',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    searchData,
                    flightClass: state.flightClass,
                    flightType: state.flightType,
                    price: state.price,
                }),
            }
        );
        if(response.ok){
            const results = await response.json();
            const filteredFlights = results.filter(flightArray => new Date(flightArray[0].departure.time) > new Date());
            return filteredFlights
        }
    }catch(err){
        console.error(err);
    }
}