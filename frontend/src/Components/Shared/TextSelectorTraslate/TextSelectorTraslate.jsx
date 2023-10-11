import React, { useState, useEffect, useRef } from "react";
import "./TextSelectorTraslate.css"
import { useLogin } from "../../../hooks/useLogin";

function TextSelectorTraslate() {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)
  const [Text, setText] = useState('')
  
      function showCustomMenu(event,text) {
        event.preventDefault();  // Evita el menú predeterminado del navegador
      
        const menu = menuRef.current;
        if(menu){
          menu.style.top = `${event.clientY}px`;
          menu.style.left = `${event.clientX}px`;
        }
        // Event listener para cerrar el menú cuando se hace clic fuera de él
        setShowMenu(true)
        document.addEventListener('click', handleOutsideClick);
      }

      function handleOutsideClick(event) {
        const menu = menuRef.current;
        if (menu && !menu.contains(event.target)) {
            setShowMenu(false)
            document.removeEventListener('click', handleOutsideClick);
        }
    }

    useEffect(() => {
      document.addEventListener('contextmenu', (event) => {
        const text = window.getSelection().toString();
          if (text) {
              setText(text)
              showCustomMenu(event,text);  // Llama a showCustomMenu con el evento
          }else{
            setShowMenu(false);
          }
      });
      
      // Limpiar el event listener cuando el componente se desmonta
      return () => {
          document.removeEventListener('contextmenu', showCustomMenu);
          document.removeEventListener('click', handleOutsideClick);
      };
    }, [Text]);  // Solo se suscribe y cancela la suscripción en el montaje y desmontaje


    return(
      <div className="text-selector-translate-container">
        <div id="customMenu" className={showMenu?"text-selector-translate-menu-active":"text-selector-translate-menu-desactive"} ref={menuRef}>
            <div className="text-selector-translate-menu-direction"></div>
            <button>Escuchar</button>
            <hr />
            <button>Traducir</button>
        </div>
      </div>
    );

}

export default TextSelectorTraslate;