import styled from "styled-components";

const Button = styled.button`
  background: #9c223e;
  border: none;
  cursor: pointer;
  border-radius: 25px;
  color: #fff;
  padding: 10px 20px;
  &:focus {
    opacity: 0.8;
  }
`;

export default Button;
