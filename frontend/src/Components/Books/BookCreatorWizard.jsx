import React from 'react' 
import Wizard from '../Shared/Wizard'
import TextField from '@mui/material/TextField';
class BookCreatorWizard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //ListHere
            label: 'Hello World'
        }
    }

    render() {
        let TitleList = ['Book style', 'Name & clasification', 'Save and Create']
        let Fragment1 =
            <React.Fragment>
                step 1 here
            </React.Fragment>
        let Fragment2 =
            <React.Fragment>
                //Example of inputs here
            <TextField id="standard-basic" label="Standard" variant="standard" />
            </React.Fragment>
        let Fragment3 = <React.Fragment> step 3  </React.Fragment>

        let stepListObjets = [Fragment1, Fragment2, Fragment3]
        return (
            <Wizard
                stepsTitleList={TitleList}
                stepList={stepListObjets}

            />

        )
    }
}

export default BookCreatorWizard
