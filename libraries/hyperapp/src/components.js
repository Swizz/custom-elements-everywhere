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

import 'ce-without-children';
import 'ce-with-children';
import 'ce-with-properties';
import 'ce-with-event';

import { h } from 'hyperapp';
import { join } from 'path';

export const ComponentWithoutChildren = {
  view() {
    return (
      <div>
        <ce-without-children id="wc"></ce-without-children>
      </div>
    );
  }
};

export const ComponentWithChildren = {
  view() {
    return (
      <div>
        <ce-with-children id="wc"></ce-with-children>
      </div>
    );
  }
};

export const ComponentWithChildrenCount = {
  init() {
    return {
      count: 1
    };
  },
  view({ count }) {
    return (
      <div onclick={ ({count}) => ({ count: count + 1 }) }>
        <ce-with-children id="wc">{ count }</ce-with-children>
      </div>
    );
  }
};

export const ComponentWithDifferentViews = {
  init() {
    return {
      showWc: true
    };
  },
  view({ showWc }) {
    return (
      <div onclick={ ({ showWc }) => ({ showWc: !showWc }) }>
        { showWc ? <ce-with-children id="wc"></ce-with-children> : <div id="dummy">Dummy view</div> }
      </div>
    );
  }
};

export const ComponentWithProperties = {
  view() {
    return (
      <div>
        <ce-with-properties
          id="wc"
          bool={true}
          num={42}
          str={"hyperapp"}
          arr={["h", "y", "p", "e", "r", "a", "p", "p"]}
          obj={{ library: "hyperapp" }}
          nothing={{ library: "hyperapp" }}
        ></ce-with-properties>
      </div>
    );
  }
};

export const ComponentWithDeclarativeEvent = {
  init() {
    return {
      lowercaseHandled: false,
      kebabHandled: false,
      camelHandled: false,
      capsHandled: false,
      pascalHandled: false
    };
  },
  view(state) {
    return (
      <div {...state}>
        <ce-with-event
          id="wc"
          onlowercaseevent={ state => ({ ...state, lowercaseHandled: true }) }
          onkebab-event={ state => ({ ...state, kebabHandled: true }) }
          oncamelEvent={state => ({ ...state, camelHandled: true }) }
          onCAPSevent={ state => ({ ...state, capsHandled: true }) }
          onPascalEvent={ state => ({ ...state, pascalHandled: true }) }
        >
        </ce-with-event>
      </div>
    );
  }
};
