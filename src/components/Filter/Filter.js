import React from 'react';
import PropTypes from 'prop-types';

export default function Filter({ value, onUpdateFilter }) {
  return (
    <label>
      <span>Find contacts by name</span>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={e => onUpdateFilter(e.target.value)}
      ></input>
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onUpdateFilter: PropTypes.func.isRequired,
};
