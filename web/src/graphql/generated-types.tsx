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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CreatePlaylistDto = {
  name: Scalars['String'];
  public: Scalars['Boolean'];
  everyoneCanEdit: Scalars['Boolean'];
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
  createPlaylist: Scalars['ID'];
  updatePlaylist: Scalars['Boolean'];
  deletePlaylist: Scalars['Boolean'];
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


export type MutationCreatePlaylistArgs = {
  data: CreatePlaylistDto;
};


export type MutationUpdatePlaylistArgs = {
  data: UpdatePlaylistDto;
  id: Scalars['ID'];
};


export type MutationDeletePlaylistArgs = {
  id: Scalars['ID'];
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
  youtubeId: Scalars['String'];
  playlist: Scalars['ID'];
};

export type PlaylistDeleteEvent = {
  __typename?: 'PlaylistDeleteEvent';
  playlistId: Scalars['ID'];
};

export type PlaylistEntity = {
  __typename?: 'PlaylistEntity';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  owner: UserEntity;
  ownerDevice: UserDeviceEntity;
  name: Scalars['String'];
  public: Scalars['Boolean'];
  everyoneCanEdit: Scalars['Boolean'];
  playlistUsers: Array<PlaylistUserEntity>;
  entries: Array<Scalars['String']>;
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

export type PlaylistUpdateEvent = {
  __typename?: 'PlaylistUpdateEvent';
  playlistId: Scalars['ID'];
  name: Scalars['String'];
  public: Scalars['Boolean'];
  everyoneCanEdit: Scalars['Boolean'];
};

export type PlaylistUserEntity = {
  __typename?: 'PlaylistUserEntity';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  playlist: PlaylistEntity;
  user: UserEntity;
  userDevice: UserDeviceEntity;
};

export type Query = {
  __typename?: 'Query';
  userById: UserEntity;
  me: UserEntity;
  currentDevice: UserDeviceEntity;
  googleOAuthUrl: Scalars['String'];
  session?: Maybe<UserSession>;
  publicPlaylists: Array<PlaylistEntity>;
};


export type QueryUserByIdArgs = {
  id: Scalars['ID'];
};

export type RegisterDto = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  playlistEvents: PlaylistEvent;
};


export type SubscriptionPlaylistEventsArgs = {
  playlist: Scalars['ID'];
};

export type UpdatePlaylistDto = {
  name?: Maybe<Scalars['String']>;
  public?: Maybe<Scalars['Boolean']>;
  everyoneCanEdit?: Maybe<Scalars['Boolean']>;
};

export type UserDeviceEntity = {
  __typename?: 'UserDeviceEntity';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: UserEntity;
  name: Scalars['String'];
  invitedPlaylistUsers: Array<PlaylistUserEntity>;
  ownPlaylists: Array<PlaylistEntity>;
};

export type UserEntity = {
  __typename?: 'UserEntity';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  email: Scalars['String'];
  hasPassword: Scalars['Boolean'];
  isGoogleLinked: Scalars['Boolean'];
  devices: Array<UserDeviceEntity>;
  playlistUsers: Array<PlaylistUserEntity>;
  ownPlaylists: PlaylistEntity;
};

export type UserSession = {
  __typename?: 'UserSession';
  id: Scalars['ID'];
  deviceName?: Maybe<Scalars['String']>;
  deviceId?: Maybe<Scalars['ID']>;
  loginStrategy: LoginStrategy;
};

export type SessionQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'UserEntity' }
    & Pick<UserEntity, 'id' | 'name'>
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