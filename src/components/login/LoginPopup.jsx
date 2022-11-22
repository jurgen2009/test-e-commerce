import React, { Component } from 'react';
import { Menu, Modal } from 'semantic-ui-react';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import SuccessForm from './SuccessForm';

import { registration } from '../../service';

class LoginPopup extends Component {
	state = {
		open: false,
		dimmer: 'blurring',
		isSignUpForm: false,
		isSuccessForm: false,
		formValues: {},
		validateError: false,
	}

	toggleForm = () => this.setState({ isSignUpForm: true, validateError: false });
	show = () => this.setState({ open: true });
	close = () => {
		return this.setState({ open: false, isSignUpForm: false, validateError: false, isSuccessForm: false });
	}
	onChange = (e) => {
		this.setState({ formValues: Object.assign(this.state.formValues, { [e.target.name]: e.target.value }) });
	};

	handleSubmit = (e, action) => {
		e.preventDefault();
		if (action === 'reg') {
			return registration(this.state.formValues).then(res => res.json().then(resParse => {
				if (resParse.error) {
					return this.setState({ validateError: resParse.value });
				} else if (res.status !== 200) {
					return this.setState({ validateError: [resParse] });
				} else {
					this.props.signInObserver(true, resParse);
					return this.setState({ isSuccessForm: 'Registration successful!' });
				}
			}));
		}
		if (action === 'login') {
			this.setState({ validateError: false });
			console.log(this.state.formValues)
				if (this.state.formValues !== null) {
					this.props.signInObserver1(true, this.state.formValues.loginPhone);
					this.setState({ isSuccessForm: 'Authentication successful!' });
				}
				this.setState({ validateError: this.state.formValues.loginPhone});

		}
	}

	render () {
		const { open, dimmer, isSignUpForm, isSuccessForm, formValues, validateError } = this.state;

		const loginButton = () => {
			let user = this.props.user;
			if (user) {
				return;
			} else {
				return <Menu.Item name="login" onClick={this.show}>Login</Menu.Item>;
			}
		};

		const form = () => {
			if (isSuccessForm) {
				return <SuccessForm text={this.state.isSuccessForm} />;
			}
			if (isSignUpForm) {
				return <SignUpForm onChange={this.onChange} handleSubmit={this.handleSubmit} formValues={formValues} validateError={validateError} />;
			} else {
				return <LoginForm onChange={this.onChange} handleSubmit={this.handleSubmit} formValues={formValues} validateError={validateError} />;
			}
		};

		return (
			<div>
				{loginButton()}
				<Modal size={isSignUpForm ? 'tiny' : 'mini'} dimmer={dimmer} open={open} onClose={this.close} closeIcon>
					<Modal.Header className="text-center">{isSignUpForm ? 'Registration (disabled)' : 'Authentication (database is disabled, you can type any values to login)'}</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							{ form() }
						</Modal.Description>
					</Modal.Content>
					<Modal.Actions>
						{!isSignUpForm &&
							!isSuccessForm &&
							<div className="text-center form-switcher">
								<div className="modalTextUI"><h4>No account?</h4></div><br/>
								<div className="modalButtonUI"> <button className="ui inverted green button" onClick={this.toggleForm}> Registration </button> </div>
							</div>
						}
					</Modal.Actions>
				</Modal>
			</div>
		);
	}
}

export default LoginPopup;
