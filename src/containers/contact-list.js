import React, {Component} from 'react'
import {connect} from 'react-redux'
import {selectContact, fetchContacts} from '../actions/action_select_contact'
import {bindActionCreators} from 'redux'
import axios from 'axios';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class ContactList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      contactList: [],
      modalIsOpen: false,
      item: ''
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount(){
    console.log('componentdidmount');
      axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        this.setState({ contactList : res.data });
        console.log('qwert', res.data);
      });
  }

  openModal() {
    this.setState({modalIsOpen: true, item: contact});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    //const contact = this.props.contacts;
    return (
      <div>
        <h1>List Of Contacts</h1>
        <div className='container'>
          {this.state.contactList.map(contact =>
            <div className='panel panel-default'>
              <div className='col-md-4 '>
                <div className=''>
                  {contact.name}
                </div>
                <div className=''>
                  {contact.phone}
                </div>
                <div className=''>
                  {contact.address.suite} {contact.address.street} {contact.address.city}
                </div>
                <div className=''>
                  <button type="button" onClick={this.openModal(contact.name)}>More</button>
                 </div>
              </div>
            </div>
          )}
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          details={this.state.item}
        >
 
          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a {this.props.details} modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contacts: state.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectContact: selectContact}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList)
