// Minimum TypeScript Version: 4.1
// tslint:disable:no-unnecessary-generics

import {
  JSX,
  FunctionComponent,
  ComponentType,
  ComponentChildren,
} from "preact";

import {
  Path,
  PathPattern,
  BaseLocationHook,
  HookReturnValue,
  HookNavigationOptions,
  BaseSearchHook,
} from "./location-hook.js";
import {
  BrowserLocationHook,
  BrowserSearchHook,
} from "./use-browser-location.js";

import { RouterObject, RouterOptions, Parser } from "./router.js";

// these files only export types, so we can re-export them as-is
// in TS 5.0 we'll be able to use `export type * from ...`
export * from "./location-hook.js";
export * from "./router.js";

import { RouteParams } from "regexparam";

export type StringRouteParams<T extends string> = RouteParams<T> & {
  [param: number]: string | undefined;
};
export type RegexRouteParams = { [key: string | number]: string | undefined };

/**
 * Route patterns and parameters
 */
export interface DefaultParams {
  readonly [paramName: string | number]: string | undefined;
}

export type Params<T extends DefaultParams = DefaultParams> = T;

export type MatchWithParams<T extends DefaultParams = DefaultParams> = [
  true,
  Params<T>
];
export type NoMatch = [false, null];
export type Match<T extends DefaultParams = DefaultParams> =
  | MatchWithParams<T>
  | NoMatch;

/*
 * Components: <Route />
 */

export interface RouteComponentProps<T extends DefaultParams = DefaultParams> {
  params: T;
}

export interface RouteProps<
  T extends DefaultParams | undefined = undefined,
  RoutePath extends PathPattern = PathPattern
> {
  children?:
    | ((
        params: T extends DefaultParams
          ? T
          : RoutePath extends string
          ? StringRouteParams<RoutePath>
          : RegexRouteParams
      ) => ComponentChildren)
    | ComponentChildren;
  path?: RoutePath;
  component?: ComponentType<
    RouteComponentProps<
      T extends DefaultParams
        ? T
        : RoutePath extends string
        ? StringRouteParams<RoutePath>
        : RegexRouteParams
    >
  >;
  nest?: boolean;
}

export function Route<
  T extends DefaultParams | undefined = undefined,
  RoutePath extends PathPattern = PathPattern
>(props: RouteProps<T, RoutePath>): ReturnType<FunctionComponent>;

/*
 * Components: <Link /> & <Redirect />
 */

export type NavigationalProps<
  H extends BaseLocationHook = BrowserLocationHook
> = ({ to: Path; href?: never } | { href: Path; to?: never }) &
  HookNavigationOptions<H>;

type AsChildProps<ComponentProps, DefaultElementProps> =
  | ({ asChild?: false } & DefaultElementProps)
  | ({ asChild: true } & ComponentProps);

type HTMLLinkAttributes = Omit<JSX.HTMLAttributes, "className"> & {
  className?: string | undefined | ((isActive: boolean) => string | undefined);
};

export type LinkProps<H extends BaseLocationHook = BrowserLocationHook> =
  NavigationalProps<H> &
    AsChildProps<
      { children: ComponentChildren; onClick?: JSX.MouseEventHandler<Element> },
      HTMLLinkAttributes
    >;

export type RedirectProps<H extends BaseLocationHook = BrowserLocationHook> =
  NavigationalProps<H> & {
    children?: never;
  };

export function Redirect<H extends BaseLocationHook = BrowserLocationHook>(
  props: RedirectProps<H>,
  context?: any
): null;

export function Link<H extends BaseLocationHook = BrowserLocationHook>(
  props: LinkProps<H>,
  context?: any
): ReturnType<FunctionComponent>;

/*
 * Components: <Switch />
 */

export interface SwitchProps {
  location?: string;
  children: ComponentChildren;
}
export const Switch: FunctionComponent<SwitchProps>;

/*
 * Components: <Router />
 */

export type RouterProps = RouterOptions & {
  children: ComponentChildren;
};

export const Router: FunctionComponent<RouterProps>;

/*
 * Hooks
 */

export function useRouter(): RouterObject;

export function useRoute<
  T extends DefaultParams | undefined = undefined,
  RoutePath extends PathPattern = PathPattern
>(
  pattern: RoutePath
): Match<
  T extends DefaultParams
    ? T
    : RoutePath extends string
    ? StringRouteParams<RoutePath>
    : RegexRouteParams
>;

export function useLocation<
  H extends BaseLocationHook = BrowserLocationHook
>(): HookReturnValue<H>;

export function useSearch<
  H extends BaseSearchHook = BrowserSearchHook
>(): ReturnType<H>;

export function useParams<T = undefined>(): T extends string
  ? StringRouteParams<T>
  : T extends undefined
  ? DefaultParams
  : T;

/*
 * Helpers
 */

export function matchRoute<
  T extends DefaultParams | undefined = undefined,
  RoutePath extends PathPattern = PathPattern
>(
  parser: Parser,
  pattern: RoutePath,
  path: string,
  loose?: boolean
): Match<
  T extends DefaultParams
    ? T
    : RoutePath extends string
    ? StringRouteParams<RoutePath>
    : RegexRouteParams
>;

// tslint:enable:no-unnecessary-generics
