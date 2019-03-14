import React, { Component } from 'react';

import Nav from '../Nav';
import PlanContainer from '../PlanContainer';

class HomeContainer extends Component{
  constructor(){
    super()
    this.state ={
    }
  }


  render(){

    return(
    <div>
      <Nav props={this.props} />
      <PlanContainer props={this.props}/>
    </div>
    )
  }
}

export default HomeContainer;



// <div>
// <Nav props={this.props} />
//   <div>
//     <div className="container mt-5 mr-6">
//       <div className="row">
//         <div className="col-1">
//           <h1>welcome</h1>
//           <div>{localStorage.getItem('userId') !== null ? <div className="text-right">on</div> : "please log in"}</div>
//         </div>
//         <div className="col-10 offset-1">
//           <PlanContainer props={this.props}/>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
