import { IsString, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(8, 20)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}

export class UpdateUserDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  @Length(8, 20)
  password: string;

  @IsString()
  role: string;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
