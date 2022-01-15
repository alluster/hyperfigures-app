import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/Context';
import Button from '../Button';
import Select from '../Select';
import { Controller, useForm } from 'react-hook-form';
import Input from '../../components/Input';
import InputNumber from '../../components/InputNumber';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ButtonRow = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: ${props => props.theme.grid.divider_4};
`;

const DateInput = styled.input`
	height: 56px;
	width: 100%;
	border: 1px solid ${props => props.theme.colors.gray_80};
	border-radius: 4px;
	font-size: 18px;
	color: ${props => props.theme.colors.fontDark};
	padding-left: ${props => props.theme.grid.divider_2};
	line-height: 40px;
	background-color: #ffffff;

`;

const Label = styled.label`
	font-size: 16px;
	font-weight: bold;
	margin-bottom: ${props => props.theme.grid.divider_2};
	display: inline-block;
	margin-top: ${props => props.theme.grid.divider_4};

`;
const Wrapper = styled.div`
	z-index: 1000000000;
	position: fixed;
	height: 100%;
	background-color: ${props => props.theme.colors.gray_30};
	visibility: hidden;
	top: 0px;
	right: 0px;
	overflow-y: auto;
	min-width: 600px;
	max-width: 600px;
	border-left: 1px solid ${props => props.theme.colors.gray_30};
	${({ panelOpen }) => panelOpen && `
		visibility: visible;
		-webkit-transition: right 0.8s ease-in-out;
		-moz-transition: right 0.8s ease-in-out;
		-o-transition: right 0.8s ease-in-out;
		transition: right 0.8s ease-in-out;
	`}
`;

const Content = styled.div`
	margin: ${props => props.theme.grid.divider_8};

`;

const Overlay = styled.div`
	z-index: 1000000;
	position: fixed;
	min-height: 100%;
	background: rgba(0, 0, 0, 0.5);
	top: 0px;
	left: 0px;
	visibility: hidden;
	width: 100%;
	${({ panelOpen }) => panelOpen && `
		visibility: visible;
		-webkit-transition: right 0.8s ease-in-out;
		-moz-transition: right 0.8s ease-in-out;
		-o-transition: right 0.8s ease-in-out;
		transition: right 0.8s ease-in-out;
	`}
`;

const Title = styled.h4`
	margin-bottom: ${props => props.theme.grid.divider_4};
`;

const FormProject = ({ title, open, practiceId, toggleOpen }) => {
	const {
		InsertOrganizationProject,
		GetOrganizationProjects,
		GetOrganizationPractices,
		GetProjectStatusList,
		projectStatusList,
		categoriesList,
		organizationPractices
	} = useContext(AppContext);


	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const convertDate = (str) => {
		var date = new Date(str),
			mnth = ('0' + (date.getMonth() + 1)).slice(-2),
			day = ('0' + date.getDate()).slice(-2);
		return [date.getFullYear(), mnth, day].join('-');
	};


	const onSubmit = (data) => {
		InsertOrganizationProject({
			title: data.projectTitle,
			start_date: convertDate(data.startDateInput),
			end_date: convertDate(data.endDateInput),
			status: data.projectStatus,
			practice_id: data.projectPractice,
			owner: data.projectOwner,
			category: data.projectCategory,
			cost: data.projectCost,
			info: data.projectInfo
		});
		GetOrganizationProjects();
		toggleOpen(false);
		reset();
	};
	useEffect(() => {
	}, []);
	return (
		<div>
			<Wrapper panelOpen={open}>
				<Content>
					<Title>{title || 'Täytä kentät'}</Title>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							label="Projektin nimi"
							name="projectTitle"
							register={register}
							required

						/>
						{errors.projectTitle && <p>Projektin nimi on pakollinen tieto.</p>}
						<Label>
							Valitse projktille alkamispäivä
						</Label>
						<Controller
							control={control}
							name='startDateInput'
							render={({ field }) => (
								<DatePicker
									dateFormat="yyyy/MM/dd"
									placeholderText='Valitse päivä'
									onChange={(date) => field.onChange(date)}
									selected={field.value}
									customInput={<DateInput />}
									required
								/>
							)}
						/>
						{errors.projectTitle && <p>Projektin alkamispäivä on pakollinen tieto.</p>}

						<Label>
							Valitse projktille päättymispäivä
						</Label>
						<Controller
							control={control}
							name='endDateInput'
							render={({ field }) => (
								<DatePicker
									placeholderText='Valitse päivä'
									onChange={(date) => field.onChange(date)}
									selected={field.value}
									customInput={<DateInput />}

								/>
							)}
						/>
						{errors.projectTitle && <p>Projektin päättymispäivä on pakollinen tieto.</p>}

						<Input
							label="Projektin vastuuhenkilö"
							name="projectOwner"
							register={register}
							required

						/>
						{errors.projectTitle && <p>Projektin vastuuhenkilö on pakollinen tieto.</p>}
						<Select
							name="projectStatus"
							label="Projektin tila"
							placeholder=""
							register={register}
							// required
							options={projectStatusList}
						/>
						<Select
							name="projectCategory"
							label="Kategoria"
							placeholder=""
							register={register}
							options={categoriesList}
						/>
						<InputNumber
							label="Projektin kokonaiskustannus / €"
							name="projectCost"
							register={register}
						/>
						<Select
							name="projectPractice"
							label="Toiminto johon projekti liittyy"
							placeholder=""
							register={register}
							options={organizationPractices}
						/>
						{errors.projectPractice && <p>Projektin tulee liittyä johonkin toimintoon.</p>}
						<Input
							label="Lisätiedot"
							name="projectInfo"
							register={register}
						/>
						<ButtonRow>
							<Button primary dividerRight type="submit">Tallenna</Button>
							<Button type="reset" white onClick={() => toggleOpen(!toggleOpen)}>Peruuta</Button>
						</ButtonRow>
					</form>
				</Content>
			</Wrapper>
			<Overlay panelOpen={open} />
		</div>
	);
};

export default FormProject;