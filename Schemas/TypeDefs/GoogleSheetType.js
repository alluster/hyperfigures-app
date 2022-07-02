const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLID, GraphQLString, GraphQLFloat, GraphQLList } = require('graphql');


const GoogleSheetType = new GraphQLObjectType({
	name: 'GoogleSheet',
	fields: () => ({
		id: { type: GraphQLString },
		org_id: { type: GraphQLString },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		created_at: { type: GraphQLString },
		updated_at: { type: GraphQLString },
		deleted_at: { type: GraphQLString },
		spreadsheet_id: { type: GraphQLString },
		sheet_id: { type: GraphQLString }
	
	})
});


module.exports = GoogleSheetType;