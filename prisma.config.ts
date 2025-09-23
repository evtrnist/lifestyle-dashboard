import { definePrismaConfig } from '@prisma/internals';
import path from 'node:path';

export default definePrismaConfig({
  schema: path.join(__dirname, 'apps/api/prisma/schema.prisma'),
});
