import { Button, Box, Form, Input, FormGroup, FormControl, InputLabel, TextField, FormHelperText} from '@mui/material'
import { height, margin, textAlign } from '@mui/system'
import React from 'react'

class PageTwoBookCreator extends React.Component {
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
            <Box justifyContent="center" alignItems="center" justifyItems="center" textAlign="center" sx={{
                width: 700, 
                height: 700, 
                display: 'flex', 
                justifyContent: 'center', 
                display: 'inline',  
                }}>
                <FormControl>
                    <FormGroup alignItems="center" sx={{
                        width: 500,
                        height: 400,
                        marginLeft: 60,
                        marginTop: 10
                    }} >
                        <legend>Enter Information</legend>
                        <TextField label="Book Title" sx={{
                            marginBottom: 5,
                            marginTop: 2
                        }} />
                        <TextField label="Unit name" sx={{
                            marginBottom: 5
                        }} />
                        <TextField label="Grade" sx={{
                        }} />
                        {/* <Button variant="raised">Submit</Button> */}
                    </FormGroup>
                </FormControl>
            </Box>

        )
        }
}

export default PageTwoBookCreator
