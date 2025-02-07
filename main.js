import * as Blockly from "blockly/core";
import "blockly/blocks";
import * as locale from "blockly/msg/en";
import "./style.css";
import { SalatRepl, nodeRegistry } from "@kabelsalat/web";
import "@blockly/toolbox-search";
import DarkTheme from "@blockly/theme-dark";
// import { FieldSlider } from "@blockly/field-slider";

export const kabelsalatGenerator = new Blockly.Generator("kabelsalat");

Blockly.ContextMenuItems.registerCommentOptions();

const allNodes = Array.from(nodeRegistry.entries())
  .filter(
    ([name, config]) =>
      ![
        "out",
        "n",
        "register",
        "module",
        "mouseX",
        "mouseY",
        "seq",
        "split", // has fn input
        "apply", // has fn input
        "bytebeat", // has fn input
        "floatbeat", // has fn input
        "map", // has fn input
        "raw", // has fn input
        "select", // has fn input
      ].includes(name) &&
      !config.internal &&
      config.tags /* &&
      !config.tags.includes("meta") */
  )
  .sort(([a], [b]) => a.localeCompare(b));

allNodes.find(([name]) => name === "clockdiv")[1].tags = ["trigger"]; // change

let nInputs = (n) =>
  Array.from({ length: n }, (_, i) => ({ name: `${i + 1}` }));

[2, 4, 8, 16].forEach((n) => {
  allNodes.push([
    "poly" + n,
    {
      ins: nInputs(n),
      tags: ["multi-channel"],
      description: `split the signal into ${n} channels (you don't have to use all)`,
    },
  ]);
});
[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].forEach((n) => {
  allNodes.push([
    "seq" + n,
    {
      ins: [{ name: `trigger` }, ...nInputs(n)],
      tags: ["sequencer"],
      description: `cycles through ${n} steps. each time the trigger goes high, the next step goes to the output.`,
    },
  ]);
});
allNodes.push([
  "src",
  {
    ins: [{ name: "channel" }],
    tags: ["meta"],
    description: `routes the given out channel back to create feedback`,
  },
]);

const allTags = allNodes
  .map(([_, config]) => config.tags)
  .flat()
  .filter((el, i, a) => a.indexOf(el) === i)
  .filter(
    (tag) =>
      tag && !["distortion", "regular", "limiter", "external"].includes(tag)
  )
  .sort((a, b) => a.localeCompare(b));

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
        /* {
          type: "field_slider",
          name: "NUM",
          value: 0,
        }, */
      ],
      output: "Number",
      colour: 160,
    });
  },
};
kabelsalatGenerator.forBlock["n"] = function (block, generator) {
  const value = block.getFieldValue("NUM");
  return [`n(${value})`, 0];
  //return [`n(${value})`, 0];
};
getCategory("math").contents.push({ kind: "block", type: "n" });

Blockly.Blocks["out"] = {
  init: function () {
    this.jsonInit({
      message0: `out %1 channel %2`,
      tooltip:
        "output to speakers. if channel is set, only channels 0 and 1 will go to speakers. can be used together with src to create feedback!",
      args0: [
        {
          type: "input_value",
          name: "input",
          check: "Number",
        },
        {
          type: "input_value",
          name: "channel",
          check: "Number",
        },
      ],
      colour: 160,
    });
  },
};

kabelsalatGenerator.forBlock["out"] = function (block, generator) {
  const inputCode = generator.valueToCode(block, "input", 0);
  if (!inputCode) {
    return "n(0).out()";
  }
  const channelCode = generator.valueToCode(block, "channel", 0);
  return `${inputCode}.out(${channelCode})`;
};
getCategory("meta").contents.push({ kind: "block", type: "out" });

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
      let args = inputs.map((input) => ({
        type: "input_value",
        name: input.name,
        check: "Number",
      }));
      const labels = [...inputs.map((input) => input.name)];

      // if the first input is not "in", we can use the node name as label
      //const skipFirstLabel = ["in", "input"].includes(inputs[0]?.name);
      const skipFirstLabel = false; // always show, makes layout a bit calmer
      if (skipFirstLabel) {
        labels[0] = name;
      } else {
        args.unshift({
          type: "input_dummy",
        });
        labels.unshift(name);
      }

      let message = labels.map((label, i) => `${label} %${i + 1}`).join(" ");
      this.jsonInit({
        message0: message,
        args0: args,
        output: "Number",
        colour: getCategoryColor(config.tags[0]),
        tooltip: config.description,
        // helpUrl: "https://kabel.salat.dev/reference/",
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
        inputs: Object.fromEntries(
          inputs.map((input) => [
            input.name,
            {
              // https://developers.google.com/blockly/guides/configure/web/toolbox#shadow_blocks
              shadow: {
                type: "n",
                fields: {
                  NUM: input.default || 0,
                },
              },
            },
          ])
        ),
      });
    });

  kabelsalatGenerator.forBlock[name] = function (block, generator) {
    const args = block.inputList.reduce((acc, input, i) => {
      if (input.type === Blockly.INPUT_VALUE) {
        const inputCode = generator.valueToCode(block, input.name, 0);
        acc.push(inputCode || inputs[i]?.default || 0);
      } else if (input.type !== 5) {
        // 5 = dummy
        console.warn(`olala.. unexpected input value ${input.type}`);
      }
      return acc;
    }, []);
    if (name.startsWith("poly")) {
      name = "poly";
    }
    if (name.startsWith("seq")) {
      name = "seq";
    }
    const code = `${name}(${args.join(", ")})`;

    return [code, 0];
  };
});

Blockly.setLocale(locale);

const workspace = Blockly.inject(document.getElementById("blockly"), {
  readOnly: false,
  theme: DarkTheme,
  trashcan: false,
  sound: false,
  //rtl: true,
  move: {
    scrollbars: true,
    drag: true,
    wheel: true,
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.6,
    scaleSpeed: 1.2,
    pinch: true,
  },
  toolbox,
});

const repl = new SalatRepl();

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
  workspace.addChangeListener((event) => {
    //if (workspace.isDragging()) return;
    if (!supportedEvents.has(event.type)) return;
    update();
  });
});

const supportedEvents = new Set([
  Blockly.Events.BLOCK_CHANGE,
  Blockly.Events.BLOCK_CREATE,
  Blockly.Events.BLOCK_DELETE,
  Blockly.Events.BLOCK_MOVE,
  Blockly.Events.BLOCK_FIELD_INTERMEDIATE_CHANGE,
]);

const hash =
  window.location.hash.slice(1) ||
  "eyJibG9ja3MiOnsibGFuZ3VhZ2VWZXJzaW9uIjowLCJibG9ja3MiOlt7InR5cGUiOiJvdXQiLCJpZCI6Ik15fVBrSUA1WjhWNk5UXWt7Ui1DIiwieCI6MTIxLCJ5IjoxMDAsImlucHV0cyI6eyJpbnB1dCI6eyJibG9jayI6eyJ0eXBlIjoibHBmIiwiaWQiOiJ2SiRBNklockojXlAkMzd+YEBWWyIsImlucHV0cyI6eyJpbiI6eyJibG9jayI6eyJ0eXBlIjoic2F3IiwiaWQiOiJ9Uz0wYVtOSXp6V1JPYGNybEh1aSIsImlucHV0cyI6eyJmcmVxIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJbSUN0cW9+UFd3S2AyOF50QWhELSIsImZpZWxkcyI6eyJOVU0iOiI1NSJ9fX19fX0sImN1dG9mZiI6eyJibG9jayI6eyJ0eXBlIjoicmFuZ2UiLCJpZCI6InJvZEoxY0AjISxbeWBDbDBjLDAkIiwiaW5wdXRzIjp7ImluIjp7ImJsb2NrIjp7InR5cGUiOiJzaW5lIiwiaWQiOiJfREg7X1ZxUEhwM0NiQlk0JFFaPyIsImlucHV0cyI6eyJmcmVxIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJSaCVjJEFPQ3g3Zj1XLSVUaFZgNyIsImZpZWxkcyI6eyJOVU0iOiIuMiJ9fX19fX0sIm1pbiI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiJUl3Y3JES1ZRc1ptQitiaSkyengiLCJmaWVsZHMiOnsiTlVNIjoiLjMifX19LCJtYXgiOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6IlF3cHQocjd1Sld0TFBiOzdabDhJIiwiZmllbGRzIjp7Ik5VTSI6Ii41In19fX19fSwicmVzbyI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiV21GIXY/Szs0LzNXMS9JKWBuQ08iLCJmaWVsZHMiOnsiTlVNIjoiLjIifX19fX19fX1dfX0";

const urlCode = atob(hash);

try {
  const json = JSON.parse(urlCode);
  Blockly.serialization.workspaces.load(json, workspace);
} catch (err) {
  console.error("could not init code", err);
}
