import unocss, { presetUno } from "../deps/unocss.ts";
import { getExtension } from "../core/utils/path.ts";
import { merge } from "../core/utils/object.ts";

import type { UserConfig } from "../deps/unocss.ts";
import type Site from "../core/site.ts";

export interface Options {
  /** Extensions processed by this plugin to extract the utility classes */
  extensions?: string[];

  /**
   * Options passed to UnoCSS.
   * @see https://unocss.dev/guide/config-file
   */
  options?: Omit<UserConfig, "content">;
}

export const defaults: Options = {
  extensions: [".html"],
  options: {
    presets: [presetUno()],
  },
};

export default function (userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    // deno-lint-ignore no-explicit-any
    let unoPlugins: any[];

    if (site.hooks.postcss) {
      throw new Error(
        "PostCSS plugin is required to be installed AFTER UnoCSS plugin",
      );
    }

    site.process(options.extensions, (pages) => {
      // Get the content of all HTML pages (sorted by path)
      const content = pages.sort((a, b) => a.src.path.localeCompare(b.src.path))
        .map((page) => ({
          raw: page.content as string,
          extension: getExtension(page.outputPath).substring(1),
        }));

      // Create UnoCSS plugin
      // @ts-ignore: This expression is not callable.
      const plugin = unocss({
        configOrPath: options.options,
        content,
      });

      // Ensure PostCSS plugin is installed
      if (!site.hooks.postcss) {
        throw new Error(
          "PostCSS plugin is required to be installed AFTER UnoCSS plugin",
        );
      }

      // Replace the old UnoCSS plugin configuration from PostCSS plugins
      // deno-lint-ignore no-explicit-any
      site.hooks.postcss((runner: any) => {
        unoPlugins?.forEach((plugin) => {
          runner.plugins.splice(runner.plugins.indexOf(plugin), 1);
        });
        unoPlugins = runner.normalize([plugin]);
        runner.plugins = runner.plugins.concat(unoPlugins);
      });
    });
  };
}
