const graphql = require('graphql');
const { GraphQLObjectType, GraphQLFloat, GraphQLString } = require('graphql');

const GoogleSpreadsheetValueType = new GraphQLObjectType({
	name: 'GoogleSpreadsheetValueType',
	fields: () => ({
		value: { type: GraphQLString },
		cell: { type: GraphQLString },
		spreadsheetId: { type: GraphQLString },
		sheetId: { type: GraphQLString }

	})
});

module.exports = GoogleSpreadsheetValueType;
