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
import { h, app as hyperApp } from "hyperapp";

import {
  ComponentWithoutChildren,
  ComponentWithChildren,
  ComponentWithChildrenCount,
  ComponentWithDifferentViews,
  ComponentWithProperties,
  ComponentWithDeclarativeEvent,
} from "./components";

describe("basic support", function() {
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

  describe("no children", function() {
    it("can display a Custom Element with no children", async function() {
      this.weight = 3;

      hyperApp({ ...ComponentWithoutChildren, node: root });

      await new Promise(resolve => requestAnimationFrame(resolve));

      let wc = root.querySelector("#wc");
      expect(wc).to.exist;
    });
  });

  describe("with children", function() {
    function expectHasChildren(wc) {
      expect(wc).to.exist;
      let shadowRoot = wc.shadowRoot;
      let heading = shadowRoot.querySelector("h1");
      expect(heading).to.exist;
      expect(heading.textContent).to.eql("Test h1");
      let paragraph = shadowRoot.querySelector("p");
      expect(paragraph).to.exist;
      expect(paragraph.textContent).to.eql("Test p");
    }

    it("can display a Custom Element with children in a Shadow Root", async function() {
      this.weight = 3;

      hyperApp({ ...ComponentWithChildren, node: root });

      await new Promise(resolve => requestAnimationFrame(resolve));

      const wc = root.querySelector("#wc");
      expectHasChildren(wc);
    });

    it("can display a Custom Element with children in a Shadow Root and pass in Light DOM children", async function() {
      this.weight = 3;

      hyperApp({ ...ComponentWithChildrenCount, node: root });

      await new Promise(resolve => requestAnimationFrame(resolve));

      const wc = root.querySelector("#wc");
      expectHasChildren(wc);

      expect(wc.textContent).to.equal("1");

      root.dispatchEvent(new Event("click"));

      await new Promise(resolve => requestAnimationFrame(resolve));

      expect(wc.textContent).to.equal("2")
    });

    it("can display a Custom Element with children in the Shadow DOM and handle hiding and showing the element", async function() {
      this.weight = 3;

      hyperApp({ ...ComponentWithDifferentViews, node: root });

      await new Promise(resolve => requestAnimationFrame(resolve));

      expectHasChildren(root.querySelector("#wc"));

      root.dispatchEvent(new Event("click"));

      await new Promise(resolve => requestAnimationFrame(resolve));

      let dummy = root.querySelector("#dummy");
      expect(dummy).to.exist;
      expect(dummy.textContent).to.eql("Dummy view");

      root.dispatchEvent(new Event("click"));

      await new Promise(resolve => requestAnimationFrame(resolve));

      expectHasChildren(root.querySelector("#wc"));
    });
  });

  describe("attributes and properties", function() {
    beforeEach(() => {
      hyperApp({ ...ComponentWithProperties, node: root });
    })

    it("will pass boolean data as either an attribute or a property", async function() {
      this.weight = 3;

      await new Promise(resolve => requestAnimationFrame(resolve));

      const wc = root.querySelector('#wc');
      const data = wc.bool || wc.hasAttribute("bool");
      expect(data).to.be.true;
    });

    it("will pass numeric data as either an attribute or a property", async function() {
      this.weight = 3;

      await new Promise(resolve => requestAnimationFrame(resolve));

      const wc = root.querySelector('#wc');
      const data = wc.num || wc.getAttribute("num");
      expect(parseInt(data, 10)).to.eql(42);
    });

    it("will pass string data as either an attribute or a property", async function() {
      this.weight = 3;

      await new Promise(resolve => requestAnimationFrame(resolve));

      const wc = root.querySelector('#wc');
      const data = wc.str || wc.getAttribute("str");

      expect(data).to.eql("hyperapp");
    });
  });

  describe("events", function() {
    it("can imperatively listen to a DOM event dispatched by a Custom Element", async function() {
      this.weight = 3;

      hyperApp({ ...ComponentWithDeclarativeEvent, node: root });

      await new Promise(resolve => requestAnimationFrame(resolve));

      const wc = root.querySelector("#wc");
      expect(wc).to.exist;

      expect(root.hasAttribute("lowercasehandled")).to.eql(false);

      wc.dispatchEvent(new Event("click"));

      await new Promise(resolve => requestAnimationFrame(resolve));


      expect(root.hasAttribute("lowercasehandled")).to.eql(true);
    });
 });
});
