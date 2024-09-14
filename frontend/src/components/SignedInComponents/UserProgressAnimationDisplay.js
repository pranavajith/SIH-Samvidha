import "./../../styles/UserProgressAnimationDisplay.css";

const UserProgressAnimationDisplay = ({ percentage }) => {
  const animations = {
    sub20: {
      className: "",
      srcUrl:
        "https://lottie.host/500fe6ae-a87d-4b25-9b48-c7f089ad1426/Tazhk3HlrS.json",
      background: "transparent",
      speed: "1",
      style: { width: "300px", height: "300px" },
      loopStatus: true,
      autoplayStatus: true,
      text: "It always begins with a simple step!",
    },
    sub40: {
      className: "",
      srcUrl:
        "https://lottie.host/eca2044b-4c7b-4c82-89df-a523c7799a68/RYB3yggLeu.json",
      background: "transparent",
      speed: "1",
      style: { width: "300px", height: "300px" },
      loopStatus: true,
      autoplayStatus: true,
      text: "Vibing through the grind!",
    },
    sub60: {
      className: "",
      srcUrl:
        "https://lottie.host/871630c1-3292-4b9c-b356-ad2d60648ddf/tyDVVPGRo7.json",
      background: "transparent",
      speed: "1",
      style: { width: "300px", height: "300px" },
      loopStatus: true,
      autoplayStatus: true,
      text: "Off you go!",
    },
    sub80: {
      className: "",
      srcUrl:
        "https://lottie.host/871630c1-3292-4b9c-b356-ad2d60648ddf/tyDVVPGRo7.json",
      background: "transparent",
      speed: "1",
      style: { width: "300px", height: "300px" },
      loopStatus: true,
      autoplayStatus: true,
      text: "You're acing it!",
    },
    sub100: {
      className: "",
      srcUrl:
        "https://lottie.host/b7e29aef-6fe2-45a2-8c99-5edda7d76409/9jidQHld6H.json",
      background: "transparent",
      speed: "1",
      style: { width: "300px", height: "300px" },
      loopStatus: true,
      autoplayStatus: true,
      text: "A true novice!",
    },
  };

  let selectedAnimation;
  if (percentage <= 20) selectedAnimation = animations.sub20;
  else if (percentage <= 40) selectedAnimation = animations.sub40;
  else if (percentage <= 60) selectedAnimation = animations.sub60;
  else if (percentage <= 80) selectedAnimation = animations.sub80;
  else selectedAnimation = animations.sub100;

  return (
    <div className="user-progress-animation-container">
      <div className="animation-wrapper">
        <dotlottie-player
          src={selectedAnimation.srcUrl}
          background="transparent"
          speed="1"
          style={{ width: "200px", height: "200px" }}
          loop
          autoplay
        ></dotlottie-player>
      </div>
      <div className="animation-text">
        <span>{selectedAnimation.text}</span>
      </div>
    </div>
  );
};

export { UserProgressAnimationDisplay };
