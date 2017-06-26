import React, { Component } from 'react'
import axios from 'axios'


import './Search.css'
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap'




class Search extends Component {
    
    constructor(props) {
        super(props);
        this.state ={
            query: ''
        }
        this.getSavedList = this.getSavedList.bind(this);
        this.removeCharacter = this.removeCharacter.bind(this);
    }

    removeCharacter(event)
    {
        const i = parseInt(event.target.dataset.index);
        this.props.removeCharacter.bind(this,i);
    }

    getSavedList(){
        return this.props.characterList.map((elem, i) => {
        return (
            <div data-index={i} className="roll-in search-results" key={i} onClick={this.removeCharacter}>
                <h2 className="in-saved">{elem.name_first}</h2>  
                <img 
                    alt="Profile"
                    className="saved-img"
                    src={elem.image_url_med}
                />
                <button className="btn-profile" key={i} onClick={()=>{this.props.removeCharacter(i)}}> Remove </button>
            </div>
                                
        )
        } )
    }
   
    render() {

        
        const list = this.getSavedList();
        return (
        <div>
            <button className="btn-myc btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                VIEW MY CHARACTERS
            </button>
            <div className="collapse" id="collapseExample">
            <div className="well">
                 <div className="results">
                     {list}
                </div>
            </div>
            </div>


            <FormGroup id="search">
                    <InputGroup>
                        <FormControl className="inputf" type="text" placeholder="Search Your Favorite Character" value={this.state.query}
                        onChange={event => {this.setState({query: event.target.value})}} 
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                this.props.search(this.state.query)
                            }
                        }}/>
                        <InputGroup.Addon onClick={() => this.props.search(this.state.query)} >
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                     
            </FormGroup>
            

            
                


       
            
        </div>

                
            )
        
    }
}

export default Search; 