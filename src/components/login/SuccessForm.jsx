import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const SuccessForm = ({ text }) => {
	return (
		<div>
			<Header as='h2' icon textAlign='center'>
				<Icon name='checkmark' circular />
				<Header.Content>
					{text}
				</Header.Content>
			</Header>
		</div>
	);
};

export default SuccessForm;
