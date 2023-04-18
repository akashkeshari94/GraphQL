const graphql = require('graphql');
const _= require('lodash');

const {GraphQLObjectType, GraphQLString,GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

var books=[
    {name: 'Annhilation of caste', genre:'Essay', id:'1', authorId:'1'},
    {name: 'Miracle Morning', genre:'Self-help', id:'2', authorId:'2'},
    {name: '2 States', genre:'Romantice', id:'3', authorId:'3'},
    {name: 'Philosphy of Hinduism', genre:'Essay', id:'4', authorId:'1'},
    {name: 'The Miracle Quation', genre:'Self-help', id:'2', authorId:'2'},
    {name: 'Five points on someone', genre:'Fiction/Humour', id:'5', authorId:'3'},
    {name: 'The 3 Mistakes of my Life', genre:'Fiction', id:'6', authorId:'3'},
    {name: 'Half Girlfriend', genre:'Romantice', id:'7', authorId:'3'},
];

var authors=[
    {name: 'Ambedakar', age:72, id:'1'},
    {name: 'Hal Elrod', age:43, id:'2'},
    {name: 'Chetan', age:56, id:'3'}
];

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() => ({
        id:{type: GraphQLID},
        name:{type : GraphQLString},
        genre:{type: GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(authors,{id:parent.authorId})
            }
        }

        
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:() => ({
        id:{type: GraphQLID},
        age:{type : GraphQLInt},
        name:{type: GraphQLString},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                console.log(parent);
                return _.filter(books,{authorId:parent.id})
            }
        }
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
                console.log(typeof(args.id))
                return _.find(books,{id: args.id});
            }
        },
        author:{
            type:AuthorType,
            args :{ id :{type: GraphQLID}},
            resolve(parent, args){
                //code to get data from db/ other source
                //current i am using dummy data from array defined above as var books for this purpose but we can code to fetch data from db too
                console.log(typeof(args.id))
                return _.find(authors,{id: args.id});
            }
        },

        books:{
            type: new GraphQLList(BookType),
            resolve(){
                return books;
            }
        },

        authors:{
            type: new GraphQLList(AuthorType),
            resolve(){
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery
});