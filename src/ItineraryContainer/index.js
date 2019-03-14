import React, { Component } from 'react';


class ItineraryContainer extends Component{
  constructor(){
    super()
    this.state = {
        date: '',
        hotel:'',
        mustDo: '',
        mustEat: '',
        mustSee: '',
        memo:'',
        sortByDate: '',
    }
  }


handleItineraryChange = (e) => {
  this.setState({
    ...this.state,
    [e.target.name]: e.target.value
  })


}

handleSubmit = (e) => {
  e.preventDefault();
  const itinerary = this.state;
  itinerary.sortByDate = new Date(this.state.date).getTime() / 1000;
  this.props.addItinerary(itinerary);

  //send input info to parent component
// console.log(itinerary)
  this.setState({
        date: '',
        hotel:'',
        mustDo: '',
        mustEat: '',
        mustSee: '',
        memo:'',
        soryByDate: ''
  })
}
//  <form onSubmit={this.props.addItinerary.bind(null, this.state)}>
  render(){
    // console.log('>>>>>>>>>>>>>>>>>>>>', this.props.addItinerary);
    return(
      <div>
        <h1 className="pl-3 pt-5">Itinerary Planner.</h1>
        <form onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-5 py-5 ml-5">
              <div className="form-group">
                <label for="date">Date</label>
                <input required className="form-control" id="mustDo" type="date" name="date" value={this.state.date} onChange={this.handleItineraryChange}/>
              </div>
              <div className="form-group">
                <label for="mustDo">Where to stay</label>
                <input required className="form-control" id="mustDo"  name="hotel" value={this.state.hotel} onChange={this.handleItineraryChange} placeholder="ex) Marriott, camping, or friend's home"/>
              </div>
              <div class="form-group">
                <label for="memo">Memo</label>
                <textarea className="form-control" id="memo" rows="4" cols="1" name="memo" value={this.state.memo} onChange={this.handleItineraryChange} placeholder="enter your memo" ></textarea>
              </div>
              </div>
              <div className="col-5 offset-1 py-5">

              <div class="form-group">
                <label for="mustDo">Must Do</label>
                <textarea className="form-control" id="mustDo" rows="2" name="mustDo" value={this.state.mustDo} onChange={this.handleItineraryChange} ></textarea>
              </div>
              <div class="form-group">
                <label for="mustEat">Must Eat</label>
                <textarea className="form-control" id="mustEat" rows="2" name="mustEat" value={this.state.mustEat} onChange={this.handleItineraryChange} ></textarea>
              </div>
              <div class="form-group">
                <label for="mustSee">Must See</label>
                <textarea className="form-control" id="mustSee" rows="2" name="mustSee" value={this.state.mustSee} onChange={this.handleItineraryChange} ></textarea>
              </div>
            </div>
          </div>
          <div className="row pb-5">
            <div className="col-3 offset-5">
              <button className="btn btn-primary btn-lg" type="submit">Add</button>
            </div>
          </div>
          </div>
        </form>
      </div>
    )
  }
}
export default ItineraryContainer

// <div>Date : <input type="date" name="date" value={this.state.date} onChange={this.handleItineraryChange}/></div>
// <div>Where to sleep : <input name="hotel" value={this.state.hotel} onChange={this.handleItineraryChange} /></div>
// <div>Must do : <input name="mustDo" value={this.state.mustDo} onChange={this.handleItineraryChange}/></div>
// <div>Must Eat : <input name="mustEat" value={this.state.mustEat} onChange={this.handleItineraryChange}/></div>
// <div>Must See : <input name="mustSee" value={this.state.mustSee} onChange={this.handleItineraryChange} /></div>
// <div>memo : <textarea name="memo" value={this.state.memo} onChange={this.handleItineraryChange}></textarea></div>









//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// import React, { Component } from 'react';
//
// // import ItemCreateContainer from '../ItemCreateContainer';
// import ItineraryComponent from '../ItineraryComponent';
//
// class ItineraryContainer extends Component {
//   constructor(){
//     super()
//     this.state = {
//       itineraries :[],
//       oneItinerary : {},
//       itinerary: {
//         date: '',
//         mustDo: '',
//         mustEat: '',
//         mustSee: '',
//         hotel:'',
//         howLong:'',
//         memo:''
//       }
//     }
//   }
//     componentDidMount(){
//       this.getItinerarylist()
//       this.getOneItinerary()
//     }
//
//     //get all itinerary that belong in specific plan
//     getItinerarylist = async() => {
//       try{
//         const planId = window.location.pathname.split('/')
//         console.log("planId ====>", planId)
//         const response = await fetch('http://localhost:9000/api/v1/itinerary', {
//           credentials: 'include'
//         });
//
//         if(!response.ok){
//           throw Error(response.statusText)
//         }
//
//         const itineraryParsed = await response.json();
//
//         this.setState({
//           itineraries: itineraryParsed.data
//         })
//
//       }catch(err){
//         console.log("all itinerary is fail")
//       }
//     }
//
//     getOneItinerary = async() => {
//       const itineraryId = window.location.pathname.split('/')[3]
//       console.log("itineraryId ========> ", itineraryId);
//       try{
//         const response = await fetch('http://localhost:9000/api/v1/itinerary/', {
//           credentials: 'include'
//         });
//
//         if(!response.ok){
//           throw Error(response.statusText)
//         }
//
//         const oneItineraryParsed = await response.json();
//
//         this.setState({
//           oneItinerary: oneItineraryParsed.data
//         })
//
//       }catch(err){
//         console.log("one itinerary is fail")
//       }
//
//     }
//
//     //delete itinerary
//     deleteItinerary = async(id, e) => {
//       try{
//         const response = await fetch('http://localhost:9000/api/v1/itinerary/' + id, {
//           method: 'DELETE'
//         })
//
//         if(!response.ok){
//           throw Error(response.statusText)
//         }
//
//         this.setState({
//           itineraries: this.state.itineraries.filter((itinerary) => itinerary._id !== id)
//         })
//       }catch(err){
//         console.log("delete itinerary is failed")
//       }
//     }
//
//     // create itinerary
//     handleChange = (e) => {
//       this.setState({
//         itinerary: {
//         ...this.state.itinerary,
//         [e.target.name]: e.target.value
//         }
//       })
//     }
//
//     addItinerary = async(e) => {
//       // e.preventDefault();
//
//       try{
//         const response = await fetch('http://localhost:9000/api/v1/itinerary', {
//           method: 'POST',
//           credentials: 'include',
//           body: JSON.stringify(this.state.itinerary),
//           headers: {
//             'Content-Type' : 'application/json'
//           }
//         })
//
//         console.log("1", response );
//         if(!response.ok){
//           throw Error(response.statusText)
//         }
//         const parsedCreatedItinerary = await response.json()
//         console.log("2", parsedCreatedItinerary);
//
//
//         this.setState({
//           itineraries: [...this.state.itineraries, parsedCreatedItinerary],
//           itinerary: {
//             ...this.state.itinerary,
//             date: '',
//             mustDo :'',
//             mustEat:'',
//             mustSee: '',
//             hotel: '',
//             howLong: '',
//             memo: ''
//           },
//         })
//         console.log("3 done");
//         // this.props.history.push('/plans/itinerary')
//       }catch(err){
//         console.log('create itinerary is fail')
//       }
//     }
//
// //this is edit
//     handleEditFormInput = (e) => {
//       this.setState({
//         itinerary: {
//           ...this.state.itinerary,
//           [e.target.name] : e.target.value
//         }
//       })
//     }
//
//     updatedItinerary = async(e) => {
//       e.preventDefault();
//       const userId = window.location.pathname.split('/')[3]
//       console.log("userid in itinerary --------->", userId);
//       try{
//         const response = await fetch('http://localhost:9000/api/v1/itinerary/' + userId, {
//           method: 'PUT',
//           credentials: 'include',
//           body: JSON.stringify(this.state.itinerary),
//           headers: {
//             'Content-Type' : 'application/json'
//           }
//         })
//
//         if(!response.ok){
//           throw Error(response.statusText)
//         }
//         this.props.history.push('/plans/itinerary/')
//       }catch(err){
//         console.log("failure")
//       }
//     }
//
//
//
//     render(){
//       return(
//         <div>
//           <ItineraryComponent getItinerarylist={this.state.itineraries} deleteItinerary={this.deleteItinerary} updatedItinerary={this.updatedItinerary}
//           handleEditFormInput={this.handleEditFormInput}/>
//         </div>
//       )
//     }
// }
// export default ItineraryContainer


// <h1>Itinerary list *************</h1>
// <div>
//   <form onSubmit={this.addItinerary}>
//     Date : <input name="date" onChange={this.handleChange}/>
//     Must do : <input name="mustDo" onChange={this.handleChange}/>
//     Must Eat : <input name="mustEat" onChange={this.handleChange}/>
//     Must See : <input name="mustSee" onChange={this.handleChange} />
//     Where to sleep : <input name="hotel" onChange={this.handleChange} />
//     memo : <textarea name="memo" />
//     <button type="submit">create itinerary</button>
//   </form>
// </div>
// <hr/>
