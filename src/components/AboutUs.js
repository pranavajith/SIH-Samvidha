import React from "react";
import "./../styles/AboutUs.css"; // Importing a separate CSS file for the About Us page

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Pranav Ajith",
      imageUrl: "/team-photo/Pranav.jpeg",
      role: "Team Leader",
    },
    {
      name: "Ishika Saini",
      imageUrl: "/team-photo/Ishika.jpg",
      role: "Front End Developer",
    },
    {
      name: "Aditya A. Uppuluri",
      imageUrl: "/team-photo/Aditya.jpg",
      role: "Backend Engineer",
    },
    {
      name: "Kancharla Kiranmai",
      imageUrl: "/team-photo/Kiranmai.png",
      role: "UI/UX Developer",
    },
    {
      name: "Anish Dixit",
      imageUrl: "/team-photo/Anish.png",
      role: "API Integration Engineer",
    },
    {
      name: "B. Niranjan",
      imageUrl: "/team-photo/Niranjan.jpg",
      role: "ML Engineer",
    },
  ];

  return (
    <div className="about-us-container">
      <h1 className="about-us-title">Meet Our Team</h1>
      <div className="team-section">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <div className="image-container">
              <img
                src={member.imageUrl || "/placeholder.jpg"}
                alt={member.name}
                className="team-image"
              />
            </div>
            <h3 className="team-name">{member.name}</h3>
            <p className="team-role">{member.role}</p>
          </div>
        ))}
      </div>

      <div className="hackathon-section">
        <h2 className="hackathon-title">About Smart India Hackathon</h2>
        <p className="hackathon-description">
          The <strong>Smart India Hackathon (SIH)</strong> is a nationwide
          initiative to provide students with a platform to solve some of the
          pressing problems we face in our daily lives. Launched by the
          Government of India, SIH aims to foster innovation and creativity
          while enhancing skills like problem-solving and collaboration. It
          brings together bright minds to create solutions for real-world
          problems in a competitive environment.
        </p>
        <p className="hackathon-description">
          We are proud to have developed this website as part of the Smart India
          Hackathon, showcasing our team's dedication to learning, growing, and
          contributing to technological advancements.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
