import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";
import "blockly/blocks";
import * as locale from "blockly/msg/en";
import "./style.css";
import { SalatRepl, nodeRegistry } from "@kabelsalat/web";
import "@blockly/toolbox-search";
import DarkTheme from "@blockly/theme-dark";

export const kabelsalatGenerator = new Blockly.Generator("kabelsalat");

const allNodes = Array.from(nodeRegistry.entries()).filter(
  ([name, config]) =>
    !["out", "n", "register", "module"].includes(name) &&
    !config.internal &&
    config.tags &&
    !config.tags.includes("meta")
);
//.sort(([_, a], [_, b]) => a.type.localeCompare(b.type));

const allTags = allNodes
  .map(([_, config]) => config.tags)
  .flat()
  .filter((el, i, a) => a.indexOf(el) === i)
  .filter(Boolean);

const categories = allTags.map((name, i) => ({
  kind: "category",
  name: name,
  colour: Math.round(((i + 1) / allTags.length) * 360),
  contents: [],
}));

const getCategory = (name) => categories.find((cat) => cat.name === name);
const getCategoryIndex = (name) =>
  categories.findIndex((cat) => cat.name === name);

const getCategoryColor = (name) =>
  Math.round(((getCategoryIndex(name) + 1) / allTags.length) * 360);

const toolbox = {
  kind: "categoryToolbox",
  contents: [
    ...categories,
    {
      kind: "search",
      name: "Search",
      contents: [],
    },
  ],
};

Blockly.Blocks["n"] = {
  init: function () {
    this.jsonInit({
      message0: `n %1`,
      args0: [
        {
          type: "field_input",
          name: "NUM",
          check: "Number",
        },
      ],
      output: "Number",
      colour: 160,
    });
  },
};
kabelsalatGenerator.forBlock["n"] = function (block, generator) {
  const value = block.getFieldValue("NUM");
  return [`${value}`, 0];
  //return [`n(${value})`, 0];
};
getCategory("math").contents.push({ kind: "block", type: "n" });

Blockly.Blocks["out"] = {
  init: function () {
    this.jsonInit({
      message0: `out %1`,
      args0: [
        {
          type: "input_value",
          name: "input",
          check: "Number",
        },
      ],
      colour: 0,
    });
  },
};
kabelsalatGenerator.forBlock["out"] = function (block, generator) {
  const value = block.getFieldValue("NUM");
  const inputCode = generator.valueToCode(block, "input", 0);
  if (!inputCode) {
    return "n(0).out()";
  }
  return `${inputCode}.out()`;
};
getCategory("source").contents.push({ kind: "block", type: "out" });

allNodes.forEach(([name, config]) => {
  //console.log("register", name, config);
  let inputs = config.ins || [];
  if (["mul", "div"].includes(name)) {
    inputs = [
      { name: "in0", default: 1 },
      { name: "in1", default: 1 },
    ];
  } else if (["add", "sub"].includes(name)) {
    inputs = [
      { name: "in0", default: 1 },
      { name: "in1", default: 1 },
    ];
  }
  Blockly.Blocks[name] = {
    init: function () {
      this.jsonInit({
        //previousStatement: null,
        //nextStatement: null,
        //message0: `${inputs.map((_, i) => `%${i + 1}`).join(" ")} ${name} `,
        message0: `${name} ${inputs.map((_, i) => `%${i + 1}`).join(" ")}`,
        args0: inputs.map((input) => ({
          type: "input_value",
          name: input.name,
          check: "Number",
          // text: input.name,
        })),
        output: "Number",
        colour: getCategoryColor(config.tags[0]),
        tooltip: config.description,
        // helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp",
      });
    },
  };
  if (!config.tags) {
    console.warn("no tags", name);
  }
  categories
    .filter((category) => (config.tags || []).includes(category.name))
    .forEach((category) => {
      category.contents.push({
        kind: "block",
        type: name,
      });
    });

  kabelsalatGenerator.forBlock[name] = function (block, generator) {
    const args = block.inputList.map((input, i) => {
      if (input.type === Blockly.INPUT_VALUE) {
        const inputCode = generator.valueToCode(block, input.name, 0);
        return inputCode || inputs[i].default || 0;
      } else {
        throw new Error(`unexpected input value ${input.type}`);
      }
    });
    const code = `${name}(${args.join(", ")})`;

    return [code, 0];
  };
});

Blockly.setLocale(locale);

console.log("toolbox", toolbox);
const workspace = Blockly.inject(document.getElementById("blockly"), {
  readOnly: false,
  theme: DarkTheme,
  trashcan: false,
  //media: "media/",
  //rtl: true,
  move: {
    scrollbars: true,
    drag: true,
    wheel: true,
  },
  toolbox,
});

const repl = new SalatRepl();
console.log("repl", repl);

function update() {
  var code = kabelsalatGenerator.workspaceToCode(workspace);
  console.log(code);
  repl.run(code);
  const json = Blockly.serialization.workspaces.save(workspace);
  window.location.hash = "#" + btoa(JSON.stringify(json));
}

window.addEventListener("click", function init() {
  update();
  window.removeEventListener("click", init);
});

workspace.addChangeListener((event) => {
  // console.log("event", event);
  if (
    ["move", "change", "block_field_intermediate_change"].includes(event.type)
  ) {
    update();
  }
});

const urlCode = atob(window.location.hash.slice(1));

if (urlCode) {
  const json = JSON.parse(urlCode);
  try {
    Blockly.serialization.workspaces.load(json, workspace);
  } catch (err) {
    console.error("could not load url hash as code", err);
  }
}
