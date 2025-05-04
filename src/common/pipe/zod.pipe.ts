import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Schema } from 'zod';

@Injectable()
export class ZodPipe implements PipeTransform {
  constructor(private schema: Schema<unknown>) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: unknown, metadata: ArgumentMetadata) {
    const data: unknown = this.schema.parse(value);
    return data;
  }
}
