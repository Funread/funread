import React, { useState, useEffect, useRef } from "react";
import "./TextSelectorTraslate.css"
import { useLogin } from "../../../hooks/useLogin";

function TextSelectorTraslate() {
    const [Text, setText] = useState('')
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef(null)

      function showCustomMenu(event,text) {
        event.preventDefault();  // Evita el menú predeterminado del navegador
      
        setText(text)
        console.log(text);
        
        const menu = menuRef.current;
        menu.style.top = `${event.clientY}px`;
        menu.style.left = `${event.clientX}px`;
        // Event listener para cerrar el menú cuando se hace clic fuera de él
        setShowMenu(true)
        console.log(Text); 
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
              showCustomMenu(event,text);  // Llama a showCustomMenu con el evento
          }
      });
      
      // Limpiar el event listener cuando el componente se desmonta
      return () => {
          document.removeEventListener('contextmenu', showCustomMenu);
          document.removeEventListener('click', handleOutsideClick);
      };
    }, []);  // Solo se suscribe y cancela la suscripción en el montaje y desmontaje


    return(
      <div className="text-selector-translate-container">
        <div id="customMenu" className={showMenu?"text-selector-translate-menu-active":"text-selector-translate-menu-desactive"} ref={menuRef}>
            <div style={{padding: 10+'px'}}>Opción 1</div>
            <div style={{padding: 10+'px'}}>Opción 2</div>
        </div>
      </div>
    );

}

export default TextSelectorTraslate;