const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat } = require('graphql');

const DashboardType = new GraphQLObjectType({
	name: 'Dashboard',
	fields: () => ({
		id: { type: GraphQLInt },
		title: { type: GraphQLString },
		description: { type: GraphQLString }
	})
});


module.exports = DashboardType