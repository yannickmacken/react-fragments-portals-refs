import React, { useState, useRef } from 'react';

import Button from '../UI/Button';
import Modal from '@mui/material/Modal';
import classes from './AddUser.module.css';
import Rating from  '@mui/material/Rating';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddUser = (props) => {

  // Object with 'current' prop which stores DOM node and has prop value with input value.
  // Refs are good for reading values, but not when they should be written. 
  // Useful for example for input or form components. Called uncontrolled as opposed to controlled (state).
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState(false);

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
    setError(false);
  };

  return (
    <div>
      <Modal
      open={Boolean(error)}
      onClose={errorHandler}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {error.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {error.message}
          </Typography>
        </Box>
      </Modal>
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
