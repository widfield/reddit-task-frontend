import {
  ChatBubble,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  border-top-right-radius: 5px;
  border-top-left-radius: 7px;
  //margin-bottom: 10px;
  background: #fff;
`;

const ScoreSection = styled.div`
  background: ${(props) => (props.isInDetailsMode ? "#fff" : "lightgray")};
  width: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  font-size: 14px;
  border-top-left-radius: 5px;
`;

const ContentSection = styled.div`
  width: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const AuthorTitle = styled.div`
  font-size: 12px;
  color: gray;
  margin-bottom: 4px;
`;

const Content = styled.div`
  white-space: pre;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  svg {
    font-size: 20px;
  }
`;

const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  margin-top: 10px;
  span {
    font-size: 14px;
  }

  svg {
    font-size: 20px;
    margin-right: 4px;
    color: #ccc;
  }
`;

const ThreadCard = ({
  score,
  author,
  title,
  content,
  id,
  onDataUpdate,
  commentsAmmount,
  ...props
}) => {
  const handleVote = async (e, type) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3001/threads/update-score", {
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
    <Container {...props}>
      <ScoreSection {...props}>
        <ArrowButton onClick={(e) => handleVote(e, "INCREMENT")}>
          <ThumbUpAltOutlined />
        </ArrowButton>
        <div>{score}</div>
        <ArrowButton onClick={(e) => handleVote(e, "DECREMENT")}>
          <ThumbDownAltOutlined />
        </ArrowButton>
      </ScoreSection>

      <ContentSection>
        <AuthorTitle>Posted by {author}</AuthorTitle>
        <Title>{title}</Title>
        <Content>{content}</Content>
        {commentsAmmount && (
          <ActionsSection>
            <ChatBubble fontSize="small" />
            <span>{commentsAmmount} comments</span>
          </ActionsSection>
        )}
      </ContentSection>
    </Container>
  );
};

export default ThreadCard;
