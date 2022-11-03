import React from 'react'
import { WizardInformation } from '../../Components/WizardParte1/WizardInformation'
import '../Pages/style.css'
export const Pages = (props) => {

  if(props.page == 1){
    return(
      <>
        <WizardInformation></WizardInformation>
      </>
    )
  }else{
    return(
      <>     
      </>
    )
  }
}
