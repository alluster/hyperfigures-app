import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import Content from '../components/Content';
import axios from 'axios';



const Value = styled.h3`
	font-weight: bold;
`;

const Divider = styled.div`
	border-bottom: 1px solid ${props => props.theme.colors.gray_60};
	width: 100%;
	margin-top: 20px;
	margin-bottom: 20px;
`;


const Dashboard = () => {
	const {
		dashboardData,
		setLocation,
		loading,
		user
	} = useContext(AppContext);
	const [localLoading, setLocalLoading] = useState(false);

	const [usersCount, setUsersCount] = useState();

	const [practicesCount, setPracticesCount] = useState();
	const [practicesCountByType, setPracticesCountByType] = useState([]);
	const [practiceMaturity, setPracticeMaturity] = useState([]);

	const [softwaresCount, setSoftwaresCount] = useState();
	const [softwaresTotalCost, setSoftwaresTotalCost] = useState();
	const [softwaresByLocation, setSoftwaresByLocation] = useState([]);
	const [softwaresLifecycle, setSoftwaresLifecycle] = useState([]);

	const [integrationsCount, setIntegrationsCount] = useState();
	const [integrationsTotalCost, setIntegrationsTotalCost] = useState();
	const [integrationsByType, setIntegrationsByType] = useState([]);

	const [projectsCount, setProjectsCount] = useState();
	const [projectsCountByStatus, setProjectsCountByStatus] = useState([]);
	const [projectsTotalCost, setProjectsTotalCost] = useState();

	const [contractsTotalCount, setContractsTotalCount] = useState();
	const [contractsCountByType, setContractsCountByType] = useState([]);
	const [contractsCountByExpirationDate, setContractsCountByExpirationDate] = useState();

	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


	const GetDashboardData = async () => {
		setLocalLoading(true);

		try {
			const response = await axios.post('/api/dashboard');
			console.log(response);

			setUsersCount(response.data.users_count.value);

			setPracticesCount(response.data.practices_count.value);
			setPracticesCountByType(response.data.practices_count_by_type);
			setPracticeMaturity(response.data.practice_maturity);

			setSoftwaresCount(response.data.softwares_count.value);
			setSoftwaresTotalCost(response.data.softwares_total_cost.value);
			setSoftwaresByLocation(response.data.softwares_by_location);
			setSoftwaresLifecycle(response.data.softwares_lifecycle);

			setIntegrationsCount(response.data.integrations_count.value);
			setIntegrationsTotalCost(response.data.integrations_total_cost.value);
			setIntegrationsByType(response.data.integrations_by_type);

			setProjectsCount(response.data.projects_count.value);
			setProjectsCountByStatus(response.data.projects_count_by_status);
			setProjectsTotalCost(response.data.projects_total_cost.value);

			setContractsTotalCount(response.data.contracts_total_count.value);
			setContractsCountByType(response.data.contracts_count_by_type);
			setContractsCountByExpirationDate(response.data.contracts_count_by_expiration_date.value.length);

		}
		catch (err) {
			console.log('Something failed');
		}
		finally {
			setLocalLoading(false);
		}
	};
	const formatter = new Intl.NumberFormat('fi-FI', {
		style: 'currency',
		currency: 'EUR',
	});


	useEffect(() => {
		window.scroll(0, 0);
		GetDashboardData();
		setLocation('Kokonaiskuva');
	}, []);
	return (
		<Content>
			{/* {
				!localLoading ?
					<div>
						<CardInstructions
							title="Kaikki tietohallinnon datat yhdestä näkymästä"
							info="Kun olet lisännyt organisaatiollesi toimintoja, sovelluksia, integraatioita, sopimuksia ja kustannustietoja - Dashboard visualisoi kaikki tietohallinnon johtamisen kannalta kriittiset tiedot tänne"
						/>
						<ResponsiveMasonry
							columnsCountBreakPoints={{ 350: 1, 750: 1, 900: 1 }}
						>
							<Masonry>
								<CardData title="Käyttäjien lukumäärä" >
									<Value>{usersCount + ' kpl' || '-'} </Value>
								</CardData>
							</Masonry>
						</ResponsiveMasonry>
						<Divider />
						<ResponsiveMasonry
							columnsCountBreakPoints={{ 350: 1, 750: 1, 900: 3 }}
						>
							<Masonry>
								<CardData title="Toimintojen lukumäärä">
									<Value>{practicesCount + ' kpl' || '-'}</Value>
								</CardData>
								<CardData title="Toiminnot tyypeittäin">
									<PieChart width={400} height={400}>
										<Pie data={practicesCountByType} dataKey="value" nameKey="title" cx="50%" cy="50%" innerRadius={50} outerRadius={100} fill="#82ca9d"
											label={({
												cx,
												cy,
												midAngle,
												innerRadius,
												outerRadius,
												value,
												index
											}) => {
												const RADIAN = Math.PI / 180;
												// eslint-disable-next-line
												const radius = 25 + innerRadius + (outerRadius - innerRadius);
												// eslint-disable-next-line
												const x = cx + radius * Math.cos(-midAngle * RADIAN);
												// eslint-disable-next-line
												const y = cy + radius * Math.sin(-midAngle * RADIAN);

												return (
													<text
														x={x}
														y={y}
														fill="#8884d8"
														textAnchor={x > cx ? "start" : "end"}
														dominantBaseline="central"
													>
														{ value + "%"}
													</text>
												);
											}}
											labelLine>
											{practicesCountByType.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
											))}
										</Pie>
										<Legend layout="vertical" verticalAlign="top" height={36} />
									</PieChart>
								</CardData>
								<CardData title="Toimintojen maturiteetti">
									<ComposedChart
										layout="vertical"
										width={400}
										height={400}
										data={practiceMaturity}
										margin={{
											top: 20,
											right: 20,
											bottom: 20,
											left: 60,
										}}
									>
										<CartesianGrid stroke="#f5f5f5" />
										<XAxis type="number" unit="%" />
										<YAxis dataKey="title" type="category" scale="band" />
										<Tooltip />
										<Bar dataKey="value" barSize={20} fill="#0A22ff" />
									</ComposedChart>
								</CardData>
							</Masonry>
						</ResponsiveMasonry>
						<Divider />
						<ResponsiveMasonry
							columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 2 }}
						>
							<Masonry>
								<CardData title="Sovellusten vuosikustannukset (yht. 12kk)">
									<Value>{formatter.format(softwaresTotalCost * 12) || '-'}</Value>
								</CardData>
								<CardData title="Sovellusten lukumäärä">
									<Value>{softwaresCount+ ' kpl'  || '-'} </Value>
								</CardData>
								<CardData title="Sovellusten sijaintien jakauma">
									<ComposedChart
										layout="vertical"
										width={400}
										height={400}
										data={softwaresByLocation}
										margin={{
											top: 20,
											right: 20,
											bottom: 20,
											left: 60,
										}}
									>
										<CartesianGrid stroke="#f5f5f5" />
										<XAxis type="number" unit="%" />
										<YAxis dataKey="title" type="category" scale="band" />
										<Tooltip />
										<Bar dataKey="value" barSize={20} fill="#0A22ff" />
									</ComposedChart>
								</CardData>
								<CardData title="Sovellusten elinkaari">
									<ComposedChart
										layout="vertical"
										width={400}
										height={400}
										data={softwaresLifecycle}
										margin={{
											top: 20,
											right: 20,
											bottom: 20,
											left: 60,
										}}
									>
										<CartesianGrid stroke="#f5f5f5" />
										<XAxis type="number" unit="%" />
										<YAxis dataKey="title" type="category" scale="band" />
										<Tooltip />
										<Bar dataKey="value" barSize={20} fill="#0A22ff" />
									</ComposedChart>
								</CardData>
							</Masonry>
						</ResponsiveMasonry>
						<Divider />
						<ResponsiveMasonry
							columnsCountBreakPoints={{ 350: 1, 750: 1, 900: 3 }}
						>
							<Masonry>
								<CardData title="Projektien lukumäärä">
									<Value>{projectsCount + ' kpl'  || '-'} </Value>
								</CardData>
								<CardData title="Projektien kustannus yhteensä">
									<Value>{formatter.format(projectsTotalCost) || '-'}</Value>

								</CardData>
								<CardData title="Projektit statuksen mukaan">
									<ComposedChart
										layout="vertical"
										width={400}
										height={400}
										data={projectsCountByStatus}
										margin={{
											top: 20,
											right: 20,
											bottom: 20,
											left: 60,
										}}
									>
										<CartesianGrid stroke="#f5f5f5" />
										<XAxis type="number" unit="%" />
										<YAxis dataKey="title" type="category" scale="band" />
										<Tooltip />
										<Bar dataKey="value" barSize={20} fill="#0A22ff" />
									</ComposedChart>
								</CardData>
							</Masonry>
						</ResponsiveMasonry>
						<Divider />
						<ResponsiveMasonry
							columnsCountBreakPoints={{ 350: 1, 750: 1, 900: 2 }}
						>
							<Masonry>
								<CardData title="Integraatioiden lukumäärä">
									<Value>{integrationsCount + ' kpl' || '-'} </Value>
								</CardData>
								<CardData title="Integraatioiden kustannus yhteensä">
									<Value>{formatter.format(integrationsTotalCost) || '-'}  </Value>
								</CardData>
							</Masonry>
						</ResponsiveMasonry>
						<Divider />
						<ResponsiveMasonry
							columnsCountBreakPoints={{ 350: 1, 750: 1, 900: 3 }}
						>
							<Masonry>
								<CardData title="Sopimukset tyypin mukaan">
									<PieChart width={400} height={400}>
										<Pie data={contractsCountByType} dataKey="value" nameKey="title" cx="50%" cy="50%" innerRadius={70} outerRadius={120} fill="#82ca9d" label={({
												cx,
												cy,
												midAngle,
												innerRadius,
												outerRadius,
												value,
												index
											}) => {
												const RADIAN = Math.PI / 180;
												// eslint-disable-next-line
												const radius = 25 + innerRadius + (outerRadius - innerRadius);
												// eslint-disable-next-line
												const x = cx + radius * Math.cos(-midAngle * RADIAN);
												// eslint-disable-next-line
												const y = cy + radius * Math.sin(-midAngle * RADIAN);

												return (
													<text
														x={x}
														y={y}
														fill="#8884d8"
														textAnchor={x > cx ? "start" : "end"}
														dominantBaseline="central"
													>
														{ value + "%"}
													</text>
												);
											}}
											labelLine>
											{contractsCountByType && contractsCountByType.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
											))}
										</Pie>
										<Legend verticalAlign="bottom" align="left" height={36} />
									</PieChart>
								</CardData>
								<CardData title="Sopimusten lukumäärä">
									<Value>{contractsTotalCount + ' kpl'  || '-'} </Value>
								</CardData>
								<CardData title="Päättyvät sopimukset (kuluva vuosi)">
									<Value>{contractsCountByExpirationDate + ' kpl'  || '-'} </Value>
								</CardData>

							</Masonry>
						</ResponsiveMasonry>
					</div >

					:
					<Spinner />

			} */}
		</Content >
	);
};

export default Dashboard;