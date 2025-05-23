"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function user() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", city: "" });
  const [userData, setUserData] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  // page show only login
  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect if not logged in
      router.replace("/");
    }
  }, [status, router]);

  //get
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const updateHandle = (user) => {
    setEditingUser(user.id);
    setFormData({ name: user.name, city: user.address.city });
    toast("Editing user: " + user.name, { icon: "✏️" });
    console.log("click update");
  };

  //delete
  const deleteHandle = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      toast.success("User deleted!");
    } catch (error) {
      toast.error("Failed to delete user.");
      console.error("Delete error:", error);
    }
  };
  const clickHandle = (id) => {
    const user = users.find((u) => u.id === id);
    setUserData(user);
    console.log(`User data for user/${id}:`, user);
  };
  const handleSave = (id) => {
    if (!formData.name.trim() || !formData.city.trim()) {
      toast.error("Name and City cannot be empty!");
      return;
    }
    const updatedUsers = users.map((user) =>
      user.id === id
        ? {
            ...user,
            name: formData.name,
            address: { ...user.address, city: formData.city },
          }
        : user
    );
    setUsers(updatedUsers);
    setEditingUser(null);
    setFormData({ name: "", city: "" });
    toast.success("User updated successfully!");
  };

  //post
  const handleAddUser = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        {
          name: "New User",
          address: {
            city: "New City",
          },
        }
      );

      const newUser = response.data;
      // Provide fallback structure if API response is incomplete
      if (!newUser.address) newUser.address = { city: "" };

      // Append new user
      setUsers((prevUsers) => [...prevUsers, newUser]);
      const fakeId = users.length ? users[users.length - 1].id + 1 : 1;
      newUser.id = fakeId;

      // Make the new user editable immediately
      setEditingUser(newUser.id);
      setFormData({
        name: newUser.name || "",
        city: newUser.address.city || "",
      });

      toast.success("User added and ready to edit!");
    } catch (error) {
      toast.error("Add failed.");
      console.error("Add error:", error);
    }
  };

  const closePopup = () => {
    setUserData(null);
  };

  return (
    <>
      <div className="flex flex-col items-center pt-2 h-screen px-3">
        <h1 className="text-2xl font-bold mb-4">User List</h1>
        <table className="w-fit border border-gray-300 justify-center mb-3">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 ">ID</th>
              <th className="border p-2 w-[212px]">Name</th>
              <th className="border p-2 w-[212px]">City</th>
              <th className="border p-2 w-[140px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                // className="hover:bg-gray-50"
                className={`${
                  editingUser === user.id
                    ? "bg-gray-200"
                    : "hover:bg-gray-50 cursor-pointer"
                }`}
                // onClick={() => clickHandle(user.id)}
                onClick={() => {
                  if (editingUser !== user.id) {
                    clickHandle(user.id);
                  }
                }}
              >
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="border p-2">
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    />
                  ) : (
                    user.address.city
                  )}
                </td>
                <td
                  className="border p-2 justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {editingUser === user.id ? (
                    <button
                      onClick={() => {
                        handleSave(user.id);
                      }}
                      className="text-green-500 font-semibold cursor-pointer mr-9"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        updateHandle(user);
                      }}
                      className="text-green-500 font-semibold cursor-pointer  mr-5"
                    >
                      Update
                    </button>
                  )}
                  {/* </td>
                <td className="border p-2 justify-center"> */}
                  <button
                    className="text-red-500 font-semibold cursor-pointer"
                    onClick={() => deleteHandle(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleAddUser}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add User
        </button>
        {/* Popup */}
        {userData && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-3xl shadow-lg w-[300px] relative">
              <button
                onClick={closePopup}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                ✕
              </button>
              <h1 className="text-xl font-bold mb-2">
                Name: {userData?.name || "-"}
              </h1>
              <p className="text-gray-700">
                username: {userData?.username || "-"}
              </p>
              <p className="text-gray-700">email: {userData?.email || "-"}</p>
              <p className="text-gray-700">phone: {userData?.phone || "-"}</p>
              <p className="text-gray-700">
                website: {userData?.website || "-"}
              </p>
              <p className="text-gray-700">
                company: {userData?.company?.name || "-"}
              </p>
              <p className="text-gray-700">
                address: {userData?.address?.street}, {userData?.address?.suite}
                , {userData?.address?.city}, {userData?.address?.zipcode}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default user;
