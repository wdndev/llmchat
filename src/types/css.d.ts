// src/renderer/types/css.d.ts
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
