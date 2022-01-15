import React, { useState, useEffect } from 'react';
import { AppContext } from './Context';
import PropTypes from 'prop-types';
import axios from 'axios';

const Provider = ({ children }) => {
	const [location, setLocation] = useState('');
	const [loading, setLoading] = useState(false);
	const [notifyMessage, setNotifyMessage] = useState('');
	const [user, setUser] = useState([]);
	const [toggleComments, setToggleComments] = useState(true);
	const [toggleTasks, setToggleTasks] = useState(true);
	const [dashboardData, setDashboardData] = useState([]);
	
	const [articles, setArticles] = useState([]);

	const [organizationIntegrations, setOrganizationIntegrations] = useState([]);
	const [organizationIntegration, setOrganizationIntegration] = useState([]);

	const [organizationSoftwares, setOrganizationSoftwares] = useState([]);
	const [organizationSoftware, setOrganizationSoftware] = useState([]);

	const [files, setFiles] = useState([]);

	const [notes, setNotes] = useState([]);

	const [contractTerms, setContractTerms] = useState([]);
	const [contractTypes, setContractTypes] = useState([]);

	const [practicesList, setPracticesList] = useState([]);

	const [organizationContracts, setOrganizationContracts] = useState([]);
	const [organizationContract, setOrganizationContract] = useState([]);

	const [categoriesList, setCategoriesList] = useState([]);
	const [suppliersList, setSuppliersList] = useState([]);
	const [organizationSuppliers, setOrganizationSuppliers] = useState([]);

	const [organizationPractices, setOrganizationPractices] = useState([]);
	const [organizationPractice, setOrganizationPractice] = useState([]);

	const [organizationProjects, setOrganizationProjects] = useState([]);
	const [organizationProject, setOrganizationProject] = useState([]);

	const [practiceProjects, setPracticeProjects] = useState([]);

	const [projectTasks, setProjectTasks] = useState([]);

	const [softwaresList, setSoftwaresList] = useState([]);

	const [practiceCategories, setPracticeCategories] = useState([]);
	const [softwaresLocations, setSoftwaresLocations] = useState([]);
	const [lifecycleList, setLifecycleList] = useState([]);
	const [maturityList, setMaturityList] = useState([]);
	const [projectStatusList, setProjectStatusList] = useState([]);

	// Delete functions 
	
	const DeleteFile = async ({ id, ref_table, ref_id }) => {
		setLoading(true);
		try {
			await axios.post('/api/deleteFile', { id: id });
			GetFiles({ ref_table: ref_table, ref_id: ref_id });
			setNotifyMessage('Tiedosto poistettu!');
		}
		catch (err) {
			console.log(err);
			setNotifyMessage('Ikävä kyllä jokin meni pieleen!');
		}
		finally {
			setLoading(false);
		}
	};
	const DeleteOrganizationSoftware = async (id) => {
		setLoading(true);
		try {
			await axios.post('/api/deleteSoftware', { id: id });
			setNotifyMessage('Sovellus poistettu!');
		}
		catch (err) {
			console.log(err);
			setNotifyMessage('Ikävä kyllä jokin meni pieleen!');
		}
		finally {
			setLoading(false);
		}
	};
	const DeleteOrganizationPractice = async (id) => {
		setLoading(true);
		try {
			await axios.post('/api/deletePractice', { id: id });
			setNotifyMessage('Toiminto poistettu!');
		}
		catch (err) {
			console.log(err);
			setNotifyMessage('Ikävä kyllä jokin meni pieleen!');
		}
		finally {
			setLoading(false);
		}
	};
	const DeleteOrganizationProject = async (id) => {
		setLoading(true);
		try {
			await axios.post('/api/deleteProject', { id: id });
			setNotifyMessage('Projekti poistettu!');
		}
		catch (err) {
			console.log(err);
			setNotifyMessage('Ikävä kyllä jokin meni pieleen!');
		}
		finally {
			setLoading(false);
		}
	};
	const DeleteProjectTask = async ({ id, project_id }) => {
		setLoading(true);
		try {
			await axios.post('/api/deleteTask', { id: id });
			GetProjectTasks(project_id);
			setNotifyMessage('Tehtävä poistettu!');
		}
		catch (err) {
			console.log(err);
			setNotifyMessage('Ikävä kyllä jokin meni pieleen!');
		}
		finally {
			setLoading(false);
		}
	};
	const DeleteIntegration = async (id) => {
		setLoading(true);
		try {
			await axios.post('/api/deleteIntegration', { id: id });
			GetOrganizationIntegrations();
			setNotifyMessage('Integraatio poistettu!');
		}
		catch (err) {
			console.log(err);
			setNotifyMessage('Ikävä kyllä jokin meni pieleen!');
		}
		finally {
			setLoading(false);
		}
	};
	const DeleteOrganizationContract = async (id) => {
		setLoading(true);
		try {
			await axios.post('/api/deleteContract', { id: id });
			GetOrganizationContracts();
			setNotifyMessage('Sopimus poistettu!');
		}
		catch (err) {
			console.log(err);
			setNotifyMessage('Ikävä kyllä jokin meni pieleen!');
		}
		finally {
			setLoading(false);
		}
	};


	// Insert functions:

	const InsertIntegration = async ({
		start_software,
		end_software,
		title,
		info,
		lifecycle,
		supplier,
		id,
		cost
	}) => {
		setLoading(true);
		try {
			await axios.post('/api/insertIntegration', {
				start_software: start_software,
				end_software: end_software,
				title: title,
				info: info,
				lifecycle: lifecycle,
				supplier: supplier,
				id: id,
				cost: cost
			});
			GetOrganizationIntegration(id);
			GetOrganizationIntegrations();
			setNotifyMessage('Integraatio tallennettu!');
		}
		catch (err) {
			console.log(err);
			setNotifyMessage('Ikävä kyllä jokin meni pieleen!');
		}
		finally {
			setLoading(false);
		}
	};


	const InsertOrganizationSoftware = async ({
		supplier,
		owner,
		lifecycle,
		location,
		info,
		title,
		id,
		cost,
		practice
	}) => {
		setLoading(true);
		try {
			await axios.post('/api/insertSoftware', {
				title: title,
				supplier: supplier,
				owner: owner,
				lifecycle: lifecycle,
				location: location,
				info: info,
				id: id,
				cost: cost,
				practice: practice
			});
			GetOrganizationSoftwares();
			setNotifyMessage('Sovellus tallennettu!');
		}
		catch (err) {
			console.log(err);
			setNotifyMessage('Ikävä kyllä jokin meni pieleen!');
		}
		finally {
			setLoading(false);
		}

	};

	const InsertOrganizationContract = async ({
		title,
		contract_type,
		contract_terms,
		info,
		start_date,
		end_date,
		supplier,
		software,
		project,
		owner
	}) => {
		setLoading(true);
		try {
			await axios.post('/api/insertContract', {
				title: title,
				contract_type: contract_type,
				contract_terms: contract_terms,
				info: info,
				start_date: start_date,
				end_date: end_date,
				supplier: supplier,
				software: software,
				project: project,
				owner: owner
			});
			GetOrganizationContracts();
			setNotifyMessage('Sopimus tallennettu!');
		}
		catch (err) {
			console.log(err);
			setNotifyMessage('Ikävä kyllä jokin meni pieleen!');
		}
		finally {
			setLoading(false);
		}
	};
	const InsertNote = async ({
		ref_table,
		ref_id,
		comment

	}) => {
		setLoading(true);
		try {
			axios.post('/api/insertNote', {
				ref_table: ref_table,
				ref_id: ref_id,
				info: comment

			});
			GetNotes({ ref_id: ref_id, ref_table: ref_table });
			setNotifyMessage('Uusi viesti lisätty!');
		}
		catch (err) {
			console.log(err);
			setNotifyMessage('Ikävä kyllä jokin meni pieleen!');
		}
		finally {
			setLoading(false);
		}
	};
	const InsertOrganizationPractice = async ({
		title,
		owner,
		category,
		info,
		maturity,
		id
	}) => {
		setLoading(true);
		try {
			await axios.post('/api/insertPractice', {
				owner: owner,
				title: title,
				category: category,
				info: info,
				maturity: maturity,
				id: id
			});
			
			setNotifyMessage('Toiminto tallennettu!');
		}
		catch (err) {
			console.log(err);
			setNotifyMessage('Ikävä kyllä jokin meni pieleen!');
		}
		finally {
			GetOrganizationPractices();
			GetOrganizationPractice(id);
			setLoading(false);
		}
	};
	const InsertProjectTask = async ({
		id,
		project_id,
		title,
		status
	}) => {
		setLoading(true);
		try {
			axios.post('/api/insertTask', {
				id: id,
				projectID: project_id,
				title: title,
				status: status
			});
			GetProjectTasks(project_id);
			setNotifyMessage('Tehtävä tallennettu!');
		}
		catch (err) {
			console.log(err);
			setNotifyMessage('Ikävä kyllä jokin meni pieleen!');
		}
		finally {
			setLoading(false);
		}
	};
	const InsertOrganizationProject = async ({
		practice_id,
		title,
		start_date,
		end_date,
		status,
		category,
		info,
		owner,
		cost,
		id

	}) => {
		setLoading(true);
		try {
			await axios.post('/api/insertProject', {
				practice: practice_id,
				title: title,
				status: status,
				info: info,
				start_date: start_date,
				end_date: end_date,
				category: category,
				owner: owner,
				cost: cost,
				id: id || null
			});
			GetOrganizationProjects();
			setNotifyMessage('Projekti tallennettu!');
		}
		catch (err) {
			console.log(err);
			setNotifyMessage('Ikävä kyllä jokin meni pieleen!');
		}
		finally {
			setLoading(false);
		}
	};

	// Get functions

	const GetFiles = async ({ ref_id, ref_table }) => {
		setLoading(true);
		try{
			const response = await axios.post('/api/getFiles', {
				ref_table: ref_table, 
				ref_id: ref_id
			});
			setFiles(response.data.data);	
		}
		catch (err) {
			console.log('Fetching files failed:', err);
		}
		finally{
			setLoading(false);
		}
	};

	const GetOrganizationIntegration = async (id) => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getIntegrations', { id: id });
			setOrganizationIntegration(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetOrganizationIntegrations = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getIntegrations');
			setOrganizationIntegrations(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetOrganizationSuppliers = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getSuppliers');
			setOrganizationSuppliers(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetOrganizationProject = async (id) => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getProjects', { id: id });
			setOrganizationProject(response.data.data);

		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetOrganizationProjects = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getProjects');
			setOrganizationProjects(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetPracticeProjects = async (id) => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getProjects', { practice: id });
			setPracticeProjects(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetProjectTasks = async (id) => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getTasks', { projectID: id });
			setProjectTasks(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetOrganizationPractice = async (id) => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getPractices', { id: id });
			setOrganizationPractice(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetArticles = async () => {
		try {
			const response = await axios.post('/api/getArticles');
			setArticles(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetOrganizationPractices = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getPractices');
			setOrganizationPractices(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetOrganizationSoftwares = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getSoftwares');
			setOrganizationSoftwares(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetOrganizationSoftware = async (id) => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getSoftwares', {
				id: id
			});
			setOrganizationSoftware(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetOrganizationContracts = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getContracts');
			setOrganizationContracts(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetOrganizationContract = async (id) => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getContracts', {
				id: id
			});
			setOrganizationContract(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	
	const GetNotes = async ({
		ref_table,
		ref_id
	}) => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getNotes', {
				table: ref_table,
				ref_id: ref_id
			});
			setNotes(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};

	// Get lists 

	const GetContractTerms = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getContractTerms');
			setContractTerms(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetContractTypes = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getContractTypes');
			setContractTypes(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetPracticesList = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getPracticesList');
			setPracticesList(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetPracticeCategories = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getPracticeCategories');
			setPracticeCategories(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetSuppliersList = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getSuppliersList');
			setSuppliersList(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetSoftwaresList = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getSoftwaresList');
			setSoftwaresList(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetSoftwaresLocationsList = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getSoftwareLocationsList');
			setSoftwaresLocations(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetCategoriesList = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getCategoriesList');
			setCategoriesList(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetLifecycleList = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getLifecycleList');
			setLifecycleList(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetMaturityList = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getMaturityList');
			setMaturityList(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetProjectStatusList = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getProjectStatusList');
			setProjectStatusList(response.data.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	const GetUser = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getUser');
			setUser(response.data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		GetUser();
		GetLifecycleList();
		GetMaturityList();
		GetCategoriesList();
		GetSoftwaresLocationsList();
		GetSoftwaresList();
		GetSuppliersList();
		GetPracticesList();
		GetPracticeCategories();
		GetContractTerms();
		GetContractTypes();
		GetProjectStatusList();
	}, []);
	return (
		<AppContext.Provider
			value={{
				location,
				setLocation,
				loading,
				setLoading,
				categoriesList,
				GetArticles,
				articles,
				notifyMessage,
				setNotifyMessage,
				user,
				toggleComments,
				setToggleComments,
				toggleTasks,
				setToggleTasks,
				lifecycleList,
				maturityList,

				InsertIntegration,
				DeleteIntegration,
				GetOrganizationIntegrations,
				GetOrganizationIntegration,
				organizationIntegration,
				organizationIntegrations,

				InsertOrganizationSoftware,
				GetOrganizationSoftwares,
				DeleteOrganizationSoftware,
				GetOrganizationSoftware,
				organizationSoftwares,
				organizationSoftware,
				softwaresList,
				softwaresLocations,



				GetPracticesList,
				GetOrganizationPractices,
				InsertOrganizationPractice,
				DeleteOrganizationPractice,
				GetOrganizationPractice,
				organizationPractice,
				practicesList,
				organizationPractices,
				practiceCategories,
				organizationSuppliers,
				suppliersList,

				InsertOrganizationProject,
				GetPracticeProjects,
				DeleteOrganizationProject,
				GetOrganizationProjects,
				GetOrganizationProject,
				GetProjectStatusList,
				projectStatusList,
				organizationProject,
				practiceProjects,
				organizationProjects,

				GetFiles,
				DeleteFile,
				files,

				GetProjectTasks,
				InsertProjectTask,
				DeleteProjectTask,
				projectTasks,
				
				GetOrganizationSuppliers,
				organizationSuppliers,


				GetOrganizationContract,
				GetOrganizationContracts,
				InsertOrganizationContract,
				DeleteOrganizationContract,
				contractTerms,
				contractTypes,
				organizationContracts,
				organizationContract,

				dashboardData,

				InsertNote,
				GetNotes,
				notes

			}}
		>
			{children}
		</AppContext.Provider>
	);
};

Provider.propTypes = {
	children: PropTypes.any
};

export default Provider;