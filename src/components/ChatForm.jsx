import React, { useState } from 'react';

const ChatForm = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="flex justify-end">
      <form onSubmit={handleSubmit} className="flex  w-full h-full items-center	">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          className="flex-grow w-full"
        />
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ml-2" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
