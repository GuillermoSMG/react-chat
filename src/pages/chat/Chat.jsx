import io from 'socket.io-client';

import { useEffect, useState } from 'react';
import SendButton from './components/SendButton/SendButton';
import { validateMsg } from '../../utilities/validateMsg';
import ChatMessage from './components/ChatMessage/ChatMessage';

const socket = io('https://node-socketio.up.railway.app/');

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const receiveMessage = message => setMessages(state => [...state, message]);

  const handleSubmit = e => {
    e.preventDefault();
    if (validateMsg(message)) {
      const newMsg = {
        body: message,
        from: 'Me',
      };
      setMessages([...messages, newMsg]);
      setMessage('');
      socket.emit('message', message);
    }
  };

  useEffect(() => {
    socket.on('message', receiveMessage);

    return () => {
      socket.off('message', receiveMessage);
    };
  }, []);

  return (
    <div className='h-screen bg-gray-600 flex flex-col items-center justify-end'>
      <div className='mt-10 bg-gray-700 w-screen md:w-3/4'>
        <div className='h-screen items-end flex'>
          <ul className='list-none text-white px-10 text-lg py-4'>
            {messages.map((message, i) => (
              <ChatMessage
                message={message}
                key={i}
              />
            ))}
          </ul>
        </div>
        <form
          onSubmit={handleSubmit}
          className='px-5 py-4 bg-gray-800 flex justify-center relative rounded'
        >
          <input
            className='outline-none px-4 py-2 rounded-md w-4/5'
            type='text'
            placeholder='Enter your message...'
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <SendButton />
        </form>
      </div>
    </div>
  );
}

export default Chat;
