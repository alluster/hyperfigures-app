import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import { device } from '../device';
import Button from '../components/Button';
import Content from '../components/Content';

const Wrapper = styled.div`
	@media ${device.laptop} {
	}
`;

const Profile = () => {
	const context = useContext(AppContext);
	useEffect(() => {
		window.scroll(0, 0);
		context.setLocation('Profiili');

	}, []);
	return (
		<Wrapper>
			<Content>
				{
					context.user.success == true ?
						<div>
							<p>{context.user.data} </p>
							<a href="/logout">
								<Button
									primary
									type=""
									
								>
									Kirjaudu ulos palvelusta
								</Button>
							</a>
						</div>

						:

						<a href="/login">
							<Button
								primary
								type=""
							>
								Kirjaudu palveluun
							</Button>
						</a>


				}

			</Content>

		</Wrapper>
	);
};

export default Profile;