import React from 'react';
import { Card } from '@nextui-org/react';

function UserList({ users, handleUserSelect }) {
  return (
    <div>
      {Array.isArray(users) && users.map(user => (
        <Card key={user._id} hoverable clickable onClick={() => handleUserSelect(user._id)}>
          <Card.Body css={{ p: 0 }}>
            <p>{user.name} ({user.age})</p>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default UserList;
