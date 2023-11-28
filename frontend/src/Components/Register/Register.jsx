import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { list_All_Roles, updateUser,new_userrole } from "../../api"; 
import { useSelector, useDispatch } from "react-redux";
import { updateUserSlice, deleteUser } from "../../redux/userSlice";
import Carousel from "../Shared/Carousel/Carousel";
import { sendMail } from "../../api";

import image1 from "./img/image1.jpg"
import image2 from "./img/image2.jpg"
import image3 from "./img/image3.jpg"
import image4 from "./img/image4.jpg"
import image5 from "./img/image5.jpg"

function Register(props) {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [username,setUsername] = useState('')
  const [roles,setRoles] = useState([])
  const [selectedRoles, setSelectedRoles] = useState([]);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleSubmit = (event) => {
    event.preventDefault(); 
    updateUser(user.email,name,lastname,username).then( (res) => {
      selectedRoles.forEach(role => {
        new_userrole(user.userId, role.rolesid).then(
        ).catch((err)=> {
          alert('Ha ocurrido un error al agregar roles\n\n'+err.message+'\n\n Register.jsx(line:33)')
          dispatch(deleteUser())
          navigate('/')
        })
      })
      const updatedData = {name:name,lastname:lastname,username:username,roles:selectedRoles}
      dispatch(updateUserSlice(updatedData))
      sendMail('¡Bienvenido a FUNREAD, '+user.name+' '+user.lastname+'!', user.email, 'Estimado/a '+user.name+',\n\n¡Te damos la más cordial bienvenida a FUNREAD! Estamos emocionados de tenerte a bordo y queremos agradecerte por unirte a nuestra comunidad de aprendizaje de inglés.\n\nTu participación en FUNREAD es fundamental, y confiamos en que te desempeñarás excepcionalmente en el(los) rol(es) que has elegido. Tu contribución será valiosa para el éxito de nuestra plataforma.\n\nEn FUNREAD, te ofrecemos una experiencia única para aprender y mejorar tus habilidades en inglés. Nuestros recursos y herramientas están diseñados para que puedas alcanzar tus metas de aprendizaje de la manera más efectiva y divertida.\n\nUna vez más, gracias por unirte a FUNREAD. Estamos seguros de que tendrás una experiencia enriquecedora con nosotros. ¡Estamos emocionados de verte alcanzar tus objetivos de aprendizaje de inglés!\n\nSi tienes alguna pregunta o necesitas asistencia, no dudes en comunicarte con nosotros. ¡Te deseamos mucho éxito en tu viaje de aprendizaje de inglés!\n\nSaludos cordiales,\nEquipo de FUNREAD')
      navigate('/library')
    }
    ).catch((err) => {
      if(err.response.status == 401){
        alert('El token del usuario expiro, loguese de nuevo\n\n'+err.message+'\n\n Register.jsx(line:42)')
        dispatch(deleteUser())
        navigate('/')
      }else{
        alert('Ha ocurrido un error al actualizar el usuario\n\n'+err.response.data.username+'\n\n Register.jsx(line:44)')
      }
    })
  }

  const isEmpty = (data, id) => {
    data !== ""
      ? changeInputColor(id, "#42006d")
      : changeInputColor(id, "#e9e9e9");

    if (id === "passwordInput") {
      data !== ""
        ? (document.getElementById("inputGroupText").style.borderColor =
            "#42006d")
        : (document.getElementById("inputGroupText").style.borderColor =
            "#e9e9e9");
    }
  };

  const changeInputColor = (id, color) => {
    document.getElementById(id).style.borderColor = color;
    document.getElementById(id).style.color = color;
  };

  const CheckBoxList = () => {
    return (
      <div className="register-roles-div-flex">
        {roles.map((role) => (
            <Form.Check className="register-checkboxes"
              key={role.rolesid}
              type="checkbox"
              value={role.rolesid}
              checked={selectedRoles.includes(role)}
              onChange={(e) => {e.target.checked?setSelectedRoles([...selectedRoles, role]):setSelectedRoles(selectedRoles.filter((selectedRole) => selectedRole !== role))}}
              label={role.role}
            />
        ))}
      </div>
    );
  }

  useEffect(() => {
    if(name !== "" && lastname !== "" && username !== "" && selectedRoles[0]){
      document.getElementById("submit-button").className = "register-form-button-filled"
    }else{
      document.getElementById("submit-button").className = "register-form-button-empty";
    }
    if(!roles[0]){
      setName(user.name)
      isEmpty(user.name, "nameInput");
      list_All_Roles().then((res) => {
        setRoles(res.data);
      })
    }
  })

  return (
    <div className="register-container">
      <div className="register-carousel-container">
          <Carousel Images={[image1,image2,image3,image4,image5]} timeSlideInSeconds={5} controls={false}/>
      </div>
      <div className="register-form">
          <Form onSubmit={handleSubmit} className="register-form-content">
            <h1 className="register-form-title">Finish you register</h1>
            <h5 className="register-form-subtitle">
              Add your information and start exploring FUNREAD.
            </h5>
            <div className="register-form-inputs">
              <Form.Group className="form-group">
                <Form.Label className="font-size">
                  Name
                </Form.Label>
                <Form.Control
                  id="nameInput"
                  size="lg"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    isEmpty(e.target.value, "nameInput");
                  }}
                  className="login-form-control-lg"
                  placeholder="You Name"
                  required
                  />
              </Form.Group>
              <Form.Group className="form-group">
                <Form.Label className="font-size">
                  LastName
                </Form.Label>
                <Form.Control
                  id="lastnameInput"
                  size="lg"
                  type="text"
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                    isEmpty(e.target.value, "lastnameInput");
                  }}
                  className="login-form-control-lg"
                  placeholder="You LastName"
                  required
                  />
              </Form.Group>
              <Form.Group className="form-group">
                <Form.Label className="font-size">
                  UserName
                </Form.Label>
                <Form.Control
                  id="usernameInput"
                  size="lg"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    isEmpty(e.target.value, "usernameInput");
                  }}
                  className="login-form-control-lg"
                  placeholder="You UserName"
                  required
                  />
              </Form.Group>
              <Form.Group className="form-group">
                <Form.Label className="font-size">
                  Roles
                </Form.Label>
                <div className="register-form-group-center-items">
                  <hr/>
                  <CheckBoxList roles={roles} />
                </div>
              </Form.Group>
              <Button id="submit-button" className="register-form-button-empty" type="submit">
                Finish Register
              </Button>
            </div>
          </Form>
      </div>
    </div>
  );
}

export default Register;