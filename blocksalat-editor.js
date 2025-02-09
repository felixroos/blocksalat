import { Blocksalat } from "./blocksalat";

class BlocksalatElement extends HTMLElement {
  static observedAttributes = ["initial", "readOnly"];

  constructor() {
    super();
    const initial = this.getAttribute("initial"); // is this safe to do here always?
    this.insertAdjacentHTML(
      "beforeend",
      `<div class="editor-wrapper"><div class="editor"><div class="playtoggle">play</div></div><pre>${initial}</pre></div>`
    );
    const readOnly = this.getAttribute("readOnly"); // is this safe to do here always?
    const blocksalat = new Blocksalat(this.querySelector(".editor"), {
      readOnly,
    });
    blocksalat.load(initial);
    // first document click runs the patch, adds change listener + removes hint
    const playtoggle = this.querySelector(".playtoggle");
    playtoggle.addEventListener("click", function init() {
      blocksalat.toggle();
      playtoggle.innerText = blocksalat.started ? "stop" : "play";
    });
  }

  connectedCallback() {
    // console.log("Custom element added to page.");
  }
  disconnectedCallback() {
    // console.log("Custom element removed from page.");
  }
  adoptedCallback() {
    // console.log("Custom element moved to new page.");
  }
  attributeChangedCallback(name, oldValue, newValue) {
    /* console.log(`Attribute ${name} has changed.`);
    if (name === "hash") {
      this.blocksalat.load(newValue);
    } */
  }
}

customElements.define("blocksalat-editor", BlocksalatElement);
