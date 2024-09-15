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
              key={element.key}
              date={t("i" + element.id + "dat")}
              dateClassName="date"
              icon={<FontAwesomeIcon icon={faBuildingColumns} />} // Using the building columns icon
              iconStyle={{ 
                background: "#fff",    // Dark blue background
                color: "#001f3f",            // White icon color
                fontSize: "1.5rem"        // Adjust the size of the icon (1.5rem as an example)
              }}  
            >
              <div className="timeline-content">
                <div className="container">
                  <div className="left-image">
                    <img
                      src={element.image}
                      className="timeline-image"
                      alt={element.imageExplanation}
                    />
                  </div>
                  <div className="right-content">
                    <div className="timeline-text">
                      <h3 className="vertical-timeline-element-title">
                        {t("i" + element.id + "t")}
                      </h3>
                      <p id="description">{t("i" + element.id + "des")}</p>
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
