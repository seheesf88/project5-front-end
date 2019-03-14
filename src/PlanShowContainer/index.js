//## component info ##
//status : Done
//maybe add :
//description: when you can edit plan, create itneray and item component
//relative comp - ItineraryItemContainer(similar format), child componet in is below


import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


import Nav from '../Nav';
import ItemShowComponent from '../ItemShowComponent'
import ItineraryShowComponent from '../ItineraryShowComponent'
import AddItineraryComponent from '../AddItineraryComponent'
//import AddItemComponent from '../AddItemComponent'

class PlanShowContainer extends Component {
  constructor(){
    super()
    this.state = {
      plan: {},
      itineraries: [],
      items: [],
      additem:{
        itemName: '',
        quantity: 1,
        price: 0,
        dividBy: 1,
        total: 0
      },
      planAdd:'',
    }
  }

  componentDidMount(){
    this.getMyPlan();
    this.getMyItemlist()
    this.getItinerarylist()
  }


//show
  getMyPlan = async() => {
    try{
      const planId = window.location.pathname.split('/')[3]
      // console.log("this is path ====>", planId)
      //MEMO 2: i need to find userId by url because, the id from localstorage is not equl to the targer plan
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/plans/show/` + planId, {
        credentials: 'include'
      });

      if(!response.ok){
        throw Error(response.statusText)
      }

      // console.log('2', response)
      const planParsed = await response.json();

      // console.log('3', planParsed)
      this.setState({
        plan: planParsed.data,
        planAdd : window.location.pathname.split('/')[3]
      })
      // console.log('4 done')
    }catch(err){
      console.log('getmyplan is failed?')
      return err
    }
  }


  getItinerarylist = async() => {
    try{
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


  getMyItemlist = async() => {
    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/itemlists`, {
        credentials: 'include'
      });

      if(!response.ok){
        throw Error(response.statusText)
      }

      const itemlistsParsed = await response.json();
      // console.log('---->>>>>>------', itemlistsParsed)
      this.setState({
        items: itemlistsParsed.data
      })

    }catch(err){
      console.log("all itemlists is fail")
    }
  }
//===========================DELETE===========================================

deleteItinerary = async(id, e) => {
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

//======================== ADDING ITINERARY/ITEMS===============================
//THIS IS EDITING PLAN


addItinerary = async(fromComp) => {
  // e.preventDefault();
  const planId = localStorage.getItem('planCode');

  try{
    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/itinerary/${planId}/`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(fromComp),
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

handleItemChange = (e) => {
  this.setState({
    additem:{
    ...this.state.additem,
    [e.target.name]: e.target.value
    }
  })
}

//MEMO-1 : I DON'T NEED THIS FUNCTION ANYMORE BUT WANT TO KEEP THIS FOR MY OWN MEMO
// calculate = (qty, price, share) => {
//   var total = (qty*price)/share
//   console.log('this is total ??????==========>',total);
//   this.setState({
//     additem: {
//       ...this.state.additem,
//       total: total
//     }
//   })
// }

addItem = async(e) => {
  e.preventDefault();
  const planId = localStorage.getItem('planCode');
  // console.log(planId);
  try{
    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/itemlists/${planId}/`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(this.state.additem),
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

    this.getMyItemlist();

    // console.log("3 addItem function : done");

    //  MEMO-1:
    // this.calculate(this.state.additem.quantity, this.state.additem.price, this.state.additem.dividBy)

    this.setState({
      additem:{
        itemName: '',
        quantity: 1,
        price: 0,
        dividBy: 1,
        total: 0
      },
    })
  }catch(err){
    console.log('I fail to addItem in PlanShowContainer :(..')
  }
}



  render(){
    // console.log("this is items list ======>", this.state.items );
    // console.log("can i have window path? =====>", this.state.planAdd );
    return(
      <div>
      <Nav />
      <div className="container">
        <div className="row">
          <h2 className="col-5 offset-1">
            {this.state.plan.tripName}
            <span className="offset-1 h4">{ this.state.plan.userId === localStorage.getItem('userId') ? <Link to={`/plans/edit/${localStorage.getItem('planCode')}`}>Edit</Link> : null}
            </span>
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
          { this.state.plan.userId === localStorage.getItem('userId') ?
          <AddItineraryComponent addItinerary={this.addItinerary}/>
          : null}
        </div>
      </div>
    </div>
    <div className="container mt-3">
    { this.state.plan.userId === localStorage.getItem('userId') ?
      <div className="row">
        <div className="col-6">
          <h4>Edit Itinerary plan</h4>
        </div>
        <div className="col-3 offset-3">
          <Link to="/home">Save change and back to Home</Link>
        </div>
      </div>
      : <Link to="/home"> back to Home</Link> }
      <div className="row">
        <div className="col-12">
          <ItineraryShowComponent getItinerarylist={this.getItinerarylist} itineraries={this.state.itineraries} deleteItinerary={this.deleteItinerary}/>
        </div>
      </div>
    </div>
        { this.state.plan.userId === localStorage.getItem('userId') ?
            <div className="container border">
              <div className="row px-4">
                <div className="col-12 px-0 mx-0 py-5">
                  <h1 className="pb-5">Budget planner.</h1>
                    <form onSubmit={this.addItem}>
                      <span>Item : <input name="itemName" id="itemName" size="20" placeholder="Item Name" onChange={this.handleItemChange} value={this.state.additem.itemName}/></span>
                      <span className="ml-4"> Qty : <input required name="quantity" size="10" placeholder="Quantity" onChange={this.handleItemChange} value={this.state.additem.quantity}/></span>
                      <span className="ml-4"> Price : <input required name="price" size="12" onChange={this.handleItemChange} value={this.state.additem.price}/></span>
                      <span className="ml-4"> Divide by : <input required name="dividBy" size="10" onChange={this.handleItemChange} value={this.state.additem.dividBy}/></span>
                      <span className="ml-4"> total : { (this.state.additem.price * this.state.additem.quantity)/this.state.additem.dividBy }</span>
                      <span className="ml-4"> <button className="btn btn-primary" type="submit">Add</button></span>
                    </form>
                  </div>
                </div>
              </div>
          : null}


          <div className="container mt-3">
          { this.state.plan.userId === localStorage.getItem('userId') ?
            <div className="row">
              <div className="col-6">
                <h4>Edit budget plan</h4>
              </div>
              <div className="col-3 offset-3">
                <Link to="/home">Save this and back to Home</Link>
              </div>
            </div>
            : <Link to="/home">back to Home</Link>}
            <div className="row">
              <div className="col-12">
                <ItemShowComponent getMyItemlist = {this.getMyItemlist} items={this.state.items} getMyPlan={this.getMyPlan} plan={this.state.plan} deleteItem={this.deleteItem}/>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default PlanShowContainer;


// { this.state.plan.userId === localStorage.getItem('userId') ?
//
//       <form onSubmit={this.addItem}>
//         item : <input name="itemName" onChange={this.handleItemChange}/>
//         quantity : <input name="quantity" onChange={this.handleItemChange}/>
//         price : <input name="price" onChange={this.handleItemChange}/>
//         Divide by: <input name="dividBy" onChange={this.handleItemChange} />
//         total : { (this.state.additem.quantity * this.state.additem.price) / this.state.additem.dividBy }
//         <button type="submit">create item</button>
//       </form> : null}
// </div>


// <div>
//   { this.state.plan.userId === localStorage.getItem('userId') ?
//
//         <form onSubmit={this.addItem}>
//           item : <input name="itemName" onChange={this.handleItemChange}/>
//           quantity : <input name="quantity" onChange={this.handleItemChange}/>
//           price : <input name="price" onChange={this.handleItemChange}/>
//           Divide by: <input name="dividBy" onChange={this.handleItemChange} />
//           total : { (this.state.additem.quantity * this.state.additem.price) / this.state.additem.dividBy }
//           <button type="submit">create item</button>
//         </form> : null}
//   </div>



        //
        // { this.state.plan.userId === localStorage.getItem('userId') ?
        //     <div className="container border">
        //       <div className="row px-4">
        //         <div className="col-12 px-0 mx-0 py-5">
        //           <h1 className="pb-5">Budget planner.</h1>
        //             <form onSubmit={this.addItem}>
        //               <span>Item : <input name="itemName" id="itemName" size="20" placeholder="Item Name" onChange={this.handleItemChange} value={this.state.additem.itemName}/></span>
        //               <span className="ml-4"> Qty : <input name="quantity" size="10" placeholder="Quantity" onChange={this.handleItemChange} value={this.state.additem.quantity}/></span>
        //               <span className="ml-4"> Price : <input name="price" size="12" onChange={this.handleItemChange} value={this.state.additem.price}/></span>
        //               <span className="ml-4"> Divide by : <input name="dividBy" size="10" onChange={this.handleItemChange} value={this.state.additem.dividBy}/></span>
        //               <span className="ml-4"> total : { (this.state.additem.price * this.state.additem.quantity)/this.state.additem.dividBy }</span>
        //               <span className="ml-4"> <button className="btn btn-primary" type="submit">Add</button></span>
        //             </form>
        //           </div>
        //         </div>
        //       </div>
        //   : null}
  // <AddItemComponent addItem={this.addItem} additem={this.state.additem} handleItemChange={this.handleItemChange}/>
