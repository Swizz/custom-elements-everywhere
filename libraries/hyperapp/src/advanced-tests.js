/**
 * @license
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { expect } from "chai";
import { app as hyperApp } from "hyperapp";

import {
  ComponentWithProperties,
  ComponentWithDeclarativeEvent,
} from "./components";

describe("advanced support", function() {
  // Setup the test harness. This will get cleaned out with every test.
  const app = document.createElement("div");
  app.id = "app";
  document.body.appendChild(app);

  let root; // This will hold the actual element under test.

  beforeEach(function() {
    root = document.createElement("div");
    app.appendChild(root);
  });

  afterEach(function() {
    app.innerHTML = "";
    root = null;
  });

  describe("attributes and properties", function() {
    beforeEach(() => {
      hyperApp({ ...ComponentWithProperties, node: root });
    })

    it("will pass array data as a property", async function() {
      this.weight = 2;

      await new Promise(resolve => requestAnimationFrame(resolve));

      const wc = root.querySelector('#wc');
      const data = wc.arr || wc.getAttribute("arr");

      expect(data).to.eql(["h", "y", "p", "e", "r", "a", "p", "p"]);
    });

    it("will pass object data as a property", async function() {
      this.weight = 2;

      await new Promise(resolve => requestAnimationFrame(resolve));

      const wc = root.querySelector('#wc');
      const data = wc.obj || wc.getAttribute("obj");

      expect(data).to.eql({ library: "hyperapp" });
    });
  });

  describe("events", function() {
    beforeEach(() => {
      hyperApp({ ...ComponentWithDeclarativeEvent, node: root });
    });

    it('can declaratively listen to a lowercase DOM event dispatched by a Custom Element', async function() {
      this.weight = 2;

      await new Promise(resolve => requestAnimationFrame(resolve));

      const wc = root.querySelector("#wc");
      expect(wc).to.exist;

      expect(root.hasAttribute("lowercasehandled")).to.eql(false);

      wc.dispatchEvent(new Event("click"));

      await new Promise(resolve => requestAnimationFrame(resolve));

      expect(root.hasAttribute("lowercasehandled")).to.eql(true);
    });

    it("can declaratively listen to a kebab-case DOM event dispatched by a Custom Element", async function() {
      this.weight = 1;

      await new Promise(resolve => requestAnimationFrame(resolve));

      const wc = root.querySelector("#wc");
      expect(wc).to.exist;

      expect(root.hasAttribute("kebabhandled")).to.eql(false);

      wc.dispatchEvent(new Event("click"));

      await new Promise(resolve => requestAnimationFrame(resolve));

      expect(root.hasAttribute("kebabhandled")).to.eql(true);
    });

    it("can declaratively listen to a camelCase DOM event dispatched by a Custom Element", async function() {
      this.weight = 1;

      await new Promise(resolve => requestAnimationFrame(resolve));

      const wc = root.querySelector("#wc");
      expect(wc).to.exist;

      expect(root.hasAttribute("camelhandled")).to.eql(false);

      wc.dispatchEvent(new Event("click"));

      await new Promise(resolve => requestAnimationFrame(resolve));

      expect(root.hasAttribute("camelhandled")).to.eql(true);
    });

    it("can declaratively listen to a CAPScase DOM event dispatched by a Custom Element", async function() {
      this.weight = 1;
      await new Promise(resolve => requestAnimationFrame(resolve));

      const wc = root.querySelector("#wc");
      expect(wc).to.exist;

      expect(root.hasAttribute("capshandled")).to.eql(false);

      wc.dispatchEvent(new Event("click"));

      await new Promise(resolve => requestAnimationFrame(resolve));

      expect(root.hasAttribute("capshandled")).to.eql(true);
    });

    it("can declaratively listen to a PascalCase DOM event dispatched by a Custom Element", async function() {
      this.weight = 1;
      await new Promise(resolve => requestAnimationFrame(resolve));

      const wc = root.querySelector("#wc");
      expect(wc).to.exist;

      expect(root.hasAttribute("pascalhandled")).to.eql(false);

      wc.dispatchEvent(new Event("click"));

      await new Promise(resolve => requestAnimationFrame(resolve));

      expect(root.hasAttribute("pascalhandled")).to.eql(true);
    });
  });
});
