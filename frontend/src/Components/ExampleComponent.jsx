import React from 'react'
import './ExampleComponent.scss'

class ExampleComponent extends React.Component {
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
            //Return Here component or html code
            <div>
                {/* render condicional Ternario */}
                {this.state.openContainer ? <h1>true</h1>:<h1>false</h1>}

            {/* renderisado condicional para evitar el multiple */}

            {this.state.openContainer2 == "login" &&(<h1>Login</h1>)}
            {this.state.openContainer2 == "Registro" &&(<h1>Registro</h1>)}
                
            </div>

            )
    }
}

export default ExampleComponent