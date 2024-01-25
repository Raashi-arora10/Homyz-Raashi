import React, { useState } from 'react';
import './style.css'
import { Link } from 'react-router-dom';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri'; 

const API_URL = 'http://localhost:3000/api';

const Login = () =>{
  
  const [redirectTo, setRedirectTo] = useState(null); 
  
  const [formData, setFormData] = useState({
    'username':'',
    'email':'',
    'password':'',
    'confirmPassword':'',
  })

  const [errors, setErrors] = useState({
    'username':'',
    'email':'',
    'password':'',
    'confirmPassword':'',
  })
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;             //e.target -> extract 2 properties name and value from target object of event e
    setFormData((prevData) => ({                //new object create hua prev data copy hua aur agr value mein koi change h to vo new object mein update ho jaega
      ...prevData,                              //... = spread operator (use to copy previous data)
      [name] : value
    }))
  }
  
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      username:
        formData.username.trim() === ''
          ? 'Username is required'
          :formData.username.length < 4
          ? 'Username must be at least 4 characters'
          : '',
      email:
        formData.email.trim() === ''
          ? 'Email is required'
          : !/^[A-Z0-9._]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
          ? 'Invalid email address'
          : '',
        password:
          formData.password.trim() === ''
            ? 'Password is required'
            : formData.password.length < 8 ||
              !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                formData.password
              )
            ? 'Password must be at least 8 characters and contain a combination of symbols, numbers, and alphabets'
            : '',
        confirmPassword:
            formData.confirmPassword.trim() === ''
              ? 'Confirm Your Password'
              : formData.confirmPassword !== formData.password
              ? 'Passwords do not match'
              : '',
      }
      
      setErrors(newErrors);

          if(Object.values(newErrors).every((error) => error === '')){  

          try {
            const response = await fetch(`${API_URL}/signup`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });

            if (response.ok) {
              alert('User registered successfully');
            } else {
              const data = await response.json();
              setErrors(data);
              alert(data.message);
            }
          } catch (error) {
            console.error(error);
        }
      }
    }
        const handleSignInSubmit = async (e) => {
          e.preventDefault();
        
          // Validate email and password
          const newErrors = {
            email:
              formData.email.trim() === ''
                ? 'Email is required'
                : !/^[A-Z0-9._]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
                ? 'Invalid email address'
                : '',
            password:
              formData.password.trim() === ''
                ? 'Password is required'
                : formData.password.length < 8 ||
                  !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                    formData.password
                  )
                ? 'Password must be at least 8 characters and contain a combination of symbols, numbers, and alphabets'
                : '',
          };
        
          setErrors(newErrors);
        
          // Check if there are any errors while submitting the form
          if (Object.values(newErrors).every((error) => error === '')) {
            try {
              const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });
        
              if (response.ok) {
                console.log('Login successful');
                setRedirectTo('/home');
              } else {
                const data = await response.json();
                setErrors(data);
                alert(data.message);
              }
            } catch (error) {
              console.error(error);
              // Handle other errors
            }
          }
        };
    
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggle = () => {
    setIsSignIn((prevState) => !prevState);      //isSignIn kee value ko toggle krega agr true h to false and vise versa
  };

  if (redirectTo) {
    window.location.href = redirectTo;           //window.location.href is the url of current page and this line is used to change the url to the value we entered
  }
    return (
      <div className={`container2 cont ${isSignIn ? 'sign-in' : 'sign-up'}`}>
        {/* FORM SECTION */}
        <div className="row">
          {/* SIGN UP */}
          <div className="col align-items-center flex-col sign-up">
            <div className="form-wrapper align-items-center">
              <div className="form sign-up">
              <form onSubmit={handleSignUpSubmit}>
                {/* ... Your sign-up form content ... */}
                        <div className="input-group">
                            <input  name='username' id='username' type='text' placeholder='Username' onChange={handleChange} value={formData.username}/>
                            <span className='error'>{isSignIn ? errors.username : errors.username}</span>
                        </div>
                        <div className="input-group">
                            <i className='bx bx-mail-send'></i>
                            <input name='email' id='email' type='email' placeholder='Email' onChange={handleChange} value={formData.email} />
                            <span className='error'>{isSignIn ? errors.email : errors.email}</span>
                        </div>
                        <div className="input-group">
                            <i className='bx bxs-lock-alt'></i>
                            <input name='password' id='password' type={showPassword ? 'text' : 'password'} placeholder='Password' onChange={handleChange} value={formData.password}/>
                            <span className='error'>{isSignIn ? errors.password : errors.password}</span>
                            <span className="eye-icon" onClick={togglePasswordVisibility}>
                              {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                            </span>
                        </div>
                        <div className="input-group">
                            <i className='bx bxs-lock-alt'></i>
                            <input name='confirmPassword' id='confirmPassword' type={showPassword ? 'text' : 'password'} placeholder='Confirm Password' onChange={handleChange} value={formData.confirmPassword} />
                            <span className='error'>{isSignIn ? errors.confirmPassword : errors.confirmPassword}</span>
                            <span className="eye-icon" onClick={togglePasswordVisibility}>
                              {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                            </span>
                        </div>
                        {isSignIn ? (
                            <Link to="/home">
                              <button>Sign in</button>
                            </Link>
                            ) : (
                          <button type="submit">Sign up</button>
                          )}
                        <p>
                            <span>
                                Already have an account?
                            </span>
                            <b onClick={toggle} className="pointer">
                                Sign in here
                            </b>
                        </p>
                    </form>
              </div>
            </div>
          </div>
          {/* END SIGN UP */}
          {/* SIGN IN */}
          <div className="col align-items-center flex-col sign-in">
            <div className="form-wrapper align-items-center">
              <div className="form sign-in">
                <form onSubmit={handleSignInSubmit}>
                {/* ... Your sign-in form content ... */}
                <div className="input-group">
                            <i className='bx bxs-user'></i>
                            <input  name='email' id='email' type='email' placeholder='Email' onChange={handleChange} value={formData.email} />
                            <span className='error'>{errors.email}</span>
                        </div>
                        <div className="input-group">
                            <i className='bx bxs-lock-alt'></i>
                            <input name='password' id='password' type={showPassword ? 'text' : 'password'} placeholder='Password' onChange={handleChange} value={formData.password} />
                            <span className='error'>{errors.password}</span>
                            <span className="eye-icon" onClick={togglePasswordVisibility}>
                              {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                            </span>
                        </div>
                        <button type="submit">Sign in</button>
                        <p>
                            <b>
                                Forgot password?
                            </b>
                        </p>
                        <p>
                            <span>
                                Don't have an account?
                            </span>
                            <b onClick={toggle} className="pointer">
                                Sign up here
                            </b>
                        </p>
                      </form>
                  </div>
                </div>
            <div className="form-wrapper"></div>
          </div>
          {/* END SIGN IN */}
        </div>
        {/* END FORM SECTION */}
        {/* CONTENT SECTION */}
        <div className="row content-row">
          {/* SIGN IN CONTENT */}
          <div className={`col align-items-center flex-col ${isSignIn ? 'active' : ''}`}>
            <div className="text sign-in">
              <h2>Welcome to <br />Homyz</h2>
            </div>
            <div className="img sign-in"></div>
          </div>
          {/* END SIGN IN CONTENT */}
          {/* SIGN UP CONTENT */}
          <div className={`col align-items-center flex-col ${isSignIn ? 'active' : ''}`}>
            <div className="img sign-up"></div>
            <div className="text sign-up">
              <h2>Join with us</h2>
            </div>
          </div>
          {/* END SIGN UP CONTENT */}
        </div>
        {/* END CONTENT SECTION */}
        {/* Social Links go here */}
      </div>
    );
  }
  
  export default Login;
  
