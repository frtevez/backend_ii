import { ticketDao } from "../dao/mongo/ticket.dao.js"
import crypto from "crypto";


class TicketRepository {
    constructor(dao) {
        this.dao = dao
    }

    issue = async (data) => {
        try {
            const { purchaser, purchaserId, amount, items } = data

            const code = crypto.randomUUID()

            return await this.dao.create({ purchaser, purchaserId, amount, items, code })
        } catch (error) {
            throw new Error(error)
        }
    }
}

export const ticketRepository = new TicketRepository(ticketDao)