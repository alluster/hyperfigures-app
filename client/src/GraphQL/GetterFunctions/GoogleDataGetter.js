import { useQuery } from '@apollo/client';
import { GET_VALUE_FROM_GOOGLE_SPREADSHEET } from '../Queries';
import React, { useState, useEffect } from 'react';
const GoogleDataGetter = ({
	cell,
	spreadsheetId,
	sheetId,
	serviceAccount,
	org_id,
	setterFunction,
	loadingFunction
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
			loadingFunction(googleLoading);
			setterFunction(googleData.getValueFromGoogleSpreadsheet[0].value);
			setData(googleData.getValueFromGoogleSpreadsheet[0].value);
		}
	
	}, [googleData]);

	useEffect(() => {
		if (googleLoading) {
			loadingFunction(googleLoading);
		}

	}, [googleLoading]);
	
	return (
		<div>
			{data}
		</div>
	);
			
};

export default GoogleDataGetter;