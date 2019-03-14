import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';

const Nav = (props) => {

  const userId = localStorage.getItem('userId');
  // const userId = props.match.params.id;
  // console.log('RRD PROPS ===== ', props)
  // console.log('USERID ===== ', userId, props)
  console.log(userId);

  const logout = async() => {
      console.log('in logout func=>')
    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/logout`, {
        credentials: 'include'
      });

      console.log('response =>', response )
      if(!response.ok){
        throw Error(response.statusText);
      }

      const responseParsed = await response.json();
      console.log('responseParsed =>', responseParsed)
      if(responseParsed.status === 200){
        console.log(responseParsed.status === 200);
        // const cookies = new Cookies();
        // console.log('cookie =>', cookies);
        // cookies.remove('userId');
        localStorage.removeItem('userId')
        props.history.push('/')
      }

    }catch(err){
      console.log('fail to logout')
    }
  }



  return(
    <div>
      <ul className="nav justify-content-end pr-3 pt-3">
        <li className="nav-item">
          <Link to="/home" className="nav-link active">Home</Link>
        </li>
        <li className="nav-item">
          <Link to={`/makemyplan`} className="nav-link">Make Trip</Link>
        </li>
        <li className="nav-item">
          <Link to={`/myaccount/${userId}`} className="nav-link">My Account</Link>
        </li>
        <li className="nav-item">
          <button onClick={logout} className="nav-link btn btn-outline-primary" tabindex="-1" aria-disabled="true"> Logout</button>
        </li>
      </ul>
    </div>
    )
}

export default withRouter(Nav);


// <ul>
//   <li>
//     <Link to="/home">Home</Link>
//   </li>
//   <li>
//     <Link to={`/makemyplan`}>Make Trip</Link>
//   </li>
//   <li>
//     <Link to={`/myaccount/${userId}`}>My Account</Link>
//   </li>
//   <li>
//     <button onClick={logout}>Logout</button>
//   </li>
// </ul>
