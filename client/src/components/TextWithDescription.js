import React from 'react';
import styled from 'styled-components';
import { device } from '../device';


const Wrapper = styled.div`
`;
const Title = styled.h4`


`;
const Description = styled.p`
	color: ${props => props.theme.colors.gray_80};
	margin-bottom: ${props => props.theme.grid.divider_2};
	@media ${device.laptop} {
	}
`;





const TextWithDescription = ({ description, title, reverse }) => {

	return (
		<Wrapper>

			{
				reverse ?
					<div>
						{
							title &&
							<Title>
								{title}
							</Title>
						}
						{
							description &&
							<Description>
								{description}
							</Description>
						}

					</div>
					:
					<div >
						{
							description &&
							<Description>
								{description}
							</Description>
						}
						{
							title &&
							<Title>
								{title}
							</Title>
						}
					</div>

			}
		</Wrapper>


	);
};

export default TextWithDescription;