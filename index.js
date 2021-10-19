import "@styles/common.css";
import "@styles/font.css";
import "@styles/typography.css";
import "@styles/base.css";
import "@styles/layout.css";
import "@styles/locomotive-scroll.css";

import Canvas from "@components/Canvas";
import AnimatedWord from "@components/AnimatedWord";
import AnimatedText from "@components/AnimatedText";

import Steps from "@blocks/Steps";
import SpyMe from "@blocks/SpyMe";
import Hero from "@blocks/Hero";
import Header from "@blocks/Header";
import Footer from "@blocks/Footer";
import Download from "@blocks/Download";
import Loader from "@blocks/Loader";

import Raf from "@utils/Raf";
import Scroll from "@utils/Scroll";
import Observer from "@utils/Observer";

const MODULES = [
  Steps,
  SpyMe,
  Hero,
  Header,
  Footer,
  Download,
  Canvas,
  AnimatedWord,
  AnimatedText,
];

class App {
  lastIndex = 0;

  constructor() {
    window.addEventListener("load", this.initApp);
    window.addEventListener("resize", this.onResize);
    window.addEventListener("scroll", this.onScroll);
  }

  initApp = () => {
    this.lastIndex = 0;
    this.raf = new Raf();
    this.observer = new Observer();

    this.instances = MODULES.flatMap((Module) => {
      if ("selector" in Module) {
        const blocks = [...document.querySelectorAll(Module.selector)];

        return blocks.map((block) => {
          block.setAttribute("data-instance-index", this.lastIndex);
          this.lastIndex += 1;
          return new Module(block);
        });
      }
      return null;
    }).filter(Boolean);

    for (const instance of this.instances) {
      if (instance.onReady) {
        instance.onReady();
      }
    }

    const loader = new Loader();

    if (loader.subscribe) {
      loader.subscribe(() => {
        this.scroll = new Scroll();

        for (const instance of this.instances) {
          if (instance.onComplete) {
            instance.onComplete();
          }
        }
      });
    }
  };

  onResize = (e) => {
    if (!this.instances) {
      return;
    }

    for (const instance of this.instances) {
      if (instance.onResize) {
        // instance.onResize(e, { changedView });
        instance.onResize(e);
      }
    }
  };
}

window.App = new App();

export const getRaf = () => {
  return window.App.raf;
};

export const getScroll = () => {
  return window.App.scroll;
};

export const getObserver = () => {
  return window.App.observer;
};
