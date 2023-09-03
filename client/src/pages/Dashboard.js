import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/Context';
import CardGrid from '../components/CardGrid';
import HeaderText from '../components/HeaderText';
import Container from '../components/Container';
import { useForm } from 'react-hook-form';
import { LOAD_DASHBOARD, LOAD_DASHBOARDS, LOAD_GOOGLE_SHEETS, LOAD_GOOGLE_SPREADSHEET_DATA_POINTS_DASHBOARD, LOAD_PUBLIC_DASHBOARDS } from '../GraphQL/Queries';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import CardDataPoint from '../components/CardDataPoint';
import Modal from '../components/Modal';
import FormCompiler from '../supportFunctions/FormComplier';
import { CREATE_DASHBOARD_MUTATION, CREATE_PUBLIC_DASHBOARD_MUTATION } from '../GraphQL/Mutations';
import GoogleDataGetter from '../GraphQL/GetterFunctions/GoogleDataGetter';
import Accordion from '../components/Accordion';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styled from 'styled-components';
import ButtonMulti from '../components/ButtonMulti';
import FormGoogleSpreadsheetDataPoint from '../components/Forms/DataPoints/FormGoogleSpreadsheetDataPoint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DividerLine from '../components/DividerLine';
import Card from '../components/Card';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../components/SideBar';
import Button from '../components/Button';
import ButtonGoBack from '../components/ButtonGoBack';
import SpreadsheetGoogle from '../components/Forms/DataPoints/SpreadsheetGoogle';

const Logo = styled.div`
   	max-width: 40px;
	align-self: center;
	margin-right: ${props => props.theme.grid.divider_4};

}
`;

const Content = styled.div`

	height: 100%;
`;

const GoBackContainer = styled.div`
	display: flex;
	flex-direction: row;
	
`;
const Icon = styled(FontAwesomeIcon)`
	color: ${props => props.theme.colors.fontDark};
	font-size: 20px;
	margin-right: ${props => props.theme.grid.divider_1};
	align-self: center;
	margin-bottom: ${props => props.theme.grid.divider_2};

	&:hover {
		cursor: pointer;
	}

	`;
const Text = styled.h5`
	color: ${props => props.theme.colors.fontDark};
	white-space: nowrap;
	align-self: center;
	margin-bottom: ${props => props.theme.grid.divider_2};

	&:hover {
		cursor: pointer;
	}
`;

const StyledLink = styled(Link)`

`;
const LinkText = styled.p`
	font-size: 12px;
	color: ${props => props.theme.colors.brand_100};


`;
const ActionText = styled.p`
	font-size: 16px;
	color: ${props => props.theme.colors.brand_100};
	line-height: 36px;

`;
const SideBarSubTitle = styled.p`
	font-size: 12px;
	font-weight: 700;
	border-bottom: 1px solid ${props => props.theme.colors.gray_60};
	color: ${props => props.theme.colors.fontDark};
	line-height: 36px;
	margin-bottom: 32px;
	margin-top: 32px;
	margin-left: 16px;

`;
const LinksContainer = styled.div`
	margin-top: 16px;
	display: flex;
	flex-direction: column;
`;


const Dashboard = () => {
	const [dataPoints, setDataPoints] = useState([]);
	const [dataPointsGoogle, setDataPointsGoogle] = useState([]);
	const [fetchedDataValues, setFetchedDataValues] = useState({});
	const [loadingDataPoint, setLoadingDataPoint] = useState([]);
	const [publicDashboards, setPublicDashboards] = useState([]);
	const [openDataPointModal, setOpenDataPointModal] = useState(false);
	const [dataPointSelector, setDataPointSelector] = useState('');
	const [googleSheets, setGoogleSheets] = useState([]);
	const [dashboards, setDashboards] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [dashboard, setDashboard] = useState([]);
	const [openNewDashboardModal, setOpenNewDashboardModal] = useState(false);
	let { id } = useParams();
	const { user } = useAuth0();
	const {
		setAppLocation,
		setNotifyMessage,
		setPath
	} = useContext(AppContext);
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const { error: sheetError, loading: sheetLoading, data: sheetData } = useQuery(LOAD_GOOGLE_SHEETS, {
		variables: { org_id: user.org_id }
	});
	const { data: dashboardsData, error: errorDashboards, loading: loadingDashboards } = useQuery(LOAD_DASHBOARDS, {
		variables: { org_id: user.org_id }
	});
	const { error, loading, data } = useQuery(LOAD_DASHBOARD, {
		variables: { id: parseInt(id), org_id: user.org_id }
	});
	const { error: publicDashboardsError, loading: loadingPublicDashboards, data: publicDashboardsData } = useQuery(LOAD_PUBLIC_DASHBOARDS, {
		variables: { dashboard_id: parseInt(id), org_id: user.org_id }
	});
	const { error: dataPointsError, loading: dataPointsLoading, data: dataPointsData } = useQuery(LOAD_GOOGLE_SPREADSHEET_DATA_POINTS_DASHBOARD, {
		variables: { org_id: user.org_id, dashboard_id: parseInt(id) }

	});
	const [createPublicDashboard] = useMutation(CREATE_PUBLIC_DASHBOARD_MUTATION, {
		refetchQueries: () => [{
			query: LOAD_PUBLIC_DASHBOARDS,
			variables: {
				dashboard_id: parseInt(id),
				org_id: user.org_id
			}
		}],
		awaitRefetchQueries: true,

	});
	const [createDashboard] = useMutation(CREATE_DASHBOARD_MUTATION, {
		refetchQueries: () => [{
			query: LOAD_DASHBOARDS,
			variables: {
				org_id: user.org_id
			}
		}],
		awaitRefetchQueries: true,
	});
	const DataPointSelectorHandler = () => {
		switch (dataPointSelector) {
		case 'Google Sheets':
			return <FormGoogleSpreadsheetDataPoint setOpenDataPointModal={setOpenDataPointModal} googleSheetsList={googleSheets && googleSheets || []} dashboardsList={dashboards && dashboards || []} />;
		case 'Google Sheets with Spreadsheet':
			return <SpreadsheetGoogle setOpenDataPointModal={setOpenDataPointModal} googleSheetsList={googleSheets && googleSheets || []} dashboardsList={dashboards && dashboards || []} />;

		default:
			return;
		}

	};
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
										loading={item.value.loaderFunction}
										key={i}
										to={`/datapoints/${item.id}`}
										cell={item.cell || ''}
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


				dataPointsGoogle.length > 0 ?
					DataPoints() 
					:
					<div>
						<p>This dashboard does not contain any data yet.</p>
						<Button type='button' primary onClick={() => setOpenDataPointModal(!openDataPointModal)}>
					Add new Data point

						</Button>

					</div>
			);
		}
	};
	const onSubmitNewDashboard = async (data) => {
		try {
			createDashboard({
				variables: {
					title: data.dashboardName,
					description: data.dashboardDescription,
					org_id: user.org_id
				},
				refetchQueries: [LOAD_DASHBOARDS]

			});
			setNotifyMessage(`New dashboard ${data.dashboardName} added`);

		}
		catch (error) {
			console.log(error);
			setNotifyMessage('Something went wrong');
		}
		finally {
			setOpenNewDashboardModal(false);
			reset();
		}
	};
	const onSubmit = async (data) => {
		try {
			await createPublicDashboard({
				variables: {
					title: data.publicDashboardName,
					description: data.publicDashboardDescription,
					org_id: user.org_id,
					dashboard_data: JSON.stringify(dataPointsGoogle.map(item => ({ ...item, value: parseInt(fetchedDataValues[item.id]) }))),
					dashboard_id: parseInt(id) || null
				}

			});
			setNotifyMessage(`New public dashboard ${data.publicDashboardName} added`);
		}
		catch (error) {
			console.log(error);
			setNotifyMessage('Something went wrong');
		}
		finally {
			setOpenModal(false);
			SideBarContainer();
			reset();
		}
	};

	const setValueForDataPoint = (value, id) => {
		setFetchedDataValues(prevState => ({
			...prevState,
			[id]: value
		}));
	};
	const SideBarContainer = () => {
		return (
			<SideBar >
				{/* <SideBarSubTitle>Dashboard Details</SideBarSubTitle> */}
				<ButtonGoBack text="Go Back" />

				<HeaderText

					locationText="Dashboard"
					title={dashboard.length > 0 && dashboard[0].title || '-'}
					description={dashboard.length > 0 && dashboard[0].description || '-'}
				/>
				<ButtonMulti title='Dashboard Options'>
					<ActionText onClick={() => { setOpenModal(!openModal); }}>Create New Public Dashboard</ActionText>
					<ActionText onClick={() => setOpenDataPointModal(!openDataPointModal)}>Add new Data point</ActionText>
				</ButtonMulti>
				<Accordion title="Published Dashboards">
					<LinksContainer>
						{
							loadingPublicDashboards ?
								<p>Loading public dashboard data....</p> :
								publicDashboards.length > 0 && publicDashboards.map((item, i) => {
									return (
										<StyledLink to={`/publicDashboard/${item.id}`} key={i}>
											<LinkText>
												{item.title}
											</LinkText>
										</StyledLink>

									);
								})


						}
						<Button type='button' onClick={() => setOpenModal(!openModal)} small={true} primary={true}>
							Create New

						</Button>
					</LinksContainer>

				</Accordion>
				{/* <SideBarSubTitle>All Dashboards</SideBarSubTitle> */}
				<Accordion title="Dashboards">
					<LinksContainer>
						{
							loadingDashboards ?
								<p>Loading dashboard data....</p> :
								dashboards.length > 0 && dashboards.map((item, i) => {
									return (
										<StyledLink to={`/dashboards/${item.id}`} key={i}>
											<LinkText>
												{item.title}
											</LinkText>
										</StyledLink>

									);
								})
						}
					</LinksContainer>
					<Button type='button' onClick={() => setOpenNewDashboardModal(!openNewDashboardModal)} small={true} primary={true}>
						Create New

					</Button>
				</Accordion>

			</SideBar>
		);
	};
	useEffect(() => {
		DataPoints();
	}, [loadingDataPoint]);


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
		if (publicDashboardsData) {
			setPublicDashboards(publicDashboardsData.getAllPublicDashboards);
			SideBarContainer();
		}
	}, [publicDashboardsData]);

	useEffect(() => {
		setDataPointsGoogle(dataPoints.map(dataPoint => ({
			...dataPoint,
			value: <GoogleDataGetter
				setterFunction={(e) => { setValueForDataPoint(e, dataPoint.id); }}
				loadingFunction={(e) => { console.log(e); }}
				cell={dataPoint.cell}
				spreadsheetId={dataPoint.spreadsheet_id}
				sheetId={dataPoint.sheet_id}
				serviceAccount={dataPoint.service_account}
				org_id={dataPoint.org_id}
				id={dataPoint.id}
			/>



		})));

	}, [dataPoints]);



	useEffect(() => {
		if (sheetData) {
			setGoogleSheets(sheetData.getAllGoogleSheets);
		}
	}, [sheetData]);
	useEffect(() => {
		if (dashboardsData) {
			setDashboards(dashboardsData.getAllDashboards);
		}
	}, [dashboardsData]);

	useEffect(() => {
		setPath('/dashboard');
	}, []);
	
	return (
		<Content>
			{SideBarContainer()}
			<Container>
				{
					DashboardContent()

				}


			</Container>
			<Modal
				open={openModal}
				openModal={() => setOpenModal()}
				modalTitle="Create New Public Dashboard"
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
								label: 'Name',
								options: '',
								required: true,
								errorMessage: 'Dashboard name is required',
								placeholder: 'Marketing, Budget, Finance... etc.'
							},
							{
								type: 'textarea',
								name: 'publicDashboardDescription',
								label: 'Description',
								options: '',
								required: false,
								errorMessage: '',
								placeholder: ''
							}
						]
					}

				>


				</FormCompiler>
			</Modal>
			<Modal
				open={openDataPointModal}
				openModal={() => setOpenDataPointModal()}
				modalTitle="New Data Point"
			>
				{
					dataPointSelector === '' ?
						<div>
							<GoBackContainer>
								<h5>Select Data Source</h5>
							</GoBackContainer>
							<DividerLine />

							<Card
								onClick={() => setDataPointSelector('Google Sheets')}
								row
							>
								<Logo>
									<img src="/google_sheets.png" alt="Google Sheets" />
								</Logo>
								<div>

									<p>
										integration
									</p>
									<h5>
										Google Sheets with selected Cell
									</h5>
								</div>

							</Card>
							<Card
								onClick={() => setDataPointSelector('Google Sheets with Spreadsheet')}
								row
							>
								<Logo>
									<img src="/google_sheets.png" alt="Google Sheets" />
								</Logo>
								<div>
									<p>
										integration
									</p>
									<h5>
										Google Sheets with Spreadsheet
									</h5>
								</div>



							</Card>
						</div>
						:
						<div>

							<GoBackContainer onClick={() => setDataPointSelector('')}>
								<Icon icon={faArrowLeft} />
								<Text>
									Go Back
								</Text>
							</GoBackContainer>
							<DividerLine />

						</div>


				}

				{
					DataPointSelectorHandler()
				}
			</Modal>
			<Modal
				open={openNewDashboardModal}
				openModal={() => setOpenNewDashboardModal()}
				modalTitle="Create a new Dashboard"
			>
				<FormCompiler
					reset={reset}
					openModal={() => setOpenNewDashboardModal()}
					errors={errors}
					onSubmit={() => handleSubmit(onSubmitNewDashboard)}
					register={register}
					fields={
						[
							{
								type: 'input',
								name: 'dashboardName',
								label: 'Dashboard name',
								options: '',
								required: true,
								errorMessage: 'Dashboard name is required',
								placeholder: 'Give your dashboard a name'
							},
							{
								type: 'textarea',
								name: 'dashboardDescription',
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
		</Content>

	);
};

export default Dashboard;