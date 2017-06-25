import React, { Component } from 'react'
import './Home.css' 

import {FormGroup, FormControl, InputGroup, Glyphicon, Image} from 'react-bootstrap'
import logo from './anime.png'




class Home extends Component {
// constructor(props){
//     super(props);
//     this.state={

//     }
// }

render() {
    return (
         <div className="home">
             <img className="animate-logo" src={logo} />
            <a href="#search"> <button  type="button" className="animate btn-page btn btn-primary btn-lg">START SEARCHING</button></a>
        </div>
    )
}
}

export default Home;