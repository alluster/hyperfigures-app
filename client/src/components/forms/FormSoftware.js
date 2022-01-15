import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/Context';
import Button from '../Button';
import Select from '../Select';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import InputNumber from '../../components/InputNumber';

import 'react-datepicker/dist/react-datepicker.css';

const ButtonRow = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: ${props => props.theme.grid.divider_4};
`;


const ListToggler = styled(Button)`
	margin-top: ${props => props.theme.grid.divider_4};
	width: calc(100% - ${props => props.theme.grid.divider_6});

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

const FormSoftware = ({ title, open, practiceId, toggleOpen, preloadedValues, id }) => {
	const { 
		GetOrganizationSoftware, 
		GetOrganizationSoftwares, 
		organizationSoftware, 
		softwaresLocations, 
		suppliersList, 
		lifecycleList, 
		practicesList, 
		InsertOrganizationSoftware, 
		softwaresList,
		organizationPractices,
		GetOrganizationPractices
	} = useContext(AppContext);
	const [softwareFromList, setSoftwareFromList] = useState(true);
	const [supplierFromList, setSupplierFromList] = useState(true);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm();

	const onSubmit = (data) => {
		InsertOrganizationSoftware({
			id: id || null,
			info: data.softwareInfo,
			location: data.softwareLocation,
			owner: data.softwareMainUser,
			supplier: data.softwareSupplier,
			title: data.softwareName,
			cost: data.softwareCost,
			practice: data.softwarePractice,
			lifecycle: data.softwareLifecycle
			
		});
		toggleOpen(false);
		reset();
		GetOrganizationSoftware(id);
		GetOrganizationSoftwares();
	};
	useEffect(() => {
		GetOrganizationPractices();
		
	}, [organizationSoftware]);
	return (
		<div>
			<Wrapper panelOpen={open}>
				<Content>
					<Title>{title || 'Täytä kentät'}</Title>

					<form onSubmit={handleSubmit(onSubmit)}>
						{
							softwareFromList ?
								<div>
									<Select
										name="softwareName"
										label="Sovellus"
										placeholder=""
										register={register}
										required
										options={softwaresList}
									/>

									<ListToggler type="" small primary onClick={() => setSoftwareFromList(false)}>En löydä sovellusta listalta</ListToggler>
								</div>

								:
								<div>
									<Input
										label="Sovelluksen nimi"
										name="softwareName"
										register={register}
										required

									/>
									<ListToggler type="" white small onClick={() => setSoftwareFromList(true)}>Haluan etsiä sovelluksen listalta</ListToggler>
								</div>


						}
						{errors.softwareName && <p>Sovellus on pakollinen tieto.</p>}

						<Input
							label="Yleiskuva sovelluksesta"
							name="softwareInfo"
							register={register}
							required
						/>
						{errors.softwareInfo && <p>Sovelluksen yleiskuva on pakollinen tieto.</p>}
						<Select
							name="softwareLocation"
							label="Sijainti"
							placeholder=""
							register={register}
							// required
							options={softwaresLocations}
						/>
						{errors.softwareLocation && <p>Sovelluksen sijainti on pakollinen tieto.</p>}
						<InputNumber
							label="Sovelluksen kustannus €/kk"
							name="softwareCost"
							register={register}
						/>
						<Select
							name="softwarePractice"
							label="Toiminto johon sovellus liittyy"
							placeholder=""
							register={register}
							options={organizationPractices}
						/>
						{errors.softwareLocation && <p>Sovelluksen sijainti on pakollinen tieto.</p>}
						<Input
							label="Sovelluksen pääkäyttäjä"
							name="softwareMainUser"
							register={register}
							required

						/>
						{errors.softwareMainUser && <p>Sovelluksen pääkäyttäjä on pakollinen tieto.</p>}
						{
							supplierFromList ?
								<div>
									<Select
										name="softwareSupplier"
										label="Toimittaja"
										placeholder=""
										register={register}
										options={suppliersList}
									/>

									<ListToggler type="" small primary onClick={() => setSupplierFromList(false)}>En löydä toimittajaa listalta</ListToggler>
								</div>

								:
								<div>
									<Input
										label="Toimittaja"
										name="softwareSupplier"
										register={register}
										required

									/>
									<ListToggler type="" white small onClick={() => setSupplierFromList(true)}>Haluan etsiä toimittajan listalta</ListToggler>
								</div>


						}
						{errors.softwareSupplier && <p>Sovelluksen toimittaja on pakollinen tieto.</p>}
						<Select
							name="softwareLifecycle"
							label="Elinkaari"
							placeholder=""
							register={register}
							required
							options={lifecycleList}
						/>
						<ButtonRow>
							<Button primary dividerRight type="submit">Tallenna</Button>
							<Button type="reset" white onClick={() => {
								toggleOpen(!toggleOpen); 
								reset({
									softwareName: '',
									softwareInfo: '',
									softwareLocation: '',
									softwareMainUser: '',
									softwareSupplier: '',
									softwareCost: '',
									softwareLifecycle: '',
									softwarePractice: '',
								});
							}}>
								Peruuta
							</Button>
						</ButtonRow>
					</form>

				</Content>
			</Wrapper>
			<Overlay panelOpen={open} />
		</div>
	);
};

export default FormSoftware;