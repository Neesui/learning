import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Nisha',
      email: 'nisha@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Nsha',
      email: 'namu@gmail.com',
      role: 'USER',
    },
    {
      id: 3,
      name: 'Neetu',
      email: 'neetu@gmail.com',
      role: 'USER',
    },
  ];

  // Get all users or filter by role
  findAll(role?: 'ADMIN' | 'USER') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  // Get user by ID
  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  // Create new user
  create(user: { name: string; email: string; role: 'ADMIN' | 'USER' }) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  // Update user by ID
  update(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'ADMIN' | 'USER';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findOne(id);
  }

  // Delete user by ID
  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
