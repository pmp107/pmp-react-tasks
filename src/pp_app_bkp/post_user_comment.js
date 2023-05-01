// import logo from './logo.svg';
import './App.css';

import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function App() {
  const apiPost = {
    postsApi: "https://gorest.co.in/public/v2/posts",
    usersApi: "https://gorest.co.in/public/v2/users",
    commentsApi: "https://gorest.co.in/public/v2/comments"
  };

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(apiPost.postsApi)
      .then((response) => {
        // console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("Not able to fetch posts " + error);
      });
    axios
      .get(apiPost.usersApi)
      .then((response) => {
        // console.log(response);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log("Not able to fetch users " + error);
      });
    axios
      .get(apiPost.commentsApi)
      .then((response) => {
        setComments(response.data);
        // console.log("comments", response.data);
      })
      .catch((error) => {
        console.log("Not able to fetch comments " + error);
      });
  }, []);
  function getUserName(userId) {
    // debugger;
    // return "PMP";
    // console.log(userId);
    if (users.length > 0) {
      let user = users.find((user) => user.id === userId);
      return user ? user.name : "anonymus";
    }
    return null;
  }

  function getCommentCount(postId){
      let commentsCount = comments.filter((comment)=>{
          return comment.post_id === postId;
      });
      return commentsCount? commentsCount.length: 0;
  }
  // const getUserName = (userId) => {
  //   if (users.length > 0) {
  //     // const user = users.find((user) => user.id === userId);
  //     let userName = users.find((user)=> user.id === userId );
  //     return userName ? userName.name : "Anonymous";
  //   }
  //   return null;
  // };

  return (
    <>
      <div>hello</div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Comments count</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.user_id}</td>
              <td>{getUserName(post.user_id)}</td>
              <td>{getCommentCount(post.id)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    
    </>
  );
}
