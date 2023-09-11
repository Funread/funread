import './NavbarCard.css'

const NavbarCard = ({param}) =>{
    return(
        <>
            <div class="card cardnav">
                <div class="img-wrapper">
                   <img src={param } alt="Pages" class= 'imgnav' />
                </div>
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class="card-text"></p>
                    <p class="card-text"><small class="text-body-secondary"></small></p>
                </div>
            </div>
    </>
    );
}

export default NavbarCard;