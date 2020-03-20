import React from 'react';
import { useQuery } from '@apollo/client';
import Button from "../components/Button";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import GridLayout from "../components/GridLayout";
import Error from "../components/Error";
import { GET_USERS } from "../graphql/users";

function Users() {
  console.log(("Users"))
  const { data, loading, error } = useQuery(GET_USERS);
  const styles = {
    content: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px",
      height: "100%",
      minHeight: "40vh",
      width: "100%",
      backgroundColor: "#121212",
    },
  }
  const { content } = styles;

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error message={error.message} />
  }

  if (data) {
    return (
      <Layout>
        <div style={content}>
          <GridLayout itemsPerRow={4} rowHeight={200} width={1280}>
            {
              data.users.map(({ id, username }) => <Button fill label={username} path={`/user/${id}`} />)
            }
          </GridLayout>
        </div>
      </Layout>
    );
  }
}

export default Users;
