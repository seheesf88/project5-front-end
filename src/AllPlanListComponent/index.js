import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class AllPlanListComponent extends Component {

  render() {
    // console.log("props.planOwnerUsername ===>", props);
    const PlanList = this.props.getMyPlans.reverse().map((plan, i) => {
      //MEMO: i had bug because i was useing props.getPlans.destination instead of
      //plan.destination.
      return(
        <tr key={i}>
          <td><Link to={`plans/show/${plan._id}`}>{plan.tripName}</Link></td>
          <td>{plan.destination}</td>
          <td>{plan.username}</td>
        </tr>
      )
    })

      return (
        <div>
        <h4 className="text-center">See other traveler's trip</h4>
          <table className="table table-stripped text-center mt-5">
            <thead>
              <tr>
                <th scope="col" className="mr-0">Trip Name</th>
                <th scope="col">Destination</th>
                <th scope="col">By</th>
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


export default AllPlanListComponent

//
// <div>
// <h4 className="text-center">See other traveler's trip</h4>
//   <hr />
//   <ul>
//     {PlanList}
//   </ul>
// </div>
