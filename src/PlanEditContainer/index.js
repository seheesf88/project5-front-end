import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


import Nav from '../Nav';

class PlanEditContainer extends Component {
  constructor(){
    super()
    this.state = {
      plan: {},
    }
  }

  // edit - planfile/:id
  handleEditFormInput = (e) => {
    this.setState({
      plan: {
        ...this.state.plan,
        [e.target.name] : e.target.value
      }
    })
  }

  updatedMyPlan = async(e) => {
    e.preventDefault();
    const userId = window.location.pathname.split('/')[3]
    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/plans/edit/` + userId, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(this.state.plan),
        headers: {
          'Content-Type' : 'application/json'
        }
      })

      if(!response.ok){
        throw Error(response.statusText)
      }
      this.props.history.push('/home')
    }catch(err){
      console.log("failure")
    }
  }


  render(){
    return(
      <div>
        <Nav />
        <h2 className="my-5 text-center">Edit My Trip plan </h2>
        <div className="container">
          <div className="row">
            <div className="col-8 offset-2">
              <form onSubmit={this.updatedMyPlan}>
                <div className="form-group mt-5 pt-3">
                  <label for="tripName">Trip Name:</label>
                  <input required type="text" name="tripName" className="form-control" onChange={this.handleEditFormInput} id="tripName" placeholder="Give a name for your trip!"/>
                </div>
                <div className="form-group">
                  <label for="destination">Destination:</label>
                  <input required type="text" name="destination" className="form-control" onChange={this.handleEditFormInput} id="destination"  placeholder="Where do you go?"/>
                </div>
                <div className="form-group">
                  <label for="traveler">traveler(s):</label>
                  <input type="text" name="traveler" className="form-control" onChange={this.handleEditFormInput} id="traveler"  placeholder="Who is traveling with you?"/>
                </div>
                <div className="form-group">
                  <label for="tripPeriod">Trip Period:</label>
                  <input type="text" name="tripPeriod" className="form-control" onChange={this.handleEditFormInput} id="tripPeriod"  placeholder="How long is your trip?(days/nights)"/>
                </div>
                <div className="form-group">
                  <label for="firstDay">Date start:</label>
                  <input required type="date" name="firstDay" className="form-control" onChange={this.handleEditFormInput} id="firstDay"  placeholder="When is firstday of the trip?"/>
                </div>
                <div className="form-group">
                  <label for="lastDay">Date end:</label>
                  <input required type="date" name="lastDay" className="form-control" onChange={this.handleEditFormInput} id="lastDay" placeholder="When is lastDay of the trip?"/>
                </div>
                <div className="form-group">
                  <label for="budget">Budget(per person):</label>
                  <input type="number" name="budget" className="form-control" onChange={this.handleEditFormInput} id="budget?" placeholder="How much do you want to spend for your trip?"/>
                  <small required className="form-text text-muted" id="budget">Please enter number only.</small>
                </div>
                <div className="text-center mt-5">
                <button className="btn btn-primary" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default PlanEditContainer;



// <h1>this is plan Edit page</h1>
// <div>
//   <form onSubmit={this.updatedMyPlan}>
//   Trip name:<input name="tripName" onChange={this.handleEditFormInput} value={this.state.plan.tripName} placeholder="tripName"/><br/>
//   Destination:<input name="destination" onChange={this.handleEditFormInput} value={this.state.plan.destination} placeholder="destination"/><br/>
//   Traveler:<input name="traveler" onChange={this.handleEditFormInput} value={this.state.plan.traveler} placeholder="traveler"/><br/>
//   Trip Period:<input name="tripPeriod" onChange={this.handleEditFormInput} value={this.state.plan.tripPeriod} placeholder="tripPeriod"/><br/>
//   FirstDay:<input name="firstDay" onChange={this.handleEditFormInput} value={this.state.plan.firstDay} placeholder="firstDay"/><br/>
//   LastDay:<input name="lastDay" onChange={this.handleEditFormInput} value={this.state.plan.lastDay} placeholder="lastDay"/><br/>
//   Budget:<input name="budget" onChange={this.handleEditFormInput} value={this.state.plan.budget} placeholder="budget"/><br/>
//   <button type="submit">edit</button>
//   </form>
// </div>
