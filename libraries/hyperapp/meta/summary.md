<h4 id="hyperapp-handling-data">Handling data</h4>

Hyperapp will pass data to an element as properties, as long as the property is defined on the element's prototype. Otherwise it will fallback to passing data as attributes.

<h4 id="hyperapp-handling-events">Handling events</h4>

Hyperapp can listen to native DOM events dispatched from Custom Elements. However, it uses a heuristic to convert JSX event binding syntax into event names, and always lowercases the events. For example onFooUpdated={handleFoo} tells Hyperapp to listen for an event called 'fooupdated'. This means Hyperapp can support events with lowercase and kebab-case names, but not camelCase, PascalCase, or CAPScase events (e.g. 'URLchanged').
