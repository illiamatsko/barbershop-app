export abstract class PasswordHelper {
  abstract hashPassword(password: string): Promise<string>

  abstract checkPassword(password: string, bd_password: string): Promise<boolean>
}
