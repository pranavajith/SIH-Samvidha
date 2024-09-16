import "./../../styles/ConstitutionTimeline.css";
import { constitutional_events } from "./../dummy-data/dummy-data";
import { useTranslation } from "react-i18next";
import "./../../utils/i18n";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

// Import FontAwesome components and specific icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons"; // Importing the correct icon

const ConstitutionTimeline = () => {
  const { t } = useTranslation();
  return (
    <div className="timeline-body">
      <h1 className="title">{t("ok")}</h1>
      <VerticalTimeline>
        {constitutional_events.map((element) => {
          return (
            <VerticalTimelineElement
              key={element.id}  // Changed from element.key to element.id
              date={t("i" + element.id + "dat")}
              dateClassName="date"
              icon={<FontAwesomeIcon icon={faBuildingColumns} />}
              iconStyle={{ 
                background: "#fff", 
                color: "#001f3f", 
                fontSize: "1.5rem" 
              }}
            >
              <div className="timeline-content">
                <div className="container">
                  <div className="left-image">
                    <img
                      src={element.image}
                      className="timeline-image"
                      alt={element.title} // Using title for alt text
                    />
                  </div>
                  <div className="right-content">
                    <div className="timeline-text">
                      <h3 className="vertical-timeline-element-title">
                        {t("i" + element.id + "t")}
                      </h3>
                      <p id="description">{t("i" + element.id + "des")}</p>
                      {element.link && (
                        <a href={element.link} target="_blank" rel="noopener noreferrer">
                          <button className="learn-more-btn">
                            {t("Learn More")}
                          </button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
};


export { ConstitutionTimeline };
