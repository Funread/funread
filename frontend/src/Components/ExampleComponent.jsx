import React from 'react'
import './ExampleComponent.scss'

class ExampleComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //ListHere
            label: 'Hello World'
        }
    }

    render() {
        //Pre  
        return (
            //Return Here component or html code
            <div>
                {this.state.label}
            </div>

            )
    }
}

export default ExampleComponent
