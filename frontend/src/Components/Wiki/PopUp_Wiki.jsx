import React from 'react'
import { Button} from 'react-bootstrap'
import { useState } from "react";
import PopUp from "../Shared/PopUp/PopUp";


function PopUp_Wiki() {
    const [visibility, setVisibility] = useState(false);
    const [active, setActive] = useState(false);

    const popupCloseHandler = () => {
        setVisibility(false);
      };
    
      const toggle = () =>{
        setActive(!active);
      }
      

   
        //Pre  
        return (
            //Return Here component or html code
            <div>
               <Button variant="outline-info" onClose={popupCloseHandler}
             onClick={() => setVisibility(true)}>Open Pop Up</Button>

            <PopUp active={active} toggle={toggle} show={visibility} title="Wiki" onClose={popupCloseHandler}/>
                
            </div>

            )
    }

export default PopUp_Wiki