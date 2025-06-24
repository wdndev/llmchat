declare module 'mime-types' {
  export function lookup(path: string): string | false;
  // 这里可以添加更多需要的类型定义
}