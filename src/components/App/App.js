import React, { Component } from 'react';
import './App.css';
import {getOrders, postNewOrder, deleteOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    getOrders()
      .then(data => this.setState(data))
      .catch(err => console.error('Error fetching:', err));
  }

  submitNewOrder = (newOrder) => {
    postNewOrder(newOrder)
      .then(data => this.setState({ orders: [...this.state.orders, data] }))
      .catch(err => console.error('Error posting:', err));
  }

  deleteExisting = (id) => {
    deleteOrder(id)
    .then(data => this.setState({ orders: data }))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm submitNewOrder={this.submitNewOrder}/>
        </header>

        <Orders orders={this.state.orders} deleteExisting={this.deleteExisting}/>
      </main>
    );
  }
}


export default App;
