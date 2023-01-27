import { useLocaleStorage } from 'components/hooks/useLocalStorage';
import { useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from '../commonCSS/App.module.css';

export const App = () => {
  const [contacts, setContacts] = useLocaleStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addingContact = newContact => {
    contacts.find(prev => prev.name === newContact.name)
      ? toast.error(`Contact "${newContact.name}" already exists`)
      : setContacts(prev => [...prev, newContact]);
  };

  // setContacts(prev => [...prev, newContact]);

  const deleteContact = contactId => {
    const newList = contacts.filter(prev => prev.id !== contactId);
    setContacts(newList);
  };
  const onInputFilter = e => {
    const { value } = e.target;
    setFilter(value);
  };
  const visibleTodos = contacts.filter(contact =>
    contact.name.includes(filter)
  );
  return (
    <>
      <div className={css.phonebook}>
        <ContactForm addingContact={addingContact}></ContactForm>
        <Filter filterContacts={onInputFilter} value={filter}></Filter>
        <ContactsList
          onDeleteContact={deleteContact}
          contacts={visibleTodos}
        ></ContactsList>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
};
