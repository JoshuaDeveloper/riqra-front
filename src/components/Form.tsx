import React from "react";
import styled from "@emotion/styled";
import { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

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

const ContainerInformation = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const Information = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 8px;
`;

const ButtonComplete = styled(Link)`
  background-color: #ff8000;
  color: white;
  width: 100%;
  height: 48px;
  border: none;
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
  cursor: pointer;
  text-decoration: none;
`;

const ButtonDiv = styled.div`
  width: 100%;
  margin-top: 5px;
  background-color: #ff8000;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
`;

interface Props {
  price: number;
  shipping: number;
  taxes: number;
  total: number;
}

export const Form = ({ price, shipping, taxes, total }: Props) => {
  const date = moment();

  return (
    <Container>
      <div>
        <p>
          Buy now and get it by {""}
          {date.day() === 0 && date.add(1, "days").format("DD/MM/YYYY")}
          {date.day() === 6 && date.add(2, "days").format("DD/MM/YYYY")}
          {date.day() === 5 && date.add(3, "days").format("DD/MM/YYYY")}
          {date.day() !== 0 &&
            date.day() !== 6 &&
            date.day() !== 5 &&
            date.add(1, "days").format("DD/MM/YYYY")}
        </p>
      </div>
      <ContainerInformation>
        <Information>
          <div>Products</div>
          <div>{price.toFixed(2)}</div>
        </Information>
        <Information style={{ backgroundColor: "yellow" }}>
          <div>Shipping Cost</div>
          <div>{shipping.toFixed(2)}</div>
        </Information>
        <Information>
          <div>Taxes</div>
          <div>{taxes.toFixed(2)}</div>
        </Information>
        <Information>
          <div>Total</div>
          <div>{total.toFixed(2)}</div>
        </Information>
      </ContainerInformation>
      <ButtonDiv>
        <div>
          <ButtonComplete to="/confirmation">COMPLETE ORDER</ButtonComplete>
        </div>
      </ButtonDiv>
    </Container>
  );
};

export default Form;
