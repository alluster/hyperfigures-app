import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { device } from '../device';
import Button from '../components/Button';
import Container from '../components/Container';
import Content from '../components/Content';
import { AppContext } from '../context/Context';
import axios from 'axios';

const Grid = styled.div`
	margin-top: ${props => props.theme.grid.divider_12};
	display: flex;
	flex-flow: row wrap;
	align-content: flex-start;
	row-gap: 48px;
	column-gap: 48px;
	width: 100%;
	
	@media ${device.laptop} {
	}
`;

const WelcomeTitle = styled.div`
	margin-top: ${props => props.theme.grid.divider_12};
	margin-bottom: ${props => props.theme.grid.divider_8};

	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	max-width: 700px;
	margin-left: auto;
	margin-right: auto;
	@media ${device.laptop} {
	}
`;
const Title = styled.h2`
	text-align: center;
	font-weight: bold;
	margin-bottom: ${props => props.theme.grid.divider_4};
`;
const Ingress = styled.h3`
	text-align: center;
	margin-bottom: ${props => props.theme.grid.divider_4};
`;


const DataPoints = () => {
	const {
		setLocation
	} = useContext(AppContext);
	const handleClick = () => {
		window.location = 'mailto:aleksanteri@helau.io';
	};

	
	const [formValue, setFormValue] = useState({
		cell: '',
	});
	const [data, setData] = useState('data');
	

	const handleSubmit = async () => {
		const resp =  await axios.post('/api', {

			params: {
				cell:  formValue.cell
			}
		});

		try {
			setData(resp);
		}
		catch (err) {
			console.log('fetching data error', err);
		}
		finally {
			console.log('data:', data);
		}


	};
	const handleChange = (event) => {
		setFormValue({
			...formValue,
			[event.target.name]: event.target.value
		});
	};
	useEffect(() => {
		window.scroll(0, 0);
		setLocation('Home');
	}, []);
	return (
		<Container>
			<Content>
				<h1>Hyperfigures:</h1>
				<form onSubmit={handleSubmit}>
					{/* <input
					type="text"
					name="private_key"
					placeholder="private_key"
					value={formValue.private_key}
					onChange={handleChange}
					required
				/> */}
					<input
						type="text"
						name="cell"
						placeholder="cell"
						value={formValue.cell}
						onChange={handleChange}

					/>
					{/* <input
					type="text"
					name="client_email"
					placeholder="client_email"
					value={formValue.client_email}
					onChange={handleChange}
					required
				/> */}
					{/* 
				<input
					type="text"
					name="sheet_ID"
					placeholder="sheet_ID"
					value={formValue.sheet_ID}
					onChange={handleChange}
					required
				/> */}


					<button type="submit" >Submit</button>
				</form>



			</Content>
		</Container>
	);
};

export default DataPoints;