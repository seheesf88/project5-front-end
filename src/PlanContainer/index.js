import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PlanListComponent from '../PlanListComponent';
import AllPlanListComponent from '../AllPlanListComponent';
import PlanCreateComponent from '../PlanCreateComponent';

class PlanContainer extends Component{
  constructor(){
    super()
    this.state = {
      // plans : [], //all plans
      myplans: [], //my plan
      plan: {
        tripName: '',
        destination: '',
        traveler: '',
        tripPeriod: '',
        firstDay: '',
        lastDay:'',
        budget:'',
        userId:''
      },
      // planOwnerUsername: '',
      // savedUserId: '',
    }
  }

  componentDidMount(){
    this.getMyPlans()
    // this.getPlanOwner()
  }

//show!!
//get all plans that has userId and username info...
  getMyPlans = async() => {
    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/myplans`, {
        credentials: 'include',
      })
      // console.log("getmyplans 2 response? ======>", response);
      if(!response.ok){
        //console.log("response is not okay");
        throw Error(response.statusText)
      }

      const plansParsed = await response.json();
      // console.log("plansParsed?3 =====>", plansParsed);
      this.setState({
        myplans: plansParsed.plan
      })
    }catch(err){
      console.log("getPlans failure");
      return err
    }
  }

// // create plans
//
//   handleChange = (e) => {
//     this.setState({
//       plan : {
//         ...this.state.plan,
//         [e.target.name]: e.target.value
//       }
//     })
//   }
//
//
//   addPlan = async(e) => {
//     e.preventDefault();
//     //PROBLEM: i am not sure this is right way to fix the problems
//     try{
//       const response = await fetch('http://localhost:9000/api/v1/users/myplans', {
//         method: 'POST',
//         credentials: 'include',
//         body: JSON.stringify(this.state.plan),
//         headers: {
//           'Content-Type' : 'application/json'
//         }
//       })
//       if(!response.ok){
//         throw Error(response.statusText)
//       }
//
//       // console.log('response ---=========---->', response);
//       const parsedCreatedPlan = await response.json()
//       console.log('this is parsedCreatedPlan ==================>', parsedCreatedPlan)
//
//       this.setState({
//         myplans: [...this.state.myplans, parsedCreatedPlan],
//         //need to add/setState username and id here..
//         // plan: {
//         //   ...this.state.plan,
//         //   tripName: '',
//         //   destination: '',
//         //   traveler: '',
//         //   tripPeriod: '',
//         //   firstDay: '',
//         //   lastDay:'',
//         //   budget:'',
//         //   userId:''
//         // },
//       })
//       // this.getPlanOwner()
//       this.props.history.push('/home')
//     }catch(err){
//       console.log("add plan is failed", err)
//     }
//   }

  deletePlan = async(id, e) => {
    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/plans/delete/` + id,{
        method: 'DELETE'
      })

      if(!response.ok){
        throw Error(response.statusText)
      }

      // const parsedResponse = await response.json()


      this.setState({
        myplans: this.state.myplans.filter((plans) => plans._id !== id)
        })
    }catch(err){
      console.log("delete plan failure");
    }
  }


  render(){
    return(
      <div>
          <div className="container">
            <div className="row mt-5">
              <div className="col-6 ml-0">
          <PlanListComponent getUpdatedList={this.getMyPlans} getMyPlans={this.state.myplans} deletePlan={this.deletePlan}/>
              </div>
              <div className="col-5 offset-1 ml-1">
          <AllPlanListComponent getUpdatedList={this.getMyPlans} getMyPlans={this.state.myplans} deletePlan={this.deletePlan} />
              </div>
            </div>
          </div>
      </div>
    )
  }
}
export default withRouter(PlanContainer);
