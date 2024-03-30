import React, { useState, useEffect } from 'react';
import Registro from './components/Registro';
import UserList from './components/UserList';
import MessageForm from './components/MessageForm';
import axios from 'axios';
import { NextUIProvider } from '@nextui-org/react';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get('/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error("Hubo un error al cargar los usuarios", error));
  }, []);

  const handleUserSelect = userId => {
    setSelectedUser(userId);
  };

  const addUser = user => {
    axios.post('/users', user)
      .then(response => {
        setUsers([...users, response.data]);
      })
      .catch(error => console.error("Hubo un error al registrar el usuario", error));
  };

  return (
    <NextUIProvider>
      <div className="App">
        <h1>Registro de Usuario</h1>
        <Registro addUser={addUser} />
        <h2>Usuarios</h2>
        <UserList users={users} handleUserSelect={handleUserSelect} />
        {selectedUser && <MessageForm receiverId={selectedUser} />}
      </div>
    </NextUIProvider>
  );
}

export default App;
