import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

class NoPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //ListHere
        }
    }

    render() {
        console.log('NO PAGE')
        //Pre  
        return (
            <Container fixed>
               <span>NO PAGE FOUND</span>
            </Container>
            )
    }
}

export default NoPage
