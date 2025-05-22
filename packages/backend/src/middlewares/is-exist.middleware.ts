import { Injectable, NestMiddleware, NotFoundException, BadRequestException, Type } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '@/orm';

type DelegateWithFindUnique<T = unknown> = {
    findUnique: (args: { where: { id: string } }) => Promise<T | null>;
};
  

export function CallIsExistMiddleware(entityName: string): Type<NestMiddleware> {
    @Injectable()
    class IsExistMiddleware implements NestMiddleware {
        constructor(private readonly prismaService: PrismaService) {}

        async use(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        if (!entityName || typeof entityName !== 'string') {
            throw new BadRequestException('Entity name is required and should be a string.');
        }

        const modelName = entityName as keyof PrismaService;
        if (!(modelName in this.prismaService)) {
            throw new BadRequestException(`Unknown or unsupported entity: ${entityName}`);
        }

        const model = this.prismaService[modelName] as unknown as DelegateWithFindUnique;

        const entity = await model.findUnique({
            where: { id },
        });

        if (!entity) {
            throw new NotFoundException(`${entityName} with id: ${id} not found.`);
        }

        next();
    }
  }

  return IsExistMiddleware;
}
