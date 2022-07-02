import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { device } from '../device';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_VALUE_FROM_GOOGLE_SPREADSHEET } from '../GraphQL/Queries';
import TextWithLabel from './TextWithLabel';
import SpinnerSmall from './SpinnerSmall';

const Wrapper = styled.div`
	padding-top: ${props => props.theme.grid.divider_4} ;
	padding-bottom: ${props => props.theme.grid.divider_4} ;
	padding-left: ${props => props.theme.grid.divider_4} ;
	padding-right: ${props => props.theme.grid.divider_4} ;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	background-color: ${props => props.theme.colors.white};
	border: solid 1px ${props => props.theme.colors.gray_110};
	border-radius: 8px;
	margin-right: ${props => props.theme.grid.divider_2} ;
	margin-bottom: ${props => props.theme.grid.divider_2} ;
	${({ row }) => row && `
		flex-direction: row;
	`};
	${({ onClick }) => onClick && `
		cursor:pointer
	`};
	
	@media ${device.laptop} {
		margin-right: 0px;

	}
`;
const WrapperLink = styled(Link)`
	padding-top: ${props => props.theme.grid.divider_4} ;
	padding-bottom: ${props => props.theme.grid.divider_4} ;
	padding-left: ${props => props.theme.grid.divider_4} ;
	padding-right: ${props => props.theme.grid.divider_4} ;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	background-color: ${props => props.theme.colors.white};
	border: solid 1px ${props => props.theme.colors.gray_110};
	border-radius: 8px;
	margin-right: ${props => props.theme.grid.divider_2};
	margin-bottom: ${props => props.theme.grid.divider_2};
	cursor: pointer;
	${({ row }) => row && `
		flex-direction: row;
	`};
	${({ small }) => small && `
	padding-top: 16px ;
	padding-bottom: 16px ;
	padding-left: 16px ;
	padding-right: 16px ;
`};
	@media ${device.laptop} {
		margin-right: 0px;
	}
`;
const CardDataPoint = ({ children, to, row, small, onClick, cell, spreadsheetId, sheetId, serviceAccount, org_id, title, description }) => {

	const [googleValue, setGoogleValue] = useState({
		value: 'No data found'
	});
	const { error: googleError, loading: googleLoading, data: googleData } = useQuery(GET_VALUE_FROM_GOOGLE_SPREADSHEET, {
		variables: {
			cell: `${cell}`,
			spreadsheetId: `${spreadsheetId}`,
			sheetId: `${sheetId}`,
			serviceAccount: `${serviceAccount}`,
			org_id: org_id
		}
		// ,
		// pollInterval: 5000,

	});
	useEffect(() => {
		if (googleData) {
			setGoogleValue({
				...googleValue,
				value: googleData.getValueFromGoogleSpreadsheet[0].value,

			});
		}
	}, [googleData]);
	return (
		<div onClick={onClick}>
			{
				to ?

					<WrapperLink small={small} row={row} to={to || ''}>
						{
							googleLoading ?
								<SpinnerSmall />:
								<TextWithLabel 
									title={googleValue.value || ''}
									label={title || ''}
									description={description || ''}
								/>

						}
					</WrapperLink>
					:
					<Wrapper small={small} row={row}>
						{
							googleLoading ?
								<SpinnerSmall />:
								<TextWithLabel 
									title={googleValue.value || ''}
									label={title || ''}
									description={description || ''}
								/>
						}					
					</Wrapper>
			}

		</div>

	);
};

export default CardDataPoint;