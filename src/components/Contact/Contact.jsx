import css from '../Contact/Contact.module.css';
import PropTypes from 'prop-types';

export const Contact = ({ name, id, number, onDeleteContact }) => {
  return (
    <li className={css.contact} key={id}>
      {name}: {number}
      <button onClick={onDeleteContact}>Delete</button>
    </li>
  );
};
Contact.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
