/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePosts = /* GraphQL */ `
  subscription OnCreatePosts(
    $filter: ModelSubscriptionPostsFilterInput
    $owner: String
  ) {
    onCreatePosts(filter: $filter, owner: $owner) {
      id
      text
      content_link
      likes
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdatePosts = /* GraphQL */ `
  subscription OnUpdatePosts(
    $filter: ModelSubscriptionPostsFilterInput
    $owner: String
  ) {
    onUpdatePosts(filter: $filter, owner: $owner) {
      id
      text
      content_link
      likes
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeletePosts = /* GraphQL */ `
  subscription OnDeletePosts(
    $filter: ModelSubscriptionPostsFilterInput
    $owner: String
  ) {
    onDeletePosts(filter: $filter, owner: $owner) {
      id
      text
      content_link
      likes
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
