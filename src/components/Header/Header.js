import { Add } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "../common/Button";
import LoginDialog from "../LoginDialog/LoginDialog";
import CreateUserDialog from "../CreateUserDialog/CreateUserDialog";
import { v4 as uuidv4 } from "uuid";

const StyledHeader = styled.div`
  padding: 10px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  font-size: 18px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  & button {
    margin-left: 10px;
  }
`;

const Header = () => {
  const [isLoginModalOpened, setIsLoginOpened] = useState(false);
  const [isCreateUserModalOpened, setIsCreateUserOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    if (window.localStorage.getItem("userName")) {
      setCurrentUser(window.localStorage.getItem("userName"));
    }
  }, []);

  const handleCreateUser = async (userName) => {
    try {
      await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: uuidv4(),
          name: userName,
          likedPosts: [],
          likedComments: [],
          dislikedPosts: [],
          dislikedComments: [],
        }),
      })
        .then((res) => {
          if (res.status === 400) {
            throw new Error("User already exists");
          } else {
            res.json();
          }
        })
        .then((data) => console.log(data));
      window.localStorage.setItem("userName", userName);
      setCurrentUser(userName);
      setIsCreateUserOpened(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleLogin = async (userName) => {
    try {
      await fetch(`http://localhost:3001/users?name=${userName}`, {
        method: "GET",
      })
        .then((response) => {
          console.log(response);
          if (response.status === 404) {
            throw new Error("User does not exist, please create one.");
          } else {
            response.json();
          }
        })
        .then((data) => {
          window.localStorage.setItem("userName", userName);
          setCurrentUser(userName);
          setIsLoginOpened(false);
        });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("userName");
    setCurrentUser("");
  };
  const handleLoginDialogClose = () => {
    setErrorMessage("");
    setIsLoginOpened(false);
  };

  const handleCreateDialogClose = () => {
    setErrorMessage("");
    setIsCreateUserOpened(false);
  };

  return (
    <StyledHeader>
      <StyledLink to="/">
        <Title>Reddit</Title>
      </StyledLink>
      <ActionsWrapper>
        <Link to="/submit">
          <Add />
        </Link>
        {!currentUser ? (
          <>
            <Button onClick={() => setIsLoginOpened(true)}>Login</Button>
            <Button onClick={() => setIsCreateUserOpened(true)} outlined>
              Create user
            </Button>
          </>
        ) : (
          <Button onClick={handleLogout}>Logout</Button>
        )}
      </ActionsWrapper>
      {/* Login dialog */}
      {isLoginModalOpened && (
        <LoginDialog
          onClose={handleLoginDialogClose}
          isOpen={isLoginModalOpened}
          onSubmit={handleLogin}
          errorMessage={errorMessage}
        />
      )}
      {/* Create user dialog */}
      {isCreateUserModalOpened && (
        <CreateUserDialog
          onClose={handleCreateDialogClose}
          isOpen={isCreateUserModalOpened}
          onSubmit={handleCreateUser}
          errorMessage={errorMessage}
        />
      )}
    </StyledHeader>
  );
};

export default Header;
