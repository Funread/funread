import React, {useState} from 'react';
import styled from 'styled-components';
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
        <ContenedorBotones>
            <Boton onClick={() => changeModalState1(!modalState1)}>Imagen</Boton>
            <Boton onClick={() => changeModalState2(!modalState2)}>Video</Boton>
            <Boton onClick={() => changeModalState3(!modalState3)}>Audio</Boton>
        </ContenedorBotones>

    {/*Imagen */}
        <Modal
            state={modalState1}
            changeState={changeModalState1}>
                <Contenido>
                    <ImageGallery />
                </Contenido>


        </Modal>

    {/*Video */}
        <Modal
            state={modalState2}
            changeState={changeModalState2}>
                <Contenido>
                    <VideoGallery />
                </Contenido>


        </Modal>

    {/*Audio */}
        <Modal
            state={modalState3}
            changeState={changeModalState3}>
                <Contenido>
                    <AudioGallery />
                </Contenido>


        </Modal>


    </div>
  )
}

export default Gallery


const ContenedorBotones = styled.div`
    padding: 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px

`;

const Boton = styled.button`
    display: block;
    padding: 10px 30px;
    border-radius: 100px;
    color: #fff;
    border: none;
    background: #1766DC;
    cursor: pointer;
    font-family: 'Robot', sans-serif;
    font-weight: 500;
    transition: .3s ease all;

    &:hover {
        background: #0066FF;
    }

`;

const Contenido = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`

