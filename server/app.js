const express=require('express');
//const graphqlHTTP = require('express-graphql');
const { graphqlHTTP } = require('express-graphql');
const schema=require('./schema/schema');
const sql = require('mssql');

const app=express();
// config for your database
var config = {
    user: 'sa',
    password: 'Optum123$',
    server: 'localhost', 
    database: 'TESTDB',
    trustServerCertificate: true
};
//Connect to db
//sql.connect('Server=localhost,1433;Database=TESTDB;User Id=sa;Password=Optum123$;Encrypt=true');

sql.connect(config).then(pool => {
    if (pool.connecting) {
      console.log('Connecting to the database...')
    }
    if (pool.connected) {
      console.log('Connected to SQL Server')
    }
  })


app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000,()=>{
    console.log('now listening for requests on port 4000')
})