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
import InputNumber from '../components/InputNumber';
import InputTextarea from '../components/InputTextarea';
import TextWithLabel from '../components/TextWithLabel';
import { LOAD_DASHBOARD } from '../GraphQL/Queries';
import { useQuery, gql } from '@apollo/client';
import { useParams, useHistory } from 'react-router-dom';
import CardDataGroup from '../components/CardDataGroup';


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


const Dashboard = () => {
	let { id } = useParams();

	const {
		setAppLocation,
	} = useContext(AppContext);
	const { error, loading, data } = useQuery(LOAD_DASHBOARD, {
		variables: { id: id }
	});
	const [dashboard, setDashboard] = useState([]);
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const DashboardContent = () => {
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

						dashboard.length > 0 ?
							<div>

								<HeaderText
									locationText="Dashboard"
									title={dashboard[0].title || '-'}
									description={dashboard[0].description || '-'}
								/>
								<CardGrid>
									{
										dashboard[0].data_point_groups.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((item, i) => {

											return (
												<CardDataGroup
													updated_at={item.updated_at}
													title={item.title}
													description={item.description}
													dataPoints={item.google_spreadsheet_data_points}
													key={i}
												/>
									
											)
										})
									}
								</CardGrid>
								<CardGrid>
									{
										dashboard[0].data_point_groups.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((item, i) => {

											return (
												<CardDataGroup
													updated_at={item.updated_at}
													title={item.title}
													description={item.description}
													dataPoints={item.google_spreadsheet_data_points}
													key={i}
												/>
									
											)
										})
									}
								</CardGrid>
								<CardGrid>
									{
										dashboard[0].google_spreadsheet_data_points.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((item, i) => {

											return (
												<Card
													key={i}
												>
													<TextWithLabel
														label={item.title}
														title={CurrencyFormatter.format(item.value)}
													/>
												</Card>
											)
										})
									}
								</CardGrid>
							</div>

							:
							<p>No data</p>
					}
				</div>


			)
		};
	};
	const onSubmit = async (data) => {
		console.log(data)

	};

	useEffect(() => {
		window.scroll(0, 0);

		if (data) {
			setDashboard(data.getDashboard);
		}
	}, [data]);
	return (
		<Container>
			{
				DashboardContent()

			}



		</Container>
	);
};

export default Dashboard;