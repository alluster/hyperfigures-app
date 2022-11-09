import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/Context';
import CardGrid from '../components/CardGrid';
import HeaderText from '../components/HeaderText';
import Container from '../components/Container';
import ButtonGoBack from '../components/ButtonGoBack';
import { useForm } from 'react-hook-form';
import { LOAD_DASHBOARD, LOAD_GOOGLE_SPREADSHEET_DATA_POINTS_DASHBOARD, LOAD_PUBLIC_DASHBOARDS } from '../GraphQL/Queries';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import CardDataPoint from '../components/CardDataPoint';
import Modal from '../components/Modal';
import FormCompiler from '../supportFunctions/FormComplier';
import { CREATE_PUBLIC_DASHBOARD_MUTATION } from '../GraphQL/Mutations';
import GoogleDataGetter from '../GraphQL/GetterFunctions/GoogleDataGetter';



const Dashboard = () => {
	const [dataPoints, setDataPoints] = useState([]);
	const [dataPointsGoogle, setDataPointsGoogle] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	let { id } = useParams();
	const { user } = useAuth0();
	const {
		setAppLocation,
		setNotifyMessage
	} = useContext(AppContext);
	const { error, loading, data } = useQuery(LOAD_DASHBOARD, {
		variables: { id: id, org_id: user.org_id }
	});
	const { error: dataPointsError, loading: dataPointsLoading, data: dataPointsData } = useQuery(LOAD_GOOGLE_SPREADSHEET_DATA_POINTS_DASHBOARD, {
		variables: {org_id: user.org_id, dashboard_id: parseInt(id) }

	});
	const [createPublicDashboard] = useMutation(CREATE_PUBLIC_DASHBOARD_MUTATION);

	const [dashboard, setDashboard] = useState([]);
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();


	// const DataPointValueResolver = () => {
	// 	setDataPoints(
	// 		...dataPoints, {


	// 		}
	// 	)
	// }
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
							dataPointsGoogle.map((item, i) => {
							
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
										value={item.value}
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
									buttonTitle="Publish Dashboard"
									onClickFunction={() => setOpenModal(!openModal)}
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

	const onSubmit = async (data) => {
		try {
			createPublicDashboard({
				variables: {
					title: data.publicDashboardName,
					description: data.publicDashboardDescription,
					org_id: user.org_id,
					dashboard_data: JSON.stringify(dataPointsGoogle)
				},
				refetchQueries: [LOAD_PUBLIC_DASHBOARDS]

			});
			setNotifyMessage(`New public dashboard ${data.publicDashboardName} added`);

		}
		catch (error) {
			console.log(error);
			setNotifyMessage('Something went wrong');
		}
		finally {
			setOpenModal(false);
			reset();
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
	useEffect(() => {
		setDataPointsGoogle(dataPoints.map(dataPoint => ({
			...dataPoint, 
			value: GoogleDataGetter({
				
				cell : dataPoint.cell,
				spreadsheetId: dataPoint.spreadsheet_id,
				sheetId: dataPoint.sheet_id,
				serviceAccount: dataPoint.service_account,
				org_id: dataPoint.org_id,
			})
				
				
			
		})));

	}, [dataPoints]);
	

	return (
		<Container>
			{
				DashboardContent()

			}

			<Modal
				open={openModal}
				openModal={() => setOpenModal()}
				modalTitle="Publish Dashboard"
			>
				<FormCompiler
					reset={reset}
					openModal={() => setOpenModal()}
					errors={errors}
					onSubmit={() => handleSubmit(onSubmit)}
					register={register}
					fields={
						[
							{
								type: 'input',
								name: 'publicDashboardName',
								label: 'Public Dashboard name',
								options: '',
								required: true,
								errorMessage: 'Dashboard name is required',
								placeholder: 'Give your dashboard a name'
							},
							{
								type: 'textarea',
								name: 'publicDashboardDescription',
								label: 'Dashboard Description',
								options: '',
								required: false,
								errorMessage: '',
								placeholder: 'Describe your dashboard'
							}
						]
					}

				>


				</FormCompiler>
			</Modal>

		</Container>
	);
};

export default Dashboard;