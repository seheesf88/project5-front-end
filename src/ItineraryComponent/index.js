//## Compo info
// status : DONE
// description : when you create plan, you can add itinerary list
// related comp : itineraryshowcomp(similar format )

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'

class ItineraryComponent extends Component {
  // componentWillReceiveProps(nextProps) {
  //     // console.log('PLAN PROPS HAVE UPDATED...!');
  //     this.props.getUpdated();
  // }
  render(){

  const ItineraryList = this.props.getItinerarylist.sort((a,b) => a.sortByDate - b.sortByDate).map((itinerary, i) => {
    console.log(typeof itinerary.sortByDate)
    // console.log("are you here? %%%%%%%%%%%%%%%%%%%>>>", itinerary);
    if(itinerary.planId === localStorage.getItem('planCode')){
      // console.log("are you here? %%%%%%%%%%%%%%%%%%%>>>", itinerary.planId);
    return(
      <li key={i} className="list-inline-item border px-3 py-3 mt-3 mr-3">
        <div>DATE : {itinerary.date}</div>
        <div>Where to sleep: {itinerary.hotel}</div>
        <div>Must do : {itinerary.mustDo} </div>
        <div>Must Eat : {itinerary.mustEat} </div>
        <div>Must See : {itinerary.mustSee} </div>
        <div>memo : {itinerary.memo} </div>

        <button onClick={this.props.deleteItinerary.bind(null, itinerary._id)}>delete itinerary</button>
      </li>
    )
  }
})

// ItineraryList.sort((a,b) => b.sortByDate - a.sortByDate)
  return (
    <div>
      <ul className="list-inline">
        {ItineraryList}
      </ul>
    </div>
    )
  }
}

export default withRouter(ItineraryComponent)


// import React from 'react';
//
// const ItineraryComponent = (props) => {
//   console.log("itemlist component: props ===>", props);
//   const ItineraryList = props.getItinerarylist.map((itinerary, i) => {
//     return(
//       <li key={i}>
//         <div>Day.{i+1}</div>
//         {itinerary.date}{itinerary.mustDo}{itinerary.mustEat}{itinerary.mustSee}
//         {itinerary.memo}
//         <button onClick={props.deleteItinerary.bind(null, itinerary._id)}>delete itinerary</button>
//       </li>
//     )
// })
//
//   return (
//     <div>
//     <h1>Itinerary plan</h1>
//       <ul>
//         {ItineraryList}
//       </ul>
//     </div>
//   )
// }
// export default ItineraryComponent
