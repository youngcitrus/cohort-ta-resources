/*
Using the graph from graph-diagram.js



Using bfs from breadth_first_search.js, always pushing all neighbors into queue:
================================================================================
Starting Node: a
Target: g

queue: [a]
Visited: {}


current: a
queue: []
visited: {a}
queue: [b, c]


current: b
queue: [c]
visited: {a, b}
queue: [c, a]


current: c
queue: [a]
visited: {a, b, c}
queue: [a, a, d, e]


current: a
queue: [a, d, e]


current: a
queue: [d, e]


current: d
queue: [e]
visited: {a, b, c, d}
queue: [e, c, f]


current: e
queue: [c, f]
visited: {a, b, c, d, e}
queue: [c, f, c, f]


current: c
queue: [f, c, f]


current: f
queue: [c, f]
visited: {a, b, c, d, e, f}
queue: [c, f, d, e, g]


current: c
queue: [f, d, e, g]


current: f
queue: [d, e, g]


current: d
queue: [e, g]


current: e
queue: [g]


current: g
queue: []
visited: {a, b, c, d, e, f, g}
RETURN g




Using bfs from breadth_first_search.js, checking before adding an already-
visited neighbor:
================================================================================
Starting Node: a
Target: g

queue: [a]
Visited: {}


current: a
queue: []
visited: {a}
queue: [b, c]


current: b
queue: [c]
visited: {a, b}
queue: [c]


current: c
queue: []
visited: {a, b, c}
queue: [d, e]


current: d
queue: [e]
visited: {a, b, c, d}
queue: [e, f]


current: e
queue: [c, f]
visited: {a, b, c, d, e}
queue: [f, f]


current: f
queue: [f]
visited: {a, b, c, d, e, f}
queue: [g]


current: f
queue: [g]


current: g
queue: []
visited: {a, b, c, d, e, f, g}
RETURN g

*/
