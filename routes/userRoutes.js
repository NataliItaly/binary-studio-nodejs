import { Router } from "express";
import { userService, userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user
router.get("/", (req, res) => {
  res.json(userService.getAllUsers());
});

router.get("/:id", (req, res) => {
  const user = userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.post("/", validateCreateUser, (req, res) => {
  const newUser = userService.createUser(req.body);
  res.status(201).json(newUser);
});

router.patch("/:id", validateUpdateUser, (req, res) => {
  const updated = userService.updateUser(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "User not found" });
  res.json(updated);
});

router.delete("/:id", (req, res) => {
  const success = userService.deleteUser(req.params.id);
  if (!success) return res.status(404).json({ error: "User not found" });
  res.status(204).send();
});

export { router };
