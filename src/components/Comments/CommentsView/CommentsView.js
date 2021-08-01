import styled from "styled-components";
import { ThumbDownAltOutlined, ThumbUpAltOutlined } from "@material-ui/icons";
import UserCircle from "../UserCircle/UserCircle";

const Wrapper = styled.div`
  background: #fff;
  padding: 20px 30px;
`;

const AuthorTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: gray;
  margin-bottom: 10px;

  & div {
    margin-right: 4px;
  }
`;

const Content = styled.div`
  white-space: pre;
  padding-left: 29px;
`;

const ScoreSection = styled.div`
  display: flex;
  margin-top: 10px;
  padding-left: 29px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  svg {
    font-size: 20px;
  }
`;

const CommentsView = ({
  author,
  content,
  score,
  id,
  onDataUpdate,
  ...props
}) => {
  const handleVote = async (e, type) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3001/comments/update-score", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          type: type,
        }),
      })
        .then((res) => res.json())
        .then((data) => onDataUpdate(data));
    } catch (error) {}
  };

  return (
    <Wrapper {...props}>
      <AuthorTitle>
        <UserCircle name={author} />
        {author}
      </AuthorTitle>
      <Content>{content}</Content>
      <ScoreSection>
        <ArrowButton onClick={(e) => handleVote(e, "INCREMENT")}>
          <ThumbUpAltOutlined />
        </ArrowButton>
        <div>{score}</div>
        <ArrowButton onClick={(e) => handleVote(e, "DECREMENT")}>
          <ThumbDownAltOutlined />
        </ArrowButton>
      </ScoreSection>
    </Wrapper>
  );
};

export default CommentsView;
