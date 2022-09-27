import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type LikesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CommentsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Likes {
  readonly id: string;
  readonly userID: string;
  readonly postID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Likes, LikesMetaData>);
  static copyOf(source: Likes, mutator: (draft: MutableModel<Likes, LikesMetaData>) => MutableModel<Likes, LikesMetaData> | void): Likes;
}

export declare class Comments {
  readonly id: string;
  readonly text?: string | null;
  readonly userID: string;
  readonly postID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Comments, CommentsMetaData>);
  static copyOf(source: Comments, mutator: (draft: MutableModel<Comments, CommentsMetaData>) => MutableModel<Comments, CommentsMetaData> | void): Comments;
}

export declare class Post {
  readonly id: string;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly numberOfLikes?: number | null;
  readonly numberOfShares?: number | null;
  readonly User?: User | null;
  readonly comments?: string | null;
  readonly Likes?: (Likes | null)[] | null;
  readonly Comments?: (Comments | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly postUserId?: string | null;
  constructor(init: ModelInit<Post, PostMetaData>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly Likes?: (Likes | null)[] | null;
  readonly Comments?: (Comments | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}