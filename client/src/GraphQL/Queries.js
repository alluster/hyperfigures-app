import { gql } from '@apollo/client';

export const LOAD_DATAPOINTS = gql`
	query {getAllDatapoints {
		id
		title
		description
		value
	}}

`;