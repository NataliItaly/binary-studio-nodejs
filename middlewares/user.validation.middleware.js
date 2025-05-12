import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  const user = req.body;
  const allowedFields = Object.keys(USER);
  const requiredFields = allowedFields;

  if ("id" in user) {
    return res.status(400).json({ error: "Do not provide ID manualy" });
  }

  const extraFields = Object.keys(user).filter(
    (field) => !allowedFields.includes(field)
  );
  if (extraFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Unexpected fields: ${extraFields.join(", ")}` });
  }

  const missingFields = requiredFields.filter((field) => !(field in user));
  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Missing fields: ${missingFields.join(", ")}` });
  }

  const { email, phone, password } = user;
  if (!email.endsWith("@gmail.com")) {
    return res.status(400).json({ error: "Email must be a Gmail address." });
  }
  if (!/^\+380\d{9}$/.test(phoneNumber)) {
    return res
      .status(400)
      .json({ error: "Phone must be in format +380XXXXXXXXX" });
  }
  if (password.length < 4) {
    return res
      .status(400)
      .json({ error: "Password must be at least 4 characters." });
  }

  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const user = req.body;
  const allowedFields = Object.keys(USER);

  if ("id" in user) {
    return res.status(400).json({ error: "Cannot update ID." });
  }

  const providedFields = Object.keys(user);
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

export { createUserValid, updateUserValid };
