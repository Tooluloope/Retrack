import React from 'react'

import './sign-up.component.scss'
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import axios from 'axios';



class SignUp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password:'',
            confirmPassword:'',
            displayName:'',
            phoneNumber:'',
        }
    
    }

     handleSubmit = async e => {
         e.preventDefault();

        const {email, password, confirmPassword, displayName,phoneNumber} = this.state;
        
        axios.post("https://cors-anywhere.herokuapp.com/https://retrack-api.herokuapp.com/api/register", {
            password:password,
            email:email,
            name: displayName,
            phone:phoneNumber
        })
        .then(response => {
            console.log("res from signup", response)
        }).catch(
            error => {
                console.log("error from signup", error)
            }
        )

        console.log(this.state)

        if (confirmPassword !== password) return;

        
        
        try {
            const{ user }  = await auth.createUserWithEmailAndPassword(email, password)
            
            await createUserProfileDocument({...user, displayName, phoneNumber})
        } catch (error) {
            console.log(error)
        }

        this.setState({
            email: '',
            password:'',
            confirmPassword:'',
            displayName:'',
            phoneNumber:'',
        })

    }

    handleChange = e => {
       const  {value, name } = e.target;

       this.setState({[name]:value});
    }

    render() {
        const {email, password, confirmPassword, displayName,phoneNumber} = this.state;
        return(

            <div className="sign-up">
                <h2 className='title'>
                    I do not have an Account
                </h2>
                <span>
                    Sign up with your email and password
                </span>
                <form className='sign-up-form'  onSubmit = {this.handleSubmit}>
                    <FormInput
                    label="Display Name"
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange = {this.handleChange} required />
                    <FormInput
                    label="Email Address"
                    type='email'
                    name='email'
                    value={email}
                    onChange = {this.handleChange} required />
                    <FormInput
                    label="Phone Number"
                    type='number'
                    name='phoneNumber'
                    value={phoneNumber}
                    onChange = {this.handleChange} required />
                    <FormInput
                    label="Password"
                    type='password'
                    name='password'
                    value={password}
                    onChange = {this.handleChange} required />
                    <FormInput
                    label="Confirm Password"
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange = {this.handleChange} required />
                    <CustomButton type='submit' children = {'SIGN UP NOW'}  />
                </form>

                
            </div>
        )
    };
};

export default SignUp;