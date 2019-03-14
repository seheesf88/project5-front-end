import React, { Component } from 'react';


class AddItineraryComponent extends Component{
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

  render(){
    // console.log('>>>>>>>>>>>>>>>>>>>>', this.props.addItinerary);
    return(
      <div>
        <h1 className="pl-3 pt-5">Edit itinerary.</h1>
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
export default AddItineraryComponent


    // <form onSubmit={this.props.addItinerary.bind(null, this.state)}>
    // <div>Date : <input name="date" onChange={this.handleItineraryChange}/></div>
    // <div>Where to sleep : <input name="hotel" onChange={this.handleItineraryChange} /></div>
    // <div>Must do : <input name="mustDo" onChange={this.handleItineraryChange}/></div>
    // <div>Must Eat : <input name="mustEat" onChange={this.handleItineraryChange}/></div>
    // <div>Must See : <input name="mustSee" onChange={this.handleItineraryChange} /></div>
    // <div>memo : <input name="memo" onChange={this.handleItineraryChange}/></div>
    // <button type="submit">create itinerary</button>
