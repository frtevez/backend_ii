import MongoDao from "./mongo.dao.js";
import TicketModel from "./models/ticket.model.js";

class TicketDao extends MongoDao {
  constructor(model) {
    super(model);
  }
}

export const ticketDao = new TicketDao(TicketModel);