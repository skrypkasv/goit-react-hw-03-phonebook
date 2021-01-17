import React, { Component } from 'react';
import Section from './components/Section/Section';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  addContact = state => {
    const { name, number } = state;
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    const isItDuplicate = this.checkForUniqueness(name);

    isItDuplicate
      ? alert(`contact of ${name} is already exist!!!`)
      : this.setState(prevState => {
          return {
            contacts: [...prevState.contacts, contact],
          };
        });
  };
  checkForUniqueness = newName => {
    const { contacts } = this.state;
    const check = contacts
      .map(({ name }) => name.toLowerCase())
      .includes(newName.toLowerCase());
    return check ? true : false;
  };
  clearContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          ({ id }) => id !== contactId,
        ),
      };
    });
  };
  updateFilter = filter => {
    this.setState({ filter });
  };
  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .includes(filter.toLowerCase()),
    );
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('App didUpdate');
  }

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className="container">
        <Section title="Phonebook">
          <ContactForm onAddContact={this.addContact} />
        </Section>

        {this.state.contacts.length > 1 && (
          <Section>
            <Filter
              value={filter}
              onUpdateFilter={this.updateFilter}
            />
          </Section>
        )}
        {this.state.contacts.length > 0 && (
          <Section title="Contacts:">
            <ContactList
              contacts={filteredContacts}
              onClearContact={this.clearContact}
            />
          </Section>
        )}
      </div>
    );
  }
}

export default App;
