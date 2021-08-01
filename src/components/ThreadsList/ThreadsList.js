import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import ThreadCard from "../ThreadCard/ThreadCard";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: initial;
`;

const CardWrapper = styled.div`
  margin-bottom: 10px;
`;

const ThreadsList = () => {
  const [threads, setThreads] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingData(true);
      try {
        await fetch("http://localhost:3001/threads", {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => setThreads(data));
      } catch (error) {}

      setIsLoadingData(false);
    })();
  }, []);

  const handleThreadUpdate = (thread) => {
    const currentThreads = [...threads];
    const updatedThreadIndex = currentThreads.findIndex(
      (e) => e.id === thread.id
    );

    currentThreads[updatedThreadIndex].score = thread.score;

    setThreads(currentThreads);
  };

  if (isLoadingData) {
    return <CircularProgress />;
  }

  return (
    <Grid container direction="row" justifyContent="center" spacing={2}>
      <Grid item xs={12} sm={12} md={10} lg={5} xl={5}>
        {threads.length > 0 ? (
          threads.map((thread) => (
            <CardWrapper key={thread.id}>
              <StyledLink to={`/threads/${thread.id}`}>
                <ThreadCard
                  score={thread.score}
                  author={thread.createdBy}
                  title={thread.title}
                  content={thread.content}
                  id={thread.id}
                  commentsAmmount={thread.commentsAmmount}
                  onDataUpdate={handleThreadUpdate}
                />
              </StyledLink>
            </CardWrapper>
          ))
        ) : (
          <div>No threads found</div>
        )}
      </Grid>
    </Grid>
  );
};

export default ThreadsList;
