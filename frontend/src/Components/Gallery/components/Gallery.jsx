import React, {useState} from 'react';
import Modal from './Modal';
import ImageGallery from './ImagenGallery';
import AudioGallery from './AudioGallery';
import VideoGallery from './VideoGallery';

const Gallery = () => {
    const[modalState1, changeModalState1] = useState(false);
    const[modalState2, changeModalState2] = useState(false);
    const[modalState3, changeModalState3] = useState(false);


  return (
    <div>
        <div className=' Gallery_ContenedorBotones'>
            <div className=' Gallery_Boton' onClick={() => changeModalState1(!modalState1)}>Imagen</div>
            <div className=' Gallery_Boton' onClick={() => changeModalState2(!modalState2)}>Video</div>
            <div className=' Gallery_Boton' onClick={() => changeModalState3(!modalState3)}>Audio</div>
        </div>

    {/*Imagen */}
        <Modal
            state={modalState1}
            changeState={changeModalState1}>
                <div className=' Gallery_Contenido'>
                    <ImageGallery />
                </div>


        </Modal>

    {/*Video */}
        <Modal
            state={modalState2}
            changeState={changeModalState2}>
                <div className=' Gallery_Contenido'>
                    <VideoGallery />
                </div>


        </Modal>

    {/*Audio */}
        <Modal
            state={modalState3}
            changeState={changeModalState3}>
                <div className=' Gallery_Contenido'>
                    <AudioGallery />
                </div>


        </Modal>


    </div>
  )
}

export default Gallery



