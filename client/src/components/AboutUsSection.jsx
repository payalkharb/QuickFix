import React from "react";

const teamMembers = [
  {
    name: "Rajesh Sharma",
    title: "Lead Software Engineer",
    bio: "Rajesh brings over a decade of experience in full-stack development and cloud architecture. He leads our engineering team with a strong focus on innovation and scalability.",
    image:
      "https://images.unsplash.com/photo-1569128782402-d1ec3d0c1b1b?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Neha Verma",
    title: "UI/UX Designer",
    bio: "Neha specializes in creating intuitive and engaging user experiences. Her designs consistently bridge the gap between aesthetics and usability.",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  {
    name: "Arjun Mehta",
    title: "Product Manager",
    bio: "Arjun is the strategic mind behind our product roadmap. With a sharp eye for detail and deep user empathy, he ensures timely delivery of impactful solutions.",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Priya Iyer",
    title: "Marketing Head",
    bio: "Priya leads our marketing initiatives with creative precision. She crafts brand strategies that connect, engage, and convert effectively.",
    image:
      "https://plus.unsplash.com/premium_photo-1682089810582-f7b200217b67?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function About() {
  return (
    <div className="bg-white py-16 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Our Team
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          We’re a dynamic group of individuals who are passionate about what we
          do and dedicated to delivering the best results for our clients.
        </p>
      </div>

      <ul
        role="list"
        className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto"
      >
        {teamMembers.map((person, index) => (
          <li
            key={index}
            className="bg-gray-100 rounded-xl p-6 text-center shadow hover:shadow-lg transition"
          >
            <img
              className="mx-auto h-32 w-32 rounded-full object-cover mb-4"
              src={person.image}
              alt={person.name}
            />
            <h3 className="text-xl font-semibold text-gray-900">
              {person.name}
            </h3>
            <p className="text-blue-600 font-medium">{person.title}</p>
            <p className="mt-2 text-sm text-gray-700">{person.bio}</p>
            <div className="mt-4 flex justify-center gap-4">
              <a href="#" className="text-gray-500 hover:text-black">
                <span className="sr-only">X</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z"></path>
                </svg>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700">
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
