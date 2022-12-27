import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  HttpLink,
} from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConfirmationPage from "./pages/ConfirmationPage";

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://riqra-service.onrender.com/graphql" }),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </ApolloProvider>
  </BrowserRouter>
);
