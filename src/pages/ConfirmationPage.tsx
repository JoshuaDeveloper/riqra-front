import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Succes from "../assets/success.png";

const Container = styled.div`
  min-width: 360px;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Open Sans", sans-serif;
  margin-left: 64px;
`;

const ConfirmationPage = () => {
  return (
    <Container>
      <div>Thank you</div>
      <div>Your order P0001 has been registred</div>
      <Link to="/">Continue shopping</Link>
      <img src={Succes} alt="succes" />
    </Container>
  );
};

export default ConfirmationPage;
