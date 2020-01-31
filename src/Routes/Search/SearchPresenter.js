import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";

const Wrapper = styled.div`
  height: 50vh;
`;
const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;

const SearchPresenter = ({ searchTerm, loading, data }) => {
  // console.log(data);
  // console.log(searchTerm);
  if (searchTerm === undefined) {
    return (
      <Wrapper>
        <FatText text={"Search for something"} />
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchUsers && data.searchPosts) {
    return (
      <Wrapper>
        <Section>
          { 
            data.searchUsers.length === 0 ? (
              <FatText text="No Users Found" />
            ) : (
              data.searchUsers.map(user => (
                <UserCard
                  key={user.id}
                  username={user.username}
                  isFollowing={user.isFollowing}
                  url={user.avatar}
                  isSelf={user.isSelf}
                  id={user.id}
                />
              ))
            )
          }
        </Section>
        <Section>
          {data.searchPosts.length === 0 ? (
            <FatText text="No Posts Found" />
          ) : (
            data.searchPosts.map(post => null)
          )}
        </Section>
      </Wrapper>
    )
  } else {
    return <Section>
      <FatText text={"not"} />
    </Section>
  }
};

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool
};

export default SearchPresenter;