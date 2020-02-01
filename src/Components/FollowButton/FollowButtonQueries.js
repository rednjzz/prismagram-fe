import { gql } from "apollo-boost";

export const FOLLOW = gql`
  mutation follow($followingId: String!){
    follow(followingId: $followingId)
  }
`;
export const UNFOLLOW = gql`
  mutation unfollow($followingId: String!){
    unfollow(followingId: $followingId)
  }
`;