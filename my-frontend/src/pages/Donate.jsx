/* ================= API URL ================= */
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://ehca-project-1.onrender.com";

/* ================= SUBMIT ================= */
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!amount) {
    alert("Please select donation amount");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(
      `${API_URL}/api/donations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          amount: Number(amount),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Donation request failed"
      );
    }

    alert(
      "Donation request submitted successfully"
    );

    setAmount("");
    setCustomAmount("");

    setForm({
      fullName: "",
      email: "",
      phone: "",
      message: "",
      paymentMethod: "bank",
    });

  } catch (err) {
    console.error("Donation Error:", err);

    alert(
      err.message ||
      "Unable to connect to server"
    );

  } finally {
    setLoading(false);
  }
};