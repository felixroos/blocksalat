import * as Blockly from "blockly/core";
import "blockly/blocks";
import * as locale from "blockly/msg/en";
import "./style.css";
import { SalatRepl, nodeRegistry, register } from "@kabelsalat/web";
import "./plugins/toolbox-search/toolbox_search.ts";
import DarkTheme from "@blockly/theme-dark";
// import { FieldSlider } from "@blockly/field-slider";

// define custom code generator for kabelsalat
export const kabelsalatGenerator = new Blockly.Generator("kabelsalat");

Blockly.ContextMenuItems.registerCommentOptions();
Blockly.setLocale(locale);
/* DarkTheme.fontStyle = {
  family: "monospace",
  //weight: "bold",
  size: 10,
}; */

// get the names of all nodes from the kabelsalat nodeRegistry
// filter out names that are either handled in a special way (out, n) or ones that don't work with blockly
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

// change tags of clockdiv node (it's the only node with category "clock" -> tbd fix in kabelsalat)
allNodes.find(([name]) => name === "clockdiv")[1].tags = ["trigger"]; // change

// helper to create n inputs
let nInputs = (n) =>
  Array.from({ length: n }, (_, i) => ({ name: `in${i + 1}` }));

// here, we create different variants for nodes with dynamic arguments
// theoretically, dynamic inputs are possible with custom nodes in blockly
// but for now, let's create different variants for the same node

// create different poly node variants
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

// create different seq node variants
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

// define src node manually, as its not in the registry
allNodes.push([
  "src",
  {
    ins: [{ name: "channel" }],
    tags: ["meta"],
    description: `routes the given out channel back to create feedback`,
  },
]);
// define stereo node that can be used as a shadow node for out.channel
// see below for special if branch, ( search "stereo" )
allNodes.push([
  "stereo",
  {
    ins: [],
    tags: ["meta"],
    description: `splits to stereo. short for poly2(0,1)`,
  },
]);

// get list of all unique tags from all nodes
const allTags = allNodes
  .map(([_, config]) => config.tags)
  .flat()
  .filter((el, i, a) => a.indexOf(el) === i)
  .filter(
    (
      tag // filter out some tags that are too redundant
    ) => tag && !["distortion", "regular", "limiter", "external"].includes(tag)
  )
  .sort((a, b) => a.localeCompare(b));

// custom = register / input nodes + nodes created with them
const customCategoryName = "custom 🧪";
allTags.push(customCategoryName);
// create a block category for each tag
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

// blockly toolbox definition
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

// helper to register a new blockly block
function registerBlock(name, json, compile) {
  Blockly.Blocks[name] = {
    init: function () {
      this.jsonInit(json);
    },
  };
  kabelsalatGenerator.forBlock[name] = compile;
}

function registerBlockFromKabelsalat(name, config) {
  //console.log("register", name, config);
  let inputs = config.ins || [];
  // fix default inputs for arithmetic (they are dynamic in kabelsalat)
  // tbd maybe also add variants for these, like add2 add3 ?
  // might be too much, we can also do add(a, add(b,c)) instead of add(a,b,c)
  // alternatively, we could do addpoly(poly(a,b,c)) = add(a,b,c)
  if (["mul", "div"].includes(name)) {
    inputs = [
      { name: "in0", default: 1 },
      { name: "in1", default: 1 },
    ];
  } else if (["add", "sub"].includes(name)) {
    inputs = [
      { name: "in0", default: 0 },
      { name: "in1", default: 0 },
    ];
  }

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

  if (!config.tags) {
    console.warn("no tags", name);
  }

  // add block definition
  registerBlock(
    name,
    {
      message0: labels.map((label, i) => `${label} %${i + 1}`).join(" "),
      args0: args,
      output: "Number",
      colour: getCategoryColor(config.tags[0]),
      tooltip: `${config.description}\n${inputs
        .map(
          (input) =>
            `${input.name}${input.description ? ": " + input.description : ""}`
        )
        .join("\n")}`,
      // helpUrl: "https://kabel.salat.dev/reference/",
    },
    function compile(block, generator) {
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
      // rename polyN to poly
      if (name.startsWith("poly")) {
        name = "poly";
      }
      // rename seqN to seq
      if (name.startsWith("seq")) {
        name = "seq";
      }
      // each block compiles to a simple function call
      let code = `${name}(${args.join(", ")})`;
      // stereo node is just a fake variable
      if (name === "stereo") {
        code = "poly(0,1)";
      }
      return [code, 0];
    }
  );

  // add block to toolbox, into every category that matches the node tags
  categories
    .filter((category) => (config.tags || []).includes(category.name))
    .forEach((category) => {
      const config = {
        kind: "block",
        type: name,
        // add a shadow "n" block for each input, using the input's default (fallback to 0)
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
      };
      category.contents.push(config);
    });
}

window.registerBlockFromKabelsalat = registerBlockFromKabelsalat;

// this function is called from the "register" block
function registerCustomBlock(name, fn, args) {
  //console.log("registerCustomBlock", name, args);
  const config = {
    ins: args.map((name) => ({ name })),
    tags: [customCategoryName],
    description: "a custom block, defined in the workspace using 'register'",
  };
  registerBlockFromKabelsalat(name, config);

  const registered = register(name, fn);

  const customCategory = workspace
    .getToolbox()
    .getToolboxItems()
    .find((cat) => cat.getName() === customCategoryName);
  const contents = customCategory.getContents();
  if (!contents.find((def) => def.type === name)) {
    contents.push({ kind: "block", type: name });
    customCategory.updateFlyoutContents(contents);
  }

  return registered;
}
window.registerCustomBlock = registerCustomBlock;

// define all nodes
allNodes.forEach(([name, config]) => registerBlockFromKabelsalat(name, config));
const systemBlockColor = "#333";

// defines custom n block
registerBlock(
  "n",
  {
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
    colour: systemBlockColor,
    tooltip: "a constant number",
  },
  function compile(block, generator) {
    const value = block.getFieldValue("NUM");
    //return [value, 0];
    return [`n(${value})`, 0]; // n needed for out, which is chained (atm)
  }
);

getCategory("math").contents.push({ kind: "block", type: "n" });

// define custom out block
registerBlock(
  "out",
  {
    message0: `out %1 channel %2`,
    tooltip:
      "output to speakers. only channels 0 and 1 will go to the speakers. can be used together with src to create feedback!",
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
    colour: systemBlockColor,
  },
  function compile(block, generator) {
    const inputCode = generator.valueToCode(block, "input", 0);
    if (!inputCode) {
      return "n(0).out()";
    }
    const channelCode = generator.valueToCode(block, "channel", 0);
    return `${inputCode}.out(${channelCode})`;
  }
);

getCategory("meta").contents.push({
  kind: "block",
  type: "out",
  inputs: {
    input: {
      shadow: {
        type: "n",
        fields: {
          NUM: 0,
        },
      },
    },
    channel: {
      shadow: {
        type: "stereo",
      },
    },
  },
});

// defines custom "input" block
registerBlock(
  "input",
  {
    message0: `input %1`,
    args0: [
      {
        type: "field_input",
        name: "name",
        check: "String",
      },
    ],
    output: "Number",
    colour: systemBlockColor,
    tooltip: "defines a block input for a custom block",
  },
  function compile(block) {
    const name = block.getFieldValue("name");
    return [name, 0];
  }
);

getCategory(customCategoryName).contents.push({ kind: "block", type: "input" });

// defines custom "register" block
registerBlock(
  "register",
  {
    message0: `register %1 as %2`,
    args0: [
      {
        type: "field_input",
        name: "name",
        //check: "String",
      },
      {
        type: "input_value",
        name: "input",
        check: "Number",
      },
    ],
    colour: systemBlockColor,
    tooltip: "defines a new block inside the workspace",
  },
  function compile(block, generator) {
    const name = block.getFieldValue("name");
    if (!name) {
      return "";
    }
    // depth first search arg names (input blocks)
    let getArgs = (block, args = []) => {
      const children = block.getChildren();
      if (block.type === "input") {
        args.push(block.getFieldValue("name"));
      }
      if (children.length) {
        for (let child of children) {
          getArgs(child, args);
        }
      }
      return args;
    };
    const args = getArgs(block).filter(
      (arg, i, args) => args.indexOf(arg) === i
    );
    //console.log("args", args);

    let code = generator.valueToCode(block, "input", 0);
    if (!code) {
      code = "n(0)";
    }
    //return [value, 0];
    return `const ${name} = registerCustomBlock('${name}', 
  (${args.join(", ")}) => ${code},
  [${args.map((arg) => `'${arg}'`).join(",")}]
)`;
  }
);

getCategory(customCategoryName).contents.push({
  kind: "block",
  type: "register",
});

// init blockly workspace
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

// init kabelsalat repl
const repl = new SalatRepl();

// runs each time something changes
function update() {
  // generate and run kabelsalat code
  const code = kabelsalatGenerator.workspaceToCode(workspace);
  console.log("run:");
  console.log(code);
  repl.run(code);
  // persist workspace state to url hash, using hashed json
  const json = Blockly.serialization.workspaces.save(workspace);
  window.location.hash = "#" + btoa(JSON.stringify(json));
}

// events that should trigger an update
const supportedEvents = new Set([
  Blockly.Events.BLOCK_CHANGE,
  Blockly.Events.BLOCK_CREATE,
  Blockly.Events.BLOCK_DELETE,
  Blockly.Events.BLOCK_MOVE,
  Blockly.Events.BLOCK_FIELD_INTERMEDIATE_CHANGE,
]);

// first document click runs the patch, adds change listener + removes hint
window.addEventListener("click", function init() {
  update();
  window.removeEventListener("click", init);
  workspace.addChangeListener((event) => {
    //if (workspace.isDragging()) return;
    if (!supportedEvents.has(event.type)) return;
    update();
  });
  this.document.getElementById("clickhint").remove();
});

// get hash from url or use default one
const hash =
  window.location.hash.slice(1) ||
  "eyJibG9ja3MiOnsibGFuZ3VhZ2VWZXJzaW9uIjowLCJibG9ja3MiOlt7InR5cGUiOiJvdXQiLCJpZCI6Ik15fVBrSUA1WjhWNk5UXWt7Ui1DIiwieCI6MTIxLCJ5IjoxMDAsImlucHV0cyI6eyJpbnB1dCI6eyJibG9jayI6eyJ0eXBlIjoibHBmIiwiaWQiOiJ2SiRBNklockojXlAkMzd+YEBWWyIsImlucHV0cyI6eyJpbiI6eyJibG9jayI6eyJ0eXBlIjoic2F3IiwiaWQiOiJ9Uz0wYVtOSXp6V1JPYGNybEh1aSIsImlucHV0cyI6eyJmcmVxIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJbSUN0cW9+UFd3S2AyOF50QWhELSIsImZpZWxkcyI6eyJOVU0iOiI1NSJ9fX19fX0sImN1dG9mZiI6eyJibG9jayI6eyJ0eXBlIjoicmFuZ2UiLCJpZCI6InJvZEoxY0AjISxbeWBDbDBjLDAkIiwiaW5wdXRzIjp7ImluIjp7ImJsb2NrIjp7InR5cGUiOiJzaW5lIiwiaWQiOiJfREg7X1ZxUEhwM0NiQlk0JFFaPyIsImlucHV0cyI6eyJmcmVxIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJSaCVjJEFPQ3g3Zj1XLSVUaFZgNyIsImZpZWxkcyI6eyJOVU0iOiIuMiJ9fX19fX0sIm1pbiI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiJUl3Y3JES1ZRc1ptQitiaSkyengiLCJmaWVsZHMiOnsiTlVNIjoiLjMifX19LCJtYXgiOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6IlF3cHQocjd1Sld0TFBiOzdabDhJIiwiZmllbGRzIjp7Ik5VTSI6Ii41In19fX19fSwicmVzbyI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiV21GIXY/Szs0LzNXMS9JKWBuQ08iLCJmaWVsZHMiOnsiTlVNIjoiLjIifX19fX19fX1dfX0";

try {
  const json = JSON.parse(atob(hash)); // convert hash to oject
  console.log("load", json);

  // before loading the full json, we need to check if it contains "register" nodes
  // if yes, we need to run a "preflight" pass to make sure custom blocks are defined
  const registerBlocks = json.blocks.blocks.filter(
    (block) => block.type === "register"
  );
  if (registerBlocks.length) {
    const preflightWorkspace = {
      blocks: {
        languageVersion: 0,
        blocks: registerBlocks,
      },
    };
    Blockly.serialization.workspaces.load(preflightWorkspace, workspace);
    const preflightCode = kabelsalatGenerator.workspaceToCode(workspace);
    console.log("preflight:");
    console.log(preflightCode);
    Function(preflightCode)();
  }

  // problem: any custom nodes in this json won't be registered, because the code didn't run yet..
  // to run the code, we need to generate it, which we can only do if the workspace is loaded...
  // deadlock 3000
  Blockly.serialization.workspaces.load(json, workspace); // load to blockly
} catch (err) {
  console.error("could not init code", err);
}
