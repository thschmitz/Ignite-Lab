import { IsOptional, IsUUID, Length } from 'class-validator';

export class UpdateNotificationBody {
  @IsOptional()
  @IsUUID()
  recipientId: string;
  @IsOptional()
  @Length(5, 240)
  content: string;
  @IsOptional()
  @Length(5, 240)
  category: string;
}

// DTO - Data Transfer Object
