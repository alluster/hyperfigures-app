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

export const CREATE_GOOGLE_SPREADSHEET_DATA_POINT_MUTATION =gql`
	mutation createGoogleSpreadsheetDataPoint(
		$title: String! 
		$description: String!
		$spreadsheet_id: String! 
		$sheet_id: String!
		$cell: String! 
		$service_account: String!
		$org_id: String!
		) {
		createGoogleSpreadsheetDataPoint(
			title: $title
			description: $description
			spreadsheet_id: $spreadsheet_id 
			sheet_id: $sheet_id
			cell: $cell 
			service_account: $service_account
			org_id: $org_id
		) {
			id
		}
	}

`;
