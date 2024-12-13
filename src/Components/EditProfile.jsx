import React, { useEffect, useState } from 'react';
import "./EditProfile.css";
const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobileno: '',
    balance: '',
    logincount: '',
    lastlogin: '',
  });

  const [editedData, setEditedData] = useState({
    name: '',
    email: '',
    mobileno: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch user data (GET API)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You are not logged in. Please log in again.');
          return;
        }

        const response = await fetch('http://localhost:8081/profile', {
          method: 'GET',
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({
            name: data.UserData.name,
            email: data.UserData.email,
            mobileno: data.UserData.mobileno,
            balance: data.UserData.balance,
            logincount: data.UserData.logincount,
            lastlogin: data.UserData.lastlogin,
          });

          // Set initial values for editing
          setEditedData({
            name: data.UserData.name,
            email: data.UserData.email,
            mobileno: data.UserData.mobileno,
          });
        } else if (response.status === 401) {
          alert('Unauthorized access. Please log in.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching the profile.');
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save changes (POST API)
  const saveChanges = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not logged in. Please login again.');
        return;
      }

      const response = await fetch('http://localhost:8081/editprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(editedData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User updated successfully!');
        console.log('Updated User:', data);
      } else if (response.status === 400) {
        alert('Failed to update user: ' + data.message);
        console.log('Failed:', data.message);
      } else if (response.status === 501) {
        alert('User does not exist or token is invalid.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving changes.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={editedData.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Email:
          <input
            type="text"
            name="email"
            value={editedData.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Mobile:
          <input
            type="text"
            name="mobileno"
            value={editedData.mobileno}
            onChange={handleChange}
          />
        </label>

        <label>
          Balance:
          <input type="text" value={userData.balance} readOnly />
        </label>

        <label>
          Login Count:
          <input type="text" value={userData.logincount} readOnly />
        </label>

        <label>
          Last Login:
          <input type="text" value={userData.lastlogin} readOnly />
        </label>

        <button onClick={saveChanges} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
