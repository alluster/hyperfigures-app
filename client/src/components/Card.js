import React from 'react';
import styled from 'styled-components';
import { device } from '../device';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
	padding-top: ${props => props.theme.grid.divider_2} ;
	padding-bottom: ${props => props.theme.grid.divider_2} ;
	padding-left: ${props => props.theme.grid.divider_4} ;
	padding-right: ${props => props.theme.grid.divider_4} ;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	background-color: ${props => props.theme.colors.white};
	border: solid 1px ${props => props.theme.colors.gray_100};
	border-radius: 8px;
	margin-right: ${props => props.theme.grid.divider_2} ;
	margin-bottom: ${props => props.theme.grid.divider_2} ;
	@media ${device.laptop} {
	}
`;
const WrapperLink = styled(Link)`
	padding-top: ${props => props.theme.grid.divider_2} ;
	padding-bottom: ${props => props.theme.grid.divider_2} ;
	padding-left: ${props => props.theme.grid.divider_4} ;
	padding-right: ${props => props.theme.grid.divider_4} ;
	display: flex;
	flex-wrap: wrap;

	flex-direction: row;
	background-color: ${props => props.theme.colors.white};
	border: solid 1px ${props => props.theme.colors.gray_100};
	border-radius: 8px;
	margin-right: ${props => props.theme.grid.divider_2};
	margin-bottom: ${props => props.theme.grid.divider_2} ;
	@media ${device.laptop} {
	}
`;
const Card = ({ children, to }) => {
	return (
		<div>
			{
				to ?

					<WrapperLink to={to || ""}>
						{children}
					</WrapperLink>
					:
					<Wrapper>
						{children}
					</Wrapper>
			}

		</div>

	);
};

export default Card;