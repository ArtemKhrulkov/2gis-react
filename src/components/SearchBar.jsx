import React, { useState } from 'react';
import  { observer } from 'mobx-react-lite';
import '../styles/App.css';
import { useStores } from '../hooks/use-stores';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch, faSpinner} from "@fortawesome/free-solid-svg-icons";

const SearchBar = observer(() => {
  const { markersStore } = useStores();
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const changeSearchText = (e) => {
    setSearchText(e.currentTarget.value);
  };

  const sendRequest = async (text) => {
    setLoading(true);
    const isFinished = await markersStore.requestMarkers({q: text});
    if (isFinished) {
      setLoading(false);
    }
  }
  return (
    <>
      <form className="App-search-bar" onSubmit={(e) => {
        sendRequest(searchText);
        e.preventDefault();
      }}>
        <input
          className="App-search-bar-input"
          type="input"
          placeholder="Поиск в 2ГИС"
          value={searchText}
          onChange={changeSearchText}
        />
        <label className="App-wrapper">
          <input className="App-search-bar-submit" type="submit" value={''} />
          {
            loading ?
            <FontAwesomeIcon className="App-search-bar-icon" icon={faSpinner} size="lg" spin inverse/>
            :
            <FontAwesomeIcon className="App-search-bar-icon" icon={faSearch} size="lg" inverse/>
          }
        </label>
      </form>
    </>
  );
})

export default SearchBar;
