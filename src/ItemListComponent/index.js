//## component info ##
//status : DONE
//maybe add : planed budget comparson color change need to be happened {total}
//description : when you create plan, create item component
//relative comp - ItemShowComponent(similar format),
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';


class ItemListComponent extends Component {
  // componentWillReceiveProps(nextProps){
  //   if (nextProps.getMyItemlist !== this.props.getItemList) {
  //     console.log('ITME LIST HAS CHANGED')
  //   }
  // }
  // ##total => total up to this list
  // ##subtotal => each item's total => price * quantity / n (defalut value of n => 1)
  render(){
    let total = 0
    let sub = 0
  const ItemList = this.props.getMyItemlist.map((item, i) => {
    if(item.planId === localStorage.getItem('planCode')){
        total += (item.price * item.quantity) / item.dividBy
        sub = (item.price * item.quantity) / item.dividBy
    return(
        <tr key={item._id}>
          <td>{item.itemName}</td>
          <td>{item.quantity}</td>
          <td>{item.price}</td>
          <td>{item.dividBy}</td>
          <td>{sub}</td>
          <td className="pl-0"><button className="close mr-5" type="button" aria-label="Close" onClick={this.props.deleteItem.bind(null, item._id)}><span className="pr-5" aria-hidden="true">&times;</span></button></td>
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
      <div className="container mb-5">
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
export default ItemListComponent


// <div className="container mt-2 mb-4">
//   <div className="row">
//     <div className="col-12 text-center">
//       <h2>Your budget: ${this.props.plan.budget} VS. Total of list :${total}</h2>
//     </div>
//   </div>
// </div>





// //[[[[[[[[[[[[[   this is item list for plan pro  - parentComponet is       ]]]]]]]]]]]]]
// import React, { Component } from 'react';
//
//
// class ItemListComponent extends Component {
//   // componentWillReceiveProps(nextProps){
//   //   if (nextProps.getMyItemlist !== this.props.getItemList) {
//   //     console.log('ITME LIST HAS CHANGED')
//   //   }
//   // }
//   // ##total => total up to this list
//   // ##subtotal => each item's total => price * quantity / n (defalut value of n => 1)
//   render(){
//     let total = 0
//     let sub = 0
//   const ItemList = this.props.getMyItemlist.map((item, i) => {
//     if(item.planId === localStorage.getItem('planCode')){
//         total += (item.price * item.quantity) / item.dividBy
//         sub = (item.price * item.quantity) / item.dividBy
//     return(
//       <li key={i}>
//         itme: {item.itemName} || quantity: {item.quantity} || price :{item.price} || divide By:{item.dividBy} || {item.total}
//         ----------{sub}
//         <button onClick={this.props.deleteItem.bind(null, item._id)}>delete plan</button>
//       </li>
//     )
//   }
// })
//
//   return (
//     <div>
//     <h1>Itemlist??? </h1>
//
//       <ol>
//         <div>{ItemList}</div>
//       </ol>
//
//       <div>total : {total} VS your budget : {this.props.plan.budget}</div>
//     </div>
//     )
//   }
// }
// export default ItemListComponent
