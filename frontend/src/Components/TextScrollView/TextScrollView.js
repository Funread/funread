import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function TextScrollView() {
    return (
        <div>
            <Container fixed>
                <Box sx={{ bgcolor: 'lightgrey', height: '100vh', textAlign:"center", fontSize:"20pt"}}>
                    text here
                
                </Box>
            </Container>
        </div>

    );
}