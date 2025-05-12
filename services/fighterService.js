import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  constructor() {
    this.fighterRepository = new fighterRepository();
  }

  getAllFighters() {
    return this.fighterRepository.getAll();
  }

  getFighterById(id) {
    return this.fighterRepository.getById(id);
  }

  createFighter(data) {
    const fighter = { health: 85, ...data }; // за замовчуванням
    return this.fighterRepository.create(fighter);
  }

  updateFighter(id, data) {
    return this.fighterRepository.update(id, data);
  }

  deleteFighter(id) {
    return this.fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
