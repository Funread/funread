import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AccountMenu from './Components/Shared/AccountMenu';
import TextScrollView from './Components/TextScrollView/TextScrollView';

export default function Dashboard() {
    return (
        <div>
            <AccountMenu background="red"/>
            <CssBaseline />
            <TextScrollView/>
        </div>

    );
}