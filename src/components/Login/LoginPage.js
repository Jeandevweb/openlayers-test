import React from 'react';
import LoginForm from './LoginForm';



const LoginPage = () => {
    return (
        <div className="login-page">
            <h1 >Bienvenue sur votre Espace de Travail</h1>
            <h2>Connectez vous</h2>
            <LoginForm/>
        </div>
    );
};

export default LoginPage;