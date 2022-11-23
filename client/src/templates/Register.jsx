import '../App.css';
import Header from '../templates/Header';
import Timer from '../templates/Timer';
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = () => {

    const navigation = useNavigate();

    const [regData, setRegData] = useState({
       name: '',
       number: '',
       password: ''
    });

    const goReg = async (e) => {
        e.preventDefault();
        let isnum = /^\d+$/.test(regData.number);
        if (!isnum) {
            alert("Phone number must contains only digits with max value 9")
            return;
        }
        if(!regData.name.length < 2  && !regData.number.length < 4 && !regData.password.length < 2) {
            const requestme = await axios.post('http://localhost:3001/user/registration', {
                Name: regData.name,
                Password: regData.password,
                PhoneNumber: regData.number
            })
            alert('Keep a 4 digit code that will come to your phone')
            alert('Accout created!')
            navigation("/login")
        } else {
            alert('Check fields!');
        }
    }

    return (
        <div className="main-wrap">
            <Header />

            <div className="content-home">
                <Timer />
                <form className="login-form" onSubmit={goReg}>
                    <h3>Register:</h3>
                    <p>Name :</p>
                    <input type="text" onChange={event => {setRegData({...regData, login: event.target.value})}}/>
                    <p>Phone number :</p>
                    <input type="text" onChange={event => {setRegData({...regData, number: event.target.value})}}/>
                    <p>Password :</p>
                    <input type="password" onChange={event => {setRegData({...regData, password: event.target.value})}}/>
                    <p>2FA :</p>
                    <input type="2FA" onChange={event => {setRegData({...regData, fa: event.target.value})}}/>
                    <button>Register</button>
                    <span>Do you have an account - <a href="./login">log in</a></span>
                </form>
            </div>
        </div>
    );
}

export default Register;