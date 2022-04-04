import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

class ReadingView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //ListHere
        }
    }

    render() {
        //Pre  
        console.log('reading view')
        return (
            <Container fixed>
                <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
                <span>asdasd</span>
            </Container>
            )
    }
}

export default ReadingView
