import type {
  ComponentsOptions,
  default as Site,
  ServerOptions,
  SiteOptions,
  WatcherOptions,
} from "./core/site.ts";

import type {
  default as Events,
  Event,
  EventListener,
  EventOptions,
  EventType,
} from "./core/events.ts";

import type {
  default as Scripts,
  ScriptOptions,
  ScriptOrFunction,
} from "./core/scripts.ts";

import type { default as Reader, Loader } from "./core/reader.ts";
import type Logger from "./core/logger.ts";
import type Writer from "./core/writer.ts";
import type IncludesLoader from "./core/includes_loader.ts";
import type PageLoader from "./core/page_loader.ts";
import type AssetLoader from "./core/asset_loader.ts";
import type DataLoader from "./core/data_loader.ts";
import type {
  Component,
  ComponentsTree,
  default as ComponentLoader,
} from "./core/component_loader.ts";
import type {
  Content,
  Data,
  Dest,
  Directory,
  Page,
  Src,
} from "./core/filesystem.ts";
import type Source from "./core/source.ts";
import type Renderer from "./core/renderer.ts";
import type { default as Processors, Processor } from "./core/processors.ts";
import type { default as Scopes, ScopeFilter } from "./core/scopes.ts";
import type {
  default as Engines,
  Engine,
  Helper,
  HelperOptions,
} from "./core/engines.ts";
import type { ErrorData, Exception } from "./core/errors.ts";

/** Data to create a new response. */
type FileResponse = [BodyInit | null, ResponseInit];

/** The method that installs a plugin */
type PluginSetup = ((options: unknown) => Plugin);

/** A generic Lume plugin */
type Plugin = (site: Site) => void;

export type {
  AssetLoader,
  Component,
  ComponentLoader,
  ComponentsOptions,
  ComponentsTree,
  Content,
  Data,
  DataLoader,
  Dest,
  Directory,
  Engine,
  Engines,
  ErrorData,
  Event,
  EventListener,
  EventOptions,
  Events,
  EventType,
  Exception,
  FileResponse,
  Helper,
  HelperOptions,
  IncludesLoader,
  Loader,
  Logger,
  Page,
  PageLoader,
  Plugin,
  PluginSetup,
  Processor,
  Processors,
  Reader,
  Renderer,
  ScopeFilter,
  Scopes,
  ScriptOptions,
  ScriptOrFunction,
  Scripts,
  ServerOptions,
  Site,
  SiteOptions,
  Source,
  Src,
  WatcherOptions,
  Writer,
};
