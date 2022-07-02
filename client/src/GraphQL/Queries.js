import { gql } from '@apollo/client';



export const GET_VALUE_FROM_GOOGLE_SPREADSHEET = gql`
	query getValueFromGoogleSpreadsheet(
		$cell: String!,
		$sheetId: String!,
		$spreadsheetId: String!
		$serviceAccount: String!
		$org_id: String!
	)
	{getValueFromGoogleSpreadsheet(
		serviceAccount: $serviceAccount
		cell: $cell,
		sheetId: $sheetId,
		spreadsheetId: $spreadsheetId
		org_id: $org_id
	){
		value
	}
	
	}

`;

export const LOAD_GOOGLE_SPREADSHEET_DATA_POINT = gql`
	query getGoogleSpreadsheetDataPoint(
		$id: String!
		$org_id: String!
	)
		{getGoogleSpreadsheetDataPoint(
			id: $id
			org_id: $org_id
		) {
			id
			title
			description
			created_at
			updated_at
			deleted_at
			cell
			sheet_id
			sheet_title
			spreadsheet_id
			service_account
			org_id
		}}
`;

export const LOAD_GOOGLE_SHEETS = gql`
	query getAllGoogleSheets(
		$org_id: String!
	)
		{getAllGoogleSheets(
			org_id: $org_id
		) {
			id
			title
			description
			created_at
			updated_at
			deleted_at
			sheet_id
			spreadsheet_id
			org_id
		}}
`;


export const LOAD_GOOGLE_SHEET = gql`
	query getGoogleSheet(
		$org_id: String!
		$id: String!
	)
		{getGoogleSheet(
			org_id: $org_id
			id: $id
		) {
			id
			title
			description
			created_at
			updated_at
			deleted_at
			sheet_id
			spreadsheet_id
			org_id
		}}
`;

export const LOAD_GOOGLE_SPREADSHEET_DATA_POINTS = gql`
	query getAllGoogleSpreadsheetDataPoints($org_id: String!)
		{getAllGoogleSpreadsheetDataPoints(org_id: $org_id) {
			id
			title
			description
			cell
			sheet_id
			spreadsheet_id
			org_id
			service_account 
			sheet_title
	}}
`;
export const LOAD_GOOGLE_SPREADSHEET_DATA_SOURCES = gql`
	query getAllGoogleSpreadsheetDataSources($org_id: String!)
		{getAllGoogleSpreadsheetDataSources(org_id: $org_id) {
			id
			title
			description
			org_id
			service_account 
		}}

`;
export const LOAD_DASHBOARDS = gql`
	query getAllDashboards($org_id: String!)
	{getAllDashboards(org_id: $org_id) {
		org_id
		id
		title
		description
		created_at
		updated_at
		deleted_at
		
	}}
`;

export const LOAD_DASHBOARD = gql`
	query getDashboard(
			$id: String!
			$org_id: String!
		)
		{getDashboard(
				id: $id
				org_id: $org_id
			) 
		{
			id
			title
			description
			created_at
			updated_at
			deleted_at
		}
	}
`;