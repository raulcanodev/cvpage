'use client';

import { useState } from 'react';

const DescriptionForm = () => {
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/updateDescription', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Description updated successfully');
      } else {
        setMessage(data.error || 'Failed to update description');
      }
    } catch (error) {
      setMessage('An error occurred while updating the description');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter your description"
      />
      <button type="submit">Update Description</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default DescriptionForm;