import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      message: ''
    };
  }

  handleNameChange = e => {
    e.preventDefault()
    this.setState({message: ""})
    this.setState({ [e.target.name]: e.target.value })
  }

  handleIngredientChange = e => {
    e.preventDefault()
    this.setState({message: ""})
    this.setState({ ingredients: [...this.state.ingredients, e.target.name] })
  }
  

  handleSubmit = e => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      ...this.state
    }
    if (!this.state.name && this.state.ingredients.length) {
      this.setState({message: "Add a name and ingredients to get started"})
    } else if (!this.state.name) {
      this.setState({message: "Please add a name to this order"})
    } else if (!this.state.ingredients.length) {
      this.setState({message: "Add some ingredients to your burrito"})
    } else {
      this.setState({message: ""})
      this.props.submitNewOrder(newOrder)
    }
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        {!this.state.message ? <p>Order: {this.state.ingredients.join(', ') || 'Nothing selected'}</p> : 
          <h2>{this.state.message}</h2>}

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
