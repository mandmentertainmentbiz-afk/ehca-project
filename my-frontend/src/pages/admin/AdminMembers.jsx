import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function AdminMembers() {
  const { token } = useAuth();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] =
    useState(null);

  /* ================= API URL ================= */
  const API_URL =
    "https://ehca-backend-1.onrender.com/api/members";

  /* ================= FETCH MEMBERS ================= */
  const fetchMembers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("MEMBERS RESPONSE:", res.data);

      // ✅ FIX members.map error
      if (Array.isArray(res.data)) {
        setMembers(res.data);

      } else if (
        res.data &&
        Array.isArray(res.data.members)
      ) {
        setMembers(res.data.members);

      } else {
        setMembers([]);
      }

    } catch (err) {
      console.error(
        "❌ FETCH MEMBERS ERROR:",
        err
      );

      setMembers([]);

      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to fetch members"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMembers();
    }
  }, [token]);

  /* ================= APPROVE MEMBER ================= */
  const handleApprove = async (id) => {
    try {
      setProcessingId(id);

      const res = await axios.put(
        `${API_URL}/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        res.data.message ||
          "✅ Member approved"
      );

      // ✅ UPDATE UI INSTANTLY
      setMembers((prev) =>
        prev.map((member) =>
          member._id === id
            ? {
                ...member,
                approved: true,
                status: "approved",
              }
            : member
        )
      );

    } catch (err) {
      console.error(
        "❌ APPROVE ERROR:",
        err
      );

      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "❌ Approval failed"
      );

    } finally {
      setProcessingId(null);
    }
  };

  /* ================= DELETE MEMBER ================= */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmDelete) return;

    try {
      setProcessingId(id);

      const res = await axios.delete(
        `${API_URL}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        res.data.message ||
          "✅ Member deleted"
      );

      // ✅ REMOVE FROM UI
      setMembers((prev) =>
        prev.filter(
          (member) => member._id !== id
        )
      );

    } catch (err) {
      console.error(
        "❌ DELETE ERROR:",
        err
      );

      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "❌ Delete failed"
      );

    } finally {
      setProcessingId(null);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="p-10 text-center text-xl font-semibold">
        Loading members...
      </div>
    );
  }

  /* ================= UNAUTHORIZED ================= */
  if (!token) {
    return (
      <div className="p-10 text-center text-red-600 text-xl font-bold">
        Unauthorized access
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* ================= HEADER ================= */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Membership Requests
        </h1>

        <p className="text-gray-500 mt-2">
          Manage member and partnership
          approvals.
        </p>
      </div>

      {/* ================= EMPTY ================= */}
      {!Array.isArray(members) ||
      members.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow text-center">
          <p className="text-gray-500 text-lg">
            No membership requests found.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {members.map((member) => (
            <div
              key={member._id}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
                {/* ================= LEFT ================= */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {member.fullName}
                    </h2>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        member.role ===
                        "partner"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {member.role ===
                      "partner"
                        ? "Partner"
                        : "Member"}
                    </span>
                  </div>

                  <p>
                    <span className="font-semibold">
                      Email:
                    </span>{" "}
                    {member.email}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Phone:
                    </span>{" "}
                    {member.phone || "N/A"}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Country:
                    </span>{" "}
                    {member.country || "N/A"}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Organization:
                    </span>{" "}
                    {member.organization ||
                      "N/A"}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Message:
                    </span>{" "}
                    {member.message ||
                      "No message"}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Submitted:
                    </span>{" "}
                    {member.createdAt
                      ? new Date(
                          member.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>

                  {/* ================= STATUS ================= */}
                  <div className="pt-2">
                    {member.approved ? (
                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm">
                        Approved
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold text-sm">
                        Pending Approval
                      </span>
                    )}
                  </div>
                </div>

                {/* ================= RIGHT ================= */}
                <div className="flex flex-col gap-3 justify-center min-w-[180px]">
                  {!member.approved && (
                    <button
                      onClick={() =>
                        handleApprove(
                          member._id
                        )
                      }
                      disabled={
                        processingId ===
                        member._id
                      }
                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition disabled:opacity-50"
                    >
                      {processingId ===
                      member._id
                        ? "Approving..."
                        : "Approve"}
                    </button>
                  )}

                  <button
                    onClick={() =>
                      handleDelete(
                        member._id
                      )
                    }
                    disabled={
                      processingId ===
                      member._id
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold transition disabled:opacity-50"
                  >
                    {processingId ===
                    member._id
                      ? "Processing..."
                      : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}