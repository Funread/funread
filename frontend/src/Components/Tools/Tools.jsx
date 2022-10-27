import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, SplitButton } from "react-bootstrap";
import "./Tools.css";

function Tools(){

    return(
        <div className="Tools">
            <div className="Toolslabel">
                <h3>Tools</h3>
            </div>

            <div className="Typographyandsize">
            <div class="row">
                <div class="col-8">
                    <div className="TypographyDropdown">
                        <Dropdown>
                        <Dropdown.Toggle variant = "white" size= "sm" id="dropdown-basic">
                            Times New Roman
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        <Dropdown.Item href="#/typography1"> Tipografía 1 </Dropdown.Item>
                        <Dropdown.Item href="#/typography2"> Tipografía 2 </Dropdown.Item>
                        <Dropdown.Item href="#/typography3"> Tipografía 3 </Dropdown.Item>
                        <Dropdown.Item href="#/typography4"> Tipografía 4 </Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>

            <div class="col-4">
                    <div className="sizeCounter">
                        <input type= "number" id= "size" min={10} max={96} step = {2}></input>
                    </div>
            </div>
                    
            </div>
            </div>
            <div className="Toolsoptions">
                <div className="row">
                    <div className="col-6">
                       {['Tool 1', 'Tool 2', 'Tool 3', 'Tool 4', 'Tool 5', 'Tool 6', 'Tool 7', 'Tool 8'].map((toolList) =>
                        <SplitButton
                        key = {toolList}
                        id = {`dropdown-button-drop-${toolList}`}
                        drop = {'end'}
                        variant = "white"
                        title = {` ${toolList} `}
                        ></SplitButton> 
                       )}
                    </div>
                </div>
                
            </div>
      </div>      
    )
}

export default Tools;