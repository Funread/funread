import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SidebarBook from '../Shared/SidebarBook/SidebarBook';

import './Lobby.sass';



const Lobby = () => {
    return (
        <div className='lobby'>
            <Navbar className="custom-navbar">
                <Container>
                    <Navbar.Brand href="#home">FUNREAD</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">About Us</Nav.Link>                       
                        <Nav.Link href="#pricing">Investigators</Nav.Link>
                        <Nav.Link href="#features">Contact Us</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <section className='imageParallax'></section>
            <div className="lobby">
                <div className="row">
                    <div className="col-md-12">
                        <div className="Title">
                            <h1>FUNREAD</h1>
                        </div>
                    </div>
                </div>

                <section className='imageParallax'></section>
            
                <div className="row">
                    <div className="col-md-6">
                        <div className="header-content-left">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/023/985/139/non_2x/school-materials-clip-art-cartoon-books-free-png.png"
                                alt="Descripción de la imagen"
                            />
                        </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <div className="header-content-right">
                            <h2>Objective</h2>
                            <p>
                               To design the FUNREAD application for
                               its implementation as a pedagogical
                               mediation tool to improve the English
                               language skills of sixth grade students
                               at the Jesus of Nazareth School in Liberia.
                            </p>
                        </div>
                    </div>
                </div>
                <section className='imageParallax'></section>
                <div className="row">
                    <div className="col-md-6">
                        <div className="header-content-left">
                            <h2>Mission</h2>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi
                                molestiae deserunt tempora non officiis illo soluta vero? Eveniet odio
                                natus iusto. Nisi repellat omnis laudantium nihil. Iure ratione animi
                                natus.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <div className="header-content-right">
                            <h2>Vision</h2>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi
                                molestiae deserunt tempora non officiis illo soluta vero? Eveniet odio
                                natus iusto. Nisi repellat omnis laudantium nihil. Iure ratione animi
                                natus.
                            </p>
                        </div>
                    </div>
                </div>
                <section className='imageParallax'></section>
                <div className="row ">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h2>Investigators</h2>

                        <div className="col-12 flex-wrap investigators">
                            <div className='my-2 p-3 d-flex flex-column justify-content-center align-items-center'>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                                    className="rounded-circle mb-3"
                                    style={{ width: "150px" }}
                                    alt="Avatar"
                                />

                                <h5 >
                                <strong>Ana Marcela Montenegro Sánchez</strong>
                                </h5>
                                <p className="text-muted">
                                    Principal Investigator
                                </p>
                            </div>
                            <div className='my-2 p-3 d-flex flex-column justify-content-center align-items-center'>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                                    className="rounded-circle mb-3"
                                    style={{ width: "150px" }}
                                    alt="Avatar"
                                />

                                <h5 className="mb-2">
                                    <strong>Razziel Acevedo Álvarez</strong>
                                </h5>
                                <p className="text-muted">
                                    Collaborator Investigator
                                </p>
                            </div>

                            <div className='my-2 p-3 d-flex flex-column justify-content-center align-items-center'>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                                    className="rounded-circle mb-3"
                                    style={{ width: "150px" }}
                                    alt="Avatar"
                                />

                                <h5 className="mb-2">
                                    <strong>Lang Ying Hernández Chavez</strong>
                                </h5>
                                <p className="text-muted">
                                    Collaborator Investigator
                                </p>
                            </div>

                            <div className='my-2 p-3 d-flex flex-column justify-content-center align-items-center'>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                                    className="rounded-circle mb-3"
                                    style={{ width: "150px" }}
                                    alt="Avatar"
                                />
                                <h5 className="mb-2">
                                    <strong>Roberto Enrique Rojas Alfaro</strong>
                                </h5>
                                <p className="text-muted">
                                    Collaborator Investigator
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <section className='imageParallax'></section>
                <div className="row mb-2">
                    <div className="col-12"> 
                        <div className="formulario">
                            <form action="">
                                <h2>How can we help you?</h2>
                                <div className="input-wrapper">
                                    <input type="text" name="name" id="name" required />
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="input-wrapper">
                                    <input type="text" name="subject" id="subject" required />
                                    <label htmlFor="subject">Subject</label>
                                </div>
                                <div className="input-wrapper">
                                    <textarea name="message" id="message" rows="5" required></textarea>
                                    <label htmlFor="message">Message</label>
                                </div>
                                <input type="submit" value="Send" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        <section className='imageParallax'></section>

        </div>
    );
}
export default Lobby;