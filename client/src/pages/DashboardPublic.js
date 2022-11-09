import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/Context';
import HeaderText from '../components/HeaderText';
import Container from '../components/Container';
import ButtonGoBack from '../components/ButtonGoBack';
import { useForm } from 'react-hook-form';
import { LOAD_PUBLIC_DASHBOARD } from '../GraphQL/Queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import CardGrid from '../components/CardGrid';
import CardPublicDataPoint from '../components/CardPublicDataPoint';



const DashboardPublic = () => {
	const [dataPoints, setDataPoints] = useState([]);
	const [openModal, ] = useState(false);
	let { id } = useParams();
	const { user } = useAuth0();
	const {
		setAppLocation,
		setNotifyMessage
	} = useContext(AppContext);
	const { error, loading, data } = useQuery(LOAD_PUBLIC_DASHBOARD, {
		variables: { id: parseInt(id) }
	});
	

	const [publicDashboard, setPublicDashboard] = useState([]);
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();



	const DataPoints = () => {

		if (loading && dataPoints != {} && dataPoints.length > 0) {
			return (
				<p>Loading data...</p>
			);
		}
		if (error) { console.log('error occurred', error); }
		else {
			return (
				<div>
					<CardGrid>
						{
							dataPoints.length > 0 && dataPoints.map((item, i) => {
								console.log(item);
								return (
									<CardPublicDataPoint
										key={i}
										value={item.value}
										title={item.title}
										description={item.sheet_title}
									>
										

									</CardPublicDataPoint>
										
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
						publicDashboard.length > 0 ?
							<div>

								<HeaderText
									locationText="Public Dashboard"
									title={publicDashboard[0].title || '-'}
									description={publicDashboard[0].description || '-'}
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
			setPublicDashboard(data.getPublicDashboard[0].dashboard_data);
		}
	}, [data]);
	useEffect(() => {
		
		if(publicDashboard.length > 0){
			setDataPoints(JSON.parse(publicDashboard));
		}

		
	}, [publicDashboard]);
	
	return (
		<Container>
			{
				DashboardContent()

			}

			

		</Container>
	);
};

export default DashboardPublic;