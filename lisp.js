// https://garten.salat.dev/lisp/parser.html
export class LispParser {
  // these are the tokens we expect
  token_types = {
    open_list: /^\(/,
    close_list: /^\)/,
    plain: /^[a-zA-Z0-9\.\#]+/,
  };
  // matches next token
  next_token(code) {
    for (let type in this.token_types) {
      const match = code.match(this.token_types[type]);
      if (match) {
        return { type, value: match[0] };
      }
    }
    throw new Error(`could not match "${code}"`);
  }
  // takes code string, returns list of matched tokens (if valid)
  tokenize(code) {
    let tokens = [];
    while (code.length > 0) {
      code = code.trim();
      const token = this.next_token(code);
      code = code.slice(token.value.length);
      tokens.push(token);
    }
    return tokens;
  }
  // take code, return abstract syntax tree
  parse(code) {
    this.tokens = this.tokenize(code);
    return this.parse_expr();
  }
  // parses any valid expression
  parse_expr() {
    let next = this.tokens[0]?.type;
    if (next === "open_list") {
      return this.parse_list();
    }
    if (next === "plain") {
      return this.consume("plain");
    }
    if (!this.tokens[0]) {
      throw new Error(`unexpected end of file`);
    }
    throw new Error(
      `unexpected token "${this.tokens[0].value}" of type ${this.tokens[0].type}`
    );
  }
  parse_list() {
    this.consume("open_list");
    const children = [];
    while (this.tokens[0]?.type !== "close_list") {
      children.push(this.parse_expr());
    }
    this.consume("close_list");
    return { type: "list", children };
  }
  consume(type) {
    // shift removes first element and returns it
    const token = this.tokens.shift();
    if (token.type !== type) {
      throw new Error(`expected token type ${type}, got ${token.type}`);
    }
    return token;
  }
}
