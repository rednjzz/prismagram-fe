import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import FollowButtonPresenter from "./FollowButtonPresenter";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";

const FollowButtonContainer = ({isFollowing, id}) => {
  const [isFollowingS, setIsFollowing] = useState(isFollowing);
  const [followMutation] = useMutation(FOLLOW, { variables: {followingId: id} });
  const [unfollowMutation] = useMutation(UNFOLLOW, { variables: {followingId: id} });
  
  const onClick = () => {
    if (isFollowingS === true) {
      setIsFollowing(false);
      try {
        unfollowMutation();
      } catch (e){
        console.log(e);
      }
    } else {
      setIsFollowing(true);
      try {
        followMutation();
      } catch (e){
        console.log(e);
      }
      
    }
  }

  return (
    <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingS} />
  )
}

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default FollowButtonContainer;
