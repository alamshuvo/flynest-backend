"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const prisma = new client_1.PrismaClient();
const seedDatabase = async () => {
    try {
        console.log('Seeding database...');
        const adminExists = await prisma.user.findFirst({
            where: { role: client_1.UserRole.ADMIN },
        });
        if (!adminExists) {
            const password = bcrypt_1.default.hashSync(config_1.default.admin_password, Number(config_1.default.bcrypt.bcryptSaltRounds) || 10);
            await prisma.user.create({
                data: {
                    name: 'Admin User',
                    email: 'admin@example.com',
                    password: password,
                    role: client_1.UserRole.ADMIN,
                },
            });
            console.log(' Admin user created');
        }
        else {
            console.log(' Admin already exists');
        }
        const teacherEmails = ['teacher1@example.com', 'teacher2@example.com'];
        for (const email of teacherEmails) {
            const exists = await prisma.user.findUnique({ where: { email } });
            if (!exists) {
                const password = bcrypt_1.default.hashSync(config_1.default.teacher_password, Number(config_1.default.bcrypt.bcryptSaltRounds) || 10);
                await prisma.user.create({
                    data: {
                        name: email.split('@')[0],
                        email,
                        password: password,
                        role: client_1.UserRole.TEACHER,
                    },
                });
            }
        }
        console.log('Teachers created');
        //   class seeding
        const classNames = [
            { name: 'Eight', section: 'A' },
            { name: 'Nine', section: 'B' },
        ];
        for (const cls of classNames) {
            const exists = await prisma.class.findFirst({
                where: { name: cls.name, section: cls.section },
            });
            if (!exists) {
                await prisma.class.create({ data: cls });
            }
        }
        console.log(' Classes created');
        //  student seeding
        const classes = await prisma.class.findMany();
        const studentNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eva'];
        for (let i = 0; i < studentNames.length; i++) {
            const name = studentNames[i];
            const classAssigned = classes[i % classes.length];
            const exists = await prisma.student.findFirst({ where: { name } });
            if (!exists) {
                await prisma.student.create({
                    data: {
                        name,
                        age: 10 + i,
                        class_id: classAssigned.id,
                    },
                });
            }
        }
        console.log(' Students created and assigned to classes');
        console.log('Dummy Data Seeding completed!');
    }
    catch (err) {
        console.error(' Seeding error:', err);
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.seedDatabase = seedDatabase;
