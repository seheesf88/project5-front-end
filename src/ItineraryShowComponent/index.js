//## Compo info
// status : DONE
// description : when you edit plan, you can add itinerary list
// related comp : itineraryscomponent

import React, { Component } from 'react';
// import { Link, withRouter } from 'react-router-dom'

class ItineraryShowComponent extends Component {
  render(){

  const ItineraryList = this.props.itineraries.sort((a,b) => a.sortByDate - b.sortByDate).map((itinerary, i) => {
    if(itinerary.planId === window.location.pathname.split('/')[3]){
        // console.log("are you here? %%%%%%%%%%%%%%%%%%%>>>", itinerary.planId);
        // const planId = window.location.pathname.split('/')[3]
      //NOTE : you can not use localstorage plancode in here
        // console.log('planCod in local', localStorage.getItem('planCode'));
        // console.log('wind id?', window.location.pathname.split('/')[3] );
        // console.log("플랜에 저장되어있던 유저아이디", itinerary.userId);
        // console.log("지금 현재 로그인 되어있는 유저아이디", localStorage.getItem('userId'));

    return(
      <li key={i} className="list-inline-item border px-3 py-3 mt-3 mr-3">

        <div>DATE : {itinerary.date}</div>
        <div>Where to sleep: {itinerary.hotel}</div>
        <div>Must do : {itinerary.mustDo} </div>
        <div>Must Eat : {itinerary.mustEat} </div>
        <div>Must See : {itinerary.mustSee} </div>
        <div>memo : {itinerary.memo} </div>
        { itinerary.userId === localStorage.getItem('userId') ?
        <button onClick={this.props.deleteItinerary.bind(null, itinerary._id)}>delete itinerary</button>
         : null }
      </li>
    )
  }
})
  return (
    <div>
      <ul lassName="list-inline">
        {ItineraryList}
      </ul>
    </div>
    )
  }
}

export default ItineraryShowComponent


//
// import React, { Component } from 'react';
// // import { Link, withRouter } from 'react-router-dom'
//
// class ItineraryShowComponent extends Component {
//   render(){
//
//   const ItineraryList = this.props.itineraries.map((itinerary, i) => {
//     if(itinerary.planId === window.location.pathname.split('/')[3]){
//         // console.log("are you here? %%%%%%%%%%%%%%%%%%%>>>", itinerary.planId);
//         // const planId = window.location.pathname.split('/')[3]
//       //NOTE : you can not use localstorage plancode in here
//         // console.log('planCod in local', localStorage.getItem('planCode'));
//         // console.log('wind id?', window.location.pathname.split('/')[3] );
//         // console.log("플랜에 저장되어있던 유저아이디", itinerary.userId);
//         // console.log("지금 현재 로그인 되어있는 유저아이디", localStorage.getItem('userId'));
//       day += 1
//       night = day - 1
//     return(
//       <li key={i}>
//         <div>Day : {day}</div>
//         <div>DATE : {itinerary.date}</div>
//         <div>Where to sleep: {itinerary.hotel}</div>
//         <div>Must do : {itinerary.mustDo} </div>
//         <div>Must Eat : {itinerary.mustEat} </div>
//         <div>Must See : {itinerary.mustSee} </div>
//         <div>memo : {itinerary.memo} </div>
//         { itinerary.userId === localStorage.getItem('userId') ?
//         <button onClick={this.props.deleteItinerary.bind(null, itinerary._id)}>delete itinerary</button> : null }
//       </li>
//     )
//   }
// })
//   return (
//     <div>
//     <h1>Itinerary plan</h1>
//       <ul>
//         <div>{night} nights</div>
//         {ItineraryList}
//       </ul>
//     </div>
//     )
//   }
// }
//
// export default ItineraryShowComponent
