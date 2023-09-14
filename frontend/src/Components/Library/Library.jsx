import React, { useState } from 'react';
import BookCard from '../Shared/BookCard/BookCard';
import "./Library.css"
import { Tabs, Tab } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function Library() {
    const [key, setKey] = useState('mylibrary');

    const BOOKS = [
        {
            title: 'The Hunger Games',
            category: 'Fiction',
            portrait:
                'https://th.bing.com/th/id/R.4b4a90f337521e7152cebfb5e07d0a9c?rik=O2TnG9HTvOKr5w&riu=http%3a%2f%2f3.bp.blogspot.com%2f-HxVxhy2RH-0%2fVANY1W2HZRI%2fAAAAAAAAEig%2fvi6vPNg85ns%2fs1600%2fTheHungerGames.jpg&ehk=KQ4dOR22%2fOW%2bCyaVmxpK%2bANkKQXrjAOfaqvvVRBpsec%3d&risl=&pid=ImgRaw&r=0',
            author: 'Suzanne Collins',
            color: '#FFB9CC',
        },
        {
            title: 'Pride and Prejudice',
            category: 'Novel',
            portrait:
                'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781471134746/pride-and-prejudice-9781471134746_hr.jpg',
            author: 'Jane Austin',
            color: '#CEBDF2',
        },
        {
            title: 'To Kill a Mockingbird',
            category: 'Southern Gothic',
            portrait: 'https://cdn2.penguin.com.au/covers/original/9781784752637.jpg',
            author: 'Harper Lee',
            color: '#B6D6F2',
        },
        {
            title: 'The Great Gatsby',
            category: 'Novel',
            portrait:
                'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781471173936/the-great-gatsby-9781471173936_hr.jpg',
            author: 'F. Scott Fitzgerald',
            color: '#C9EBF2',
        },
        {
            title: 'The Outsider',
            category: 'Terror',
            portrait:
                'https://th.bing.com/th/id/OIP.qyKh70xNoEoxDI-8_ZWSIAHaLQ?pid=ImgDet&rs=1',
            author: 'Stephen King',
            color: '#FFD3B6',
        },
        {
            title: 'The Silent Patient',
            category: 'Suspense',
            portrait:
                'https://i.pinimg.com/736x/5e/f1/96/5ef196ee333afc38788224d7642a6879.jpg',
            author: 'Alex Michaelides',
            color: '#DCEDC1',
        },
    ]


    return (
        <>
            <Tabs
                className='mt-5'
                id="controlled-tab"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="mylibrary" title="My library" className='tab'>
                    <div className="section_sharelibrary shadow p-3 mb-5 bg-body rounded ">
                        {BOOKS.map(({ portrait, title, category, author, color }) => (
                            <div key={title} className='section_item'>
                                <BookCard
                                    image={portrait}
                                    title={title}
                                    category={category}
                                    author={author}
                                    color={color}
                                />
                            </div>
                        ))}
                    </div>
                </Tab>
                <Tab eventKey="publiclibrary" title="Public Library" className='tab'>
                    <div className="section_sharelibrary shadow p-3 mb-5 bg-body rounded ">
                        {BOOKS.map(({ portrait, title, category, author, color }) => (
                            <div key={title} className='section_item'>
                                <BookCard
                                    image={portrait}
                                    title={title}
                                    category={category}
                                    author={author}
                                    color={color}
                                />                                
                            </div>
                        ))}
                    </div>

                </Tab>

            </Tabs>


        </>
    );
}
export default Library;