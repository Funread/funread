import React from 'react'
 
import HorizontalLinearStepper from '../Shared/HorizontalLinearStepper'
class BookCreatorWizard extends React.Component {
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
            <HorizontalLinearStepper/>

        )
    }
}

export default BookCreatorWizard
