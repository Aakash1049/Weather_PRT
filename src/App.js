import { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [error, setError] = useState(false)
  const [lastThree, setLastThree]=useState([])
  function searchHandler(e) {
    e.preventDefault()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0d038ed3980cf2432f78d78a92010698`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.message === 'city not found' || data.cod[0]==="4") {
          return setError(true)
        }
        setError(false)
        setSearchResult([data])
        if(lastThree.length<=3){
          if(lastThree.length===3){
            lastThree.shift()
          }
          lastThree.push(data.name)
        }
        console.log(data.name, data.main.temp, data.main.temp_min, data.main.temp_max, data.main.grnd_level, data.main.humidity, data.main.sea_level)
      })
  }

  return (
    <div className='weather'>
      <h1>Weather App</h1>
      <input type="text" value={city} placeholder="Enter City Name" onChange={(e) =>{setError(false) ;setSearchResult([]) ;setCity(e.target.value);}} />
      <button onClick={(e) => searchHandler(e)} >Search</button>
      <br></br>
      {

        (searchResult.length !== 0 && error===false && city!=="") ?

          <>
            <div>
              <p> Weather Details Of City: {searchResult[0].name}</p>
              <p> Current Temperature : {searchResult[0].main.temp} °C</p>
              <p> Temperature result : {searchResult[0].main.temp_min} °C to {searchResult[0].main.temp_max} °C</p>
              <p> Humidity: {searchResult[0].main.humidity}</p>
              <p> Sea Level : {searchResult[0].main.sea_level} {searchResult[0].main.sea_level===undefined && <>Not Available</>} </p>
              <p> Ground Level : {searchResult[0].main.grnd_level} {searchResult[0].main.grnd_level===undefined && <>Not Available</>}</p>
            </div>
          </>

          :
          <>

          </>


      }
      {
        error &&
        <>
          <h2>Enter A Valid City Name</h2>
        </>
        
      }
      {
        city==="" &&
        <ul>
          <h3>Last Three City Entries</h3>
          {
          lastThree.map((each)=>{
            return(
              <li>{each}</li>
            )
          })
          }
        </ul>
      }

    </div>
  );
}

export default App;

/**
  
 */
