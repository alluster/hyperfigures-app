import { gql } from '@apollo/client';

export const LOAD_GOOGLE_SPREADSHEET_DATA_POINTS = gql`
	query {getAllGoogleSpreadsheetDataPoints {
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
		created_at
		updated_at
		deleted_at
		data_point_groups {
			id
			title
			description
			created_at
			updated_at
			deleted_at
		}
	}}
`;

export const LOAD_DASHBOARD = gql`
	query getDashboard($id: String!)
		{getDashboard(id: $id) {
			id
			title
			description
			created_at
			updated_at
			deleted_at
			data_point_groups {
				id
				title
				description
				created_at
				updated_at
				deleted_at
				google_spreadsheet_data_points{
					id
					title
					description
					created_at
					updated_at
					deleted_at
					value
				}
			}
			google_spreadsheet_data_points{
				id
				title
				description
				created_at
				updated_at
				deleted_at
				value
			}
	}}
`;