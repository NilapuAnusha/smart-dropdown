import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AutoComplete from './components/AutoComplete';
import './css/app.css';

const API = "https://restcountries.eu/rest/v2/all";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [country, setCountry] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(API).then(res => {
        return res.data.map(c => c.name);
      }).catch(error => {
        console.log("Caught error", error);
      });
      setShowLoader(false);
      setCountries(data);
    };
    // fetch countries
    fetchData();
  }, []);

  const showMenuAction = () => {
    setShowMenu(!showMenu);
  }

  const selectedCountry = (country) => {
    setCountry(country);
    setShowMenu(false);
  }

  const addSuggestion = (suggestion) => {
    setCountries([...countries, suggestion]);
    setShowMenu(false);
  }

  return (
    <div>
      <header className="app-header">
        Search APP
      </header>
      {!showLoader ?
        <div className="app-container">
          <label>Search: </label>
          <div>
            <button onClick={showMenuAction}>
              {country ? country : 'Select a location'}
            </button>
            { showMenu &&
              <AutoComplete
                count={5}
                suggestions={countries}
                setCountry={setCountry}
                selectedCountry={selectedCountry}
                addSuggestion={addSuggestion}
              />
            }
          </div>
        </div>
       : <h3>Loading...</h3>
      }
    </div>
  );
}

export default App;
