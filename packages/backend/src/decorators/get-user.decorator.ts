import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUserDecorator = createParamDecorator(
  (field: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return field ? request.user[field] : request.user;
  },
);