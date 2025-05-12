import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();
const fighterService = new FighterService();
// TODO: Implement route controllers for fighter

router.get("/", (req, res) => {
  res.json(fighterService.getAllFighters());
});

router.get("/:id", (req, res) => {
  const fighter = fighterService.getFighterById(req.params.id);
  if (!fighter) return res.status(404).json({ error: "Fighter not found" });
  res.json(fighter);
});

router.post("/", validateCreateFighter, (req, res) => {
  const newFighter = fighterService.createFighter(req.body);
  res.status(201).json(newFighter);
});

router.patch("/:id", validateUpdateFighter, (req, res) => {
  const updated = fighterService.updateFighter(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Fighter not found" });
  res.json(updated);
});

router.delete("/:id", (req, res) => {
  const success = fighterService.deleteFighter(req.params.id);
  if (!success) return res.status(404).json({ error: "Fighter not found" });
  res.status(204).send();
});

export { router };
