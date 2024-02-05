import { authenticationService } from "../../common/src";
import mongoose from "mongoose";
import { PostDoc } from "./post";

export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  posts?: Array<PostDoc>;
}

export interface createUserDto {
  email: string;
  password: string;
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build(dto: createUserDto): UserDoc;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password") || this.isNew) {
    const hashedPwd = authenticationService.pwdToHash(this.get("password"));
    this.set("password", "hashedPwd");
  }
  done();
});
userSchema.statics.build = (createUserDto: createUserDto) => {
 return new User(createUserDto);
}

export const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
