import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";
import "blockly/blocks";
import * as locale from "blockly/msg/en";
import "./style.css";
import { SalatRepl } from "@kabelsalat/web";
import "@blockly/toolbox-search";
import DarkTheme from "@blockly/theme-dark";

export const kabelsalatGenerator = new Blockly.Generator("kabelsalat");

const toolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "click to show all nodes",
      colour: 10,
      contents: [
        {
          kind: "block",
          type: "n",
        },
        {
          kind: "block",
          type: "out",
        },
        {
          kind: "search",
          name: "Search",
          contents: [],
          type: "",
        },
      ],
    },
    {
      kind: "search",
      name: "Search",
      contents: [],
    },
  ],
};

const registerNodeBlock = (name, inputs, output = "Number") => {
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
        })),
        ...(output && { output }),
        colour: 160,
        // tooltip: "Sine oscillator",
        // helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp",
      });
    },
  };
  toolbox.contents[0].contents.push({
    kind: "block",
    type: name,
  });
  registerCodegen(name, inputs, output);
};

function registerCodegen(name, inputs, output = "Number") {
  kabelsalatGenerator.forBlock[name] = function (block, generator) {
    const args = block.inputList.map((input, i) => {
      if (input.type === Blockly.INPUT_VALUE) {
        const inputCode = generator.valueToCode(block, input.name, 0);
        return inputCode || inputs[i].default;
      } else {
        throw new Error(`unexpected input value ${input.type}`);
      }
    });
    const code = `${name}(${args.join(", ")})`;

    if (!output) {
      return code;
    }
    return [code, 0];
  };
}

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
      colour: 160,
    });
  },
};
kabelsalatGenerator.forBlock["out"] = function (block, generator) {
  const value = block.getFieldValue("NUM");
  const inputCode = generator.valueToCode(block, "input", 0);
  return `${inputCode}.out()`;
};

// registerNodeBlock("out", [{ name: "input", default: 0 }], false);

// registerNodeBlock("n", [{ name: "value", default: 0 }]);
registerNodeBlock("withIns", [{ name: "in", dynamic: true }]);
registerNodeBlock("raw", [
  { name: "in" },
  {
    name: "code",
    description:
      "expression with variable `t` being the elapsed time and `$input` the input.",
  },
]);
registerNodeBlock("bytebeat", [
  { name: "t", description: "time in samples" },
  { name: "code", description: "bytebeat code with variable `t`" },
]);
registerNodeBlock("floatbeat", [
  { name: "t", description: "time in samples" },
  { name: "code", description: "floatbeat code with variable `t`" },
]);
registerNodeBlock("adsr", [
  { name: "gate", default: 0, description: "gate input" },
  { name: "att", default: 0.02, description: "attack time" },
  { name: "dec", default: 0.1, description: "decay time" },
  { name: "sus", default: 0.2, description: "sustain level" },
  { name: "rel", default: 0.1, description: "release time" },
]);
registerNodeBlock("ar", [
  { name: "trig", default: 0, description: "gate input" },
  { name: "att", default: 0.02, description: "attack time" },
  { name: "rel", default: 0.1, description: "release time" },
]);
registerNodeBlock("ad", [
  { name: "trig", default: 0, description: "gate input" },
  { name: "att", default: 0.02, description: "attack time" },
  { name: "dec", default: 0.1, description: "decay time" },
]);
registerNodeBlock("clock", [
  {
    name: "bpm",
    default: 120,
    description: "clock tempo in bpm (beats per minute)",
  },
]);
registerNodeBlock("clockdiv", [
  { name: "clock", default: 0, description: "clock input" },
  { name: "divisor", default: 2, description: "tempo divisor" },
]);
registerNodeBlock("distort", [
  { name: "in", default: 0 },
  { name: "amt", default: 0, description: "distortion amount" },
]);
registerNodeBlock("noise", []);
registerNodeBlock("pink", []);
registerNodeBlock("brown", []);
registerNodeBlock("dust", [
  { name: "density", default: 0, description: "average impulses per second" },
]);
registerNodeBlock("impulse", [
  { name: "freq", default: 0 },
  { name: "phase", default: 0 },
]);
registerNodeBlock("saw", [{ name: "freq", default: 0 }]);
registerNodeBlock("zaw", [{ name: "freq", default: 0 }]);
registerNodeBlock("sine", [
  { name: "freq", default: 0 },
  { name: "sync", default: 0, description: "sync input" },
  { name: "phase", default: 0, description: "phase offset" },
]);
registerNodeBlock("tri", [{ name: "freq", default: 0 }]);
registerNodeBlock("pulse", [
  { name: "freq", default: 0 },
  { name: "pw", default: 0.5, description: "pulse width 0 - 1" },
]);
registerNodeBlock("slide", [
  { name: "in", default: 0 },
  { name: "rate", default: 1 },
]);
registerNodeBlock("lag", [
  { name: "in", default: 0 },
  { name: "rate", default: 1, description: "60 dB lag time in seconds" },
]);
registerNodeBlock("slew", [
  { name: "in", default: 0 },
  {
    name: "up",
    default: 1,
    description: "Maximum upward slope in units per second",
  },
  {
    name: "dn",
    default: 1,
    description: "Maximum downward slope in units per second",
  },
]);
registerNodeBlock("filter", [
  { name: "in", default: 0 },
  { name: "cutoff", default: 1 },
  { name: "reso", default: 0 },
]);
registerNodeBlock("fold", [
  { name: "in", default: 0 },
  { name: "rate", default: 0 },
]);
registerNodeBlock("seq", [
  { name: "trig", default: 0 },
  { name: "step", default: 0, dynamic: true, description: "step inputs" },
]);
registerNodeBlock("delay", [
  { name: "in", default: 0 },
  { name: "time", default: 0 },
]);
registerNodeBlock("hold", [
  { name: "in", default: 0 },
  { name: "trig", default: 0 },
]);
registerNodeBlock("midifreq", [
  {
    name: "channel",
    default: -1,
    description: "Channel filter. Defaults to all channels",
  },
]);
registerNodeBlock("midigate", [{ name: "channel", default: -1 }]);
registerNodeBlock("midicc", [
  { name: "ccnumber", default: -1 },
  { name: "channel", default: -1 },
]);
registerNodeBlock("cc", [
  { name: "id", default: 0 },
  { name: "value", default: 0 },
]);
registerNodeBlock("audioin", []);
registerNodeBlock("log", [{ name: "in" }]);
registerNodeBlock("exp", [{ name: "in" }]);
registerNodeBlock("pow", [{ name: "in" }, { name: "power" }]);
registerNodeBlock("sin", [{ name: "in" }]);
registerNodeBlock("cos", [{ name: "in" }]);
registerNodeBlock("mul", [{ name: "in", dynamic: true }]);
registerNodeBlock("add", [{ name: "in", dynamic: true }]);
registerNodeBlock("div", [{ name: "in", dynamic: true }]);
registerNodeBlock("sub", [{ name: "in", dynamic: true }]);
registerNodeBlock("mod", [{ name: "in" }, { name: "modulo" }]);
registerNodeBlock("abs", [{ name: "in" }]);
registerNodeBlock("round", [{ name: "in" }]);
registerNodeBlock("min", [{ name: "in", dynamic: true }]);
registerNodeBlock("max", [{ name: "in", dynamic: true }]);
registerNodeBlock("argmin", [{ name: "in", dynamic: true }]);
registerNodeBlock("argmax", [{ name: "in", dynamic: true }]);
registerNodeBlock("greater", [{ name: "in" }, { name: "threshold" }]);
registerNodeBlock("xor", [{ name: "a" }, { name: "b" }]);
registerNodeBlock("and", [{ name: "a" }, { name: "b" }]);
registerNodeBlock("or", [{ name: "a" }, { name: "b" }]);
registerNodeBlock("range", [{ name: "in" }, { name: "min" }, { name: "max" }]);
registerNodeBlock("remap", [
  { name: "in" },
  { name: "inmin" },
  { name: "inmax" },
  { name: "outmin" },
  { name: "outmax" },
]);
registerNodeBlock("rangex", [{ name: "in" }, { name: "min" }, { name: "max" }]);
registerNodeBlock("midinote", [{ name: "midi" }]);
registerNodeBlock("fork", [{ name: "in" }, { name: "times" }]);
registerNodeBlock("perc", [{ name: "gate" }, { name: "release" }]);
registerNodeBlock("hpf", [
  { name: "in" },
  { name: "cutoff" },
  { name: "reso" },
]);
registerNodeBlock("lpf", [
  { name: "in" },
  { name: "cutoff" },
  { name: "reso" },
]);
registerNodeBlock("bpf", [
  { name: "in" },
  { name: "cutoff" },
  { name: "reso" },
]);
registerNodeBlock("lfnoise", [{ name: "freq" }]);
registerNodeBlock("bipolar", [{ name: "in" }]);
registerNodeBlock("unipolar", [{ name: "in" }]);
registerNodeBlock("pan", [
  { name: "in" },
  {
    name: "pos",
    description: "bipolar position: -1 = left, 0 = center, 1 = right",
  },
]);
registerNodeBlock("pick", [
  { name: "index" },
  { name: "inputs", dynamic: true },
]);
registerNodeBlock("clip", [{ name: "input" }, { name: "lo" }, { name: "hi" }]);
registerNodeBlock("trig", [
  { name: "input", default: 0 },
  { name: "lo", default: -1 },
  { name: "hi", default: 1 },
]);
registerNodeBlock("split", [{ name: "input" }, { name: "fn" }]);
registerNodeBlock("mix", [
  { name: "in" },
  {
    name: "channels",
    default: 1,
    description: "how many channels to mix down to. Only supports 1 and 2",
  },
]);
registerNodeBlock("mouseX", []);
registerNodeBlock("mouseY", []);

Blockly.setLocale(locale);

toolbox.contents[0].contents.sort((a, b) => a.type.localeCompare(b.type));
console.log("toolbox", toolbox);
const workspace = Blockly.inject(document.getElementById("blockly"), {
  readOnly: false,
  theme: DarkTheme,
  //trashcan: true,
  //media: "media/",
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
  const jsonString = JSON.stringify(json);
  console.log(jsonString);
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

var json = {
  blocks: {
    languageVersion: 0,
    blocks: [
      {
        type: "out",
        id: "cz]:bgLGZ7!J[ucl6dP+",
        x: 145,
        y: 110,
        inputs: {
          input: {
            block: {
              type: "sine",
              id: "%1Z##gWsPPwro:QPM;gR",
              inputs: {
                freq: {
                  block: {
                    type: "range",
                    id: "s/,R|D]D^%[%*StSm+}G",
                    inputs: {
                      in: {
                        block: {
                          type: "sine",
                          id: "-#2+ptL[;c*z?b5S%}z)",
                          inputs: {
                            freq: {
                              block: {
                                type: "n",
                                id: "V*ilu7flc(|F$vn}iVz(",
                                fields: { NUM: "2" },
                              },
                            },
                          },
                        },
                      },
                      min: {
                        block: {
                          type: "n",
                          id: "z1NpzKzI[=_2WabtgAmB",
                          fields: { NUM: "200" },
                        },
                      },
                      max: {
                        block: {
                          type: "n",
                          id: "nHfO,Fi{soHN.wLm9riD",
                          fields: { NUM: "300" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    ],
  },
};

Blockly.serialization.workspaces.load(json, workspace);
