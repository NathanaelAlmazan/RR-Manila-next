import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: "http://192.168.100.8:5000/",
    cache: new InMemoryCache(),
});

export default apolloClient;