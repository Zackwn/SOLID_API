import { UsersRepository } from "../../respositories/Implementetions/UsersRepository";
import { MailtrapMailProvider } from "../../providers/Implementetions/MailtrapMailProvider";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";

const usersRepository = new UsersRepository()
const mailProvider = new MailtrapMailProvider()

const createUserUseCase = new CreateUserUseCase(
    usersRepository,
    mailProvider
)

const createUserController = new CreateUserController(createUserUseCase)

export { usersRepository, createUserController }