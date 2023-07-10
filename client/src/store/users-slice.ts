import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { SERVER_URL } from "../settings";

const apiUrl = SERVER_URL;

type favorite = { mediaType: "MOVIE" | "TVSHOW"; mediaId: number };

const initialState: {
  userId: string;
  userName: string;
  email: string;
  favorites: Array<favorite>;
} = {
  userId: "",
  userName: "",
  email: "",
  favorites: [],
};

const header = (token: string | null) =>
  new Headers(
    token
      ? {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      : { "Content-Type": "application/json" }
  );

export const addUser = createAsyncThunk<
  { userId: string; userName: string; email: string },
  { userName: string; email: string; password: string },
  { state: RootState }
>("users/add-user", async (user) => {
  return fetch(`http://${apiUrl}/users/add-user`, {
    method: "POST",
    headers: header(null),
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then(
      (body: {
        userId: string;
        userName: string;
        email: string;
        token: string;
      }) => {
        localStorage.setItem("token", body.token);
        return {
          userId: body.userId,
          userName: body.userName,
          email: body.email,
        };
      }
    );
});

export const loginUser = createAsyncThunk<
  {
    userId: string;
    userName: string;
    email: string;
    favorite: Array<favorite>;
  },
  { email: string; password: string },
  { state: RootState }
>("users/login-user", async (user) => {
  return fetch(`http://${apiUrl}/users/login-user`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: header(null),
  })
    .then((res) => res.json())
    .then(
      (body: {
        userId: string;
        userName: string;
        email: string;
        token: string;
        favorite: Array<favorite>;
      }) => {
        localStorage.setItem("token", body.token);
        return {
          userId: body.userId,
          userName: body.userName,
          email: body.email,
          favorite: body.favorite,
        };
      }
    );
});

export const setUser = createAsyncThunk<
  {
    userId: string;
    userName: string;
    email: string;
    favorite: Array<favorite>;
  },
  undefined,
  { state: RootState }
>("users/set-user", async () => {
  const token = localStorage.getItem("token");
  return fetch(`http://${apiUrl}/users/set-user`, {
    method: "POST",
    headers: header(token),
  })
    .then((res) => res.json())
    .then(
      (body: {
        userId: string;
        userName: string;
        email: string;
        favorite: Array<favorite>;
      }) => {
        return {
          userId: body.userId,
          userName: body.userName,
          email: body.email,
          favorite: body.favorite,
        };
      }
    );
});

export const addMediaToFavorites = createAsyncThunk<
  favorite,
  { mediaType: "MOVIE" | "TVSHOW"; mediaId: number },
  { state: RootState }
>("users/add-favorite", async ({ mediaType, mediaId }) => {
  const token = localStorage.getItem("token");
  return fetch(`http://${apiUrl}/users/add-favorite`, {
    method: "POST",
    body: JSON.stringify({ mediaType, mediaId }),
    headers: header(token),
  })
    .then((res) => res.json())
    .then((body) => {
      return { mediaType, mediaId };
    });
});

export const removeMediaFromFavorites = createAsyncThunk<
  favorite,
  { mediaType: "MOVIE" | "TVSHOW"; mediaId: number },
  { state: RootState }
>("users/remove-favorite", async ({ mediaType, mediaId }) => {
  const token = localStorage.getItem("token");
  return fetch(`http://${apiUrl}/users/remove-favorite`, {
    method: "POST",
    body: JSON.stringify({ mediaType, mediaId }),
    headers: header(token),
  })
    .then((res) => res.json())
    .then((body) => {
      return { mediaType, mediaId };
    });
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token");
      state.email = "";
      state.favorites = [];
      state.userId = "";
      state.userName = "";
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      return state;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.favorites = action.payload.favorite;
      return state;
    });
    builder.addCase(setUser.fulfilled, (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.favorites = action.payload.favorite;
      return state;
    });
    builder.addCase(addMediaToFavorites.fulfilled, (state, action) => {
      state.favorites.push(action.payload);
      return state;
    });
    builder.addCase(removeMediaFromFavorites.fulfilled, (state, action) => {
      state.favorites = state.favorites.filter(
        (favorite) =>
          !(
            favorite.mediaId === action.payload.mediaId &&
            favorite.mediaType === action.payload.mediaType
          )
      );
      return state;
    });
  },
});

export const userActions = userSlice.actions;

export default userSlice;
