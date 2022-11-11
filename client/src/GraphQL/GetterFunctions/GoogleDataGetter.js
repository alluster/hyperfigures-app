import { useQuery } from '@apollo/client';
import { GET_VALUE_FROM_GOOGLE_SPREADSHEET } from '../Queries';
import React, { useState, useEffect } from 'react';
const GoogleDataGetter = ({
	cell,
	spreadsheetId,
	sheetId,
	serviceAccount,
	org_id,
	setterFunction
}) => {
	const [data, setData] = useState('');
	const { error: googleError, loading: googleLoading, data: googleData } = useQuery(GET_VALUE_FROM_GOOGLE_SPREADSHEET, {
		variables: {
			cell: `${cell}`,
			spreadsheetId: `${spreadsheetId}`,
			sheetId: `${sheetId}`,
			serviceAccount: `${serviceAccount}`,
			org_id: `${org_id}`
		}
	});
	useEffect(() => {
		if (googleData) {
			setterFunction(googleData.getValueFromGoogleSpreadsheet[0].value);
			setData(googleData.getValueFromGoogleSpreadsheet[0].value);
			console.log(googleData.getValueFromGoogleSpreadsheet[0].value);
			console.log(googleError);
		}
	
	}, [googleData]);
	
	return (
		<div>
			{data}
		</div>
	);
			
};

export default GoogleDataGetter;