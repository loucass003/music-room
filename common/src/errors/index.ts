export enum ApiErrors {
  UNAUTHORIZED_NOT_LOGGED_IN,
  UNAUTHORIZED_NO_DEVICE,
  UNAUTHORIZED_FIELD,

  USER_NOT_FOUND,

  AUTH_INVALID_CREDENTIALS,
  AUTH_ACCOUNT_NOT_ACTIVATED,
  AUTH_ACCOUNT_NAME_ALREADY_EXISTS,
  AUTH_ACCOUNT_EMAIL_ALREADY_EXISTS,
  AUTH_ACCOUNT_NOT_FOUND,
  AUTH_DEVICE_NOT_FOUND,
  AUTH_DEVICE_NAME_ALREADY_EXISTS,
  AUTH_INVALID_DEVICE_SECRET,
  AUTH_INVALID_RESET_PASSWORD_TOKEN,

  PLAYLIST_CANNOT_INVITE_YOURSELF,
  PLAYLIST_USER_NOT_FOUND,
  PLAYLIST_ENTRY_OUT_OF_RANGE,

  CONVERSATION_NOT_FOUND,
  CONVERSATION_NOT_A_MEMBER
}

export class ApiError {
  constructor(public type: ApiErrors, public message: string) {}
}