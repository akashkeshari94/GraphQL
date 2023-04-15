const graphql = require('graphql');
const _= require('lodash');

const {GraphQLObjectType, GraphQLString,GraphQLSchema, GraphQLID} = graphql;

var books=[
    {name: 'Annhilation of caste', genre:'Essay', id:'1'},
    {name: 'Miracle Morning', genre:'Self-help', id:'2'},
    {name: '2 States', genre:'Romantice', id:'3'},
];
const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() => ({
        id:{type: GraphQLID},
        name:{type : GraphQLString},
        genre:{type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields :{
        book:{
            type:BookType,
            args :{ id :{type: GraphQLID}},
            resolve(parent, args){
                //code to get data from db/ other source
                //current i am using dummy data from array defined above as var books for this purpose but we can code to fetch data from db too
                return _.find(books,{id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery
});