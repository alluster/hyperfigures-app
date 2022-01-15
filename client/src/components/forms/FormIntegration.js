import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/Context';
import Button from '../Button';
import Select from '../Select';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import 'react-datepicker/dist/react-datepicker.css';
import InputNumber from '../../components/InputNumber';

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

const FormIntegration = ({ title, open, toggleOpen }) => {
	const context = useContext(AppContext);
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		context.InsertIntegration({
			start_software: data.integrationStartSoftware,
			end_software: data.integrationEndSoftware,
			title: data.integrationTitle,
			supplier: data.integrationSupplier,
			lifecycle: data.integrationLifecycle,
			info: data.integrationInfo,
			cost: data.integrationCost
		}),
		toggleOpen(false);
		reset();
	};


	return (
		<div>
			<Wrapper panelOpen={open}>
				<Content>
					<Title>{title || 'Täytä kentät'}</Title>
					<form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
						
						<Input
							label="Integraation nimi"
							name="integrationTitle"
							register={register}
							required

						/>
						{errors.integrationTitle && <p>Integraation nimi on pakollinen tieto.</p>}
						
						<Input
							label="Integraation yleiskuvaus"
							name="integrationInfo"
							register={register}
						/>
						
						<Select
							name="integrationStartSoftware"
							label="Lähtösovellus"
							placeholder=""
							register={register}
							options={context.organizationSoftwares}
						/>
						{errors.integrationStartSoftware && <p>Lähtösovellus on pakollinen tieto.</p>}
						<Select
							name="integrationEndSoftware"
							label="Kohdesovellus"
							placeholder=""
							register={register}
							required
							options={context.organizationSoftwares}
						/>
						{errors.integrationEndSoftware && <p>Kohdesovellus on pakollinen tieto.</p>}
						<InputNumber
							label="Integraation kokonaiskustannus / €"
							name="integrationCost"
							register={register}
						/>
						<Select
							name="integrationSupplier"
							label="Integraation toimittaja"
							placeholder=""
							register={register}
							options={context.suppliersList}
						/>
						
						
						
						<Select
							name="integrationLifecycle"
							label="Integraation elinkaari"
							placeholder=""
							register={register}
							options={context.lifecycleList}
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

export default FormIntegration;