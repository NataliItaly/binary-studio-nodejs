import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user
  constructor() {
    this.userRepository = new userRepository();
  }

  getAllUsers() {
    return this.userRepository.getAll();
  }

  getUserById(id) {
    return this.userRepository.getById(id);
  }

  createUser(data) {
    return this.userRepository.create(data);
  }

  updateUser(id, data) {
    return this.userRepository.update(id, data);
  }

  deleteUser(id) {
    return this.userRepository.delete(id);
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
