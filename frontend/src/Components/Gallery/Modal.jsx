import React from 'react'
import styled from 'styled-components'


const Modal = ({children, state, changeState}) => {
  return (
    <>
        {state &&
            <Overlay>
                <ContenedorModal>
                    <EncabezadoModal>
                        <h3>Bienvenido</h3>
                    </EncabezadoModal>

                    <BotonCerrar onClick={() => changeState(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16">
                    <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
                    <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
                    </svg>
                    </BotonCerrar>

                    {children}
                </ContenedorModal>
            </Overlay>
        }
    </>
  )
}

export default Modal;

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);

    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

`;

const ContenedorModal = styled.div`
    width: 500px;
    min-height: 100px;
    background: #fff;
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
    padding: 20px;

`

const EncabezadoModal = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #E8E8E8;

    h3{
        font-weight: 500;
        font-size: 16px;
        color: #1766DC;

    }

`

const BotonCerrar = styled.button`
    position: absolute;
    top: 15px;
    right: 20px;
    
    width: 30px;
    height: 30px;
    border none;
    background: none;
    cursor: pointer;
    transition: .3s ease all;
    border-radius: 5px;
    color: #1766DC;

    &:hover{
    background: #f2f2f2;

    }

    svg{
        width: 100%;
        height: 100%;

    }

`
