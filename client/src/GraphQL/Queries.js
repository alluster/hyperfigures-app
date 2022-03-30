import { gql } from '@apollo/client';

export const LOAD_DATAPOINTS = gql`
	query {getAllDatapoints {
		id
		title
		description
		value
	}}

`;

export const LOAD_DASHBOARDS = gql`
	query {getAllDashboards {
		id
		title
		description
	}}
`;