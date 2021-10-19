import LocomotiveScroll from "locomotive-scroll";

export default class Scroll {
  constructor() {
    this.scrollItems = [];

    this.scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      tablet: { smooth: false },
      smartphone: { smooth: false },
    });

    this.scroll.on("scroll", this.onScroll);
  }

  onScroll = (args) => {
    this.scrollItems.forEach((item) => {
      if (typeof args.currentElements[item.scrollID] === "object") {
        item.callback(args.currentElements[item.scrollID]);
      }
    });
  };

  register = (scrollID, callback) => {
    this.scrollItems.push({
      scrollID: scrollID,
      callback: callback,
    });
  };

  stop = () => {
    this.scroll.stop();
  };

  start = () => {
    this.scroll.start();
  };
}
