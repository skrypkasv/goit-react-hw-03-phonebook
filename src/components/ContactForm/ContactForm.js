import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

export default class ContactForm extends Component {
  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleChangeName = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleChangeNumber = e => {
    const { name, value, maxLength } = e.target;
    const phoneNumber = value.slice(0, maxLength);
    this.setState({ [name]: phoneNumber });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.state.name.trim().length > 0
      ? this.props.onAddContact(this.state)
      : alert('unable to add empty field!!!');
    this.resetInputs();
  };

  resetInputs = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <span className={styles.label}>Name</span>
          <input
            type="text"
            required
            placeholder="John Snow"
            value={this.state.name}
            onChange={this.handleChangeName}
            name="name"
          ></input>
        </label>

        <label>
          <span className={styles.label}>Number</span>
          <input
            type="number"
            required
            placeholder="+38-097-000-01-07"
            maxLength="13"
            value={this.state.number}
            onChange={this.handleChangeNumber}
            name="number"
          ></input>
        </label>

        <button type="submit" className={styles.btn_submit}>
          Add contact
        </button>
      </form>
    );
  }
}
