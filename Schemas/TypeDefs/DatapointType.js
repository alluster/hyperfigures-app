const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat } = require('graphql');

const DataPointType = new GraphQLObjectType({
	name: 'DataPoint',
	fields: () => ({
		id: { type: GraphQLInt },
		title: { type: GraphQLString },
		value: { type: GraphQLFloat },
		description: { type: GraphQLString }
	})
});


module.exports = DataPointType;