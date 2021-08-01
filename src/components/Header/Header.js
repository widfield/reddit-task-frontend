import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.div`
  padding: 10px;
  background: #fff;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: 18px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledLink to="/">
        <Title>Reddit</Title>
      </StyledLink>

      <Link to="/submit">
        <Add />
      </Link>
    </StyledHeader>
  );
};

export default Header;
