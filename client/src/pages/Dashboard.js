import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/Context';
import CardGrid from '../components/CardGrid';
import HeaderText from '../components/HeaderText';
import Container from '../components/Container';
import ButtonGoBack from '../components/ButtonGoBack';
import { useForm } from 'react-hook-form';
import { LOAD_DASHBOARD, LOAD_GOOGLE_SPREADSHEET_DATA_POINTS_DASHBOARD } from '../GraphQL/Queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import CardDataPoint from '../components/CardDataPoint';




const Dashboard = () => {
	const [dataPoints, setDataPoints] = useState([]);
	let { id } = useParams();
	const { user } = useAuth0();
	const {
		setAppLocation,
	} = useContext(AppContext);
	const { error, loading, data } = useQuery(LOAD_DASHBOARD, {
		variables: { id: id, org_id: user.org_id }
	});
	const { error: dataPointsError, loading: dataPointsLoading, data: dataPointsData } = useQuery(LOAD_GOOGLE_SPREADSHEET_DATA_POINTS_DASHBOARD, {
		variables: {org_id: user.org_id, dashboard_id: parseInt(id) }

	});
	const [dashboard, setDashboard] = useState([]);
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();



	const DataPoints = () => {

		if (dataPointsLoading) {
			return (
				<p>Loading data...</p>
			);
		}
		if (dataPointsError) { console.log('error occurred', dataPointsError); }
		else {
			return (
				<div>
					<CardGrid>
						{
							dataPoints.map((item, i) => {
							
								return (
									<CardDataPoint
										key={i}
										to={`/datapoints/${item.id}`}
										cell={ item.cell || ''}
										spreadsheetId={item.spreadsheet_id || ''}
										sheetId={item.sheet_id || ''}
										serviceAccount={item.service_account || ''}
										org_id={user.org_id}
										title={item.title}
										description={item.sheet_title}
									>
										

									</CardDataPoint>
										
								);
							})
						}
					</CardGrid>
				</div>

			);
		}
	};


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
								{DataPoints()}
							</div>

							:
							<p>No data</p>
					}
				</div>


			);
		}
	};


	useEffect(() => {
		window.scroll(0, 0);

		if (data) {
			setDashboard(data.getDashboard);
		}
	}, [data]);
	useEffect(() => {
		if (dataPointsData) {
			setDataPoints(dataPointsData.getAllGoogleSpreadsheetDataPointsDashboard);
		}
	}, [dataPointsData]);
	return (
		<Container>
			{
				DashboardContent()

			}



		</Container>
	);
};

export default Dashboard;