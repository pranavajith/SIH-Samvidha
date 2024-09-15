import "./../../styles/ConstitutionTimeline.css";
import { constitutional_events } from "./../dummy-data/dummy-data";
import { useTranslation } from "react-i18next";
// can add icons to timeline
// can add learn more button at end
import "./../../utils/i18n";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

const ConstitutionTimeline = () => {
  const {t}  = useTranslation();
  return (
    <div className="timeline-body">
      <h1 className="title">{t("ok")}</h1>
      <VerticalTimeline>
        {constitutional_events.map((element) => {
          return (
            <VerticalTimelineElement
              key={element.key}
              date={t("i" + element.id +"dat")}
              dateClassName="date"
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
                        {t("i" + element.id +"t")}
                      </h3>
                      <p id="description">{t("i" + element.id +"des")}</p>
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
