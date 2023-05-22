import { Report } from '../reports/report.entity';
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, OneToMany } from 'typeorm'

console.log('user is: ', Report)

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    admin: boolean;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @AfterInsert()
    logInsert() {
        console.log(`User is created with id: ${this.id}`)
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`User is updated with id: ${this.id}`)
    }

    @AfterRemove()
    logRemove() {
        console.log(`User is removed with id: ${this.id}`)
    }
}