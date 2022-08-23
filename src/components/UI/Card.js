import React from 'react';

import classes from './Card.module.css';
import Card from '@mui/material/Card';

const DefaultCard = (props) => {
  return <Card className={`${classes.card} ${props.className}`}>{props.children}</Card>;
};

export default DefaultCard;
