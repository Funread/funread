import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Lobby.sass';

const Lobby = () => {
    return (
        <>
            <Navbar className="custom-navbar">
                <Container>
                    <Navbar.Brand href="#home">FUNREAD</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Sobre Nosotros</Nav.Link>
                        <Nav.Link href="#features">Contactanos</Nav.Link>
                        <Nav.Link href="#pricing">Investigadores</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="Title">
                            <h1>FUNREAD</h1>
                        </div>
                    </div>
                </div>
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
                            <h2>Titulo</h2>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi
                                molestiae deserunt tempora non officiis illo soluta vero? Eveniet odio
                                natus iusto. Nisi repellat omnis laudantium nihil. Iure ratione animi
                                natus.
                            </p>
                        </div>
                    </div>
                </div>
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
                <div className="row">
                    <div className="col-12"> 
                        <div className="formulario">
                            <form action="">
                                <h2>En que te podemos ayudar</h2>
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
        </>
    );
}
export default Lobby;