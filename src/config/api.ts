import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { currentApi } from './config';

import axios, { AxiosInstance } from 'axios';

import { userState } from '../state/user';

const httpLink = createUploadLink({
	uri: `${currentApi.graphqlApi}/graphql`,
});

const authLink = setContext((_, { headers }) => {
	const { jwt } = userState.get();
	return {
		headers: {
			...headers,
			authorization: jwt === undefined ? '' : `Bearer ${jwt}`,
		},
	};
});

export const axiosInstance = (): AxiosInstance => {
	const { jwt } = userState.get();

	return axios.create({
		baseURL: currentApi.url,
		timeout: 10000,
		headers: jwt ? { Authorization: 'Bearer ' + jwt } : {},
	});
};

const client = new ApolloClient({
	connectToDevTools: true,
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default client;
