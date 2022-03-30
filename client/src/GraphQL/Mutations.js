import {gql} from '@apollo/client';

export const CREATE_DASHBOARD_MUTATION =gql`
	mutation createDashboard(
		$title: String! 
		$description: String!
		) {
		createDashboard(
			title: $title
			description: $description
		) {
			id
		}
	}

`;
