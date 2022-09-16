import {gql} from '@apollo/client';

export const CREATE_DASHBOARD_MUTATION =gql`
	mutation createDashboard(
		$org_id: String!
		$title: String! 
		$description: String!,
		) {
		createDashboard(
			org_id: $org_id
			title: $title
			description: $description
		) {
			id
		}
	}

`;

export const CREATE_GOOGLE_SHEET=gql`
	mutation createGoogleSheet(
		$org_id: String!
		$title: String! 
		$description: String!
		$spreadsheet_id: String!
		$sheet_id: String!
		) {
		createGoogleSheet(
			org_id: $org_id
			title: $title
			description: $description
			spreadsheet_id: $spreadsheet_id
			sheet_id: $sheet_id
		) {
			id
		}
	}

`;
export const CREATE_GOOGLE_SPREADSHEET_DATA_POINT_MUTATION =gql`
	mutation createGoogleSpreadsheetDataPoint(
		$title: String
		$description: String
		$spreadsheet_id: String
		$sheet_id: String
		$sheet_title: String
		$cell: String
		$service_account: String
		$org_id: String
		$dashboard_id: Int
		) {
		createGoogleSpreadsheetDataPoint(
			title: $title
			description: $description
			spreadsheet_id: $spreadsheet_id 
			sheet_id: $sheet_id
			sheet_title: $sheet_title
			cell: $cell 
			service_account: $service_account
			org_id: $org_id
			dashboard_id: $dashboard_id
		) {
			id
		}
	}

`;

export const UPDATE_GOOGLE_SPREADSHEET_DATA_POINT_MUTATION =gql`
	mutation updateGoogleSpreadsheetDataPoint(
		$id: String
		$org_id: String
		$deleted_at: Date
		) {
			updateGoogleSpreadsheetDataPoint(
			id: $id
			org_id: $org_id
			deleted_at: $deleted_at
		) {
			id
		}
	}

`;