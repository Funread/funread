import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import AccountMenu from './Components/Shared/AccountMenu';
import Index from './Components/Shared/Index';
import NoPage from './Components/Shared/NoPage';
import ReadingView from './Components/Shared/ReadingView';
import BookCreatorWizard from './Components/Books/BookCreatorWizard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function Dashboard() {
    return (
        <div>
            <AccountMenu/>
            <CssBaseline />
           
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="readingview" element={<ReadingView />} />
                    <Route path="createbook" element={<BookCreatorWizard />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>

    );
}