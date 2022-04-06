import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

class ReadingView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title || 'Reading View'
            content: this.props.content || ''
            page: this.props.page || '#'
        }
    }

    render() {
        //Pre  
        console.log('reading view')
        return (
            <Container fixed>
                <Box sx={{  height: '100vh' }} />
                <span> {this.state.title}</span>
            </Container>
            )
    }
}

export default ReadingView
