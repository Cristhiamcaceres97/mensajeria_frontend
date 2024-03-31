import React, { useState } from 'react';
import axios from 'axios';
import { Textarea, Button } from '@nextui-org/react';

function MessageForm({ receiverId }) {
    const [content, setContent] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('https://bw3vb6q6-3000.use2.devtunnels.ms/api/messages', { receiver: receiverId, content })
            .then(response => {
                setContent('');
            })
            .catch(error => console.error("Hubo un error al enviar el mensaje", error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Textarea
                bordered
                labelPlaceholder="Escribe un mensaje"
                value={content}
                onChange={e => setContent(e.target.value)}
                required
            />
            <Button type="submit" shadow color="primary">
                Enviar
            </Button>
        </form>
    );
}

export default MessageForm;