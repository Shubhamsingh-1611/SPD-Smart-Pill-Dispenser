import React, { useState } from 'react';

function RegistrationForm() {
  const [role, setRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  // Role-specific state variables
  const [doctorLicense, setDoctorLicense] = useState('');
  const [patientDoctor, setPatientDoctor] = useState('');
  const [patients, setPatients] = useState([]); // For caregivers

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to the server)
    const userData = {
      role,
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
    };

    if (role === 'doctor') {
      userData.doctorLicense = doctorLicense;
    } else if (role === 'patient') {
      userData.doctor = patientDoctor;
    } else if (role === 'caregiver') {
        userData.patients = patients;
    }

    console.log('Form Data:', userData);
    // You would typically send this data to your backend API
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration</h2>

      <div>
        <label>Role:</label>
        <select value={role} onChange={handleRoleChange} required>
          <option value="">Select Role</option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="caregiver">Caregiver</option>
        </select>
      </div>

      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Phone:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div>
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* Role-specific fields */}
      {role === 'doctor' && (
        <div>
          <label>Doctor License:</label>
          <input
            type="text"
            value={doctorLicense}
            onChange={(e) => setDoctorLicense(e.target.value)}
            required
          />
        </div>
      )}

      {role === 'patient' && (
        <div>
          <label>Doctor:</label>
          {/* You might want to use a select dropdown here to choose from a list of doctors */}
          <input
            type="text"
            value={patientDoctor}
            onChange={(e) => setPatientDoctor(e.target.value)}
          />
        </div>
      )}

      {role === 'caregiver' && (
        <div>
          <label>Patients:</label>
          {/* Implementation depends on how you want to select patients (e.g., a multi-select dropdown, checkboxes) */}
          <input
            type="text"
            value={patients}
            onChange={(e) => setPatients(e.target.value)}
          />
        </div>
      )}

      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;