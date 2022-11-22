import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Label } from 'semantic-ui-react';

const LoginForm = ({ onChange, formValues, handleSubmit, validateError = false }) => {
	return (
		<div>
			<Form action="#" onSubmit={(e) => handleSubmit(e, 'login')}>
				{validateError && <Label basic color='red' pointing='below'>{validateError}</Label>}
				<Form.Field>
					<label htmlFor="loginPhone">Login</label>
					<Input name="loginPhone" value={formValues.loginPhone || ''} onChange={onChange} label={{ content: '+442' }} labelPosition='left' placeholder='291234567' />
				</Form.Field>
				<Form.Field>
					<label htmlFor="password">Password</label>
					<Input name="password" type="password" onChange={onChange} placeholder='enter password' />
				</Form.Field>
				<Button
					type='submit'
					className="signUpButton"
					positive
					icon='send'
					labelPosition='left'
					content={'Submit'}
				/>
			</Form>
		</div>
	);
};

LoginForm.propTypes = {
	onChange: PropTypes.func.isRequired,
	formValues: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
