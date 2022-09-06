import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(6)
  @MaxLength(10)
  username: string;

  @MinLength(8)
  @MaxLength(12)
  // @Matches(
  //   /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  //   { message: 'password is too week' },
  // )
  password: string;
}
