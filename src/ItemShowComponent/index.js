//## component info
//status : DONE
//maybe add : planed budget comparson color change need to be happened {total}
// when you Edit plan, create item component
// relative comp - ItemListComponent(similar format),
// relative comp - PlanShowContainer(parent component)
import React, { Component } from 'react';



class ItemShowComponent extends Component {
  render() {
    console.log("this is item show component props ===>", this.props);
    let total = 0
    let sub = 0
    const ItemList = this.props.items.map((item, i) => {
      // console.log("when item is created, save the that planId~~~~~~~~~>", item.planId);
      // console.log("when this page is loaded by pladId ~~~~~~~~~~~~~~~>", window.location.pathname.split('/')[3])
      if(item.planId === window.location.pathname.split('/')[3]){
        total += (item.price * item.quantity) / item.dividBy
        sub = (item.price * item.quantity) / item.dividBy
      //console.log("is if statement ture?[ItemShowComponent]", item.planId === localStorage.getItem('planCode'));
      return(
        <tr key={i}>
          <td>{item.itemName}</td>
          <td>{item.quantity}</td>
          <td>{item.price}</td>
          <td>{item.dividBy}</td>
          <td>{sub}</td>
          {item.userId === localStorage.getItem('userId') ?
          <td className="pl-0"><button className="close mr-5" type="button" aria-label="Close" onClick={this.props.deleteItem.bind(null, item._id)}><span className="pr-5" aria-hidden="true">&times;</span></button></td>
           : null }
        </tr>
        )
      }
    })

      return (
        <div>
          <div className="container mt-2 mb-4">
            <div className="row">
              <div className="col-10 offset-1">
                <div className="d-flex align-items-stretch">
                  <div className="p-3">
                    <h2>Planed Budget:</h2>
                  </div>
                  <div className="p-3">
                    <h2>{
                      (this.props.plan.budget > total) ?
                      <span className="text-primary">${this.props.plan.budget}</span>:
                      (this.props.plan.budget === total)?
                      <span className="text-success">${this.props.plan.budget}</span>:
                      <span className="text-danger">${this.props.plan.budget}</span>
                      }</h2>
                  </div>
                  <div className="p-3">
                    <h2>VS.</h2>
                  </div>
                  <div className="p-3">
                    <h2>Total of lists:</h2>
                  </div>
                  <div className="p-3">
                    <h2>${total}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
              <table className="table table-striped text-center">
                <thead>
                  <tr>
                    <th scope="col" className="mr-0">Item</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Price</th>
                    <th scope="col">Divide By</th>
                    <th scope="col">Total</th>
                    <th scope="col" className="pr-0">delete</th>
                  </tr>
                </thead>
                <tbody>
                  {ItemList}
                </tbody>
              </table>
          </div>
        </div>
      )
    }
  }


export default ItemShowComponent


//
// <div>
//   <ol>
//     {ItemList}
//   </ol>
//   <div>total : {total} VS your budget : {this.props.plan.budget} </div>
// </div>
