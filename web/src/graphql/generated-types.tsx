import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Cursor for paging through collections */
  ConnectionCursor: any;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};


export type CreateOnePlaylistInput = {
  /** The record to create */
  playlist: CreatePlaylistDto;
};

export type CreatePlaylistDto = {
  name: Scalars['String'];
  public: Scalars['Boolean'];
  everyoneCanEdit: Scalars['Boolean'];
};

export type CursorPaging = {
  /** Paginate before opaque cursor */
  before?: Maybe<Scalars['ConnectionCursor']>;
  /** Paginate after opaque cursor */
  after?: Maybe<Scalars['ConnectionCursor']>;
  /** Paginate first */
  first?: Maybe<Scalars['Int']>;
  /** Paginate last */
  last?: Maybe<Scalars['Int']>;
};

export type DateFieldComparison = {
  is?: Maybe<Scalars['Boolean']>;
  isNot?: Maybe<Scalars['Boolean']>;
  eq?: Maybe<Scalars['DateTime']>;
  neq?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  between?: Maybe<DateFieldComparisonBetween>;
  notBetween?: Maybe<DateFieldComparisonBetween>;
};

export type DateFieldComparisonBetween = {
  lower: Scalars['DateTime'];
  upper: Scalars['DateTime'];
};


export type DeleteOneInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export enum LoginStrategy {
  Local = 'LOCAL',
  Google = 'GOOGLE'
}

export type Mutation = {
  __typename?: 'Mutation';
  login: Scalars['Boolean'];
  register: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  activateAccount: Scalars['Boolean'];
  setDevice: Scalars['Boolean'];
  createDevice: Scalars['Boolean'];
  createOnePlaylist: Playlist;
  updateOnePlaylist: Playlist;
  deleteOnePlaylist: PlaylistDeleteResponse;
  playlistInvite: Scalars['Boolean'];
  playlistKick: Scalars['Boolean'];
  playlistEntryMove: Scalars['Boolean'];
  playlistEntryRemove: Scalars['Boolean'];
  playlistEntryAdd: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: RegisterDto;
};


export type MutationActivateAccountArgs = {
  validationCode: Scalars['String'];
};


export type MutationSetDeviceArgs = {
  deviceSecret: Scalars['String'];
  deviceName: Scalars['String'];
};


export type MutationCreateDeviceArgs = {
  deviceSecret: Scalars['String'];
  deviceName: Scalars['String'];
};


export type MutationCreateOnePlaylistArgs = {
  input: CreateOnePlaylistInput;
};


export type MutationUpdateOnePlaylistArgs = {
  input: UpdateOneInput;
};


export type MutationDeleteOnePlaylistArgs = {
  input: DeleteOneInput;
};


export type MutationPlaylistInviteArgs = {
  device: Scalars['ID'];
  playlist: Scalars['ID'];
};


export type MutationPlaylistKickArgs = {
  device: Scalars['ID'];
  playlist: Scalars['ID'];
};


export type MutationPlaylistEntryMoveArgs = {
  newIndex: Scalars['Int'];
  index: Scalars['Int'];
  playlist: Scalars['ID'];
};


export type MutationPlaylistEntryRemoveArgs = {
  index: Scalars['Int'];
  playlist: Scalars['ID'];
};


export type MutationPlaylistEntryAddArgs = {
  name: Scalars['String'];
  youtubeId: Scalars['String'];
  playlist: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars['Boolean']>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  /** The cursor of the first returned record. */
  startCursor?: Maybe<Scalars['ConnectionCursor']>;
  /** The cursor of the last returned record. */
  endCursor?: Maybe<Scalars['ConnectionCursor']>;
};

export type Playlist = {
  __typename?: 'Playlist';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  public: Scalars['Boolean'];
  everyoneCanEdit: Scalars['Boolean'];
  entries: Array<PlaylistEntry>;
  owner: User;
  ownerDevice: UserDevice;
  playlistUsers: PlaylistPlaylistUsersConnection;
};


export type PlaylistPlaylistUsersArgs = {
  paging?: Maybe<CursorPaging>;
  filter?: Maybe<PlaylistUserFilter>;
  sorting?: Maybe<Array<PlaylistUserSort>>;
};

export type PlaylistAggregateGroupBy = {
  __typename?: 'PlaylistAggregateGroupBy';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
};

export type PlaylistConnection = {
  __typename?: 'PlaylistConnection';
  /** Paging information */
  pageInfo: PageInfo;
  /** Array of edges. */
  edges: Array<PlaylistEdge>;
};

export type PlaylistCountAggregate = {
  __typename?: 'PlaylistCountAggregate';
  id?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
};

export type PlaylistDeleteEvent = {
  __typename?: 'PlaylistDeleteEvent';
  playlistId: Scalars['ID'];
};

export type PlaylistDeleteResponse = {
  __typename?: 'PlaylistDeleteResponse';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  public?: Maybe<Scalars['Boolean']>;
  everyoneCanEdit?: Maybe<Scalars['Boolean']>;
  entries?: Maybe<Array<PlaylistEntry>>;
};

export type PlaylistEdge = {
  __typename?: 'PlaylistEdge';
  /** The node containing the Playlist */
  node: Playlist;
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
};

export type PlaylistEntry = {
  __typename?: 'PlaylistEntry';
  name: Scalars['String'];
  youtubeId: Scalars['String'];
};

export type PlaylistEntryAddEvent = {
  __typename?: 'PlaylistEntryAddEvent';
  playlistId: Scalars['ID'];
  youtubeId: Scalars['String'];
};

export type PlaylistEntryMoveEvent = {
  __typename?: 'PlaylistEntryMoveEvent';
  playlistId: Scalars['ID'];
  index: Scalars['Int'];
  newIndex: Scalars['Int'];
};

export type PlaylistEntryRemoveEvent = {
  __typename?: 'PlaylistEntryRemoveEvent';
  playlistId: Scalars['ID'];
  index: Scalars['Int'];
};

export type PlaylistEvent = PlaylistInviteEvent | PlaylistKickEvent | PlaylistDeleteEvent | PlaylistUpdateEvent | PlaylistEntryMoveEvent | PlaylistEntryRemoveEvent | PlaylistEntryAddEvent;

export type PlaylistFilter = {
  and?: Maybe<Array<PlaylistFilter>>;
  or?: Maybe<Array<PlaylistFilter>>;
  id?: Maybe<PlaylistIdFilterComparison>;
  createdAt?: Maybe<DateFieldComparison>;
  updatedAt?: Maybe<DateFieldComparison>;
  name?: Maybe<StringFieldComparison>;
  playlistUsers?: Maybe<PlaylistFilterPlaylistUserFilter>;
};

export type PlaylistFilterPlaylistUserFilter = {
  and?: Maybe<Array<PlaylistFilterPlaylistUserFilter>>;
  or?: Maybe<Array<PlaylistFilterPlaylistUserFilter>>;
  id?: Maybe<PlaylistUserIdFilterComparison>;
  createdAt?: Maybe<DateFieldComparison>;
  updatedAt?: Maybe<DateFieldComparison>;
};

export type PlaylistIdFilterComparison = {
  eq?: Maybe<Scalars['ID']>;
  in?: Maybe<Array<Scalars['ID']>>;
};

export type PlaylistInviteEvent = {
  __typename?: 'PlaylistInviteEvent';
  playlistId: Scalars['ID'];
  deviceId: Scalars['ID'];
  deviceName: Scalars['String'];
  userId: Scalars['ID'];
  userName: Scalars['String'];
};

export type PlaylistKickEvent = {
  __typename?: 'PlaylistKickEvent';
  playlistId: Scalars['ID'];
  deviceId: Scalars['ID'];
  deviceName: Scalars['String'];
  userId: Scalars['ID'];
  userName: Scalars['String'];
};

export type PlaylistMaxAggregate = {
  __typename?: 'PlaylistMaxAggregate';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
};

export type PlaylistMinAggregate = {
  __typename?: 'PlaylistMinAggregate';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
};

export type PlaylistPlaylistUsersConnection = {
  __typename?: 'PlaylistPlaylistUsersConnection';
  /** Paging information */
  pageInfo: PageInfo;
  /** Array of edges. */
  edges: Array<PlaylistUserEdge>;
};

export type PlaylistSort = {
  field: PlaylistSortFields;
  direction: SortDirection;
  nulls?: Maybe<SortNulls>;
};

export enum PlaylistSortFields {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Name = 'name'
}

export type PlaylistUpdateEvent = {
  __typename?: 'PlaylistUpdateEvent';
  playlistId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  public?: Maybe<Scalars['Boolean']>;
  everyoneCanEdit?: Maybe<Scalars['Boolean']>;
};

export type PlaylistUser = {
  __typename?: 'PlaylistUser';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  playlist: Playlist;
  user: User;
  userDevice: UserDevice;
};

export type PlaylistUserAggregateGroupBy = {
  __typename?: 'PlaylistUserAggregateGroupBy';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PlaylistUserCountAggregate = {
  __typename?: 'PlaylistUserCountAggregate';
  id?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type PlaylistUserEdge = {
  __typename?: 'PlaylistUserEdge';
  /** The node containing the PlaylistUser */
  node: PlaylistUser;
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
};

export type PlaylistUserFilter = {
  and?: Maybe<Array<PlaylistUserFilter>>;
  or?: Maybe<Array<PlaylistUserFilter>>;
  id?: Maybe<PlaylistUserIdFilterComparison>;
  createdAt?: Maybe<DateFieldComparison>;
  updatedAt?: Maybe<DateFieldComparison>;
};

export type PlaylistUserIdFilterComparison = {
  eq?: Maybe<Scalars['ID']>;
  in?: Maybe<Array<Scalars['ID']>>;
};

export type PlaylistUserMaxAggregate = {
  __typename?: 'PlaylistUserMaxAggregate';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PlaylistUserMinAggregate = {
  __typename?: 'PlaylistUserMinAggregate';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PlaylistUserSort = {
  field: PlaylistUserSortFields;
  direction: SortDirection;
  nulls?: Maybe<SortNulls>;
};

export enum PlaylistUserSortFields {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users: UserConnection;
  userDevice?: Maybe<UserDevice>;
  userDevices: UserDeviceConnection;
  me: User;
  currentDevice: UserDevice;
  googleOAuthUrl: Scalars['String'];
  session?: Maybe<UserSession>;
  playlist?: Maybe<Playlist>;
  playlists: PlaylistConnection;
  playlistUser?: Maybe<PlaylistUser>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  paging?: Maybe<CursorPaging>;
  filter?: Maybe<UserFilter>;
  sorting?: Maybe<Array<UserSort>>;
};


export type QueryUserDeviceArgs = {
  id: Scalars['ID'];
};


export type QueryUserDevicesArgs = {
  paging?: Maybe<CursorPaging>;
  filter?: Maybe<UserDeviceFilter>;
  sorting?: Maybe<Array<UserDeviceSort>>;
};


export type QueryPlaylistArgs = {
  id: Scalars['ID'];
};


export type QueryPlaylistsArgs = {
  paging?: Maybe<CursorPaging>;
  filter?: Maybe<PlaylistFilter>;
  sorting?: Maybe<Array<PlaylistSort>>;
};


export type QueryPlaylistUserArgs = {
  id: Scalars['ID'];
};

export type RegisterDto = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};

/** Sort Directions */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Sort Nulls Options */
export enum SortNulls {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export type StringFieldComparison = {
  is?: Maybe<Scalars['Boolean']>;
  isNot?: Maybe<Scalars['Boolean']>;
  eq?: Maybe<Scalars['String']>;
  neq?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  like?: Maybe<Scalars['String']>;
  notLike?: Maybe<Scalars['String']>;
  iLike?: Maybe<Scalars['String']>;
  notILike?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  playlistEvents: PlaylistEvent;
};


export type SubscriptionPlaylistEventsArgs = {
  playlist: Scalars['ID'];
};

export type UpdateOneInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdatePlaylistDto;
};

export type UpdatePlaylistDto = {
  public?: Maybe<Scalars['Boolean']>;
  everyoneCanEdit?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  email: Scalars['String'];
  devices: Array<UserDevice>;
};


export type UserDevicesArgs = {
  filter?: Maybe<UserDeviceFilter>;
  sorting?: Maybe<Array<UserDeviceSort>>;
};

export type UserAggregateGroupBy = {
  __typename?: 'UserAggregateGroupBy';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  /** Paging information */
  pageInfo: PageInfo;
  /** Array of edges. */
  edges: Array<UserEdge>;
};

export type UserCountAggregate = {
  __typename?: 'UserCountAggregate';
  id?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
};

export type UserDevice = {
  __typename?: 'UserDevice';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  user: User;
};

export type UserDeviceAggregateGroupBy = {
  __typename?: 'UserDeviceAggregateGroupBy';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserDeviceConnection = {
  __typename?: 'UserDeviceConnection';
  /** Paging information */
  pageInfo: PageInfo;
  /** Array of edges. */
  edges: Array<UserDeviceEdge>;
};

export type UserDeviceCountAggregate = {
  __typename?: 'UserDeviceCountAggregate';
  id?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type UserDeviceEdge = {
  __typename?: 'UserDeviceEdge';
  /** The node containing the UserDevice */
  node: UserDevice;
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
};

export type UserDeviceFilter = {
  and?: Maybe<Array<UserDeviceFilter>>;
  or?: Maybe<Array<UserDeviceFilter>>;
  id?: Maybe<UserDeviceIdFilterComparison>;
  createdAt?: Maybe<DateFieldComparison>;
  updatedAt?: Maybe<DateFieldComparison>;
};

export type UserDeviceIdFilterComparison = {
  eq?: Maybe<Scalars['ID']>;
  in?: Maybe<Array<Scalars['ID']>>;
};

export type UserDeviceMaxAggregate = {
  __typename?: 'UserDeviceMaxAggregate';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserDeviceMinAggregate = {
  __typename?: 'UserDeviceMinAggregate';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserDeviceSort = {
  field: UserDeviceSortFields;
  direction: SortDirection;
  nulls?: Maybe<SortNulls>;
};

export enum UserDeviceSortFields {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

export type UserEdge = {
  __typename?: 'UserEdge';
  /** The node containing the User */
  node: User;
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
};

export type UserFilter = {
  and?: Maybe<Array<UserFilter>>;
  or?: Maybe<Array<UserFilter>>;
  id?: Maybe<UserIdFilterComparison>;
  createdAt?: Maybe<DateFieldComparison>;
  updatedAt?: Maybe<DateFieldComparison>;
  name?: Maybe<StringFieldComparison>;
};

export type UserIdFilterComparison = {
  eq?: Maybe<Scalars['ID']>;
  in?: Maybe<Array<Scalars['ID']>>;
};

export type UserMaxAggregate = {
  __typename?: 'UserMaxAggregate';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
};

export type UserMinAggregate = {
  __typename?: 'UserMinAggregate';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
};

export type UserSession = {
  __typename?: 'UserSession';
  id: Scalars['ID'];
  deviceName?: Maybe<Scalars['String']>;
  deviceId?: Maybe<Scalars['ID']>;
  loginStrategy: LoginStrategy;
};

export type UserSort = {
  field: UserSortFields;
  direction: SortDirection;
  nulls?: Maybe<SortNulls>;
};

export enum UserSortFields {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Name = 'name'
}

export type SessionQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  ), session?: Maybe<(
    { __typename?: 'UserSession' }
    & Pick<UserSession, 'id' | 'deviceName' | 'deviceId'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type ActivateAccountMutationVariables = Exact<{
  validationCode: Scalars['String'];
}>;


export type ActivateAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'activateAccount'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export type SetDeviceMutationVariables = Exact<{
  deviceName: Scalars['String'];
  deviceSecret: Scalars['String'];
}>;


export type SetDeviceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setDevice'>
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type CreateDeviceMutationVariables = Exact<{
  deviceName: Scalars['String'];
  deviceSecret: Scalars['String'];
}>;


export type CreateDeviceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createDevice'>
);


export const SessionDocument = gql`
    query session {
  me {
    id
    name
  }
  session {
    id
    deviceName
    deviceId
  }
}
    `;

/**
 * __useSessionQuery__
 *
 * To run a query within a React component, call `useSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useSessionQuery(baseOptions?: Apollo.QueryHookOptions<SessionQuery, SessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SessionQuery, SessionQueryVariables>(SessionDocument, options);
      }
export function useSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SessionQuery, SessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SessionQuery, SessionQueryVariables>(SessionDocument, options);
        }
export type SessionQueryHookResult = ReturnType<typeof useSessionQuery>;
export type SessionLazyQueryHookResult = ReturnType<typeof useSessionLazyQuery>;
export type SessionQueryResult = Apollo.QueryResult<SessionQuery, SessionQueryVariables>;
export function refetchSessionQuery(variables?: SessionQueryVariables) {
      return { query: SessionDocument, variables: variables }
    }
export const RegisterDocument = gql`
    mutation register($email: String!, $name: String!, $password: String!, $confirmPassword: String!) {
  register(
    data: {email: $email, name: $name, password: $password, confirmPassword: $confirmPassword}
  )
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      password: // value for 'password'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ActivateAccountDocument = gql`
    mutation activateAccount($validationCode: String!) {
  activateAccount(validationCode: $validationCode)
}
    `;
export type ActivateAccountMutationFn = Apollo.MutationFunction<ActivateAccountMutation, ActivateAccountMutationVariables>;

/**
 * __useActivateAccountMutation__
 *
 * To run a mutation, you first call `useActivateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateAccountMutation, { data, loading, error }] = useActivateAccountMutation({
 *   variables: {
 *      validationCode: // value for 'validationCode'
 *   },
 * });
 */
export function useActivateAccountMutation(baseOptions?: Apollo.MutationHookOptions<ActivateAccountMutation, ActivateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateAccountMutation, ActivateAccountMutationVariables>(ActivateAccountDocument, options);
      }
export type ActivateAccountMutationHookResult = ReturnType<typeof useActivateAccountMutation>;
export type ActivateAccountMutationResult = Apollo.MutationResult<ActivateAccountMutation>;
export type ActivateAccountMutationOptions = Apollo.BaseMutationOptions<ActivateAccountMutation, ActivateAccountMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SetDeviceDocument = gql`
    mutation setDevice($deviceName: String!, $deviceSecret: String!) {
  setDevice(deviceName: $deviceName, deviceSecret: $deviceSecret)
}
    `;
export type SetDeviceMutationFn = Apollo.MutationFunction<SetDeviceMutation, SetDeviceMutationVariables>;

/**
 * __useSetDeviceMutation__
 *
 * To run a mutation, you first call `useSetDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDeviceMutation, { data, loading, error }] = useSetDeviceMutation({
 *   variables: {
 *      deviceName: // value for 'deviceName'
 *      deviceSecret: // value for 'deviceSecret'
 *   },
 * });
 */
export function useSetDeviceMutation(baseOptions?: Apollo.MutationHookOptions<SetDeviceMutation, SetDeviceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetDeviceMutation, SetDeviceMutationVariables>(SetDeviceDocument, options);
      }
export type SetDeviceMutationHookResult = ReturnType<typeof useSetDeviceMutation>;
export type SetDeviceMutationResult = Apollo.MutationResult<SetDeviceMutation>;
export type SetDeviceMutationOptions = Apollo.BaseMutationOptions<SetDeviceMutation, SetDeviceMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const CreateDeviceDocument = gql`
    mutation createDevice($deviceName: String!, $deviceSecret: String!) {
  createDevice(deviceName: $deviceName, deviceSecret: $deviceSecret)
}
    `;
export type CreateDeviceMutationFn = Apollo.MutationFunction<CreateDeviceMutation, CreateDeviceMutationVariables>;

/**
 * __useCreateDeviceMutation__
 *
 * To run a mutation, you first call `useCreateDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDeviceMutation, { data, loading, error }] = useCreateDeviceMutation({
 *   variables: {
 *      deviceName: // value for 'deviceName'
 *      deviceSecret: // value for 'deviceSecret'
 *   },
 * });
 */
export function useCreateDeviceMutation(baseOptions?: Apollo.MutationHookOptions<CreateDeviceMutation, CreateDeviceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDeviceMutation, CreateDeviceMutationVariables>(CreateDeviceDocument, options);
      }
export type CreateDeviceMutationHookResult = ReturnType<typeof useCreateDeviceMutation>;
export type CreateDeviceMutationResult = Apollo.MutationResult<CreateDeviceMutation>;
export type CreateDeviceMutationOptions = Apollo.BaseMutationOptions<CreateDeviceMutation, CreateDeviceMutationVariables>;