const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = require('graphql');

const GoogleSpreadsheetDataSourceType = new GraphQLObjectType({
	name: 'GoogleSpreadsheetDataSource',
	fields: () => ({
		id: { type: GraphQLString },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		created_at: { type: GraphQLString },
		updated_at: { type: GraphQLString },
		deleted_at: { type: GraphQLString },
		service_account: { type: GraphQLString },
		creator: { type: GraphQLString }
	})
});

module.exports = GoogleSpreadsheetDataSourceType
