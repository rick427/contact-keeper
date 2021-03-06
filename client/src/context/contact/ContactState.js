import React, {useReducer} from 'react';
import axios from 'axios';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    SET_CURRENT,
    CLEAR_FILTER,
    CLEAR_CURRENT,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //GET contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch({
              type: GET_CONTACTS,
              payload: res.data
            });
        } catch (err) {
            dispatch({
              type: CONTACT_ERROR,
              payload: err.response.msg
            })
        }
        
      }

    //Add Contact
    const addContacts = async contact => {
      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
      try {
          const res = await axios.post('/api/contacts', contact, config);
          dispatch({
            type: ADD_CONTACT,
            payload: res.data
          });
      } catch (err) {
          dispatch({
            type: CONTACT_ERROR,
            payload: err.response.msg
          })
      }
      
    }

    //Delete Contact
    const deleteContact = id => {
       dispatch({
           type: DELETE_CONTACT,
           payload: id
       })
    }

    //Set current Contact
    const setCurrent = contact => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        })
    }

    //Clear Current Contacts
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        })
    }

    //clear contacts
    const clearContacts = () => {
        dispatch({
            type: CLEAR_CONTACTS
        })
    }

    //Update Contact
    const updateContact = (contact) => {
        dispatch({
            type: UPDATE_CONTACT,
            payload: contact
        })
    }

    //Filter Contacts
    const filterContacts = (text) => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        })
    }

    //Clear Filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    }

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContacts,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts
        }}>
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;