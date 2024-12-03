import { getUserById, updateUser } from "../services/userService";
import { AppDataSource } from "../config/db";

beforeEach(async () => {
  const userRepository = AppDataSource.getRepository("User");

  await userRepository.save({
    id: 12,
    email: "admin@example.com",
    password: "hashed-password",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
  });
});

describe("User Service", () => {
  it("should fetch a user by ID", async () => {
    const user = await getUserById(12); // Seeded user ID
    expect(user).not.toBeNull();
    expect(user?.email).toBe("admin@example.com");
  });

  it("should update a user's profile", async () => {
    const updatedUser = await updateUser(12, { firstName: "Updated" });
    expect(updatedUser.firstName).toBe("Updated");
  });
});
