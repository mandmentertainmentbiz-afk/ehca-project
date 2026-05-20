import { useState } from "react";
import logo from "./assets/ehca-logo.JPEG";

import event1 from "./assets/gallery/event1.jpg";
import event2 from "./assets/gallery/event2.jpg";
import event3 from "./assets/gallery/event3.jpg";
import event4 from "./assets/gallery/event4.jpg";
import banner2 from "./assets/banner2.JPg";

export default function EHCAPlatform() {
  const [donations] = useState(3200);
  const goal = 10000;

  const progress = (donations / goal) * 100;

  const gallery = [
    { img: event1, title: "Food Distribution" },
    { img: event2, title: "Community Outreach" },
    { img: event3, title: "Helping Children" },
    { img: event4, title: "Volunteer Work" },
  ];

  return (
    <div className="bg-white">
      
      {/* HEADER */}
      <header className="shadow">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="EHCA Logo" className="w-14 h-14 object-contain" />
            <h1 className="font-bold text-2xl">EHCA NGO</h1>
          </div>

        </div>
      </header>

      {/* HERO */}
      <section className="w-full">
  <img
    src={banner2}
    alt="EHCA Banner"
    className="w-full h-auto object-cover"
  />
  <div className="bg-black/50 p-10 rounded-xl text-center">
    <h2 className="text-4xl font-bold">
      Elevate Hope & Care Association
    </h2>
    <p className="mt-4">
      Assisting the less privileged & changing lives
    </p>

    <button className="mt-6 bg-pink-600 px-6 py-3 rounded-lg">
      Donate Now
    </button>
  </div>
</section>



      {/* GALLERY */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center">
            Our Events & Impact
          </h3>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {gallery.map((item, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-72 object-cover"
                />

                <div className="p-4 text-center">
                  <p className="font-semibold">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center">Our Projects</h3>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="p-6 bg-white rounded-xl shadow">
              <h4 className="font-bold text-lg">Clean Water</h4>
              <p className="text-gray-500 mt-2">
                Providing safe drinking water
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow">
              <h4 className="font-bold text-lg">Education</h4>
              <p className="text-gray-500 mt-2">
                Supporting schools & children
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow">
              <h4 className="font-bold text-lg">Healthcare</h4>
              <p className="text-gray-500 mt-2">
                Medical outreach programs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DONATION TRACKER */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h3 className="text-3xl font-bold">Donation Progress</h3>

          <div className="mt-8">
            <div className="w-full bg-gray-200 rounded-full h-5">
              <div
                className="bg-pink-600 h-5 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="mt-4 text-lg">
              ${donations} raised of ${goal}
            </p>
          </div>
        </div>
      </section>

      {/* VOLUNTEER FORM */}
      <section className="py-20">
        <div className="max-w-xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center">
            Volunteer With Us
          </h3>

          <form
            action="https://formspree.io/f/your-form-id"
            method="POST"
            className="mt-8"
          >
            <input
              name="name"
              className="w-full p-3 border rounded mb-3"
              placeholder="Full Name"
              required
            />

            <input
              name="email"
              type="email"
              className="w-full p-3 border rounded mb-3"
              placeholder="Email"
              required
            />

            <textarea
              name="message"
              className="w-full p-3 border rounded mb-3"
              placeholder="Why join?"
              required
            />

            <button
              type="submit"
              className="bg-pink-600 text-white w-full py-3 rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* ADMIN DASHBOARD */}
      <section className="py-20 bg-slate-100 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold">
            Admin Dashboard (Demo)
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white p-6 shadow rounded">
              <h4 className="font-semibold">Total Donations</h4>
              <p className="text-2xl mt-2">${donations}</p>
            </div>

            <div className="bg-white p-6 shadow rounded">
              <h4 className="font-semibold">Volunteers</h4>
              <p className="text-2xl mt-2">24</p>
            </div>

            <div className="bg-white p-6 shadow rounded">
              <h4 className="font-semibold">Projects</h4>
              <p className="text-2xl mt-2">3 Active</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 bg-black text-white">
        © 2026 EHCA NGO
      </footer>
    </div>
  );
}