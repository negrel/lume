import {
  assertEquals,
  assertStrictEquals as equals,
  assertStringIncludes as contains,
} from "../deps/assert.ts";
import { assertSiteSnapshot, build, getSite } from "./utils.ts";
import { SiteEvent } from "../core.ts";

Deno.test("build a simple site", async (t) => {
  const site = getSite({
    src: "simple",
  });

  await build(site);
  await assertSiteSnapshot(t, site);

  // Test the enumerated properties
  const page = site.pages[0];
  assertEquals(Object.keys(page), ["src", "dest", "data"]);
});

Deno.test("build/update events", async () => {
  const site = getSite(
    {
      src: "empty",
    },
    {},
  );

  const events: string[] = [];

  const listener = (event: SiteEvent) => events.push(event.type);
  const updateListener = (event: SiteEvent) => {
    equals(event.files!.size, 1);
    equals(event.files!.has("/page1.md"), true);
    listener(event);
  };

  site.addEventListener("beforeBuild", listener);
  site.addEventListener("afterBuild", listener);
  site.addEventListener("beforeUpdate", updateListener);
  site.addEventListener("afterUpdate", updateListener);
  site.addEventListener("beforeSave", listener);
  site.addEventListener("afterRender", listener);

  await site.build();

  equals(events.length, 4);
  equals(events[0], "beforeBuild");
  equals(events[1], "afterRender");
  equals(events[2], "beforeSave");
  equals(events[3], "afterBuild");

  await site.update(new Set(["/page1.md"]));

  equals(events.length, 8);
  equals(events[4], "beforeUpdate");
  equals(events[5], "afterRender");
  equals(events[6], "beforeSave");
  equals(events[7], "afterUpdate");
});
