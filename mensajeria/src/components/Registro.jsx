import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';

function Registro({ addUser }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addUser({ name, age });
    setName('');
    setAge('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        clearable
        bordered
        labelPlaceholder="Nombre"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <Input
        clearable
        bordered
        labelPlaceholder="Edad"
        type="number"
        value={age}
        onChange={e => setAge(e.target.value)}
        required
      />
      <Button type="submit" shadow color="primary">
        Registrar
      </Button>
    </form>
  );
}

export default Registro;
