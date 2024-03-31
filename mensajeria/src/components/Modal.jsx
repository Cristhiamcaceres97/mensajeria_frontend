import React, { useState } from 'react';
import { Modal, Input, Button } from '@nextui-org/react';
import axios from 'axios';

function UserVerificationModal({ onClose, onUserVerified }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    axios.post('https://tu-backend.com/api/users/verify', { name })
      .then(response => {
        onUserVerified(response.data);
        onClose();
      })
      .catch(error => {
        setError('Usuario no encontrado');
      });
  };

  return (
    <Modal closeButton aria-labelledby="modal-title" open={true} onClose={onClose}>
      <Modal.Header>
        <Input
          clearable
          bordered
          labelPlaceholder="Ingresa tu nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </Modal.Header>
      <Modal.Footer>
        <Button auto flat color="error" onClick={onClose}>
          Cancelar
        </Button>
        <Button auto onClick={handleVerify}>
          Verificar
        </Button>
      </Modal.Footer>
      {error && <p>{error}</p>}
    </Modal>
  );
}

export default UserVerificationModal;
