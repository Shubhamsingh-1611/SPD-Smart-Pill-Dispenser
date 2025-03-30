// controllers/userController.js
import bcrypt from "bcrypt"
import  { validationResult } from "express-validator"
import User from "../models/user.model.js"

//  Get all users
const getAllUsers = async (req, res) => {
  // try {
  //   const users = await User.find();
  //   res.json(users);
  // } catch (error) {
  //   console.error('Error getting users:', error);
  //   res.status(500).json({ message: 'Failed to retrieve users' });
  // }
  res.send("working");
};

//  Get a user by ID
const getUserById = async (req, res) => {
  // try {
  //   const user = await User.findById(req.params.id);
  //   if (!user) {
  //     return res.status(404).json({ message: 'User not found' });
  //   }
  //   res.json(user);
  // } catch (error) {
  //   console.error('Error getting user:', error);
  //   res.status(500).json({ message: 'Failed to retrieve user' });
  // }
  res.send("getting users")
};

//  Update a user by ID
const updateUser = async (req, res) => {
  try {
    const { role, firstName, lastName, email, password, phone, address, doctorLicense, caregivers } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    //  Update user fields
    user.role = role || user.role;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    //  Handle role-specific updates
    if (role === 'doctor') {
      user.doctorLicense = doctorLicense || user.doctorLicense;
    } else if (role === 'patient') {
      if (caregivers && Array.isArray(caregivers)) {
        user.caregivers = caregivers;
      }
    } else if (role === 'caregiver') {
      if (req.body.patients && Array.isArray(req.body.patients)) {
        user.patients = req.body.patients;
      }
    }

    await user.save();
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

//  Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

//  Registration route
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { role, firstName, lastName, email, password, phone, address, doctorLicense, caregivers } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      role,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    if (role === 'doctor') {
      newUser.doctorLicense = doctorLicense;
    } else if (role === 'patient') {
      if (caregivers && Array.isArray(caregivers)) {
        newUser.caregivers = caregivers;
      }
    } else if (role === 'caregiver') {
      if (req.body.patients && Array.isArray(req.body.patients)) {
        newUser.patients = req.body.patients;
      }
    }

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

export { getAllUsers, getUserById, updateUser, deleteUser,registerUser };
