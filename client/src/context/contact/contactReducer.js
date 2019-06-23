import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    SET_CURRENT,
    CLEAR_FILTER,
    CLEAR_CONTACT,
    CLEAR_CURRENT
} from '../types';

export default (state, action) => {
    switch(action.type){
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            }

        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            }

        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }

        case CLEAR_CURRENT:
            return{
                ...state,
                current: null
            }
        default:
            return state;
    }
}