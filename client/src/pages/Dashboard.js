import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/Context';
import CardGrid from '../components/CardGrid';
import HeaderText from '../components/HeaderText';
import Container from '../components/Container';
import ButtonGoBack from '../components/ButtonGoBack';
import { useForm } from 'react-hook-form';
import { LOAD_DASHBOARD } from '../GraphQL/Queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';




const Dashboard = () => {
	let { id } = useParams();
	const { user } = useAuth0();
	const {
		setAppLocation,
	} = useContext(AppContext);
	const { error, loading, data } = useQuery(LOAD_DASHBOARD, {
		variables: { id: id, org_id: user.org_id }
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
			);
		}
		if (error) { console.log('error', error); }
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
									{/* {
										dashboard[0].data_point_groups.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((item, i) => {

											return (
												<CardDataGroup
													updated_at={item.updated_at}
													title={item.title}
													description={item.description}
													dataPoints={item.google_spreadsheet_data_points}
													key={`${i}${item.title}`}
												/>
									
											)
										})
									} */}
						
							
									{/* {
										dashboard[0].google_spreadsheet_data_points.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((item, i) => {

											return (
												<Card
													to={`/datapoints/${item.id}`}
													key={i}
												>
													<TextWithLabel
														label={item.title}
														title={CurrencyFormatter.format(item.value)}
													/>
												</Card>
											)
										})
									} */}
								</CardGrid>
							</div>

							:
							<p>No data</p>
					}
				</div>


			);
		}
	};
	const onSubmit = async (data) => {
		console.log('data from dashboard route', data);

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