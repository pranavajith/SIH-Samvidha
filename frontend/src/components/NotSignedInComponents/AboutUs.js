import React from "react";
import "./../../styles/AboutUs.css"; // Importing a separate CSS file for the About Us page
import { useTranslation } from "react-i18next";
// can add icons to timeline
// can add learn more button at end
import "./../../utils/i18n";
const AboutUs = () => {
  const {t} = useTranslation();
  const teamMembers = [
    {
      name: t("PA"),
      imageUrl: "/team-photo/Pranav.jpeg",
      role: "Team Leader",
    },
    {
      name: t("IS"),
      imageUrl: "/team-photo/Ishika.jpg",
      role: "Front End Developer",
    },
    {
      name: t("AAU"),
      imageUrl: "/team-photo/Aditya.jpg",
      role: "Backend Engineer",
    },
    {
      name: t("KK"),
      imageUrl: "/team-photo/Kiranmai.png",
      role: "UI/UX Developer",
    },
    {
      name: t("AD"),
      imageUrl: "/team-photo/Anish.png",
      role: "API Integration Engineer",
    },
    {
      name: t("NB"),
      imageUrl: "/team-photo/Niranjan.jpg",
      role: "ML Engineer",
    },
  ];

  return (
    <div className="about-us-container">
      <h1 className="about-us-title">{t("team")}</h1>
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
        <h2 className="hackathon-title"> {t("SIH")} </h2>
        <p className="hackathon-description">
          <strong>{t("SIH")} (SIH)</strong> {t("SIHbody")}
        </p>
        <p className="hackathon-description">
          {t("proud")}
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
