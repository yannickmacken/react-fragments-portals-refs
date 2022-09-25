import { useState } from 'react';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';
import ExampleCard from './components/MaterialUI/ExampleCard'
import Stack from '@mui/material/Stack';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import modeContext from './store/modeContext';
import Button from './components/UI/Button';

function App() {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const [usersList, setUsersList] = useState([]);
  const [mode, setMode] = useState("light")

  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        { name: uName, age: uAge, id: Math.random().toString() },
      ];
    });
  };

  function onToggleMode() {
    mode === "light" ? setMode("dark") : setMode("light")
  }

  const mainElement = (
    <modeContext.Provider value={mode}>
      <Stack>
        <Item> <AddUser onAddUser={addUserHandler} /> </Item>
        <Item> <UsersList users={usersList} /> </Item>
        <Item>
        <Button onClick={onToggleMode} size="small">Toggle to Dark Mode</Button>
        </Item>
        <Item> <ExampleCard/> </Item>
      </Stack>
    </modeContext.Provider>
  )

  // React fragment disguised as empty div
  return mainElement;
}

export default App;
