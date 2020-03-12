import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";

const GET_NENDOROIDS = gql`
  query {
    users {
      id
      email
      username
      profilePicture {
        url
      }
    }
  }
`;

const REGISTER = gql`
  mutation Register($username: String!, $password: String!, $email: String!) {
    register(input: { username: $username, email: $email, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

const RegisterForm = () => {

  // const [registerAction, { data }] = useMutation(REGISTER, {
  //   update(cache, { data: { register } }) {
  //     const { users } = cache.readQuery({ query: GET_NENDOROIDS });
  //     cache.writeQuery({
  //       query: GET_NENDOROIDS,
  //       data: { users: users.concat([register]) },
  //     })
  //   }
  // });
  const [registerAction, { data }] = useMutation(REGISTER, {
    update(cache) {
      cache.modify("GET_NENDOROIDS");
    }
  });

  const { register, handleSubmit, watch } = useForm();

  const onSubmit = data => registerAction({ variables: data });

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <input name="username" ref={register} placeholder="username" />
      <input name="email" ref={register} placeholder="email" />
      <input name="password" ref={register} placeholder="password" />
      <input type="submit" />
    </form>
  )
}



function Users() {
  console.log(("Users"))
  const params = useParams();
  const { data, loading, error } = useQuery(GET_NENDOROIDS, { variables: { chu: params.serieName } });
  const styles = {
    root: {
      width: "100vw",
      minHeight: "100vh",
      backgroundColor: "#121212",
    },
  }
  if (loading) {
    return <Loader />
  }
  if (error) {
    return <p>{error.message}</p>
  }
  if (data) {
    return (
      <Layout>
        <div style={styles.root}>
          <RegisterForm />
          {data.users.map(({ id, username }) => {
            return (
              <div>
                {/* {u.profilePicture? <Image src={`http://localhost:1337${u.profilePicture.url}`} alt="profil" round size={227} />: <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSai4NyecBsDiw8RdSXk9DFw6MHGRP3NzH-HCDlR0kyGHWD8Cxs&usqp=CAU" alt="profil" round size={227} /> } */}
                <Button onHoverButton={() => { }} label={username} path={`/user/${id}`} />
              </div>
            )
          })}
        </div>
      </Layout>
    );
  }
}

export default Users;
