export abstract class PasswordRepository {
  abstract getHashedPasswordByUserEmail(email: string): Promise<string | null>
}
