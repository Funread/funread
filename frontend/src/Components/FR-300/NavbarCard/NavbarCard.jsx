import './NavbarCard.css'

const NavbarCard = ({param}) =>{
    return(
        <>
            <div className="card cardnav">
                <div className="img-wrapper">
                   <img src={param } alt="Pages" className= 'imgnav' />
                </div>
                <div className="card-body">
                    <h5 className="card-title"></h5>
                    <p className="card-text"></p>
                    <p className="card-text"><small className="text-body-secondary"></small></p>
                </div>
            </div>
    </>
    );
}

export default NavbarCard;