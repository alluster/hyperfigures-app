import { useQuery } from '@apollo/client';
import { GET_GOOGLE_SHEET } from '../Queries';
import React, { useState, useEffect } from 'react';

const GoogleSheetGetter = ({
	spreadsheetId,
	sheetId,
	serviceAccount,
	org_id,
	setterFunction,
	loadingFunction
}) => {
	const [data, setData] = useState('hellooo');
	const { error: googleError, loading: googleLoading, data: googleData } = useQuery(GET_GOOGLE_SHEET, {
		variables: {
			spreadsheetId: `${spreadsheetId}`,
			sheetId: `${sheetId}`,
			org_id: `${org_id}`
		}
	});
	useEffect(() => {
		if (googleData) {
			// loadingFunction(googleLoading);
			console.log('google data fro GoogleSheetGetter', googleData);
			// setterFunction(googleData.getGoogleSpreadsheet);
			// setData(googleData.getGoogleSpreadsheet);
		}
	
	}, [googleData]);

	useEffect(() => {
		if (googleLoading) {
			// loadingFunction(googleLoading);
		}

	}, [googleLoading]);
	// useEffect(() => {
	// 	GetGoogleSheet({
	// 		spreadsheetId: spreadsheetId,
	// 		sheetId: sheetId,
	// 		org_id: org_id
	// 	});
	

	// }, []);
	
	return (
		<div>
			{data}
		</div>
	);
			
};

export default GoogleSheetGetter;