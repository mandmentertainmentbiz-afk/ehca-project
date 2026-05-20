export default function WhatWeDo() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          What We Do
        </h2>
        <p className="text-gray-500 mb-12">
          Empowering communities through care, education, and support
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Card 1 */}
          <div className="flex flex-col items-center">
            <img
              src="/images/help-elderly.jpg"
              alt="Care"
              className="w-40 h-40 rounded-full object-cover border-4 border-pink-500 shadow-lg"
            />
            <h3 className="mt-4 text-lg font-semibold">Community Care</h3>
            <p className="text-gray-500 text-sm mt-2">
              Supporting elderly and vulnerable people.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center">
            <img
              src="/images/education.jpg"
              alt="Education"
              className="w-40 h-40 rounded-full object-cover border-4 border-green-500 shadow-lg"
            />
            <h3 className="mt-4 text-lg font-semibold">Education</h3>
            <p className="text-gray-500 text-sm mt-2">
              Helping children access quality education.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center">
            <img
              src="/images/sports.jpg"
              alt="Sports"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
            <h3 className="mt-4 text-lg font-semibold">Youth Empowerment</h3>
            <p className="text-gray-500 text-sm mt-2">
              Building strong and confident youth.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}