const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat } = require('graphql');

const DashboardType = new GraphQLObjectType({
	name: 'Dashboard',
	fields: () => ({
		id: { type: GraphQLInt },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		created_at: { type: GraphQLString },
		updated_at: { type: GraphQLString },
		deleted_at: { type: GraphQLString }
	})
});


module.exports = DashboardType