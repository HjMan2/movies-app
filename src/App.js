import React, { Component } from "react";
import Movies from "./components/movies";
import { Customers } from "./components/customers";
import { Rentals } from "./components/rentals";
import { NotFound } from "./components/notFound";
import { Route, Redirect,Switch } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { MovieForm } from "./components/movieForm";
import { RegisterForm } from './components/registerForm'
import { LoginForm } from "./components/loginForm";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <Navbar/>
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}/>
            <Route path="/login" component={LoginForm}/>
            <Route path="/movies/:id" component={MovieForm}/>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect exact from="/" to="/movies"/>
            <Redirect to="/not-found"/>
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
