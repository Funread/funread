import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
 
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import AccountMenu from './Components/Shared/AccountMenu';
import TextScrollView from './Components/TextScrollView/TextScrollView';
 

import AccountMenu from './Components/Shared/AccountMenu';
import Index from './Components/Shared/Index';
import NoPage from './Components/Shared/NoPage';
import ReadingView from './Components/Shared/ReadingView';
import BookCreatorWizard from './Components/Books/BookCreatorWizard';
import Book from './Components/Books/Book';
 
import PageOneBookCreator from './Components/Books/PageOneBookCreator';
import PageTwoBookCreator from './Components/Books/PageTwoBookCreator';
 
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function Dashboard() {
    return (
        <div>
            <AccountMenu background="red"/>
            <CssBaseline />
 
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="readingview" element={<ReadingView />} />
                    <Route path='/books/:id/:mode' element={<Book />}></Route>
                    <Route path='/books/:id/' element={<Book />}></Route>
                    <Route path='/books/' element={<Book />}></Route>
                    <Route path="createbook" element={<BookCreatorWizard />} />
           
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>

    );
}