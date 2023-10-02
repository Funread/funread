import React, { useState } from 'react'
import BookCard from '../BookCard/BookCard'
import './TapLibrary.css'
import { Tabs, Tab } from 'react-bootstrap'

const BOOKS = [
  {
    id: 11,
    title: 'The Hunger Games',
    category: 'Fiction',
    portrait:
      'https://th.bing.com/th/id/R.4b4a90f337521e7152cebfb5e07d0a9c?rik=O2TnG9HTvOKr5w&riu=http%3a%2f%2f3.bp.blogspot.com%2f-HxVxhy2RH-0%2fVANY1W2HZRI%2fAAAAAAAAEig%2fvi6vPNg85ns%2fs1600%2fTheHungerGames.jpg&ehk=KQ4dOR22%2fOW%2bCyaVmxpK%2bANkKQXrjAOfaqvvVRBpsec%3d&risl=&pid=ImgRaw&r=0',
    author: 'Suzanne Collins',
    description:
      'Sunt minim laboris eiusmod ea. Pariatur laborum dolore culpa laboris. Non elit cupidatat non officia.',
    color: '#FFB9CC',
  },
  {
    id: 22,
    title: 'Pride and Prejudice',
    category: 'Novel',
    portrait:
      'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781471134746/pride-and-prejudice-9781471134746_hr.jpg',
    author: 'Jane Austin',
    description:
      'Enim ullamco mollit ex deserunt sunt quis sunt ad ad. Mollit anim nostrud veniam sit elit. Do ullamco laborum nisi irure enim laborum aute. Pariatur nostrud reprehenderit minim cillum.',
    color: '#CEBDF2',
  },
  {
    id: 33,
    title: 'To Kill a Mockingbird',
    category: 'Southern Gothic',
    portrait: 'https://cdn2.penguin.com.au/covers/original/9781784752637.jpg',
    author: 'Harper Lee',
    description:
      'Eu ex incididunt occaecat eu elit. Dolore aliqua cillum proident id pariatur ea ea do minim dolor officia eu elit dolore. Est ipsum et eiusmod voluptate est est dolore aliquip adipisicing amet duis dolore quis qui. Elit duis non commodo aliquip non ipsum eu ad culpa. Mollit minim id anim irure. Anim cupidatat ea consectetur consequat aliqua eu laborum commodo nostrud. Fugiat nulla enim et eu ex labore nostrud qui commodo id qui quis cillum do.',
    color: '#B6D6F2',
  },
  {
    id: 44,
    title: 'The Great Gatsby',
    category: 'Novel',
    portrait:
      'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781471173936/the-great-gatsby-9781471173936_hr.jpg',
    author: 'F. Scott Fitzgerald',
    description:
      'Lorem est nulla eiusmod qui in incididunt nulla esse. Et nisi eiusmod enim excepteur irure magna sunt aute minim minim aliqua. Do laborum nostrud laboris deserunt irure eu. Voluptate ipsum dolor do culpa ipsum.',
    color: '#C9EBF2',
  },
  {
    id: 55,
    title: 'The Outsider',
    category: 'Terror',
    portrait:
      'https://th.bing.com/th/id/OIP.qyKh70xNoEoxDI-8_ZWSIAHaLQ?pid=ImgDet&rs=1',
    author: 'Stephen King',
    description:
      'Sint excepteur nostrud sunt aliqua dolore tempor voluptate ut incididunt ad tempor pariatur id. In do laboris adipisicing quis irure. Laborum commodo adipisicing commodo dolor aliqua quis non minim. Consequat velit sit ad ex sit sunt duis. Non exercitation eu sit culpa elit ad dolor elit sint do incididunt aliqua in excepteur.',
    color: '#FFD3B6',
  },
  {
    id: 66,
    title: 'The Silent Patient',
    category: 'Suspense',
    portrait:
      'https://i.pinimg.com/736x/5e/f1/96/5ef196ee333afc38788224d7642a6879.jpg',
    author: 'Alex Michaelides',
    description:
      'Laborum amet non mollit qui fugiat commodo dolore esse deserunt reprehenderit velit enim dolore. Minim reprehenderit nulla elit ipsum consectetur ullamco consequat sint fugiat enim dolor commodo magna ex. Incididunt sit laborum reprehenderit deserunt magna deserunt minim nisi voluptate cillum veniam.',
    color: '#DCEDC1',
  },
]

function TapLibrary({ toggleSidebar }) {
  const [key, setKey] = useState('mylibrary')

  return (
    <>
      <Tabs
        className='mt-2'
        id='controlled-tab'
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey='mylibrary' title='My library' className='tab'>
          <div className='section_library_Tap p-3 bg-body rounded'>
            {BOOKS.map(
              ({
                id,
                portrait,
                title,
                category,
                author,
                description,
                color,
              }) => (
                <div key={id} className='section_item_Tap'>
                  <BookCard
                    id={id}
                    image={portrait}
                    title={title}
                    category={category}
                    author={author}
                    description={description}
                    color={color}
                    toggleSidebar={toggleSidebar}
                  />
                </div>
              )
            )}
          </div>
        </Tab>
        <Tab eventKey='publiclibrary' title='Public Library' className='tab'>
          <div className='section_library_Tap shadow p-3 mb-5 bg-body rounded '>
            {BOOKS.map(
              ({
                id,
                portrait,
                title,
                category,
                author,
                description,
                color,
              }) => (
                <div key={id} className='section_item_Tap'>
                  <BookCard
                    id={id}
                    image={portrait}
                    title={title}
                    category={category}
                    author={author}
                    color={color}
                    description={description}
                    toggleSidebar={toggleSidebar}
                  />
                </div>
              )
            )}
          </div>
        </Tab>
      </Tabs>
      <br/>
    </>
  )
}
export default TapLibrary
