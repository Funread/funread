import { Grid, Box, Card} from '@mui/material'
import { height } from '@mui/system'
import React from 'react'

class PageThreeBookCreator extends React.Component {
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
            <Box textAlign="center" display={'flex'} justifyContent={'center'} height={400}>
                <div textAlign='center'>
                    <h1>Summary</h1>
                </div>
                
            </Box>

        )
        }
}

export default PageThreeBookCreator
