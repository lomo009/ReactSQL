import React, { Component } from 'react';
import './App.css';


class App extends Component {

  constructor() {
    super();
    this.state = {
      title: 'Sales Application',
      salespeople: []
    }
  }

  //MAKE AJAX REQUESTS
  componentDidMount() {
    console.log('COMPONENT HAS MOUNTED')
    let that = this
    fetch('http://localhost:5001/api/salespeople')
      .then(function(response){
        response.json()
          .then(function(data){
            console.log(data)
            that.setState({
              salespeople: data
            })
          })
        })
      }

  addSalesperson (e){
    let that = this
    e.preventDefault();
    console.log('in method')
    let data = {
      salesperson: this.refs.salesperson.value
    }
    var request = new Request('http://localhost:5001/api/new-salesperson', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(data)
    })

    let salespeople = this.state.salespeople
      salespeople.push(data)
      that.setState({
        salespeople: salespeople
      })

    fetch(request)
      .then(function(response) {
        response.json()
          .then(function(data){
            console.log(data)
          })
      })
  }

  removeSalesperson(salespeopleid) {
    var that = this
    let salespeople = this.state.salespeople
    let salesperson = salespeople.find(function(salesperson) {
      return salespeople.salespeopleid === salespeopleid
    })
    var request = new Request('http://localhost:5001/api/remove' + salespeopleid, {
      method: 'DELETE'
    })

    fetch(request)
      .then(function(response) {
        salespeople.splice(salespeople.indexOf(salesperson), 1);
        that.setState({
          salespeople: salespeople
        })
        response.json()
          .then(function(data){
            console.log(data)
          })
      })
  }

  render() {
    let title = this.state.title
    let salespeople= this.state.salespeople
    return (
      <div className="App">
        <h1>{title}</h1>
        <form ref="salespeopleForm">
          <input type="text" ref="salesperson" placeholder='Name'/>
          <button onClick={this.addSalesperson.bind(this)}>Add Salesperson</button>
        </form>
        <ul>
          {salespeople.map(salesperson => (
            <h4 key={salesperson.salespeopleid}>{salesperson.salesperson} <button onClick={this.removeSalesperson.bind(this, salesperson.id)}>Remove</button></h4>
          ))}
          </ul>
      </div>
    );
  }
}

export default App;
