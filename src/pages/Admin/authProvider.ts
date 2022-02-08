
import { LogoutOptions, RedirectLoginOptions } from '@auth0/auth0-spa-js';
import { AuthProvider } from 'react-admin';
import {Auth0, pages} from '../../utils/constants'

const authProvider = (
	isAuthenticated: boolean,
	loading: boolean,
	logout: (o?: LogoutOptions) => void,
	user:any,
) => ({
	login: () => {
		return (isAuthenticated && loading == false ? Promise.resolve() : Promise.reject())
	},
	// TODO: maybe use login: () => Promise.resolve(),//unused because login is handled by auth0
	logout: () => {
		logout(
			// TODO: is this needed?
			//federated: true // have to be enabled to invalidate refresh token
		)
		return (isAuthenticated && loading == false ? Promise.resolve() : Promise.reject())
	},
	checkError: ({ status }: {status:number}) => {
		if (status === 401 || status === 403) {
			return Promise.reject();
		}
		return Promise.resolve();
	},
	checkAuth: () => {
		return ((isAuthenticated || loading) ? Promise.resolve() : Promise.reject())
		// TODO: is this a good idea/necessary? return Promise.reject({ redirectTo: '/nologin' })
	},
	getPermissions: () => {
		return ((isAuthenticated || loading) ? Promise.resolve() : Promise.reject())
	},
	getIdentity: () =>
		Promise.resolve({
			id: user.id,
			fullName: user.name,
			avatar: user.picture,
		}),
});

export default authProvider;
