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

const TextWithLabel = ({
	title,
	label,
	small
}) => {

	return (
		<Wrapper>
			{
				small ?
					<div>
						<Label>{label || "-"}</Label>
						<h5>{title || "-"}</h5>
					</div>
					:
					<div>
						<Label>{label || "-"}</Label>
						<h4>{title || "-"}</h4>
					</div>
			}

		</Wrapper>
	);
};

export default TextWithLabel;