import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Label } from 'semantic-ui-react';

const SignUpForm = ({ onChange, formValues, handleSubmit, validateError = false }) => {
	return (
		<Form action="#" onSubmit={(e) => handleSubmit(e, 'reg')}>
			<Form.Group widths='equal'>
				<Form.Field>
					<label htmlFor="loginPhone">Login</label>
					<Input
						name="loginPhone"
						value={formValues.loginPhone || ''}
						onChange={onChange}
						label={{ content: '+442' }}
						labelPosition='left'
						placeholder='072862288'
					/>
				</Form.Field>
				<Form.Field control={Input} value={formValues.companyName || ''} onChange={onChange} name="address" label='address' placeholder='London, 18 Abbey Rd' />
			</Form.Group>
			<Form.Group widths='equal'>
				<Form.Field control={Input} value={formValues.directorName || ''} onChange={onChange} name="Name" label='Name' placeholder='John Doe' />
			</Form.Group>
			<Form.Field type="password" onChange={onChange} name="password" control={Input} label='password' placeholder='enter password' />
			<Form.Field type="password" onChange={onChange} name="secondPassword" control={Input} label='password check' placeholder='repeat password' />
			{validateError &&
			<Label basic color='red' pointing>{validateError.map(
				(error, i) => <div key={i}>{error}</div>
			)}</Label>}
			<Button
				type='submit'
				className="signUpButton"
				positive
				icon='signup'
				labelPosition='right'
				content={'Registration'}
				style={{ display: 'block' }}
			/>
		</Form>
	);
};

SignUpForm.propTypes = {
	onChange: PropTypes.func.isRequired,
	formValues: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

export default SignUpForm;
