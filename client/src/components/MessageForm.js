
import React, { useState } from 'react';
import { Button, Form, Segment, Label, TextArea } from 'semantic-ui-react';
import { useAuth } from '../hooks/useAuth';
import API from '../utils/API';

const MessageForm = ({ id, onSubmit }) => {
  const { currentUser } = useAuth();
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await API.addMessage(id, { message: value, author: currentUser.email });
      if (response.status === 200) {
        onSubmit();
        setValue(null);
      }
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} size='large'>
      <Segment>
        <TextArea
          name="description"
          placeholder="Komentarz"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ width: '100%', margin: '0 0 10px' }}
        />
        {error && <Label className="alertMssg" basic color="red">{error}</Label>}
        <Button secondary fluid size="large" loading={isLoading}>
          Dodaj komentarz
        </Button>
      </Segment>
    </Form>
  )
}

export default MessageForm;