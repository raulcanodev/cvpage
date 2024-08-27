'use client';

import { useState } from 'react';

const DescriptionForm = () => {
  const [description, setDescription] = useState('');
  const [messageError, setMessageError] = useState('');

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
        setMessageError('Description updated successfully');
      } else {
        setMessageError(data.error || 'Failed to update description');
      }
    } catch (error) {
      setMessageError('An error occurred while updating the description');
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
      {messageError && <p>{messageError}</p>}
    </form>
  );
};

export default DescriptionForm;