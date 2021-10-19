import "./style.css";
import layout from "./layout.html";

import { getRaf } from "@app";
import clamp from "@utils/clamp";
import map from "@utils/map";
import { easeOutQuint } from "@utils/easing";

export default class Download {
  static selector = ".download";

  constructor(block) {
    this.block = block;

    this.block.innerHTML = layout;
  }
}
