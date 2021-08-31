
import React, { useState } from 'react';
import { Button, Form, Segment, Label, Input } from 'semantic-ui-react';

const UserForm = ({ onSubmit, error, isLoading, buttonText }) => {
  const [values, setValues] = useState({ email: '', password: '' });

  const onChange = (field, value) => {
    setValues(oldValues => ({
      ...oldValues,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  return (
    <Form onSubmit={handleSubmit} size='large'>
      <Segment>
        <Input
          name="email"
          placeholder="Adres e-mail"
          value={values.email}
          onChange={(e) => onChange('email', e.target.value)}
          style={{ width: '100%', margin: '0 0 10px' }}
        />
        <Input
          name="password"
          placeholder="Hasło"
          value={values.password}
          onChange={(e) => onChange('password', e.target.value)}
          type="password"
          style={{ width: '100%', margin: '0 0 10px' }}
        />
        {error && <Label className="alertMssg" basic color="red">{error}</Label>}
        <Button secondary fluid size="large" loading={isLoading}>
          {buttonText}
        </Button>
      </Segment>
    </Form>
  )
}

export default UserForm;