

import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import axios from 'axios';
import Card from '../components/Card';
import CardGrid from '../components/CardGrid';
import HeaderText from '../components/HeaderText';
import Container from '../components/Container';
import ButtonGoBack from '../components/ButtonGoBack';
import CurrencyFormatter from '../supportFunctions/CurrencyFormatter';
import Select from '../components/Select';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';

import InputNumber from '../components/InputNumber';
import InputTextarea from '../components/InputTextarea';
import TextWithLabel from '../components/TextWithLabel';
import { useQuery, gql } from '@apollo/client';
import { LOAD_GOOGLE_SPREADSHEET_DATA_POINT } from '../GraphQL/Queries';

const Value = styled.h3`
	font-weight: bold;
`;

const Divider = styled.div`
	border-bottom: 1px solid ${props => props.theme.colors.gray_60};
	width: 100%;
	margin-top: 20px;
	margin-bottom: 20px;
`;
const Label = styled.p`
	color: ${props => props.theme.colors.gray_130};
	font-size: 14px;
`


const DataPoint = () => {
	let { id } = useParams();

	const { error, loading, data } = useQuery(LOAD_GOOGLE_SPREADSHEET_DATA_POINT, {
		variables: { id: id }
	});
	const [dataPoint, setDataPoint] = useState([]);
	const {
		dashboardData,
		setAppLocation,
		user,
		something
	} = useContext(AppContext);

	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		console.log(data)

	};
	
	const DataPointContent = () => {
		if (loading) {
			return (
				<p>Loading data...</p>
			)
		}
		if (error) { console.log('error', error) }
		else {
			return (
				<div>
					<ButtonGoBack text="Go Back" />

					{

						dataPoint.length > 0 ?
							<div>

								<HeaderText
									locationText="Data Point"
									title={dataPoint[0].title || '-'}
									description={dataPoint[0].description || '-'}
								/>
								<Card>
									<TextWithLabel 
										title={dataPoint[0].value}
										label="Value"
									/>
								</Card>
								<Card>
							
									<TextWithLabel 
										title={dataPoint[0].updated_at}
										label="Updated"
									/>
									<TextWithLabel 
										title={dataPoint[0].created_at}
										label="Created"
									/>
									<TextWithLabel 
										title={dataPoint[0].data_point_group}
										label="Group"
									/>
									<TextWithLabel 
										title={dataPoint[0].creator}
										label="Creator"
									/>
								</Card>
								<Card>
							
							<TextWithLabel 
								title={dataPoint[0].spreadsheet}
								label="Spreadsheet"
							/>
							<TextWithLabel 
								title={dataPoint[0].sheet}
								label="Sheet"
							/>
							<TextWithLabel 
								title={dataPoint[0].cell}
								label="Cell"
							/>
						
						</Card>
							
							</div>

							:
							<p>No data</p>
					}
				</div>


			)
		};
	};
	useEffect(() => {
		if (data) {
			window.scroll(0, 0);
			setDataPoint(data.getGoogleSpreadsheetDataPoint)
			console.log(data)
		}
	}, [data]);
	return (
		<Container>
			{
				DataPointContent()
			}




		</Container>
	);
};

export default DataPoint;