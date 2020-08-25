import { IUserRepository } from "../../respositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";

export class CreateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private mailProvider: IMailProvider
    ) { }

    async execute(data: ICreateUserRequestDTO) {
        const userAlredyExists = await this.userRepository.findByEmail(data.email)

        if (userAlredyExists) {
            throw new Error('User alredy exists.')
        }

        const user = new User(data)

        await this.userRepository.save(user)

        await this.mailProvider.sendMain({
            to: {
                email: data.email,
                name: data.name
            },
            from: {
                email: 'equipe@meuapp.com',
                name: 'Equipe'
            },
            subject: 'Seja Bem vindo á nossa plataforma.',
            body: `<p>Óla, ${data.name} você já pode fazer login na nossa plataforma!</p>`
        })
    }
}