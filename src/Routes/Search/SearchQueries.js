import { gql } from "apollo-boost";

export const SEARCH = gql`
  query search($term: String!){
    searchPosts(term:$term){
      likeCount,
      files{
        url
      }
    }
    searchUsers(term:$term){
      id
      avatar
      username
      isFollowing
      isSelf
    }
  }
`;