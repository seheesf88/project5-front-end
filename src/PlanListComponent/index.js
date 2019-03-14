import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class PlanListComponent extends Component {
  render() {
    // console.log("props.planOwnerUsername ===>", props);
    const PlanList = this.props.getMyPlans.slice(0).reverse().map((plan, i) => {
      //MEMO 3: i had bug because i was useing props.getPlans.destination instead of
      //plan.destination.
      // console.log("this is local Id ------>", localStorage.getItem('userId'));
      // console.log("this is my plan user id ------>", plan.userId );
      if(plan.userId === localStorage.getItem('userId')){
        console.log(plan.userId === localStorage.getItem('userId'));
        // console.log("this is local Id ------>", localStorage.getItem('userId'));
      return(
        <tr key={i}>
          <td>{plan.firstDay}</td>
          <td><Link to={`plans/show/${plan._id}`}>{plan.tripName}</Link></td>
          <td>{plan.destination}</td>
          <td><button className="btn btn-primary" onClick={this.props.deletePlan.bind(null, plan._id)}>Remove</button></td>
        </tr>
        )
      }
    })

      return (
        <div>
        <h4 className="text-center">My trip plan List</h4>
          <table className="table table-stripped text-center mt-5">
            <thead>
              <tr>
                <th scope="col" className="mr-0">From ~</th>
                <th scope="col">Trip Name</th>
                <th scope="col">Destination</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {PlanList}
            </tbody>
          </table>
        </div>
      )
    }
  }


export default PlanListComponent

// <div>
// <h4 className="text-center">My trip plan List</h4>
// <hr />
//   <ul>
//     {PlanList}
//   </ul>
// </div>



//
// import React from 'react';
// import { Link } from 'react-router-dom'
//
// const PlanListComponent = (props) => {
//   // console.log("props ===>", props);
//   const PlanList = props.getMyPlans.reverse().map((plan, i) => {
//     console.log('Type of plan ID  = ', plan.userId, localStorage.getItem('userId'))
//     //MEMO: i had bug because i was useing props.getPlans.destination instead of
//     //plan.destination.
//
//     if(plan.userId === localStorage.getItem('userId')){
//         // console.log("if...?", plan.userId === localStorage.getItem('userId'));
//     return(
//
//       <li key={plan._id}>
//         <Link to={`plans/show/${plan._id}`}>
//         {plan.tripName}
//         </Link>
//
//         <button onClick={props.deletePlan.bind(null, plan._id)}>delete plan</button>
//       </li>
//
//     )
//   }
// })
//
//   return (
//     <div>
//     <h1>my plan list</h1>
//       <ol>
//         {PlanList}
//       </ol>
//     </div>
//   )
// }
//
//
// export default PlanListComponent
