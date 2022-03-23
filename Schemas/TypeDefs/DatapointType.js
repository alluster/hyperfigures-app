const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat } = require('graphql');

const DatapointType = new GraphQLObjectType({
	name: 'Datapoint',
	fields: () => ({
		id: { type: GraphQLInt },
		title: { type: GraphQLString },
		value: { type: GraphQLFloat },
		description: { type: GraphQLString }
	})
});


module.exports = DatapointType