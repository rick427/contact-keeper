import React, {useReducer} from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    SET_CURRENT,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'john jones',
                email: 'john@test.com',
                phone: '111-111-1111',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Philip Hera',
                email: 'philip@test.com',
                phone: '222-222-2222',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Zeus Olympia',
                email: 'john@test.com',
                phone: '333-333-3333',
                type: 'professional'
            }
        ]
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Add Contact
    const addContacts = contact => {
      contact.id = uuid.v4();
      dispatch({
          type: ADD_CONTACT,
          payload: contact
      });
    }

    //Delete Contact
    const deleteContact = id => {
       dispatch({
           type: DELETE_CONTACT,
           payload: id
       })
    }

    //Set current Contact

    //Clear Current Contacts

    //Update Contact

    //Filter Contacts

    //Clear Filter

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            addContacts,
            deleteContact
        }}>
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;