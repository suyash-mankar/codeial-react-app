import { useContext, useEffect, useState } from 'react';
import {
  login as userLogin,
  register,
  editProfile,
  fetchUserFriends,
  getPosts,
} from '../api';
import { AuthContext, PostsContext } from '../providers';
import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from '../utils';
import jwt from 'jwt-decode';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

      if (userToken) {
        const user = jwt(userToken);
        const response = await
         fetchUserFriends();
        let friendships = [];

        if (response.success) {
          friendships = response.data.friends;
        }

        setUser({
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          friendships: friendships,
        });
      }

      setLoading(false);
    };

    getUser();
  }, []);

  const updateUser = async (userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);

    console.log('response: ', response);

    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const login = async (email, password) => {
    const response = await userLogin(email, password);
    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );

      const user = jwt(response.data.token);
      const FetchFriendsResponse = await fetchUserFriends();
      let friendships = [];

      if (FetchFriendsResponse.success) {
        friendships = FetchFriendsResponse.data.friends;
      }

      setUser({
        ...user,
        friendships,
      });

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  const updateUserFriends = (addFriend, friend) => {
    if (addFriend) {
      setUser({
        ...user,
        friendships: [...user.friendships, friend],
      });
      return;
    }

    const newFriends = user.friendships.filter((item) => item.to_user._id !== friend.to_user._id);
    setUser({
      ...user,
      friendships: newFriends,
    });
    return;
  };

  return {
    user,
    login,
    logout,
    loading,
    signup,
    updateUser,
    updateUserFriends,
  };
};



export const usePosts = () => {
  return useContext(PostsContext);
};



export const useProvidePosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);


  const addPostToState = () => {

  }


  return {
    data: posts,
    loading,
    addPostToState,
  }

}

