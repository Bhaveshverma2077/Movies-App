import { Schema, model } from "mongoose";

interface FavoritesMedia {
  mediaType: "MOVIE" | "TVSHOW";
  mediaId: number;
}

interface UserInterface {
  name: string;
  favoritesMedia: Array<FavoritesMedia>;
}

const favoritesMediaSchema = new Schema<FavoritesMedia>({
  mediaId: { type: Number, required: true },
  mediaType: { type: String, required: true },
});

const userSchema = new Schema<UserInterface>({
  name: { type: String, required: true },
  favoritesMedia: { type: [favoritesMediaSchema], default: [] },
});

export const Favorite = model<FavoritesMedia>(
  "FavoritesMedia",
  favoritesMediaSchema
);

const User = model<UserInterface>("User", userSchema);

export default User;
