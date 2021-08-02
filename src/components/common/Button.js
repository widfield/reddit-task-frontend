import styled from "styled-components";

const Button = styled.button`
  background: ${(props) => (props.outlined ? "#fff" : "#9c223e")};
  border: ${(props) => (props.outlined ? "1px solid #9c223e" : "none")};
  cursor: pointer;
  border-radius: 25px;
  color: ${(props) => (props.outlined ? "#9c223e" : "#fff")};
  padding: 10px 20px;
  &:focus {
    opacity: 0.8;
  }
`;

export default Button;
