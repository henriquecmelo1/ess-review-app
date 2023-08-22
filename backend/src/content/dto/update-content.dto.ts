import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateContentDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsNumber()
    @IsOptional()
    duration?: number;

    @IsString()
    @IsOptional()
    genre?: string;

    @IsString()
    @IsOptional()
    director?: string;
  }
  