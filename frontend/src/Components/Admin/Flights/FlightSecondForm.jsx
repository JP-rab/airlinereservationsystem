import { useState } from "react";
import { handleBlur, handleFocus, handleNegative, handleNegativeAndDecimal } from "../../../utils/handleInput";

const FlightSecondForm = ({state, dispatch, close}) => {
    const [error, setError] = useState();

    const handleClasses = (className) => {
        const classname = state.classes.find(item => item.className === className);
        if (classname) {
            dispatch({type: 'SET_CLASSES', payload: state.classes.filter(class_name => class_name !== classname)})
        } else {
            dispatch({type: 'SET_CLASSES', payload: [...state.classes, { className }]})
        }
    };

    const getClassSeats = (className) => {
        return state.classes.find(classType => classType.className === className).seats;
    }

    const createFlight = async (e) => {
        e.preventDefault();
        console.log(state)
        try{
            const response = await fetch('/api/flight',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(state),
            })
            const result = await response.json();
            if(response.ok){
                window.location.reload()
            }
    
            if(result.errors){
                setError(result.errors[0]);
            }
    
        }catch(err){
            setError('Error adding pilot')
        }
    }

    return (
        <div className="container">
             <span className='close'onClick={close}>X</span>
            <form onSubmit={createFlight}>
                <p>Plane ID: {state.airplane.id}</p>
                <h2>Select Classes</h2>
                <div style={{marginTop: '50px'}}>
                    <label htmlFor="ecomony">Economy</label>
                    <input type="checkbox" name="economy" onClick={() => handleClasses('Economy')}/>
                    <label htmlFor="business">Business</label>
                    <input type="checkbox" name="business" onClick={() => handleClasses('Business')}/>
                    <label htmlFor="first">First</label>
                    <input type="checkbox" name="first" onClick={() => handleClasses('First')}/>
                </div>
                {state.classes.length > 0 && state.classes.map(className =>  
                    <div>
                        <h3>{className.className}</h3>
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                            <div className='input-container'>
                                <input 
                                    className='input'
                                    type="number" 
                                    placeholder="Seats"
                                    min='1'
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    value={getClassSeats(className.className)}
                                    onKeyPress={handleNegativeAndDecimal}
                                    required
                                    onChange={(e) => dispatch({type: 'SET_CLASS_SEATS', payload: {seats: e.target.value, className: className.className}})}
                                    
                                />
                                <span>Seats</span>
                            </div>
                            <div className='input-container'>
                                <input 
                                    className='input'
                                    type="number" 
                                    placeholder="Price"
                                    min='1'
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    required
                                    onKeyPress={handleNegative}
                                    onChange={(e) => dispatch({type: 'SET_CLASS_PRICE', payload: {price: e.target.value, className: className.className}})}
                                />
                                <span>Price</span>
                            </div>
                        </div>
                    </div>
                )}
                <p style={{color: '#ff3131'}}>{error}</p>
                <input type="submit" 
                    className="next-btn" 
                    style={{marginTop: '40px'}} 
                    disabled={state.classes.length > 0 ? false : true}
                />
            </form>        

        </div>
    )
}

export default FlightSecondForm