import { useState, useEffect } from 'react';
import { ApolloError, gql, useQuery } from '@apollo/client';

type LoginStatus = {
	isLoggedIn: boolean | null;
	loading: boolean;
};

function useLoggedIn(): LoginStatus {
	const [isLoggedIn, setLoggedIn] = useState(null);
	const { loading } = useQuery(
		gql`
			query ME {
				me {
					id
					username
					email
				}
			}
		`,
		{
			onCompleted: data => {
				console.log('User is logged in: ', data);
				setLoggedIn(true);
			},
			onError: (err: ApolloError) => {
				console.log('User NOT logged in: ', err);
				setLoggedIn(false);
			},
			fetchPolicy: 'network-only',
		}
	);

	if (loading) {
		console.log('loading....');
	}

	return { isLoggedIn, loading };
}

export default useLoggedIn;
