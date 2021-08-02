import styled from "styled-components";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Grid from "@material-ui/core/Grid";
import Button from "../common/Button";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const FieldContainer = styled.div`
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CreateThread = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const handleInputChange = (e) => setTitle(e.target.value);

  const currentUser = window.localStorage.getItem("userName");

  const handleTextareaChange = (e) => setContent(e.target.value);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await fetch("http://localhost:3001/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          id: uuidv4(),
          score: 0,
          createdBy: currentUser || "anonymous",
          created: new Date(),
        }),
      })
        .then((res) => res.json())
        .then((data) => history.push(`/threads/${data.id}`));

      setIsSubmitting(false);
    } catch (error) {}
  };

  return (
    <Grid container direction="row" justifyContent="center" spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
        <FieldContainer>
          <Input
            type="text"
            value={title}
            onChange={handleInputChange}
            placeholder="Title"
          />
        </FieldContainer>
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
      </Grid>
    </Grid>
  );
};

export default CreateThread;
