// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Likes, Comments, Post, User } = initSchema(schema);

export {
  Likes,
  Comments,
  Post,
  User
};