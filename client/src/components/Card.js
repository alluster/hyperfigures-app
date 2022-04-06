import React from 'react';
import styled from 'styled-components';
import { device } from '../device';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
	padding-top: ${props => props.theme.grid.divider_4} ;
	padding-bottom: ${props => props.theme.grid.divider_4} ;
	padding-left: ${props => props.theme.grid.divider_4} ;
	padding-right: ${props => props.theme.grid.divider_4} ;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	background-color: ${props => props.theme.colors.white};
	border: solid 1px ${props => props.theme.colors.gray_110};
	border-radius: 8px;
	margin-right: ${props => props.theme.grid.divider_2} ;
	margin-bottom: ${props => props.theme.grid.divider_2} ;
	${({ row }) => row && `
		flex-direction: row;
	`};
	@media ${device.laptop} {
		margin-right: 0px;

	}
`;
const WrapperLink = styled(Link)`
	padding-top: ${props => props.theme.grid.divider_4} ;
	padding-bottom: ${props => props.theme.grid.divider_4} ;
	padding-left: ${props => props.theme.grid.divider_4} ;
	padding-right: ${props => props.theme.grid.divider_4} ;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	background-color: ${props => props.theme.colors.white};
	border: solid 1px ${props => props.theme.colors.gray_110};
	border-radius: 8px;
	margin-right: ${props => props.theme.grid.divider_2};
	margin-bottom: ${props => props.theme.grid.divider_2};
	${({ row }) => row && `
		flex-direction: row;
	`};
	@media ${device.laptop} {
		margin-right: 0px;
	}
`;
const Card = ({ children, to, row }) => {
	return (
		<div>
			{
				to ?

					<WrapperLink row={row} to={to || ""}>
						{children}
					</WrapperLink>
					:
					<Wrapper row={row}>
						{children}
					</Wrapper>
			}

		</div>

	);
};

export default Card;