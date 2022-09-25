import React from 'react';

import Card from '../UI/Card';
import classes from './UsersList.module.css';
import { useContext } from 'react';
import modeContext from '../../store/modeContext';

const UsersList = (props) => {

  // Hook to get context
  const ctx = useContext(modeContext)

  return (
    <Card className={classes.users}>
      <ul>
        {props.users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
      <h2>{String(ctx)}</h2>
    </Card>
  );
};

export default UsersList;
