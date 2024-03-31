import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

function UserList({ users, handleUserSelect }) {
  return (
    <div>
      {Array.isArray(users) && users.map(user => (
        <Card key={user._id} onClick={() => handleUserSelect(user._id)}>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {user.name} ({user.age})
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserList;