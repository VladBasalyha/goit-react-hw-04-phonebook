import { nanoid } from 'nanoid';
import { useLocaleStorage } from 'components/hooks/useLocalStorage';

import css from '../ContactForm/ContactForm.module.css';
import PropTypes from 'prop-types';

export const ContactForm = ({ addingContact }) => {
  const [name, setName] = useLocaleStorage('name', '');
  const [number, setNumber] = useLocaleStorage('number', '');

  const onHandleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };
  const onSubmitForm = e => {
    e.preventDefault();
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    addingContact(newContact);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };
  const NAMEID = nanoid();
  const NUMBERID = nanoid();
  return (
    <form onSubmit={onSubmitForm} className={css.form}>
      <label htmlFor={NAMEID}>
        Name
        <input
          placeholder="Input name"
          className={css.input}
          value={name}
          onChange={onHandleChange}
          id={NAMEID}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <br />
      </label>
      <label htmlFor={NUMBERID}>
        Number
        <input
          placeholder="input number"
          className={css.input}
          value={number}
          id={NUMBERID}
          onChange={onHandleChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <br />
      <button type="submit">Add contact</button>
    </form>
  );
};
ContactForm.propTypes = {
  addingContact: PropTypes.func.isRequired,
};
