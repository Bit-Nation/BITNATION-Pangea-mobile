export class LoginFailedError extends Error {
  transKey: string = 'loginFailed';
}

export class InvalidPasswordError extends Error {
  transKey: string = 'invalidPassword';
}
