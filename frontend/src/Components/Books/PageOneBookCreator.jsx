import { Grid, Box, Card} from '@mui/material'
import { height } from '@mui/system'
import React from 'react'

class PageOneBookCreator extends React.Component {
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
            <Box textAlign="center" marginLeft={30} marginTop={10} sx={{
                width: 700, 
                height: 700, 
                }}>
                <Grid container spacing={40} display='flex'>
                    <Grid item xs={4}>
                        <Card sx={{ width: 300, height:400}}>
                            <div>style 1</div>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ width: 300, height:400}} >
                            <div>style 2</div>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ width: 300, height:400}} >
                            <div>style 3</div>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

        )
        }
}

export default PageOneBookCreator
