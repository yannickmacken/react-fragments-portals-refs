import React, { useState, useRef } from 'react';

import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';
import Rating from  '@mui/material/Rating';
import Card from '@mui/material/Card';

const AddUser = (props) => {

  // Object with 'current' prop which stores DOM node and has prop value with input value.
  // Refs are good for reading values, but not when they should be written. 
  // Useful for example for input or form components. Called uncontrolled as opposed to controlled (state).
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    // Using refs instead of state, so no Handlers needed anymore
    const enteredUsername = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);

    // We are changind DOM here to reset ref values, generally not recommended
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            ref = {ageInputRef}
          />
          <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
      
    </div>
  );
};

export default AddUser;
