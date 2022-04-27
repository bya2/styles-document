declare module "*.css";

declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export = content;
}

declare module "uuid";
