// Type definitions for checkit
// Project: https://github.com/tgriesser/checkit
// Definitions by: Pavel Zinovev <https://github.com/zombiQWERTY>

export as namespace Checkit
export = Checkit

declare class Checkit {
  constructor(rules: Checkit.Rules)

  run(body: Checkit.Body): Promise<Boolean>
}

declare namespace Checkit {
  export type Rules = {
    [name: string]: any
  }

  export type Body = {
    [name: string]: any
  }
}
