import * as Blockly from "blockly/core";
import { SalatRepl, nodeRegistry, register, n } from "@kabelsalat/web";
import "./plugins/toolbox-search/toolbox_search.ts";
import DarkTheme from "@blockly/theme-dark";
import { LispParser } from "./lisp.js";

// import { FieldSlider } from "@blockly/field-slider";

export class Blocksalat {
  inited = false;
  // this is only called once for the document lifetime
  static init() {
    if (this.inited) {
      return;
    }
    this.inited = true;

    // define custom code generator for kabelsalat
    this.kabelsalatGenerator = new Blockly.Generator("kabelsalat");

    Blockly.ContextMenuItems.registerCommentOptions();
    //console.log("DarkTheme", DarkTheme);
    DarkTheme.componentStyles = {
      ...DarkTheme.componentStyles,
      workspaceBackgroundColour: "transparent",
      scrollbarColour: "transparent",
    };
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
        ) =>
          tag && !["distortion", "regular", "limiter", "external"].includes(tag)
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

    // helper to register a new blockly block
    const blockRegistry = new Map();
    function registerBlock(name, json, compile) {
      Blockly.Blocks[name] = {
        init: function () {
          this.jsonInit(json);
        },
      };
      Blocksalat.kabelsalatGenerator.forBlock[name] = compile;
      blockRegistry.set(name, json);
    }
    this.blockRegistry = blockRegistry;

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
                `${input.name}${
                  input.description ? ": " + input.description : ""
                }`
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
    this.registerBlockFromKabelsalat = registerBlockFromKabelsalat.bind(this);

    // define all nodes
    allNodes.forEach(([name, config]) =>
      registerBlockFromKabelsalat(name, config)
    );
    const systemBlockColor = "#555";

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
        return [value, 0];
      }
    );

    getCategory("math").contents.push({ kind: "block", type: "n" });

    // define custom out block
    window.out = (input, channel) => n(input).out(channel); // patch: create standalone "out" function
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
        let inputCode = generator.valueToCode(block, "input", 0);
        const channelCode = generator.valueToCode(block, "channel", 0);
        return `out(${inputCode || "0"}, ${channelCode || "[0,1]"})`;
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

    getCategory(customCategoryName).contents.push({
      kind: "block",
      type: "input",
    });

    function getBlockChildren(block, filterFn) {
      // depth first search arg names (input blocks)
      let getChildren = (block, args = []) => {
        const children = block.getChildren();
        if (filterFn(block)) {
          args.push(block);
        }
        if (children.length) {
          for (let child of children) {
            getChildren(child, args);
          }
        }
        return args;
      };
      return getChildren(block);
    }
    function getBlockInputs(block) {
      return getBlockChildren(block, (child) => child.type === "input")
        .map((block) => block.getFieldValue("name"))
        .filter((arg, i, args) => args.indexOf(arg) === i);
    }

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
        const inputs = getBlockInputs(block);

        let code = generator.valueToCode(block, "input", 0);
        if (!code) {
          code = "n(0)";
        }
        //return [value, 0];
        return `const ${name} = registerCustomBlock('${name}', 
  (${inputs.join(", ")}) => ${code},
  [${inputs.map((arg) => `'${arg}'`).join(",")}]
)`;
      }
    );

    getCategory(customCategoryName).contents.push({
      kind: "block",
      type: "register",
    });

    // defines custom "lambda" block
    registerBlock(
      "lambda",
      {
        message0: `lambda %1`,
        args0: [
          {
            type: "input_value",
            name: "input",
            check: "Number",
          },
        ],
        colour: systemBlockColor,
        output: "Number",
        tooltip: "returns a lambda function",
      },
      function compile(block, generator) {
        const inputs = getBlockInputs(block);
        let code = generator.valueToCode(block, "input", 0);
        if (!code) {
          code = "n(0)";
        }
        //return [value, 0];
        return [`(${inputs.join(", ")}) => ${code}`, 0];
      }
    );

    getCategory("meta").contents.push({
      kind: "block",
      type: "lambda",
    });
    // static props
    this.categories = categories;
    this.customCategoryName = customCategoryName;
  }
  // workspace, repl
  constructor(targetElement, config = {}) {
    Blocksalat.init();
    this.config = config;
    // blockly toolbox definition
    let toolbox;
    if (config.toolbox) {
      const contents = [...Blocksalat.categories];
      if (config.search) {
        contents.unshift({
          kind: "search",
          name: "Search",
          contents: [],
          colour: "#222",
        });
      }
      toolbox = {
        kind: "categoryToolbox",
        contents,
      };
    }
    let zoom;
    let move = {
      scrollbars: true, // this is needed to center the workspace..
      drag: false,
      wheel: false,
    };
    if (!config.readOnly) {
      zoom = {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.6,
        scaleSpeed: 1.2,
        pinch: true,
      };
      move = {
        scrollbars: true,
        drag: true,
        wheel: true,
      };
    }

    // init blockly workspace
    this.workspace = Blockly.inject(targetElement, {
      readOnly: config.readOnly ?? false,
      theme: DarkTheme,
      trashcan: false,
      sound: false,
      // rtl: true,
      move,
      zoom,
      toolbox,
    });

    window.registerCustomBlock = this.registerCustomBlock.bind(this);
    // init kabelsalat repl
    this.repl = new SalatRepl();
  }

  // runs each time something changes
  update() {
    // generate and run kabelsalat code
    const code = Blocksalat.kabelsalatGenerator.workspaceToCode(this.workspace);
    console.log("run:");
    console.log(code);
    this.repl.run(code);
    if (this.config.onChange) {
      // persist workspace state to url hash, using hashed json
      const json = Blockly.serialization.workspaces.save(this.workspace);
      this.config.onChange(json);
    }
  }
  handleChange(event) {
    const supportedEvents = new Set([
      Blockly.Events.BLOCK_CHANGE,
      Blockly.Events.BLOCK_CREATE,
      Blockly.Events.BLOCK_DELETE,
      Blockly.Events.BLOCK_MOVE,
      Blockly.Events.BLOCK_FIELD_INTERMEDIATE_CHANGE,
    ]);
    //if (workspace.isDragging()) return;
    if (!supportedEvents.has(event.type)) return;
    this.update();
  }
  // should be called on a user click
  start() {
    this.update();
  }
  stop() {
    this.repl.stop();
  }
  toggle() {
    this.changeListener = this.changeListener || this.handleChange.bind(this);
    if (this.started) {
      this.started = false;
      this.stop();
      this.workspace.removeChangeListener(this.changeListener);
    } else {
      this.started = true;
      this.start();
      this.workspace.addChangeListener(this.changeListener);
    }
  }
  loadJSON(json) {
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
      Blockly.serialization.workspaces.load(preflightWorkspace, this.workspace);
      const preflightCode = Blocksalat.kabelsalatGenerator.workspaceToCode(
        this.workspace
      );
      console.log("preflight:");
      console.log(preflightCode);
      Function(preflightCode)();
    }

    // problem: any custom nodes in this json won't be registered, because the code didn't run yet..
    // to run the code, we need to generate it, which we can only do if the workspace is loaded...
    // deadlock 3000
    Blockly.serialization.workspaces.load(json, this.workspace); // load to blockly
    if (this.workspace.options.readOnly) {
      this.workspace.zoomToFit();
    }
  }
  static lisp2blocks(lisp) {
    let parseNode = (node) => {
      // console.log("parse", node);
      if (typeof node === "undefined") {
        node = { type: "plain", value: 0 };
      }
      if (node.type === "plain") {
        return { shadow: { type: "n", fields: { NUM: Number(node.value) } } };
      }
      if (node.type !== "list") {
        throw new Error(
          `expected top level element to be a list, got ${node.type}`
        );
      }
      let [type, ...args] = node.children;
      if (type.type !== "plain") {
        throw new Error(
          `expected first child to be of type plain, got ${type.type}`
        );
      }
      type = type.value;
      // console.log("type", type, "args", args, this);
      const def = this.blockRegistry.get(type);
      if (!def) {
        throw new Error(`could not find definition for type "${type}"`);
      }
      const validArgs = def.args0.filter((arg) => arg.type !== "input_dummy");
      // console.log("args", type, validArgs);
      const inputs = Object.fromEntries(
        validArgs.map((arg, i) => [arg.name, parseNode(args[i])])
      );
      let block = {
        type,
        inputs,
      };
      return { block };
    };

    this.lisp = this.lisp || new LispParser();
    const ast = this.lisp.parse(lisp);
    /* if (ast.type !== "list" || ast.children[0].value !== "out") {
      throw new Error(`expected outermost element to be of type "out"`);
    }
    if (ast.children[2] === undefined) {
      ast.children[2] = {
        type: "list",
        children: [{ type: "plain", value: "stereo" }],
      };
    } */
    //console.log("ast", ast);
    const { block } = parseNode(ast);
    return {
      blocks: {
        languageVersion: 0,
        blocks: [block],
      },
    };
  }
  load(hash) {
    try {
      let str;
      if (hash.startsWith("(")) {
        str = hash; // allow passing unhashed lisp
      } else {
        str = atob(hash);
      }
      let json;
      // starts with (, its lisp
      if (str.startsWith("(")) {
        json = Blocksalat.lisp2blocks(str);
      } else {
        json = JSON.parse(str); // convert hash to oject
      }
      this.loadJSON(json);
    } catch (err) {
      console.error("could not init code", err);
    }
  }

  // this function is called from the "register" block
  registerCustomBlock(name, fn, args) {
    //console.log("registerCustomBlock", name, args);
    const config = {
      ins: args.map((name) => ({ name })),
      tags: [Blocksalat.customCategoryName],
      description: "a custom block, defined in the workspace using 'register'",
    };
    Blocksalat.registerBlockFromKabelsalat(name, config);

    const registered = register(name, fn);

    const customCategory = this.workspace
      .getToolbox()
      .getToolboxItems()
      .find((cat) => cat.getName() === Blocksalat.customCategoryName);
    const contents = customCategory.getContents();
    if (!contents.find((def) => def.type === name)) {
      contents.push({ kind: "block", type: name });
      customCategory.updateFlyoutContents(contents);
    }

    return registered;
  }
}

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
