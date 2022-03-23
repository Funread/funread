import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AccountMenu from './Components/Shared/AccountMenu';

export default function Dashboard() {
    return (
        <div>
            <AccountMenu/>
            <CssBaseline />
            <Container fixed>
                <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
            </Container>
        </div>

    );
}