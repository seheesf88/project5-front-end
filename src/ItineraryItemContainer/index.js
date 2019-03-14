//## component info ##
//status : Done
//maybe add :
//description: when you can edit plan, create itneray and item component
//relative comp - PlanShowContainer(similar format), child componet in is below


import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import ItineraryComponent from '../ItineraryComponent';
import ItemListComponent from '../ItemListComponent';
import ItineraryContainer from '../ItineraryContainer';
import Nav from '../Nav';

class ItineraryItemContainer extends Component{
  constructor(){
    super()
    this.state = {
      plan: {},
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
      itineraries :[],
      item:[],
      items: [],
      newitem: {
        itemName: '',
        quantity: 1,
        price: 0,
        dividBy: 1,
        total: 0
      },
    }
  }

  componentDidMount(){
    this.getItinerarylist()
    this.getMyItemlist()
    this.getMyPlan()
  }

//`${process.env.REACT_APP_API}/api/v1/plans/show/`


//show plan - plan profile
getMyPlan = async() => {
  try{
    const planId = localStorage.getItem('planCode')
    //MEMO: i need to find userId by url because, the id from localstorage is not equl to the targer plan
    // 'http://localhost:9000/api/v1/plans/show/'
    const response = await fetch( `${process.env.REACT_APP_API}/api/v1/plans/show/` + planId, {
      credentials: 'include'
    });

    if(!response.ok){
      throw Error(response.statusText)
    }

    // console.log('2', response)
    const planParsed = await response.json();

    // console.log('3', planParsed)
    this.setState({
      plan: planParsed.data
    })
    // console.log('4 done')
  }catch(err){
    console.log('getmyplan is failed?')
    return err
  }
}





//create itinerary =============================================================


addItinerary = async(sth) => {
  // e.preventDefault();
  const planId = localStorage.getItem('planCode');
  // `${process.env.REACT_APP_API}/api/v1/plans/show/`
  try{
    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/itinerary/${planId}/`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(sth),
      headers: {
        'Content-Type' : 'application/json'
      }
    })

    // console.log("1", response );
    if(!response.ok){
      throw Error(response.statusText)
    }
    const parsedCreatedItinerary = await response.json()
    // console.log("2", parsedCreatedItinerary);

    this.getItinerarylist();

  }catch(err){
    console.log('create itinerary is fail')
  }
}

//get itinerary list ===========================================================

getItinerarylist = async() => {
  try{
    // const planId = window.location.pathname.split('/')
    // console.log("planId ====>", planId)
    // ${process.env.REACT_APP_API}
    // 'http://localhost:9000/api/v1/itinerary'
    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/itinerary`, {
      credentials: 'include'
    });

    if(!response.ok){
      throw Error(response.statusText)
    }

    const itineraryParsed = await response.json();

    this.setState({
      itineraries: itineraryParsed.data
    })

  }catch(err){
    console.log("all itinerary is fail")
  }
}



//delete itinerary-------------------------------------------------------------
deleteItinerary = async(id, e) => {
  // 'http://localhost:9000/api/v1/itinerary/'
  try{
    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/itinerary/` + id, {
      method: 'DELETE'
    })

    if(!response.ok){
      throw Error(response.statusText)
    }

    this.setState({
      itineraries: this.state.itineraries.filter((itinerary) => itinerary._id !== id)
    })
  }catch(err){
    console.log("delete itinerary is failed")
  }
}



//***create item list***************************************************************************


handleItemChange = (e) => {
  this.setState({
    newitem: {
    ...this.state.newitem,
    [e.target.name]: e.target.value
    }
  })
}

// calculate = (qty, price, share) => {
//   var total = (qty*price)/share
//   console.log('this is total ==========>',total);
//   this.setState({
//     newitem: {
//       ...this.state.newitem,
//       total: total
//     }
//   })
// }

addItem = async(e) => {
  e.preventDefault();
  const planId = localStorage.getItem('planCode');
  console.log(planId);
  try{
    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/itemlists/${planId}/`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(this.state.newitem),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    // console.log("1", response );
    if(!response.ok){
      throw Error(response.statusText)
    }
    const parsedCreatedItem = await response.json()
    // console.log("2", parsedCreatedItem);
    // let result = (parsedCreatedItem.data.quantity * parsedCreatedItem.data.price)/parsedCreatedItem.data.dividBy
    // console.log(result);
    this.getMyItemlist();
    // this.setState({
    //   items: [...this.state.items, parsedCreatedItem]
    // })
    // console.log("3 done");
    // this.calculate(this.state.newitem.quantity, this.state.newitem.price, this.state.newitem.dividBy)
    // this.props.history.push('/makemyplan')
    // const planId = localStorage.getItem('planCode');
    // this.props.history.push(`/makemyplan/${planId}`);
    this.setState({
      newitem: {
        itemName: '',
        quantity: 1,
        price: 0,
        dividBy: 1,
        total: 0
      },
    })
  }catch(err){
    console.log('create item is fail')
  }
}
// //get item list ====================================================================

getMyItemlist = async() => {
  // const planId = window.location.pathname.split('/')
  // console.log("planId ------>", planId);
  try{
    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/itemlists` , {
      credentials: 'include'
    });

    if(!response.ok){
      throw Error(response.statusText)
    }

    const itemlistsParsed = await response.json();
    // console.log('----------', itemlistsParsed)
    this.setState({
      items: itemlistsParsed.data
    })

  }catch(err){
    console.log("all itemlists is fail")
  }
}


deleteItem = async(id, e) => {
  try{
    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/itemlists/` + id, {
      method: 'DELETE'
    })

    if(!response.ok){
      throw Error(response.statusText)
    }

    this.setState({
      items: this.state.items.filter((items) => items._id !== id)
    })
  }catch(err){
    console.log("deleteItem is failed")
  }
}


  render(){
    return(
      <div>
        <Nav/>
        <div className="container">
        <div className="row">
          <h2 className="col-5 offset-1">
            {this.state.plan.tripName}
          </h2>
        </div>
          <div className="row mt-4">
            <div className="col-5 offset-1">
              <p><span className="font-weight-bold">Desitination</span> : {this.state.plan.destination}</p>
              <p><span className="font-weight-bold">Traveler(s)</span>  : {this.state.plan.traveler}</p>
              <p><span className="font-weight-bold">Trip period</span>  : {this.state.plan.tripPeriod}</p>
            </div>
            <div className="col-5">
              <p><span className="font-weight-bold">Date start</span>   : {this.state.plan.firstDay}</p>
              <p><span className="font-weight-bold">Date end</span>     : {this.state.plan.lastDay}</p>
              <p><span className="font-weight-bold">budget</span>       : {this.state.plan.budget}</p>
            </div>
          </div>
        </div>
        <div className="container border mt-5">
          <div className="row">
            <div className="col-12">
            <ItineraryContainer addItinerary={this.addItinerary} />
            </div>
          </div>
        </div>
        <div className="container mt-3">
          <div className="row">
            <div className="col-6">
              <h4>Itinerary plan for this trip</h4>
            </div>
            <div className="col-3 offset-3">
            <Link to="/home">Save this and back to Home</Link>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <ItineraryComponent getItinerarylist={this.state.itineraries} deleteItinerary={this.deleteItinerary} getUpdated={this.getItinerarylist}/>
            </div>
          </div>
        </div>
        <div className="container border">
          <div className="row px-4">
            <div className="col-12 px-0 mx-0 py-5">
              <h1 className="pb-5">Budget planner.</h1>
                <form onSubmit={this.addItem}>
                  <span>Item : <input name="itemName" id="itemName" size="20" placeholder="Item Name" onChange={this.handleItemChange} value={this.state.newitem.itemName}/></span>
                  <span className="ml-4"> Qty : <input name="quantity" size="10" placeholder="Quantity" onChange={this.handleItemChange} value={this.state.newitem.quantity}/></span>
                  <span className="ml-4"> Price : <input name="price" size="12" onChange={this.handleItemChange} value={this.state.newitem.price}/></span>
                  <span className="ml-4"> Divide by : <input name="dividBy" size="10" onChange={this.handleItemChange} value={this.state.newitem.dividBy}/></span>
                  <span className="ml-4"> total : { (this.state.newitem.price * this.state.newitem.quantity)/this.state.newitem.dividBy }</span>
                  <span className="ml-4"> <button className="btn btn-primary" type="submit">Add</button></span>
                </form>
              </div>
            </div>
          </div>
          <div className="container mt-3">
            <div className="row">
              <div className="col-6">
                <h4>Checklist for this trip</h4>
              </div>
              <div className="col-3 offset-3">
              <Link to="/home">Save this and back to Home</Link>
              </div>
            </div>
            <div className="row">
              <div className="col-12">

            <ItemListComponent getUpdatedItem={this.getMyItemlist} getMyItemlist={this.state.items} deleteItem={this.deleteItem} plan={this.state.plan} total={this.state.item.total}/>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
export default withRouter(ItineraryItemContainer);



      // <label className="label-item" style={{display: 'block'}}>Item</label>
      // <input name="itemName" id="itemName" onChange={this.handleItemChange} value={this.state.newitem.itemName}/>



//
// <div class="form-group">
//   <label for="exampleFormControlInput1">Email address</label>
//   <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
// </div>
// <div className="form-group">
//   <label for="mustDo">Must do</label>
//   <textarea class="form-control" id="mustDo" rows="3"></textarea>
// </div>
