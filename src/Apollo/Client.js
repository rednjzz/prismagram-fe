import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  uri: "http://61.83.147.71:4000",
  clientState: {
    defaults,
    resolvers
  },
  headers: {
    Authorization:`Bearer ${localStorage.getItem("token")}` 
  }
});