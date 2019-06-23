import React, {useContext, useRef, useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const {filtered, clearFilter, filterContacts} = contactContext;
    const text = useRef('');

    useEffect(() => {
      if(filtered === null){
          text.current.value = '';
      }
    });

    const handleFilter = e => {
       if(text.current.value !== ''){
           filterContacts(e.target.value);
       }
       else{
           clearFilter();
       }
    }

    return (
        <form>
           <input 
              type="text" 
              ref={text} 
              placeholder="Filter Contacts..." 
              onChange={handleFilter} 
            /> 
        </form>
    )
}

export default ContactFilter;
