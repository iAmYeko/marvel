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
        characterList: [],
        searchQueryMessage : ""
        

    }
    this.search = this.search.bind(this)
    this.addCharacter = this.addCharacter.bind(this)
    this.removeCharacter =this.removeCharacter.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
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
                if(response.data.length === undefined){
                    this.setState({
                        searchResults: [],
                        searchQueryMessage: "No Characters Found"                        
                        
                    })
                }
                else{
                this.setState({
                    searchResults: response.data
                })
            }
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
       
        const array = this.state.characterList;
        array.splice(i,1);
        this.setState({
            characterList: array
        })
   }

   getSearchResults(){

       if(this.state.searchResults.length === 0){
           return (<h3>{this.state.searchQueryMessage}</h3>);
       }
       else{
        return this.state.searchResults.map((elem, i) => {
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
                                        <button type="button" className="btn btn-primary btn-md" onClick={this.addCharacter} data-index={i}>
                                            <Glyphicon className="glyph" glyph="floppy-save"></Glyphicon>
                                            Save Character
                                        </button>
                                        <button type="button" className="btn btn-primary btn-md" data-toggle="modal" data-target=".bs-example-modal-lg">
                                            <Glyphicon className="glyph" glyph="user"></Glyphicon>
                                            View Bio
                                        </button>

                                        <div className="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
                                        <div className="modal-dialog modal-lg" role="document">
                                            <div className="modal-content">
                                                <div className="zoomIn search-results" data-index={i} >
                                                    <img 
                                                        alt="Profile"
                                                        class="profile-img"
                                                        src={elem.image_url_lge}
                                                    />
                                                    <p className="in-saved">{elem.__Birthday }</p> 
                                                    <p className="in-saved">{elem.info}</p>   
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" className="btn-profile-dos btn" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                        </div>

                                                    
                                        </div>
                                    </div>
                                    
                                )
                            } )
       }
   }
        

    render(){
        const searchResults = this.getSearchResults();
        return(
            <div className="App">
                <Home />
                

                <div className="sct">

                    <div>
                        <Search search={this.search} characterList={this.state.characterList} removeCharacter={this.removeCharacter} />
                    </div>
                    
                    <div className="Profile">
                        <div className="results">{
                            searchResults
                        }</div>
                            
                    </div>
                </div>
            </div>
        )
    }
}

export default App;