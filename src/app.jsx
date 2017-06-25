import React, { Component } from 'react'
import {FormGroup, FormControl, InputGroup, Glyphicon, Image} from 'react-bootstrap'
import axios from 'axios'

import Home from "./components/Home/Home"
import Search from "./components/Search/Search"
import './App.css'

class App extends Component {

constructor() {
    super();
    this.state={
        searchResults: [],
        characterList: []
        

    }
    this.search = this.search.bind(this)
    this.addCharacter = this.addCharacter.bind(this)
    this.removeCharacter =this.removeCharacter.bind(this);
}



 search(query) {
       
        const AUTH_REQUEST_URL = "https://anilist.co/api/auth/access_token/?grant_type=client_credentials&client_id=iamyeko-o8gth&client_secret=Kr8Bdwf79Fe5vvzZOPRmcePgm"
        const BASE_URL = 'https://anilist.co/api/character/search/';
        let FETCH_URL = `${BASE_URL}${query}`

        var request = axios.post(AUTH_REQUEST_URL).then((response) => {
            response.data.access_token
            FETCH_URL = FETCH_URL + `/?access_token=${response.data.access_token}`
            console.log(FETCH_URL)
            var promise = axios.get(FETCH_URL).then((response) => {
                this.setState({
                    searchResults: response.data
                })
            } )
        })
        
    };

   addCharacter(event){
       const i = parseInt(event.target.dataset.index);
       const array = this.state.characterList;
       array.push(this.state.searchResults[i]);
       this.setState({
                    characterList: array
                })
        
   }

   removeCharacter(i){
       debugger;
        const array = this.state.characterList.splice(i,1);
        this.setState({
            characterList: array
        })
   }
        

    render(){
        return(
            <div className="App">
                <Home />
                

                <div className="sct">

                    <div>
                        <Search search={this.search} characterList={this.state.characterList} removeCharacter={this.removeCharacter} />
                    </div>
                    
                    <div className="Profile">
                        <div className="results">{this.state.searchResults.map((elem, i) => {
                            return (
                                <div className="roll-in search-results">
                                    <h2>{elem.name_first}</h2>
                                    <p>aka: {elem.name_alt}</p>
                                    <p>Japanese Name: {elem.name_japanese} </p>
                                    <img 
                                        alt="Profile"
                                        className="profile-img"
                                        src={elem.image_url_lge}
                                    />

                                <div> 
                                    <button type="button" className="btn btn-primary btn-lg" onClick={this.addCharacter} data-index={i}>
                                                Save Character
                                                </button>

                                                
                                    </div>
                                </div>
                                
                            )
                            } )}</div>
                            
                    </div>
                </div>
            </div>
        )
    }
}

export default App;