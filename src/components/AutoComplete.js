import React, { useState } from "react";
import '../css/autocomplete.css';

const Autocomplete = ({ suggestions, count, addSuggestion, selectedCountry }) => {
  const data = [...suggestions].slice(0, count);
  const [userInput, setUserInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState(data);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showAll, setShowAll] = useState(false);

  // Event fired when the input value is changed
  const onChange = e => {
    const userInput = e.currentTarget.value;
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setUserInput(userInput);
    setFilteredSuggestions(filteredSuggestions);
  };

  // Event fired when the user presses a key down
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      setUserInput(filteredSuggestions[activeSuggestion]);
      setActiveSuggestion(0);
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const add = () => {
    addSuggestion(userInput);
    selectedCountry(userInput)
  }

  let suggestionsListComponent;
   if (userInput && filteredSuggestions.length === 0){
        suggestionsListComponent = (
          <div className="no-suggestions">
            <p>{`"${userInput}" not found`}</p>
            <button onClick={add}>Add & Select</button>
          </div>
        );
      }
      else  {
        suggestionsListComponent = (
          <>
          <ul className="suggestions" style={{ height: showAll && !userInput ? '800px' : '200px'}}>
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={() => selectedCountry(suggestion)}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
          {!userInput && !showAll &&
            <div className="message" onClick={() => {
                setShowAll(true);
                setFilteredSuggestions(suggestions);
              }
            }>{suggestions.length - count} more...</div>
          }
          </>
        );
      }

  return (
    <div className="autocomplete">
      <input
        type="text"
        placeholder="Type here..."
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      />
      {suggestionsListComponent}
    </div>
  );
}

export default Autocomplete;