import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	margin-right: ${props => props.theme.grid.divider_4};
	margin-bottom: ${props => props.theme.grid.divider_1}

`;

const Label = styled.p`
	color: ${props => props.theme.colors.gray_80};
	font-size: 14px;
	font-weight: 400;
	// text-transform: uppercase;
	margin-bottom: ${props => props.theme.grid.divider_1}
`;
const Content = styled.div`


	${({ line }) => line && `
	padding-top: 16px;
	padding-bottom: 16px;
	padding-left: 32px;
	padding-right: 16px;
		background-color: ${props => props.theme.colors.white};
		border: solid 1px gray;
		border-radius: 8px;
	`}
`;

const TextWithLabel = ({
	title,
	label,
	description,
	line,
	small
}) => {

	return (
		<Wrapper >
			{
				small ?
					<Content line={line}>
						<Label>{label || ""}</Label>
						<h5>{title || ""}</h5>
						<p>{description || ""}</p>
					</Content>
					:
					<Content line={line}>
						<Label>{label || ""}</Label>
						<h4>{title || ""}</h4>
						<p>{description || ""}</p>

					</Content>
			}

		</Wrapper>
	);
};

export default TextWithLabel;