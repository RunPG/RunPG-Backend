export class AlreadyInAGuildError extends Error {
  constructor(msg = 'The user already has a guild') {
    super(msg)

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AlreadyInAGuildError.prototype)
  }
}