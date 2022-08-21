import React, { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";

const LoginForm = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setName("");

    navigate({
      pathname: "/app",
      search: createSearchParams({
        name: name,
      }).toString(),
    });
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      
   
      
      
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <input className='form-input'
          value={name}
          type="text"
          name="name"
          id="name"
          placeholder="Entrez votre prénom"
          required
          onChange={(e) => handleChange(e)}
        />
        <button className='button' htmlFor="name" type="submit">
          Accéder à votre espace
        </button>{" "}
      </form>
     
    </div>
  );
};

export default LoginForm;
