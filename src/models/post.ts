import mongoose from "mongoose";
import { UserDoc } from "./user";
import { CommentDoc } from "./comment";

export interface PostDoc extends mongoose.Document {
  title: string;
  content: string;
  comments?: Array<CommentDoc>
}

export interface createPostDto {
    title: string;
    content: string;
}
export interface PostModel extends mongoose.Model<PostDoc> {
    build(dto: createPostDto): PostDoc;
}

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

postSchema.statics.build = (createPostDto) => new Post(createPostDto)

const Post = mongoose.model<PostDoc, PostModel>("Post", postSchema);

export default Post;
