import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom'

import RegisterLoginContainer from './RegisterLoginContainer' //*
import HomeContainer from './HomeContainer' // *
import UserAccContainer from './UserAccContainer' //*
import PlanShowContainer from './PlanShowContainer' //*
import PlanListComponent from './PlanListComponent' //*
import ItineraryContainer from './ItineraryContainer'
import ItineraryShowComponent from './ItineraryShowComponent'
import PlanCreateComponent from './PlanCreateComponent'
import ItineraryItemContainer from './ItineraryItemContainer'
import PlanEditContainer from './PlanEditContainer' //*

const My404 = () => {
  return(
    <div>
      don't worry! you can do it!
    </div>
  )
}

//*** this function will direct to '/' if user is trying to accessing to any app page by url and without logging in
//*** in order to make this function, make sure withRouter() because you need to use props!
const App = (props) => {
    if (localStorage.getItem('userId') !== null) {
      console.log('USER IS LOGGED IN')
    } else if(props.location.pathname !== '/') {
      props.history.push('/')
    }

    return (
      <main>
        <Switch>
          <Route exact path='/' component = { RegisterLoginContainer } />
          <Route exact path='/home' component = { HomeContainer } />
          <Route exact path='/myaccount/:id' component = { UserAccContainer } />
          <Route exact path='/plans/show/:id' component = { PlanShowContainer } />
          <Route exact path='/plans/edit/:id' component = { PlanEditContainer } />
          <Route exact path='/plans/itinerary' component = { ItineraryContainer } />
          <Route exact path='/makemyplan' component = { PlanCreateComponent } />
          <Route exact path='/makemyplan/:id' component = { ItineraryItemContainer } />
          <Route component = { My404 } />
        </Switch>
      </main>

    );
}

export default withRouter(App);

//  //<Route exact path='/plans/checklist'component = { ItemListContainer } />
