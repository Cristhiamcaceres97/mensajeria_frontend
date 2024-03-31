import React, { useState, useEffect } from 'react';
import Registro from './components/Registro';
import UserList from './components/UserList';
import MessageForm from './components/MessageForm';
import axios from 'axios';
import { NextUIProvider } from '@nextui-org/react';
import UserVerificationModal from './components/Modal';
import { Button } from '@nextui-org/react';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserVerificationModalOpen, setIsUserVerificationModalOpen] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleUserVerified = async (user) => {
    setVerifiedUser(user);

    try {
      // Hacer la solicitud al backend para obtener los mensajes del usuario
      const response = await axios.get(`https://tu-backend.com/api/messages/${user._id}`);
      const messages = response.data;

      // Actualizar el estado con los mensajes obtenidos
      setMessages(messages);
    } catch (error) {
      console.error('Error al cargar mensajes:', error);
      // Manejar el error adecuadamente
    }
  };



  useEffect(() => {
    axios.get('https://bw3vb6q6-3000.use2.devtunnels.ms/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error("Hubo un error al cargar los usuarios", error));
  }, []);

  const handleUserSelect = userId => {
    setSelectedUser(userId);
  };

  const addUser = user => {
    const userData = {
      name: user.name,
      age: parseInt(user.age, 10)
    };
    axios.post('https://bw3vb6q6-3000.use2.devtunnels.ms/api/users', user)
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
        <Button onClick={() => setIsUserVerificationModalOpen(true)} color="secondary">
          Soy Usuario
        </Button>
        <h2>Usuarios</h2>
        <UserList users={users} handleUserSelect={handleUserSelect} />
        {selectedUser && <MessageForm receiverId={selectedUser} />}
        {isUserVerificationModalOpen && (
          <UserVerificationModal
            onClose={() => setIsUserVerificationModalOpen(false)}
            onUserVerified={handleUserVerified}
          />
        )}
      </div>
    </NextUIProvider>
  );
}

export default App;
