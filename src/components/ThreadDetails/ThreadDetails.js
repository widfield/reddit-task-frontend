import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";
import ThreadCard from "../ThreadCard/ThreadCard";
import Grid from "@material-ui/core/Grid";
import CommentsForm from "../Comments/CommentsForm/CommentsForm";
import CommentsView from "../Comments/CommentsView/CommentsView";

const ThreadDetails = () => {
  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState([]);
  const location = useLocation();

  console.log(location);

  useEffect(() => {
    (async () => {
      await fetch(`http://localhost:3001${location.pathname}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => setThread(data));
    })();
  }, [location.pathname]);

  useEffect(() => {
    if (thread?.id) {
      (async () => {
        await fetch(`http://localhost:3001/comments?threadId=${thread.id}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => setComments(data));
      })();
    }
  }, [thread?.id]);

  const handleCommentAdd = (comment) => {
    setComments((prev) => [comment, ...prev]);
  };

  const handleThreadUpdate = (thread) => {
    setThread(thread);
  };

  const handleCommentVote = (comment) => {
    const currentComments = [...comments];
    const updatedCommentIndex = currentComments.findIndex(
      (e) => e.id === comment.id
    );

    currentComments[updatedCommentIndex].score = comment.score;

    setComments(currentComments);
  };

  return (
    thread && (
      <Grid container direction="row" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={12} md={10} lg={5} xl={5}>
          <ThreadCard
            score={thread.score}
            author={thread.createdBy}
            title={thread.title}
            content={thread.content}
            id={thread.id}
            onDataUpdate={handleThreadUpdate}
            isInDetailsMode
          />
          <CommentsForm
            threadId={thread.id}
            onCommentCreate={handleCommentAdd}
          />
          {comments.map((comment) => (
            <CommentsView
              key={comment.id}
              author={comment.createdBy}
              content={comment.content}
              score={comment.score}
              id={comment.id}
              onDataUpdate={handleCommentVote}
            />
          ))}
        </Grid>
      </Grid>
    )
  );
};

export default ThreadDetails;
