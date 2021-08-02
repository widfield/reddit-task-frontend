import styled from "styled-components";

const Circle = styled.div`
  background: #ccc;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
`;

const UserCircle = ({ name }) => {
  const userInitial = name[0].toUpperCase();
  return <Circle>{userInitial}</Circle>;
};

export default UserCircle;
