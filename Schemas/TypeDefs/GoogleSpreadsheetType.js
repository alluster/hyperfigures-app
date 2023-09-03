const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLID, GraphQLString, GraphQLFloat, GraphQLList } = require('graphql');


const GoogleSpreadsheetType = new GraphQLObjectType({
	name: 'GoogleSpreadsheetType',
	fields: () => ({
		sheet: { type: GraphQLString },
		org_id: { type: GraphQLString },
		spreadsheetId: { type: GraphQLString },
		sheetId: { type: GraphQLString },
	})
});


module.exports = GoogleSpreadsheetType;