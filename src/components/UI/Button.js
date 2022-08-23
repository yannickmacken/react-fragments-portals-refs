import React from 'react';
import Button from '@mui/material/Button';

const DefaultButton = (props) => {
  return (
    <Button
      variant="contained"
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

export default DefaultButton;
