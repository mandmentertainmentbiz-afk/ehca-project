import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function AdminDonations() {
  const { token } = useAuth();

  const [donations, setDonations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [processingId, setProcessingId] =
    useState(null);

  /* ================= FETCH DONATIONS ================= */
  const fetchDonations = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/donations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDonations(
        res.data.donations || []
      );

    } catch (err) {
      console.error(
        "FETCH DONATIONS ERROR:",
        err
      );

      alert(
        err.response?.data?.message ||
          "Failed to fetch donations"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDonations();
    }
  }, [token]);

  /* ================= MARK COMPLETED ================= */
  const markCompleted = async (id) => {
    try {
      setProcessingId(id);

      const res = await axios.put(
        `http://localhost:5000/api/donations/${id}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        res.data.message ||
          "Donation completed"
      );

      setDonations((prev) =>
        prev.map((donation) =>
          donation._id === id
            ? {
                ...donation,
                status: "completed",
              }
            : donation
        )
      );

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to update donation"
      );

    } finally {
      setProcessingId(null);
    }
  };

  /* ================= DELETE DONATION ================= */
  const deleteDonation = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this donation?"
      );

    if (!confirmDelete) return;

    try {
      setProcessingId(id);

      const res = await axios.delete(
        `http://localhost:5000/api/donations/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        res.data.message ||
          "Donation deleted"
      );

      setDonations((prev) =>
        prev.filter(
          (donation) =>
            donation._id !== id
        )
      );

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Delete failed"
      );

    } finally {
      setProcessingId(null);
    }
  };

  /* ================= ANALYTICS ================= */
  const totalAmount = donations.reduce(
    (acc, donation) =>
      acc + Number(donation.amount),
    0
  );

  const completedDonations =
    donations.filter(
      (d) => d.status === "completed"
    ).length;

  const pendingDonations =
    donations.filter(
      (d) => d.status === "pending"
    ).length;

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="p-10 text-center text-xl font-bold">
        Loading donations...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">

      {/* ================= HEADER ================= */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Donation Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage and monitor donations.
        </p>
      </div>

      {/* ================= ANALYTICS ================= */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        {/* TOTAL */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-gray-500 text-sm font-semibold">
            Total Donations
          </h3>

          <p className="text-4xl font-bold mt-3 text-pink-600">
            ${totalAmount}
          </p>
        </div>

        {/* COMPLETED */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-gray-500 text-sm font-semibold">
            Completed
          </h3>

          <p className="text-4xl font-bold mt-3 text-green-600">
            {completedDonations}
          </p>
        </div>

        {/* PENDING */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-gray-500 text-sm font-semibold">
            Pending
          </h3>

          <p className="text-4xl font-bold mt-3 text-yellow-500">
            {pendingDonations}
          </p>
        </div>

      </div>

      {/* ================= EMPTY ================= */}
      {donations.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow text-center">
          <p className="text-gray-500 text-lg">
            No donations found.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">

          {donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between gap-8">

                {/* ================= LEFT ================= */}
                <div className="space-y-3 flex-1">

                  <div className="flex items-center gap-4 flex-wrap">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {donation.fullName}
                    </h2>

                    <span className="bg-pink-100 text-pink-700 px-4 py-1 rounded-full text-sm font-semibold">
                      ${donation.amount}
                    </span>
                  </div>

                  <p>
                    <span className="font-semibold">
                      Email:
                    </span>{" "}
                    {donation.email}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Phone:
                    </span>{" "}
                    {donation.phone ||
                      "N/A"}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Payment:
                    </span>{" "}
                    {
                      donation.paymentMethod
                    }
                  </p>

                  <p>
                    <span className="font-semibold">
                      Message:
                    </span>{" "}
                    {donation.message ||
                      "No message"}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Date:
                    </span>{" "}
                    {new Date(
                      donation.createdAt
                    ).toLocaleDateString()}
                  </p>

                  {/* STATUS */}
                  <div className="pt-2">

                    {donation.status ===
                    "completed" ? (
                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm">
                        Completed
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold text-sm">
                        Pending
                      </span>
                    )}

                  </div>
                </div>

                {/* ================= RIGHT ================= */}
                <div className="flex flex-col gap-3 justify-center min-w-[200px]">

                  {donation.status !==
                    "completed" && (
                    <button
                      onClick={() =>
                        markCompleted(
                          donation._id
                        )
                      }
                      disabled={
                        processingId ===
                        donation._id
                      }
                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition disabled:opacity-50"
                    >
                      {processingId ===
                      donation._id
                        ? "Processing..."
                        : "Mark Completed"}
                    </button>
                  )}

                  <button
                    onClick={() =>
                      deleteDonation(
                        donation._id
                      )
                    }
                    disabled={
                      processingId ===
                      donation._id
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold transition disabled:opacity-50"
                  >
                    {processingId ===
                    donation._id
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