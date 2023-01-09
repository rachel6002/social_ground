/* eslint-disable dot-notation */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import axios from 'axios';

// mockAPI URL
// const rootURL ='https://633a4b96471b8c39556b9649.mockapi.io/api/v1/Student';
// JSON-server URL
const rootURL = 'http://localhost:8080';

const setHeaders = () => {
  axios.defaults.headers.common['Authorization'] = (
    sessionStorage.getItem('app-token') !== null) ? sessionStorage.getItem('app-token') : null;
};
/**
 *
 * deletes any (expired) token and relaunch the app
 */
const reAuthenticate = (status) => {
  if (status === 401) {
    // delete the token
    sessionStorage.removeItem('app-token');
    sessionStorage.removeItem('user');
    // reload the app
    window.location.reload(true);
  }
};
// Sends a Get request to the /user endpoint
// returns all the users in the DB
export const getUsers = async () => {
  // const [data, setData] = useState(null);
  try {
    setHeaders();
    const response = await axios.get(`${rootURL}/users`);

    // console.log(response.data.data);
    return response.data.data;
    // the data is stored in the mockData
    // field of the response
  } catch (err) {
    console.error(err);
  }
  return false;
};

// Takes the id of a user as input
// and sends a Get request to the /user:id endpoint
// returns the attributes of the user
export const getUser = async (userID) => {
  try {
    // add the token to the header
    setHeaders();
    const response = await axios.get(`${rootURL}/user/${userID}`);
    // reAuthenticate(response.status);
    return response.data.data;
  } catch (err) {
    // console.error(err);
    // reAuthenticate(401);
  }
  return false;
};

// Takes a user (without the id) as input
// and sends a POST request to the /user endpoint
// returns the attributes of the user with the id
export const createUser = async (userObject) => {
  try {
    setHeaders();
    const response = await axios.post(
      `${rootURL}/users`,
      `username=${userObject.username}&name=${userObject.name}&email=${userObject.email}&password=${userObject.password}&following=${userObject.following}&followers=${userObject.followers}&suggested=${userObject.suggested}`,
    );
    // console.log(response);
    return response.data;
    // return the data with the id of the student
  } catch (err) {
    // console.error(err);
  }
  return false;
};

export const updateFollow = async (follower, followee, action) => {
  try {
    setHeaders();
    switch (action) {
      case 'follow': {
        console.log(`mockapi follower id info: ${follower._id}`);
        await axios.put(
          `${rootURL}/user/${follower._id}/follow/${followee._id}`,
        );
        console.log('after put');
        break;
      }
      case 'unfollow': {
        await axios.put(
          `${rootURL}/user/${follower._id}/unfollow/${followee._id}`,
        );

        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error(err);
  }
};

export const createPost = async (file, postInfo, user) => {
  try {
    setHeaders();
    const reader = new FileReader();

    // const emptyArray = [];
    reader.onloadend = async function onloadend() {
      const encodedUrl = encodeURIComponent(reader.result);
      const response = await axios.post(`${rootURL}/posts`, `content=${encodedUrl}&userId=${user._id}&author=${user.username}&caption=${postInfo.caption}`);

      // const currentPostCount = user.postCount;
      return response.data.data;
    };

    await reader.readAsDataURL(file);
  } catch (err) {
    console.error(err);
  }
  return false;
};

export const getPosts = async () => {
  try {
    setHeaders();
    const response = await axios.get(`${rootURL}/posts`);
    // const json = JSON.parse(response.data);
    return response.data.data;
    // the data is stored in the mockData
    // field of the response
  } catch (err) {
    // console.error(err);
  }
  return false;
};

export const getAPost = async (postId) => {
  try {
    setHeaders();
    const response = await axios.get(`${rootURL}/posts/${postId}/`);
    return response.data.data;
  } catch (err) {
    // console.error(err);
  }
  return false;
};

export const getPostByUser = async (userId) => {
  try {
    setHeaders();
    const response = await axios.get(`${rootURL}/posts/user/${userId}/`);
    // const json = JSON.parse(response.data);
    // console.log(response.data.data);
    return response.data.data;
    // the data is stored in the mockData
    // field of the response
  } catch (err) {
    // console.error(err);
  }
  return false;
};

export const deletePosts = async (post) => {
  try {
    setHeaders();
    const response = await axios.delete(`${rootURL}/posts/${post._id}`);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
  return false;
};

export const editCaption = async (post, newCap) => {
  try {
    setHeaders();
    // const json = JSON.parse(response.data);
    const response = await axios.put(`${rootURL}/posts/${post._id}/EditCaption`, `caption=${newCap}`);
    // check the user associated with the post that is being deleted
    return response.data.data;
  } catch (err) {
    // console.error(err);
  }
  return false;
};

export const addHiddenUserToPost = async (post, userId) => {
  try {
    setHeaders();
    // const post = await getAPost(postId);
    console.log('post is', post);
    post.hidden.push(userId);
    // add userId to hidden of post
    const response = await axios.put(
      `${rootURL}/posts/${post._id}/hidden/`,
      `hidden=${userId}`,
    );
    return (response.data.data);
  } catch (err) {
    // console.error(err);
  }
  return false;
};

export const getUserByEmail = async (userEmail) => {
  try {
    // add the token to the header
    setHeaders();
    const response = await axios.get(`${rootURL}/users`);
    const userList = response.data.data;
    const user = userList.find((t) => t.email === userEmail);
    if (!user) {
      return false;
    }
    return user;
  } catch (err) {
    // console.error(err);
    // reAuthenticate(401);
  }
  return false;
};

export const updatePassword = async (userID, newPassword) => {
  try {
    // add the token to the header
    setHeaders();
    const response = await axios.put(
      `${rootURL}/users/${userID}`,
      `password=${newPassword}`,
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
  return false;
};

export const getComments = async () => {
  try {
    setHeaders();
    const response = await axios.get(`${rootURL}/comments/`);
    return response.data.data;
  } catch (err) {
    // console.error(err);
  }
  return false;
};

export const getAComment = async (commentId) => {
  try {
    setHeaders();
    const response = await axios.get(`${rootURL}/comments/${commentId}`);
    return response.data.data;
  } catch (err) {
    // console.error(err);
  }
  return false;
};
export const addCommentToPost = async (commentId, postId) => {
  try {
    setHeaders();
    const post = await getAPost(postId);
    post.comments.push(commentId);
    // add commentId to post
    const response = await axios.put(
      `${rootURL}/posts/${postId}/comments/`,
      (post),
    );
    return (response.data.data);
    // return the data with the id of the student
  } catch (err) {
    // console.error(err);
  }
  return false;
};

export const createComment = async (userID, comment) => {
  try {
    setHeaders();
    const response = await axios.post(
      `${rootURL}/comments`,
      `userId=${userID}&content=${comment}`,
    );
    console.log(response.data.data);
    return (response.data.data);
    // return the data with the id of the student
  } catch (err) {
    // console.error(err);
  }
  return false;
};

/**
 * sends a login request to the backend
 */
export const setLogin = async (email) => {
  try {
    const response = await axios.post(`${rootURL}/login`, `email=${email}`);
    // store the token
    sessionStorage.setItem('app-token', response.data.token);
    console.log('at login');
    console.log(`This is the login token: ${response.data.token}`);
    return response.data.token;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export const setLogout = async () => {
  try {
    setHeaders();
    // const response = await axios.delete(`${rootURL}/login/`, { data: { email: `${email}` } });
    reAuthenticate(401);
    return;
    // return response.data.data;
  } catch (err) {
    console.error(err);
  }
  // return null;
};

export const setAccountOnHold = async (userId, timeNow) => {
  try {
    const response = await axios.post(`${rootURL}/hold/${userId}`, `_id=${userId}&time=${timeNow}`);
    // console.log(response.data.data);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export const getAccountOnHold = async (userId) => {
  try {
    const response = await axios.get(`${rootURL}/hold/`);
    const accountList = response.data.data;
    const user = accountList.find((t) => t._id === userId);
    if (!user || user.length < 1) {
      return false;
    }
    // return false if user not found
    if (!response) {
      return false;
    }
    // return timestamp if user found
    // console.log(response.data.data);
    return user;
  } catch (err) {
    return false;
  }
};

export const deleteAccountOnHold = async (userId) => {
  try {
    const response = await axios.delete(`${rootURL}/hold/${userId}`);
    // if user not found then return false
    if (!response) {
      return false;
    }
    return response.data.data;
  } catch (err) {
    return false;
  }
};

export const updateLikes = async (currentUser, postId, action) => {
  try {
    setHeaders();
    const post = await getAPost(postId);
    switch (action) {
      case 'like': {
        post.likes.push(currentUser._id);
        await axios.put(
          `${rootURL}/posts/${postId}/updatelikes`,
          { likes: post.likes },
        );
        break;
      }
      case 'unlike': {
        const index = post.likes.indexOf(currentUser._id);
        post.likes.splice(index, 1);
        await axios.put(
          `${rootURL}/posts/${postId}/updatelikes`,
          { likes: post.likes },
        );
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.log(err);
  }
};

// export const updateFollowerSuggestions = async (current, usersData) => {
//   try {
//     // const usersData = await getUsers();
//     // console.log(`usersData in mockapi: ${usersData}`);
//     setHeaders();
//     const defaultData = usersData.filter((el) => el !== current._id); // Exclude self
//     const suggestions = defaultData.filter((el) => {
//       let followInCommon = [];
//       if (el.following && el.following.length > 0
// && current.following && current.following > 0) {
//         followInCommon = el.following.filter(((x) => current.following.includes(x)));
//       }
//       return followInCommon.length > 2;
//     });
//     const suggest = (suggestions.length > 0 ? suggestions : defaultData);
//     console.log(`current id in mockapi: ${current._id}`);
//     const response = await axios.put(`${rootURL}/suggestions/${current._id}`,
// { suggested: suggest });
//     // console.log(response.data.data);
//     return response.data.data;
//   } catch (err) {
//     console.error(err);
//   }
//   return null;
// };
