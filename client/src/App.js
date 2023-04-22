import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

//components
import BookList from "./components/BookList";

//Apollo Client set Up
const client= new ApolloClient({
  uri:'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
       <div id="main">
      <h1>Best Reading List</h1>
      <BookList/>
    </div>
    </ApolloProvider>
   
  );
}

export default App;
