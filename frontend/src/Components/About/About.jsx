import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SidebarBook from '../Shared/SidebarBook/SidebarBook';
import './About.sass';

const Lobby = () => {
    return (
        <div className='container-fluid text-center lobby'>
            <div className='row' style={{ height: 'auto' }}>
                
                <div className='col-9 content_lobby'>

                    <div className="Title">

                        <div className="image">
                        </div>
                        <h1>FUNREAD</h1>
                    </div>
                    <section className='imageParallax'></section>
                    <div className="row ">
                        <div className="col-md-6">
                            <div className="header-content-left">
                                <img
                                    src="https://www.pngall.com/wp-content/uploads/2018/05/Books-PNG-Clipart.png"
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
                                <h2>Description</h2>
                                <p>
                                    FUNREAD is a pedagogical mediation tool in the dual
                                    modality (face-to-face and distance education)
                                    in order to improve English language skills
                                    (e.g., vocabulary, pronunciation, grammar and
                                    reading comprehension with emphasis on the general
                                    idea and details of reading comprehension)
                                    of sixth grade students at the Jesus of Nazareth School in Liberia.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                            <div className="header-content-right">
                                <h2></h2>
                                <p>
                                    For its design, a didactic unit within the sixth
                                    grade curriculum is taken as a basis and three
                                    gamification mechanics (e.g., ranking, points, prizes)
                                    are implemented. In addition, the application will be
                                    based on cartoons that incorporate aspects that highlight
                                    social justice and cultural diversity (ethnicity, social class,
                                    disability, language, gender, age, nationality, religion,
                                    and sexual identity) within the Costa Rican environment.
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
                </div>

                <div className='col-3 shadow rounded mobile-below-tap-lobby'>

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
                            <input type="submit" value="Send" className="pbutton" />

                        </form>
                    </div>

                </div>
            </div>
        </div>

    );
}
export default Lobby;