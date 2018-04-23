export class AccountCreationError extends Error {}

export class LoginFailedError extends Error {}

export class InvalidPasswordError extends LoginFailedError {}
