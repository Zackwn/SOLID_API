import { Request, Response } from 'express'
import { CreateUserUseCasa } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCasa
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      password
    } = req.body

    try {
      await this.createUserUseCase.execute({
        name,
        email,
        password
      })

      return res.status(201).send()
    } catch (error) {
      res.status(400).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}