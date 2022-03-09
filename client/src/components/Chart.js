
import React from 'react';
import styled from 'styled-components';
import Container from './Container';
import { device } from '../device';
import {
	ComposedChart,
	Line,
	Area,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
  } from 'recharts';

const data = [
	{
		name: 'Berlin',
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: 'Helsinki',
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: 'London',
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: 'Madrid',
		uv: 2780,
		pv: 3908,
		amt: 2000,
	}
];
const ChartContainer = styled.div`
	max-width: 60%;
`;

const Chart = ({

}) => {
	return (
        <ComposedChart
          width={300}
          height={200}
          data={data}
          margin={{
            top: 20,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <Tooltip />
          <Bar dataKey="uv" barSize={10} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
        </ComposedChart>

	)
}

export default Chart;