import type { ExecutionContext } from "@nestjs/common";
import  { BadRequestException, createParamDecorator } from "@nestjs/common";
import type { Request } from "express";

export interface Pagination {
    page: number;
    limit: number;
    size: number;
    offset: number;
}

export const PaginationParams = createParamDecorator((data, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest();
    const page = parseInt(req.query.page  as string);
    const size = parseInt(req.query.size as string);

    if (isNaN(page) || page < 0 || isNaN(size) || size < 0) {
        throw new BadRequestException('Invalid pagination params');
    }
    if (size > 100) {
        throw new BadRequestException('Invalid pagination param: Max size is 100');
    }

    const limit = size;
    const offset = page * limit;
    return { page, limit, size, offset };
});