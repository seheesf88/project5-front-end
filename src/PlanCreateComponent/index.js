import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Nav from '../Nav'

class PlanCreateComponent extends Component{
  constructor(){
    super()
    this.state = {
      myplans: [],
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
      params:''
    }
  }

  componentDidMount(){
  }


// create plans profile ===========================================================

  handleChange = (e) => {
    this.setState({
      plan : {
        ...this.state.plan,
        [e.target.name]: e.target.value
      }
    })
  }


  addPlan = async(e) => {
    e.preventDefault();

    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/myplans`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state.plan),
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      if(!response.ok){
        throw Error(response.statusText)
      }

      // console.log('response ---=========---->', response);
      const parsedCreatedPlan = await response.json()
      console.log('this is parsedCreatedPlan ==================>', parsedCreatedPlan.myplans._id)

      localStorage.setItem('planCode', parsedCreatedPlan.myplans._id)


      // console.log('planCode ->', localStorage.getItem('planCode') );
      // console.log("++++++", this.props.history);
      this.setState({
        myplans: [...this.state.myplans, parsedCreatedPlan],
        // params: planCode
      })

      const planId = localStorage.getItem('planCode');
      this.props.history.push(`/makemyplan/${planId}`);
      // this.props.history.push('/makemyplan/:id', { id: localStorage.getItem('planCode') })

    }catch(err){
      console.log("add plan is failed", err)
    }
  }
// <Link to={`plans/show/${this.state.params}`}><button type="submit">create plan</button></Link>

  render(){
    console.log(localStorage.getItem('planCode'))
    return(
      <div>
        <Nav />
        <h2 className="my-5 text-center">Create My Trip plan </h2>
        <div className="container">
          <div className="row">
            <div className="col-8 offset-2">
              <form onSubmit={this.addPlan}>
                <div className="form-group mt-5 pt-3">
                  <label for="tripName">Trip Name:</label>
                  <input required type="text" name="tripName" className="form-control" onChange={this.handleChange} id="tripName" placeholder="Give a name for your trip!"/>
                </div>
                <div className="form-group">
                  <label for="destination">Destination:</label>
                  <input required type="text" name="destination" className="form-control" onChange={this.handleChange} id="destination"  placeholder="Where do you go?"/>
                </div>
                <div className="form-group">
                  <label for="traveler">traveler(s):</label>
                  <input type="text" name="traveler" className="form-control" onChange={this.handleChange} id="traveler"  placeholder="Who is traveling with you?"/>
                </div>
                <div className="form-group">
                  <label for="tripPeriod">Trip Period:</label>
                  <input type="text" name="tripPeriod" className="form-control" onChange={this.handleChange} id="tripPeriod"  placeholder="How long is your trip?(days/nights)"/>
                </div>
                <div className="form-group">
                  <label for="firstDay">Date start:</label>
                  <input required type="date" name="firstDay" className="form-control" onChange={this.handleChange} id="firstDay"  placeholder="When is firstday of the trip?"/>
                </div>
                <div className="form-group">
                  <label for="lastDay">Date end:</label>
                  <input required type="date" name="lastDay" className="form-control" onChange={this.handleChange} id="lastDay" placeholder="When is lastDay of the trip?"/>
                </div>
                <div className="form-group">
                  <label for="budget">Budget(per person):</label>
                  <input required type="number" name="budget" className="form-control" onChange={this.handleChange} id="budget?" placeholder="How much do you want to spend for your trip?"/>
                  <small className="form-text text-muted" id="budget">Please enter number only.</small>
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
export default withRouter(PlanCreateComponent);


// <form onSubmit={this.addPlan}>
//   trip name: <input name="tripName" onChange={this.handleChange}/><br/>
//   destination: <input name="destination" onChange={this.handleChange}/><br/>
//   traveler: <input name="traveler" onChange={this.handleChange}/><br/>
//   tripPeriod: <input name="tripPeriod" onChange={this.handleChange}/><br/>
//   firstDay: <input name="firstDay" onChange={this.handleChange}/><br/>
//   lastDay: <input name="lastDay" onChange={this.handleChange}/><br/>
//   budget: <input name="budget" onChange={this.handleChange}/><br/>
//   <button type="submit">create plan</button>
//   {/* <Link to={`/makemyplan/${localStorage.getItem('planCode')}`}>next</Link> */}
// </form>
