import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/Context';
import Button from '../Button';
import Select from '../Select';
import { Controller, useForm } from 'react-hook-form';
import Input from '../../components/Input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

const ButtonRow = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: ${props => props.theme.grid.divider_4};
`;
const Note = styled(Link)`
	font-size: 12px;
	color: ${props => props.theme.colors.primary_100};
	&:hover{
		cursor: pointer;
	}
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

const ListToggler = styled(Button)`
	margin-top: ${props => props.theme.grid.divider_4};
	width: calc(100% - ${props => props.theme.grid.divider_6});
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

const FormContract = ({ title, open, toggleOpen }) => {
	const context = useContext(AppContext);
	const schema = yup.object().notRequired().shape({
		file: yup

			.mixed()
			.test('type', 'Tiedoston tulisi olla PDF', (value) => {
				return value && value[0].type === 'application/pdf';
			})
			.test('fileSize', 'Tiedoston maksimikoko on 50 mt', (value) => {
				return value && value[0].size <= 50000000;
			})
	});

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

	const onSubmit = async (data) => {
		context.InsertOrganizationContract({
			title: data.contractName,
			contract_type: data.contractType,
			contract_terms: data.contractTerm,
			info: data.contractInfo,
			start_date: convertDate(data.contractStartDate),
			end_date: convertDate(data.contractEndDate),
			supplier: data.contractSupplier,
			software: data.contractSoftware,
			project: data.contractProject,
			owner: data.contractOwner
		}),
		toggleOpen(false);
		reset();
	};

	useEffect(() => {
		context.GetOrganizationProjects();
	}, []);

	return (
		<div>
			<Wrapper panelOpen={open}>
				<Content>
					<Title>{title || 'Täytä kentät'}</Title>
					<form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
						<Input
							label="Sopimuksen nimi"
							name="contractName"
							register={register}
							required

						/>
						{errors.contractName && <p>Sopimuksen nimi on pakollinen tieto.</p>}
						<Input
							label="Sopimuksen lisätiedot"
							name="contractInfo"
							register={register}

						/>
						<Input
							label="Sopimuksen vastuuhenkilö"
							name="contractOwner"
							register={register}
						/>
						<Select
							name="contractSupplier"
							label="Toimittaja"
							placeholder=""
							register={register}
							options={context.suppliersList}
						/>
						<Select
							name="contractType"
							label="Sopimuksen tyyppi"
							placeholder=""
							register={register}
							options={context.contractTypes}
						/>
						<Select
							name="contractTerm"
							label="Sopimuksen ehto"
							placeholder=""
							register={register}
							options={context.contractTerms}
						/>
						<Select
							name="contractSoftware"
							label="Sovellus jolle sopimus liittyy"
							placeholder=""
							register={register}
							options={context.organizationSoftwares}
						/>
						<Select
							name="contractProject"
							label="Projekti johon sopimus liittyy"
							placeholder=""
							register={register}
							options={context.organizationProjects}
						/>
						<Label>
							Alkamispäivä
						</Label>
						<Controller
							control={control}
							name='contractStartDate'
							render={({ field }) => (
								<DatePicker
									dateFormat="yyyy/MM/dd"
									placeholderText='Valitse päivä'
									onChange={(date) => field.onChange(date)}
									selected={field.value}
									customInput={<DateInput />}
								/>
							)}
						/>
						<Label>
							Päättymispäivä
						</Label>
						<Controller
							control={control}
							name='contractEndDate'
							render={({ field }) => (
								<DatePicker
									dateFormat="yyyy/MM/dd"
									placeholderText='Valitse päivä'
									onChange={(date) => field.onChange(date)}
									selected={field.value}
									customInput={<DateInput />}
								/>
							)}
						/>

						<ButtonRow>
							<Button primary dividerRight type="submit">Tallenna</Button>
							<Button type="reset" white onClick={() => { toggleOpen(!toggleOpen); reset(); }}>Peruuta</Button>
						</ButtonRow>
					</form>
				</Content>
			</Wrapper>
			<Overlay panelOpen={open} />
		</div>
	);
};

export default FormContract;