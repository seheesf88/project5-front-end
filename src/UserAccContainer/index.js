import React, { Component } from 'react';

import Nav from '../Nav';

class UserAccContainer extends Component {
  constructor(){
    super()
    this.state = {
      userinfo : {
          username: '',
          email: '',
          password: '',
        }
    }
  }

  componentDidMount(){
    console.log('userAccContainer is working - 0')
    this.getMyinfo()
  }

//show
  getMyinfo = async() => {
    const userId = localStorage.getItem('userId');
    // console.log('USER ID ==== ', userId)
    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/` + userId, {
        credentials: 'include'
      });

      // console.log('1')
      if(!response.ok){
        throw Error(response.statusText)
      }

      // console.log('2', response)
      const userParsed = await response.json();

      // console.log('3', userParsed)
      this.setState({
          userinfo: userParsed.data
      })
      // console.log('4 done')
    }catch(err){
      console.log('get myinfo is failed?')
      return err
    }
  }


//edit
  handleSubmit = async(e) =>{
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    console.log(e)
    console.log('edit userId', userId)
    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/info/` + userId, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(this.state.userinfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log('is response working?', response)
    if(!response.ok){
      console.log('handle submit for edit is fail')
      throw Error(response.statusText);
    }

    const parsedResponse = await response.json();
    console.log('12', parsedResponse)


    if(parsedResponse.status === 200){
      console.log('13', parsedResponse.data);
      this.props.history.push('/home')
    }else{
      console.log('data was not equal to use is updated')
    }
  }

  handleChange = (e) => {
    this.setState({
      userinfo: {
        ...this.state.userinfo,
      [e.target.name] : e.target.value
      }
    })
  }

//delete
  deleteMyacc = async(e) => {
    e.preventDefault()//MEMO: button will refresh the page by default

    try{
      const userId = localStorage.getItem('userId');
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/delete/` + userId, {
        method: 'DELETE',
        credentials: 'include'
      });

      if(!response.ok){
        throw Error(response.statusText)
      }

      const responseParsed = await response.json();
      // console.log('responseParsed? =>', responseParsed)
      if(responseParsed.status === 200){
        //localStorage.setItem('userId', responseParsed.userId)
        //PROBLEM: this is for logging out. delete acc is not logout
        this.props.history.push('/')
      }else{
        console.log('this is fail')
      }


    }catch(err){
      alert('delete is failed')
      console.log('delete is fail')
    }

  }



  render(){
    const userId = localStorage.getItem('userId');
    if(!userId) {
      this.props.history.push('/');
    }

    return(
      <div>
        <Nav />
        <div className="container">
          <div className="row">
            <div className="col-10 offset-1">
            <h1>Profile.</h1>
              <div className="my-5">
                <h3>See my info.</h3>
                <div> ID: {this.state.userinfo.username}</div>
                <div> Email: {this.state.userinfo.email}</div>
              </div>

              <div className="my-5">
                <h3>Edit My Info. Or Delete My Account</h3>
                <div className="container">
                  <div className="row mt-5">
                    <div className="col-md-6 offset-3">
                      <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                          <input className="form-control" type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                          <input className="form-control" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                          <input className="form-control" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                        </div>
                        <button className="btn btn-primary form-control" type="submit">submit</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3>Delete My Account.</h3>
                  <div className="container">
                    <div className="row mt-5">
                      <div className="col-md-6 offset-3">
                <form onSubmit={this.deleteMyacc}>
                  <button className="btn-outline-danger form-control" type="submit">delete my account</button>
                </form>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserAccContainer;


//
// <form onSubmit={this.handleSubmit}>
//   username : <input type="text" name="username" placeholder="username" onChange={this.handleChange}/>
//   email : <input type="email" name="email" placeholder="email" onChange={this.handleChange}/>
//   password : <input type="password" name="password" placeholder="password" onChange={this.handleChange}/>
//   <button type="submit">edit</button>
// </form>
//
// </div>
