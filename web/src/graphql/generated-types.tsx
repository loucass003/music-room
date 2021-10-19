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


export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  type: Scalars['Float'];
  playlist: Playlist;
  members: Array<User>;
  messages: ConversationMessagesConnection;
};


export type ConversationMembersArgs = {
  filter?: Maybe<UserFilter>;
  sorting?: Maybe<Array<UserSort>>;
};


export type ConversationMessagesArgs = {
  paging?: Maybe<CursorPaging>;
  filter?: Maybe<MessageFilter>;
  sorting?: Maybe<Array<MessageSort>>;
};

export type ConversationAggregateGroupBy = {
  __typename?: 'ConversationAggregateGroupBy';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<Scalars['Float']>;
};

export type ConversationAvgAggregate = {
  __typename?: 'ConversationAvgAggregate';
  type?: Maybe<Scalars['Float']>;
};

export type ConversationConnection = {
  __typename?: 'ConversationConnection';
  /** Paging information */
  pageInfo: PageInfo;
  /** Array of edges. */
  edges: Array<ConversationEdge>;
};

export type ConversationCountAggregate = {
  __typename?: 'ConversationCountAggregate';
  id?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
};

export type ConversationEdge = {
  __typename?: 'ConversationEdge';
  /** The node containing the Conversation */
  node: Conversation;
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
};

export type ConversationEvent = NewMessageEvent;

export type ConversationFilter = {
  and?: Maybe<Array<ConversationFilter>>;
  or?: Maybe<Array<ConversationFilter>>;
  id?: Maybe<ConversationIdFilterComparison>;
  createdAt?: Maybe<DateFieldComparison>;
  updatedAt?: Maybe<DateFieldComparison>;
  type?: Maybe<NumberFieldComparison>;
};

export type ConversationIdFilterComparison = {
  eq?: Maybe<Scalars['ID']>;
  in?: Maybe<Array<Scalars['ID']>>;
};

export type ConversationMaxAggregate = {
  __typename?: 'ConversationMaxAggregate';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<Scalars['Float']>;
};

export type ConversationMessagesConnection = {
  __typename?: 'ConversationMessagesConnection';
  /** Paging information */
  pageInfo: PageInfo;
  /** Array of edges. */
  edges: Array<MessageEdge>;
};

export type ConversationMinAggregate = {
  __typename?: 'ConversationMinAggregate';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<Scalars['Float']>;
};

export type ConversationSort = {
  field: ConversationSortFields;
  direction: SortDirection;
  nulls?: Maybe<SortNulls>;
};

export enum ConversationSortFields {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Type = 'type'
}

export type ConversationSumAggregate = {
  __typename?: 'ConversationSumAggregate';
  type?: Maybe<Scalars['Float']>;
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

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  content: Scalars['String'];
  conversation: Conversation;
  author: User;
};

export type MessageAggregateGroupBy = {
  __typename?: 'MessageAggregateGroupBy';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MessageConnection = {
  __typename?: 'MessageConnection';
  /** Paging information */
  pageInfo: PageInfo;
  /** Array of edges. */
  edges: Array<MessageEdge>;
};

export type MessageCountAggregate = {
  __typename?: 'MessageCountAggregate';
  id?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type MessageEdge = {
  __typename?: 'MessageEdge';
  /** The node containing the Message */
  node: Message;
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
};

export type MessageFilter = {
  and?: Maybe<Array<MessageFilter>>;
  or?: Maybe<Array<MessageFilter>>;
  id?: Maybe<MessageIdFilterComparison>;
  createdAt?: Maybe<DateFieldComparison>;
  updatedAt?: Maybe<DateFieldComparison>;
};

export type MessageIdFilterComparison = {
  eq?: Maybe<Scalars['ID']>;
  in?: Maybe<Array<Scalars['ID']>>;
};

export type MessageMaxAggregate = {
  __typename?: 'MessageMaxAggregate';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MessageMinAggregate = {
  __typename?: 'MessageMinAggregate';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MessageSort = {
  field: MessageSortFields;
  direction: SortDirection;
  nulls?: Maybe<SortNulls>;
};

export enum MessageSortFields {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

export type Mutation = {
  __typename?: 'Mutation';
  updateOneUser: User;
  login: Scalars['Boolean'];
  register: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  sendResetPassword: Scalars['Boolean'];
  resetPassword: Scalars['Boolean'];
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
  sendMessage: Scalars['Boolean'];
};


export type MutationUpdateOneUserArgs = {
  input: UpdateOneUserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: RegisterDto;
};


export type MutationSendResetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordDto;
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


export type MutationSendMessageArgs = {
  content: Scalars['String'];
  conversation: Scalars['ID'];
};

export type NewMessageEvent = {
  __typename?: 'NewMessageEvent';
  message: Message;
};

export type NumberFieldComparison = {
  is?: Maybe<Scalars['Boolean']>;
  isNot?: Maybe<Scalars['Boolean']>;
  eq?: Maybe<Scalars['Float']>;
  neq?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  gte?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  lte?: Maybe<Scalars['Float']>;
  in?: Maybe<Array<Scalars['Float']>>;
  notIn?: Maybe<Array<Scalars['Float']>>;
  between?: Maybe<NumberFieldComparisonBetween>;
  notBetween?: Maybe<NumberFieldComparisonBetween>;
};

export type NumberFieldComparisonBetween = {
  lower: Scalars['Float'];
  upper: Scalars['Float'];
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
  verifyResetPasswordToken: Scalars['Boolean'];
  playlist?: Maybe<Playlist>;
  playlists: PlaylistConnection;
  playlistUser?: Maybe<PlaylistUser>;
  conversation?: Maybe<Conversation>;
  conversations: ConversationConnection;
  message?: Maybe<Message>;
  messages: MessageConnection;
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


export type QueryVerifyResetPasswordTokenArgs = {
  token: Scalars['String'];
  id: Scalars['String'];
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


export type QueryConversationArgs = {
  id: Scalars['ID'];
};


export type QueryConversationsArgs = {
  paging?: Maybe<CursorPaging>;
  filter?: Maybe<ConversationFilter>;
  sorting?: Maybe<Array<ConversationSort>>;
};


export type QueryMessageArgs = {
  id: Scalars['ID'];
};


export type QueryMessagesArgs = {
  paging?: Maybe<CursorPaging>;
  filter?: Maybe<MessageFilter>;
  sorting?: Maybe<Array<MessageSort>>;
};

export type RegisterDto = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};

export type ResetPasswordDto = {
  id: Scalars['String'];
  token: Scalars['String'];
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
  watchMessages: Message;
};


export type SubscriptionPlaylistEventsArgs = {
  playlist: Scalars['ID'];
};


export type SubscriptionWatchMessagesArgs = {
  conversation: Scalars['ID'];
};

export type UpdateOneInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdatePlaylistDto;
};

export type UpdateOneUserInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateUserDto;
};

export type UpdatePlaylistDto = {
  public?: Maybe<Scalars['Boolean']>;
  everyoneCanEdit?: Maybe<Scalars['Boolean']>;
};

export type UpdateUserDto = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
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

export type ConversationsListQueryVariables = Exact<{
  type?: Maybe<Scalars['Float']>;
}>;


export type ConversationsListQuery = (
  { __typename?: 'Query' }
  & { conversations: (
    { __typename?: 'ConversationConnection' }
    & { edges: Array<(
      { __typename?: 'ConversationEdge' }
      & { node: (
        { __typename?: 'Conversation' }
        & Pick<Conversation, 'id'>
        & { members: Array<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'name'>
        )> }
      ) }
    )> }
  ) }
);

export type ConversationQueryVariables = Exact<{
  id: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
}>;


export type ConversationQuery = (
  { __typename?: 'Query' }
  & { conversation?: Maybe<(
    { __typename?: 'Conversation' }
    & Pick<Conversation, 'id'>
    & { members: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )>, messages: (
      { __typename?: 'ConversationMessagesConnection' }
      & { edges: Array<(
        { __typename?: 'MessageEdge' }
        & { node: (
          { __typename?: 'Message' }
          & Pick<Message, 'id' | 'content' | 'createdAt'>
          & { author: (
            { __typename?: 'User' }
            & Pick<User, 'id' | 'name'>
          ) }
        ) }
      )> }
    ) }
  )> }
);

export type SendMessageMutationVariables = Exact<{
  content: Scalars['String'];
  conversation: Scalars['ID'];
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendMessage'>
);

export type WatchConversationSubscriptionVariables = Exact<{
  conversation: Scalars['ID'];
}>;


export type WatchConversationSubscription = (
  { __typename?: 'Subscription' }
  & { watchConversation: (
    { __typename?: 'NewMessageEvent' }
    & { message: (
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'content' | 'createdAt'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name'>
      ) }
    ) }
  ) }
);

export type SessionQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
  ), session?: Maybe<(
    { __typename?: 'UserSession' }
    & Pick<UserSession, 'id' | 'deviceName' | 'deviceId'>
  )> }
);

export type VerifyResetPasswordTokenQueryVariables = Exact<{
  id: Scalars['String'];
  token: Scalars['String'];
}>;


export type VerifyResetPasswordTokenQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'verifyResetPasswordToken'>
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

export type SendResetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendResetPassword'>
);

export type ResetPasswordMutationVariables = Exact<{
  id: Scalars['String'];
  token: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resetPassword'>
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

export type ChangeSettingsMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
}>;


export type ChangeSettingsMutation = (
  { __typename?: 'Mutation' }
  & { updateOneUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )> }
);


export const ConversationsListDocument = gql`
    query conversationsList($type: Float = 0) {
  conversations(filter: {type: {eq: $type}}) {
    edges {
      node {
        id
        members {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useConversationsListQuery__
 *
 * To run a query within a React component, call `useConversationsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationsListQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useConversationsListQuery(baseOptions?: Apollo.QueryHookOptions<ConversationsListQuery, ConversationsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConversationsListQuery, ConversationsListQueryVariables>(ConversationsListDocument, options);
      }
export function useConversationsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConversationsListQuery, ConversationsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConversationsListQuery, ConversationsListQueryVariables>(ConversationsListDocument, options);
        }
export type ConversationsListQueryHookResult = ReturnType<typeof useConversationsListQuery>;
export type ConversationsListLazyQueryHookResult = ReturnType<typeof useConversationsListLazyQuery>;
export type ConversationsListQueryResult = Apollo.QueryResult<ConversationsListQuery, ConversationsListQueryVariables>;
export function refetchConversationsListQuery(variables?: ConversationsListQueryVariables) {
      return { query: ConversationsListDocument, variables: variables }
    }
export const ConversationDocument = gql`
    query conversation($id: ID!, $first: Int = 15) {
  conversation(id: $id) {
    id
    members {
      id
      name
    }
    messages(paging: {first: $first}) {
      edges {
        node {
          id
          content
          createdAt
          author {
            id
            name
          }
        }
      }
    }
  }
}
    `;

/**
 * __useConversationQuery__
 *
 * To run a query within a React component, call `useConversationQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationQuery({
 *   variables: {
 *      id: // value for 'id'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useConversationQuery(baseOptions: Apollo.QueryHookOptions<ConversationQuery, ConversationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConversationQuery, ConversationQueryVariables>(ConversationDocument, options);
      }
export function useConversationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConversationQuery, ConversationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConversationQuery, ConversationQueryVariables>(ConversationDocument, options);
        }
export type ConversationQueryHookResult = ReturnType<typeof useConversationQuery>;
export type ConversationLazyQueryHookResult = ReturnType<typeof useConversationLazyQuery>;
export type ConversationQueryResult = Apollo.QueryResult<ConversationQuery, ConversationQueryVariables>;
export function refetchConversationQuery(variables?: ConversationQueryVariables) {
      return { query: ConversationDocument, variables: variables }
    }
export const SendMessageDocument = gql`
    mutation sendMessage($content: String!, $conversation: ID!) {
  sendMessage(content: $content, conversation: $conversation)
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      content: // value for 'content'
 *      conversation: // value for 'conversation'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const WatchConversationDocument = gql`
    subscription watchConversation($conversation: ID!) {
  watchConversation(conversation: $conversation) {
    ... on NewMessageEvent {
      message {
        id
        content
        createdAt
        author {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useWatchConversationSubscription__
 *
 * To run a query within a React component, call `useWatchConversationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWatchConversationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchConversationSubscription({
 *   variables: {
 *      conversation: // value for 'conversation'
 *   },
 * });
 */
export function useWatchConversationSubscription(baseOptions: Apollo.SubscriptionHookOptions<WatchConversationSubscription, WatchConversationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<WatchConversationSubscription, WatchConversationSubscriptionVariables>(WatchConversationDocument, options);
      }
export type WatchConversationSubscriptionHookResult = ReturnType<typeof useWatchConversationSubscription>;
export type WatchConversationSubscriptionResult = Apollo.SubscriptionResult<WatchConversationSubscription>;
export const SessionDocument = gql`
    query session {
  me {
    id
    name
    email
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
export const VerifyResetPasswordTokenDocument = gql`
    query verifyResetPasswordToken($id: String!, $token: String!) {
  verifyResetPasswordToken(id: $id, token: $token)
}
    `;

/**
 * __useVerifyResetPasswordTokenQuery__
 *
 * To run a query within a React component, call `useVerifyResetPasswordTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyResetPasswordTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyResetPasswordTokenQuery({
 *   variables: {
 *      id: // value for 'id'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyResetPasswordTokenQuery(baseOptions: Apollo.QueryHookOptions<VerifyResetPasswordTokenQuery, VerifyResetPasswordTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyResetPasswordTokenQuery, VerifyResetPasswordTokenQueryVariables>(VerifyResetPasswordTokenDocument, options);
      }
export function useVerifyResetPasswordTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyResetPasswordTokenQuery, VerifyResetPasswordTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyResetPasswordTokenQuery, VerifyResetPasswordTokenQueryVariables>(VerifyResetPasswordTokenDocument, options);
        }
export type VerifyResetPasswordTokenQueryHookResult = ReturnType<typeof useVerifyResetPasswordTokenQuery>;
export type VerifyResetPasswordTokenLazyQueryHookResult = ReturnType<typeof useVerifyResetPasswordTokenLazyQuery>;
export type VerifyResetPasswordTokenQueryResult = Apollo.QueryResult<VerifyResetPasswordTokenQuery, VerifyResetPasswordTokenQueryVariables>;
export function refetchVerifyResetPasswordTokenQuery(variables?: VerifyResetPasswordTokenQueryVariables) {
      return { query: VerifyResetPasswordTokenDocument, variables: variables }
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
export const SendResetPasswordDocument = gql`
    mutation sendResetPassword($email: String!) {
  sendResetPassword(email: $email)
}
    `;
export type SendResetPasswordMutationFn = Apollo.MutationFunction<SendResetPasswordMutation, SendResetPasswordMutationVariables>;

/**
 * __useSendResetPasswordMutation__
 *
 * To run a mutation, you first call `useSendResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendResetPasswordMutation, { data, loading, error }] = useSendResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<SendResetPasswordMutation, SendResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendResetPasswordMutation, SendResetPasswordMutationVariables>(SendResetPasswordDocument, options);
      }
export type SendResetPasswordMutationHookResult = ReturnType<typeof useSendResetPasswordMutation>;
export type SendResetPasswordMutationResult = Apollo.MutationResult<SendResetPasswordMutation>;
export type SendResetPasswordMutationOptions = Apollo.BaseMutationOptions<SendResetPasswordMutation, SendResetPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($id: String!, $token: String!, $password: String!, $confirmPassword: String!) {
  resetPassword(
    data: {id: $id, token: $token, password: $password, confirmPassword: $confirmPassword}
  )
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      id: // value for 'id'
 *      token: // value for 'token'
 *      password: // value for 'password'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
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
export const ChangeSettingsDocument = gql`
    mutation changeSettings($id: ID!, $name: String, $email: String) {
  updateOneUser(input: {id: $id, update: {name: $name, email: $email}}) {
    id
  }
}
    `;
export type ChangeSettingsMutationFn = Apollo.MutationFunction<ChangeSettingsMutation, ChangeSettingsMutationVariables>;

/**
 * __useChangeSettingsMutation__
 *
 * To run a mutation, you first call `useChangeSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeSettingsMutation, { data, loading, error }] = useChangeSettingsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useChangeSettingsMutation(baseOptions?: Apollo.MutationHookOptions<ChangeSettingsMutation, ChangeSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeSettingsMutation, ChangeSettingsMutationVariables>(ChangeSettingsDocument, options);
      }
export type ChangeSettingsMutationHookResult = ReturnType<typeof useChangeSettingsMutation>;
export type ChangeSettingsMutationResult = Apollo.MutationResult<ChangeSettingsMutation>;
export type ChangeSettingsMutationOptions = Apollo.BaseMutationOptions<ChangeSettingsMutation, ChangeSettingsMutationVariables>;
export const UserDocument = gql`
    query user($id: ID!) {
  user(id: $id) {
    id
    name
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export function refetchUserQuery(variables?: UserQueryVariables) {
      return { query: UserDocument, variables: variables }
    }