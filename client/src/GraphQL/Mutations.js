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

export const CREATE_GOOGLE_SPREADSHEET_DATA_POINT_MUTATION =gql`
	mutation createGoogleSpreadsheetDataPoint(
		$title: String! 
		$description: String!
		$spreadsheet_id: String! 
		$sheet_id: String!
		$cell: String! 
		) {
		createGoogleSpreadsheetDataPoint(
			title: $title
			description: $description
			spreadsheet_id: $spreadsheet_id 
			sheet_id: $sheet_id
			cell: $cell 
		) {
			id
		}
	}

`;
