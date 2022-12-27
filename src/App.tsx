import { useEffect, useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import styled from "@emotion/styled";
import Form from "./components/Form";
import { GrAdd } from "react-icons/gr";
import { CgShoppingCart } from "react-icons/cg";
import ButtonAdd from "./components/ButtonAdd";

const InputStyled = styled.input`
  width: 360px;
  height: 48px;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  padding-left: 16px;
  border: 1px solid #dddddd;
`;

const IMG = styled.img`
  width: 74px;
  height: 80px;
  object-fit: contain;
`;

const Container = styled.div`
  padding-top: 64px;
  padding-bottom: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: "Open Sans", sans-serif;
`;

const ContainerProducts = styled.div`
  width: 100%;
  margin-top: 20px;
  padding-top: 10px;
  background-color: white;
`;

const ProductsStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #e5e5e5;
`;

const Price = styled.p`
  color: #ff2d55;
  font-size: 21.33px;
`;

const Name = styled.p`
  font-size: 21.33px;
`;

const ProductsEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const App = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0.0);
  const [shipping, setShipping] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [total, setTotal] = useState(0);

  // get products from API
  const GET_PRODUCTS = gql`
    query findProducts($search: String!) {
      getSearchedProducts(search: $search) {
        name
        price
        image
      }
    }
  `;

  const [getProducts, result] = useLazyQuery(GET_PRODUCTS);

  const handleSearch = (name: String) => {
    getProducts({
      variables: {
        search: name,
      },
    });
  };

  // set data
  useEffect(() => {
    if (result.data) {
      setData(result.data.getSearchedProducts);
      setLoading(result.loading);
    }
  }, [result]);

  // add cost to total
  const addCost = (amount: number) => {
    setPrice(price + amount);
  };

  // get shipping, taxes and total
  useEffect(() => {
    if (price >= 0) {
      setShipping(price * 0.1);
      setTaxes(price * 0.18);
      setTotal(price + price * 0.1);
    }
  }, [price]);

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <Container>
        <div>
          <div>
            <InputStyled
              type="text"
              placeholder="Search Products"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch(e.target.value);
              }}
            />
          </div>

          <ContainerProducts>
            {data.length === 0 && (
              <ProductsEmpty>
                <div>
                  <CgShoppingCart size="80px" />
                </div>
                <div>
                  <p>Your cart is empty</p>
                </div>
                <div>
                  <p>Seems like you haven’t chosen what to buy... </p>
                </div>
              </ProductsEmpty>
            )}

            {loading && <p>Loading...</p>}

            {data && (
              <div>
                {data.map((product: any) => (
                  <div key={product.name}>
                    <ProductsStyled>
                      <div>
                        <IMG src={product.image} />
                      </div>
                      <div>
                        <Name>{product.name}</Name>
                        <Price>$ {product.price.toFixed(2)}</Price>
                      </div>
                      <div>
                        <ButtonAdd
                          price={product.price}
                          changeCost={addCost}
                        ></ButtonAdd>
                      </div>
                    </ProductsStyled>
                  </div>
                ))}
              </div>
            )}
          </ContainerProducts>
        </div>
        <div>
          <Form
            price={price}
            shipping={shipping}
            taxes={taxes}
            total={total}
          ></Form>
        </div>
      </Container>
    </div>
  );
};

export default App;
