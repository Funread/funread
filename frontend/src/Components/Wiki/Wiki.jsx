import React from 'react'
import "./Wiki.css"; 
import "react-bootstrap";
class Wiki extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openContainer : false,
            openContainer2: "login",	


           
        }
    }

    render() {
        //Pre    
        return (
            <React.Fragment>
                <div>
                    <div class="container-fluid">
                        <div class="row content">
                            <div class="col-sm-3 sidenav">
                            <h4>FunRead's Wiki</h4>
                            <ul class="nav nav-pills flex-column">
                                <li class="nav-item">
                                <a class="nav-link active" href="#">Pop up</a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" href="#">Wizard</a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" href="#">Modal</a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" href="#">Toast</a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link disabled" href="#">Disabled</a>
                                </li>
                            </ul>
                            </div> 
                        </div> 
                    </div>    
                </div>
            </React.Fragment>
            )
    }
}

export default Wiki