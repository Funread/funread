import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Register.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { list_All_Roles, updateUser,new_userrole } from "../../api"; 
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";

function Register(props) {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [username,setUsername] = useState('')
  const [roles,setRoles] = useState([])
  const [selectedRoles, setSelectedRoles] = useState([]);
  const user = useSelector((state) => state.user)

  const handleSubmit = () => {
    updateUser(name,lastname,username).then(
      selectedRoles.forEach(role => {
        new_userrole().then().catch((err)=> {

        })
      })
    ).catch((err) => {
      alert('Ha ocurrido un error al actualizar el usuario\n\n'+err.response.data.detail+'\n\n Register.jsx(line:23)')
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
              checked={selectedRoles.includes(role.rolesid)}
              onChange={(e) => {e.target.checked?setSelectedRoles([...selectedRoles, role.rolesid]):setSelectedRoles(selectedRoles.filter((id) => id !== role.rolesid))}}
              onClick={console.log(selectedRoles)}
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
      list_All_Roles().then((res) => {
        setRoles(res.data);
      })
    }
  })

  return (
    <div className="register-container">
      <div className="register-form">
          <Form onSubmit={handleSubmit} className="register-form-content">
            <h1 className="register-form-title">Finish you register</h1>
            <h5 className="register-form-subtitle">
              Add your information and start exploring FUNRED.
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
                <Form.Label>Roles</Form.Label>
                  <CheckBoxList roles={roles} />
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
