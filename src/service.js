export function registration (values) {
	let url = '/api/register';
	let fetchOptions = {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(values),
	};
	return fetch(url, fetchOptions);
}

export function login (values) {
	let url = '/api/login';
	let fetchOptions = {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(values),
	};
	return fetch(url, fetchOptions);
}

export function createUser (values) {
	let url = '/api/createUser';
	let fetchOptions = {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(values),
	};
	return fetch(url, fetchOptions);
}

export function deleteUser (userId) {
	return fetch(`/api/getUser/${userId}`, {
		method: 'DELETE',
		credentials: 'include',
	});
}

export function getUser (id) {
	let url = `/api/getUser/${id}`;
	return fetch(url, { credentials: 'include' });
}

export function setNewPassword (userId, newPassword, newPassword2) {
	let url = `/api/setNewPassword/${userId}`;
	let fetchOptions = {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ userId, newPassword, newPassword2 }),
	};
	return fetch(url, fetchOptions);
}

export function setPassByUser (newPassword, newPassword2) {
	let url = '/api/setPassByUser';
	let fetchOptions = {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ newPassword, newPassword2 }),
	};
	return fetch(url, fetchOptions);
}

export function setNewValues (userId, values) {
	let url = `/api/setNewValues/${userId}`;
	let fetchOptions = {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(values),
	};
	return fetch(url, fetchOptions);
}

export function updateVerication (userId, value) {
	let url = '/api/updateVerication';
	let fetchOptions = {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ userId, value }),
	};
	return fetch(url, fetchOptions);
}

export function changeUserProfile (values) {
	const url = '/api/changeUserProfile';
	const fetchOptions = {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(values),
	};
	return fetch(url, fetchOptions);
}

export function usersList () {
	let url = '/api/usersList';
	return fetch(url, { credentials: 'include' });
}


export function deleteFile (fileId) {
	return fetch(`/api/getFile/${fileId}`, {
		method: 'DELETE',
		credentials: 'include',
	});
}


export function handleronSubmit (id) {
	let url = `/api/updateMessage/${id}`;
	let fetchOptions = {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	};
	return fetch(url, fetchOptions);
}



