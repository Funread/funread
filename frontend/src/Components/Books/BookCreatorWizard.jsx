import React from 'react' 
import Wizard from '../Shared/Wizard'
import TextField from '@mui/material/TextField';
import PageOneBookCreator from './PageOneBookCreator';
import PageTwoBookCreator from './PageTwoBookCreator';
import PageThreeBookCreator from './PageThreeBookCreator';
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
                <PageOneBookCreator></PageOneBookCreator>
            </React.Fragment>
        let Fragment2 =
            <React.Fragment>
            {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
                <PageTwoBookCreator></PageTwoBookCreator>
            </React.Fragment>
        let Fragment3 = <React.Fragment> <PageThreeBookCreator></PageThreeBookCreator> </React.Fragment>

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






// import React from 'react'
 
// import HorizontalLinearStepper from '../Shared/HorizontalLinearStepper'
// class BookCreatorWizard extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             //ListHere
//             label: 'Hello World'
//         }
//     }

//     render() {
//         //Pre  
//         return (
//             <HorizontalLinearStepper/>

//         )
//     }
// }

// export default BookCreatorWizard
