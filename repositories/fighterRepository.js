import { BaseRepository } from "./baseRepository.js";

class FighterRepository extends BaseRepository {
  constructor() {
    super("fighters");
  }
  save() {
    writeFileSync(DB_PATH, JSON.stringify(this.db, null, 2));
  }

  getAll() {
    return this.db.fighters || [];
  }

  getById(id) {
    return this.getAll().find((f) => f.id === id);
  }

  create(data) {
    const newFighter = { id: Date.now().toString(), ...data };
    this.db.fighters.push(newFighter);
    this.save();
    return newFighter;
  }

  update(id, data) {
    const index = this.db.fighters.findIndex((f) => f.id === id);
    if (index === -1) return null;
    this.db.fighters[index] = { ...this.db.fighters[index], ...data };
    this.save();
    return this.db.fighters[index];
  }

  delete(id) {
    const index = this.db.fighters.findIndex((f) => f.id === id);
    if (index === -1) return false;
    this.db.fighters.splice(index, 1);
    this.save();
    return true;
  }
}

const fighterRepository = new FighterRepository();

export { fighterRepository };
