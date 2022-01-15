import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import { device } from '../device';


const Wrapper = styled.div`
	margin-top: ${props => props.theme.grid.divider_2};
	margin-right: ${props => props.theme.grid.divider_2};
	display: flex;
	flex-direction: column;
	position: relative;
	width: auto;
	background-color: ${props => props.theme.colors.white};
	border: 1px solid ${props => props.theme.colors.gray_40};
	border-radius: 8px;
	padding: ${props => props.theme.grid.divider_4};	
	box-shadow:  8px 3px 5px -8px rgb(0 0 0 / 8%);
	white-space: nowrap;
	
	@media ${device.laptop} {
	}
`;

const CardTitle = styled.h5`
	font-weight: bold;
	margin-bottom: ${props => props.theme.grid.divider_4};
`;
const CardContent = styled.div`
	display: flex;
	flex-direction: row wrap;
	flex-wrap: wrap;
	column-gap: ${props => props.theme.grid.divider_4};
`;




const CardData = ({
	title,
	to,
	children
}) => {

	const context = useContext(AppContext);






	return (


		<Wrapper >

			<CardTitle>{title || 'Otsikko'}</CardTitle>
			<CardContent>
				{children}
			</CardContent>

		</Wrapper>

	);
};

export default CardData;