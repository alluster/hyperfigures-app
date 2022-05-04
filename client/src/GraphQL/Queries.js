import { gql } from '@apollo/client';



export const GET_VALUE_FROM_GOOGLE_SPREADSHEET = gql`
	query getValueFromGoogleSpreadsheet(
		$cell: String!,
		$sheetId: String!,
		$spreadsheetId: String!
	)
	{getValueFromGoogleSpreadsheet(
		cell: $cell,
		sheetId: $sheetId,
		spreadsheetId: $spreadsheetId
	){
		value
	}
	
	}

`;

export const LOAD_GOOGLE_SPREADSHEET_DATA_POINT = gql`
	query getGoogleSpreadsheetDataPoint($id: String!)
		{getGoogleSpreadsheetDataPoint(id: $id) {
			id
			title
			description
			value
			group_id
			created_at
			updated_at
			deleted_at
			cell
			spreadsheet_id
			sheet_id
			org_id
			creator
		}}
`;
export const LOAD_GOOGLE_SPREADSHEET_DATA_POINTS = gql`
	query {getAllGoogleSpreadsheetDataPoints {
		id
		title
		description
		value
		group_id
		created_at
		updated_at
		deleted_at
		cell
		sheet_id
		spreadsheet_id
		org_id
		creator
	}}
`;
export const LOAD_GOOGLE_SPREADSHEET_DATA_SOURCES = gql`
	query {getAllGoogleSpreadsheetDataSources {
		id
		title
		description
		service_account
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