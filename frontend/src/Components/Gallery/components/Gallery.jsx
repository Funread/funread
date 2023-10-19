import React, {useState} from 'react';
import Modal from './Modal';
import '../styles/styles.scss';

const Gallery = () => {
    const[modalState1, changeModalState1] = useState(false);

  return (
    <div>
        <div className=' Gallery_ContenedorBotones'>
            <div className=' Gallery_Boton' onClick={() => changeModalState1(!modalState1)}>Modal</div>
        </div>
        <Modal
            state={modalState1}
            changeState={changeModalState1}>
                <div className=' Gallery_Contenido'>
                    <Modal />
                </div>
        </Modal>
    </div>
  )
}

export default Gallery



