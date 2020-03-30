import React, { ReactElement } from 'react';
import { useQuery } from '@apollo/client';
import Button from "../components/Button";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import GridLayout from "../components/GridLayout";
import Error from "../components/Error";
import { GET_USERS } from "../graphql/users";

function Users(): ReactElement {
  console.log(("Users"))
  const { data, loading, error } = useQuery(GET_USERS);


  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error message={error.message} />
  }

  if (data) {
    return (
      <Layout>
        <GridLayout itemsPerRow={4} rowHeight={200}>
          {
            data.users.map(({ id, username }: any) => <Button key={id} fill label={username} path={`/user/${id}`} />)
          }
        </GridLayout>
      </Layout>
    );
  }
  return <></>;
}

export default Users;
