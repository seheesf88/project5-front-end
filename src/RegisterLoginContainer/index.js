import React, { Component } from 'react';
import { Collapse, Button} from 'react-bootstrap';

import Nav from '../Nav';


class RegisterLoginContainer extends Component {
  constructor(){
    super()

    this.state = {
      register: {
        username: '',
        email: '',
        password: '',

      },
      login : {
        username: '',
        password: '',
        successful: false
      }
    }
  }

  componentDidMount(){
    console.log('this is componentDidMount');
  }

//-------------------- REGISTER -----------------------

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    const updatedRegister = {
      ...this.state.register
    }


    if(true){
      console.log('good password')
      this.fetchRegister(updatedRegister)
      this.setState({
        register: {
          username: '',
          email: '',
          password: '',
        }
      })
    }else{
      console.log('bad password')
      this.setState({
        register: updatedRegister
      })
    }
  }

  handleRegisterChange = (e) => {
    const updatedChange = {
      ...this.state.register
    }
    updatedChange[e.target.name] = e.target.value;

    this.setState({
      register: updatedChange
    })
  }


  fetchRegister = async(updatedRegister) => {
    console.log(updatedRegister)
    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(updatedRegister),
        headers: {
          'Content-Type': 'application/json'
        }
      })

    console.log(response)
    if(!response.ok){
      throw Error(response.statusText)
    }

    const parsedResponse = await response.json();
    console.log(parsedResponse)
    // this.setState({
    //   register: updatedRegister
    // });

    localStorage.setItem('userId', parsedResponse.userId)
    localStorage.setItem('username', parsedResponse.username)


    alert("Thank you for registier. please, login now!")

    this.props.history.push('/')

    }catch(err){
      console.log('fetchRegister func is fail')
    }
  }



//------------------- LOG IN---------------------------

handleLoginSubmit = (e) => {
  e.preventDefault();
  const updatedLogin = {
    ...this.state.login
  }

  this.fetchLogin(updatedLogin)
}

handleLoginChange = (e) => {
  const updatedChange = {
    ...this.state.login
  }
  updatedChange[e.target.name] = e.target.value;

  this.setState({
    login : updatedChange
  })
}

fetchLogin = async(updatedLogin) => {
  console.log('fetch login', updatedLogin)
  // console.log("555itj5itjiojioejro ", process.env.REACT_APP_API);
  //                                   ${process.env.REACT_APP_API}
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(updatedLogin),
      headers: {
        'Content-Type' : 'application/json'
      }
    });

    if(!response.ok){
      throw Error(response.statusText);
    }

    // console.log('LOGIN RESPONSE ==== ', response);
    const parsedResponse = await response.json();
    // console.log('parsedResponse =>', parsedResponse)
    if(parsedResponse.status !== 401){
      updatedLogin.successful = true;
      this.setState({
        login: updatedLogin
      })

      localStorage.setItem('userId', parsedResponse.userId)
      this.props.history.push('/home');
      // this.props.history.push(`/home/${this.state.login.username}`);
    }else{
      alert('login fail')
    }
  }catch(err){
    alert('login fail2')
    console.log(err)

  }
}



  render(){
    const { open } = this.state;
    return(
      <div>
      <h1 className="text-center my-5">My Trip Planner.</h1>
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-6 offset-3">
              <form onSubmit={this.handleLoginSubmit}>
                <div className="form-group">
                  <input className="form-control" type="text" name="username" onChange={this.handleLoginChange} placeholder="Username" />
                </div>
                <div className="form-group">
                  <input className="form-control" type="password" name="password" onChange={this.handleLoginChange} placeholder="Password"/>
                </div>
                <button className="btn btn-primary form-control" type="submit">login</button>
              </form>
            </div>
          </div>
        </div>

        <div className="text-center pt-2">need to register?</div>
        <Button
          className="col-2 offset-5 mt-5"
          variant="outline-primary"
          size=""
          onClick={() => this.setState({ open: !open})}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
        Register
        </Button>

        <Collapse in={this.state.open}>
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-6 offset-3">
              <form onSubmit={this.handleRegisterSubmit}>
                <div className="form-group">
                  <input className="form-control" type="text" name="username" placeholder="Username" value={this.state.register.username} onChange={this.handleRegisterChange}/>
                </div>
                <div className="form-group">
                  <input className="form-control" type="email" name="email" placeholder="Email" value={this.state.register.email} onChange={this.handleRegisterChange}/>
                </div>
                <div className="form-group">
                  <input className="form-control" type="password" name="password" placeholder="Password" value={this.state.register.password} onChange={this.handleRegisterChange}/>
                </div>
                <button className="btn btn-primary form-control" type="submit">submit</button>
              </form>
            </div>
          </div>
        </div>
        </Collapse>
      </div>
    )
  }
}
export default RegisterLoginContainer
