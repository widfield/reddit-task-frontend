import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CircularProgress } from "@material-ui/core";
import Button from "../../common/Button";
import Textarea from "../../common/Textarea";

const FormWrapper = styled.div`
  padding: 20px 30px;
  background: #fff;
`;

const FieldContainer = styled.div`
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledP = styled.p`
  font-size: 14px;
  color: gray;
`;

const CommentsForm = ({ threadId, onCommentCreate }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleTextareaChange = (e) => setContent(e.target.value);

  const currentUser = window.localStorage.getItem("userName");

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await fetch("http://localhost:3001/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          id: uuidv4(),
          score: 0,
          createdBy: currentUser || "anonymous",
          created: new Date(),
          threadId,
        }),
      })
        .then((res) => res.json())
        .then((data) => onCommentCreate(data));

      setIsSubmitting(false);
    } catch (error) {}
  };

  return (
    <Grid container direction="row" justifyContent="center" spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <FormWrapper>
          <StyledP>Comment as {currentUser || "anonymous"}</StyledP>
          <FieldContainer>
            <Textarea
              placeholder="Text"
              value={content}
              onChange={handleTextareaChange}
            />
          </FieldContainer>
          <ButtonContainer>
            {isSubmitting && <CircularProgress />}
            <Button onClick={handleSubmit}>Post</Button>
          </ButtonContainer>
        </FormWrapper>
      </Grid>
    </Grid>
  );
};

export default CommentsForm;
