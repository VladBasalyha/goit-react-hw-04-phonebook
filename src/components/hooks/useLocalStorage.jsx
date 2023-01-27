import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const useLocaleStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};
useLocaleStorage.propTypes = {
  key: PropTypes.string.isRequired,
  defaultValue: PropTypes.any,
};
