import "./../styles/ConstitutionTimeline.css";
import { constitutional_events } from "./dummy-data/dummy-data";

// can add icons to timeline
// can add learn more button at end

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

const ConstitutionTimeline = () => {
  return (
    <div className="timeline-body">
      <h1 className="title">Timeline of Indian Constitution</h1>
      <VerticalTimeline>
        {constitutional_events.map((element) => {
          return (
            <VerticalTimelineElement
              key={element.key}
              date={element.date}
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
                        {element.title}
                      </h3>
                      <p id="description">{element.description}</p>
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
