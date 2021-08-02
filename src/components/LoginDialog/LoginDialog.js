import { useState } from "react";
import styled from "styled-components";
import Dialog from "../common/Dialog";
import Input from "../common/Input";
import Button from "../common/Button";


const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const LoginDialog = ({ onClose, isOpen, onSubmit,errorMessage }) => {
  const [userName, setUserName] = useState("");

  const handleSubmitButtonClick = () => {
    onSubmit(userName);
  };

  return (
    <Dialog onClose={onClose} isOpen={isOpen} title={"Login"}>
      <Input
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Username"
      />
       <ErrorMessage>{errorMessage}</ErrorMessage>
      <ButtonWrapper>
        <Button onClick={handleSubmitButtonClick}>Login</Button>
      </ButtonWrapper>
    </Dialog>
  );
};

export default LoginDialog;
