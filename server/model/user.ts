import { Schema, model } from "mongoose";

interface FavoritesMedia {
  mediaType: "MOVIE" | "TVSHOW";
  mediaId: number;
}

interface UserInterface {
  userName: string;
  email: string;
  password: string;
  favoritesMedia: Array<FavoritesMedia>;
}

const favoritesMediaSchema = new Schema<FavoritesMedia>({
  mediaId: { type: Number, required: true },
  mediaType: { type: String, required: true },
});

const userSchema = new Schema<UserInterface>({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  favoritesMedia: { type: [favoritesMediaSchema], default: [] },
});

export const Favorite = model<FavoritesMedia>(
  "FavoritesMedia",
  favoritesMediaSchema
);

const User = model<UserInterface>("User", userSchema);

export default User;
