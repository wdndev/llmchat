declare module 'markdown-it' {
  class MarkdownIt {
    constructor(options?: MarkdownIt.Options);
    render(src: string, env?: any): string;
    // 可以根据需要添加更多方法定义
  }

  namespace MarkdownIt {
    interface Options {
      html?: boolean;
      xhtmlOut?: boolean;
      breaks?: boolean;
      langPrefix?: string;
      linkify?: boolean;
      typographer?: boolean;
      quotes?: string;
      highlight?: (str: string, lang: string) => string;
    }
  }

  export = MarkdownIt;
}