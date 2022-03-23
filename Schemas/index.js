const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLList, GraphQLString, GraphQLFloat } = require('graphql');
const graphql = require('graphql');
const datapointData = require('../MOCK_DATAPOINTS.json');
const DatapointType = require('./TypeDefs/DatapointType');

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		getAllDatapoints: {
			type: new GraphQLList(DatapointType),
			args: { id: {type: GraphQLInt }},
			resolve(parent, args){
				return datapointData
			}
		},

	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		createDatapoint: {
			type: DatapointType,
			args: { 
				id: { type: GraphQLInt },
				title: { type: GraphQLString },
				description: { type: GraphQLString },
				value: { type: GraphQLFloat }
			},
			resolve(parent, args){
				datapointData.push({
					id: datapointData.length + 1, 
					title: args.title, 
					description: args.description, 
					value: args.value 
				})
				return args
			}
		}

	}
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
