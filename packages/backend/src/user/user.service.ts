import { PrismaService } from "@/prisma/prisma.service";
import { ConflictException, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { User } from "./user.model";


@Injectable({ scope: Scope.DEFAULT })
export class UserService {
    constructor(private prismaService: PrismaService) {}

    async createUser(data: User): Promise<User> {
        const existing = await this.prismaService.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (existing) {
            throw new ConflictException('email already exist');
        }

        return this.prismaService.user.create({
            data
        })
    }

    async findById(id: string): Promise<User> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            },
        });
    
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        return user;
    }
    

}