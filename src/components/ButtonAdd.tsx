import React from "react";
import styled from "@emotion/styled";
import { useState } from "react";

const ButtonAddStyled = styled.button`
  background-color: #ff8000;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

const Button = styled.button`
  color: white;
  border: none;
  width: 20px;
  height: 20px;
  background-color: transparent;
  font-size: 20px;
`;

const ButtonDelete = styled.button`
  background-color: transparent;
  margin-top: 2px;
  border: none;
`;

interface ButtonAddProps {
  price: number;
  changeCost: (price: number) => void;
}

const ButtonAdd: React.FC<ButtonAddProps> = ({ price, changeCost }) => {
  const [count, setCount] = useState(0);
  const [state, setState] = useState(false);

  const Modal = styled.div`
    background-color: red;
    width: 180px;
    height: 48px;
    z-index: 1000;
    position: absolute;
    margin-top: 20px;
    background-color: #ff8000;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    > div {
      color: white;
    }
  `;

  function addCost() {
    changeCost(price);
  }

  // function to rest the cost
  function restCost() {
    changeCost(-price);
  }

  // function to delete cost
  function deleteCost() {
    changeCost(-price * count);
  }

  return (
    <div>
      <ButtonAddStyled
        onClick={(e) => {
          e.preventDefault();
          setState(!state);
        }}
      >
        {count === 0 ? "+" : count}
      </ButtonAddStyled>
      {count !== 0 && (
        <div>
          <ButtonDelete
            onClick={() => {
              deleteCost();
              setCount(0);
            }}
          >
            delete
          </ButtonDelete>
        </div>
      )}

      {state ? (
        <Modal>
          <Button
            onClick={() => {
              setCount(count - 1);
              restCost();
            }}
          >
            -
          </Button>
          <div>{count}</div>
          <Button
            onClick={() => {
              setCount(count + 1);
              addCost();
            }}
          >
            +
          </Button>
        </Modal>
      ) : null}
    </div>
  );
};

export default ButtonAdd;
