import BookCard from '../Shared/BookCard/BookCard'
import './RecentBook.sass'

const MY_BOOKS = [
  {
    id: 1,
    title: 'The Hunger Games',
    category: '1',
    portrait: null,
    author: 'Suzanne Collins',
    description:
      'Lorem deserunt voluptate aute fugiat consequat deserunt sunt laboris. Ipsum do Lorem quis aliqua laboris duis culpa anim occaecat reprehenderit. Minim veniam consectetur nulla in officia labore ut dolore id in ipsum duis aliquip consequat.',
    color: '#FFB9CC',
  },
  {
    id: 2,
    title: 'Pride and Prejudice',
    category: '1',
    portrait: null,
    author: 'Jane Austin',
    description:
      'Aliqua tempor amet est deserunt ut fugiat sint non consequat do qui. Mollit in sint aute deserunt cupidatat mollit voluptate irure ullamco et sunt cupidatat tempor. Anim sunt proident culpa aliqua est eu eu sit. Anim nostrud do occaecat nisi dolore amet aute enim velit enim. Incididunt proident officia aliqua qui ad amet commodo. Esse cupidatat nostrud ut aute cillum do ullamco ipsum aute nulla.',
    color: '#CEBDF2',
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    category: '1',
    portrait: null,
    author: 'Harper Lee',
    description:
      'Eu consectetur aliquip est ipsum non in veniam officia consectetur laborum cillum. Enim et eiusmod occaecat labore mollit ullamco culpa duis voluptate commodo incididunt. In ex dolore est esse amet quis pariatur aliquip reprehenderit elit sunt veniam. Culpa eu pariatur pariatur duis anim ut ex ea nostrud nostrud aliqua. Officia consectetur nostrud proident enim ullamco aute ea dolor officia commodo nisi nostrud ex.',
    color: '#B6D6F2',
  },
  {
    id: 4,
    title: 'To Kill a Mockingbird',
    category: '1',
    portrait: null,
    author: 'Harper Lee',
    description:
      'Eu consectetur aliquip est ipsum non in veniam officia consectetur laborum cillum. Enim et eiusmod occaecat labore mollit ullamco culpa duis voluptate commodo incididunt. In ex dolore est esse amet quis pariatur aliquip reprehenderit elit sunt veniam. Culpa eu pariatur pariatur duis anim ut ex ea nostrud nostrud aliqua. Officia consectetur nostrud proident enim ullamco aute ea dolor officia commodo nisi nostrud ex.',
    color: '#B6D6F2',
  },
]

const RecentBook = ({ toggleSidebar }) => {
  return (
    <div className='custom_section_book_Recent shadow rounded'>
      {MY_BOOKS.map(
        ({ id, portrait, title, category, author, description, color }) => (
          <div key={id} className='custom_section_item_Recent my-3'>
            <BookCard
              id={id}
              portrait={portrait}
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
  )
}

export default RecentBook
