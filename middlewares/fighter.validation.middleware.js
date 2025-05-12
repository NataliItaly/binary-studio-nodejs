import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  const fighter = req.body;
  const allowedFields = Object.keys(Fighter);
  const requiredFields = allowedFields.filter((f) => Fighter[f] === "required");

  if ("id" in fighter) {
    return res.status(400).json({ error: "Do not provide ID manually." });
  }

  const extraFields = Object.keys(fighter).filter(
    (f) => !allowedFields.includes(f)
  );
  if (extraFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Unexpected fields: ${extraFields.join(", ")}` });
  }

  const missingFields = requiredFields.filter((f) => !(f in fighter));
  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Missing fields: ${missingFields.join(", ")}` });
  }

  const { power, defense, health } = fighter;

  if (!(power >= 1 && power <= 100)) {
    return res.status(400).json({ error: "Power must be between 1 and 100." });
  }
  if (!(defense >= 1 && defense <= 10)) {
    return res.status(400).json({ error: "Defense must be between 1 and 10." });
  }
  if ("health" in fighter && !(health >= 80 && health <= 120)) {
    return res
      .status(400)
      .json({ error: "Health must be between 80 and 120." });
  }
  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  const fighter = req.body;
  const allowedFields = Object.keys(Fighter);

  if ("id" in fighter) {
    return res.status(400).json({ error: "Cannot update ID." });
  }

  const providedFields = Object.keys(fighter);
  if (providedFields.length === 0) {
    return res
      .status(400)
      .json({ error: "Provide at least one field to update." });
  }

  const extraFields = providedFields.filter((f) => !allowedFields.includes(f));
  if (extraFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Unexpected fields: ${extraFields.join(", ")}` });
  }
  next();
};

export { createFighterValid, updateFighterValid };
