import { useState } from "react";
import axiosInstance from "../apiManager/axiosInstance";
import { adminProfile } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Setting = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.auth.admin);

  const [profile, setProfile] = useState({
    name: admin.name || "",
    email: admin.email || "",
    phone: admin.phone || "",
  });

  const [password, setPassword] = useState({
    currPassword: "",
    newPassword: "",
    confirmPass: "",
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.put(
        "/api/admin/update-profile",
        profile
      );
      console.log(response);
      dispatch(adminProfile({ admin: response.data.admin }));
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmPass) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const response = await axiosInstance.put(
        "/api/admin/update-password",
        password
      );
      console.log(response);
      toast.success(response.data.message);
      setPassword({
        currPassword: "",
        newPassword: "",
        confirmPass: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password");
    }
  };

  return (
    <div className="h-[calc(100vh-150px)] overflow-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      {/* Profile Settings */}
      <form
        onSubmit={handleProfileSubmit}
        className="bg-white rounded-md shadow p-6 mb-6"
      >
        <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="text"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
            />
          </div>
          <button
            type="submit"
            className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 cursor-pointer"
          >
            Update Profile
          </button>
        </div>
      </form>

      {/* Change Password */}
      <form
        onSubmit={handlePasswordSubmit}
        className="bg-white rounded-md shadow p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Current Password</label>
            <input
              type="password"
              name="currPassword"
              value={password.currPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={password.newPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Confirm New Password</label>
            <input
              type="password"
              name="confirmPass"
              value={password.confirmPass}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
            />
          </div>
          <button
            type="submit"
            className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 cursor-pointer"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
