# Package Tracker Continued

Finish the previous step of the package tracker, if you haven't done so, yet.

Now, you're going to do some really cool algorithm work. This is some awesome
computer science stuff.

In the `map/map.py` file, replace the map with the following code.

```python
map = {
    "Seattle": {("San Francisco", 679)},
    "San Francisco": {("Seattle", 679), ("Los Angeles", 381), ("Denver", 474)},
    "Los Angeles": {("San Francisco", 381), ("Phoenix", 357)},
    "Phoenix": {("Los Angeles", 357), ("Denver", 586)},
    "Denver": {("Phoenix", 586), ("San Francisco", 474), ("Houston", 878), ("Kansas City", 557)},
    "Kansas City": {("Denver", 557), ("Houston", 815), ("Chicago", 412), ("Nashville", 554)},
    "Houston": {("Kansas City", 815), ("Denver", 878)},
    "Chicago": {("Kansas City", 412), ("New York", 712)},
    "Nashville": {("Kansas City", 554), ("Houston", 665), ("Miami", 817)},
    "New York": {("Chicago", 712), ("Washington D.C.", 203)},
    "Washington D.C.": {("Chicago", 701), ("Nashville", 566), ("Miami", 926)},
    "Miami": {("Washington D.C.", 926), ("Houston", 483), ("Nashville", 817)}
}
```

That contains the distance between a city and another city. For example, the
distance between Denver and Phoenix is 586 miles.

Now, change the `find_shortest_path` function to use the _A\* algorithm_. You're
going to have to read about this algorithm, yourself. You could go look at the
[Wikipedia article][1] about this, but that's pretty dense and not so helpful,
only helpful if you read lots of math-related stuff. A better resource can be
found at one of these links. Find the one that helps you, or use multiple to
get an understanding of the algorithm.

* [GeeksForGeeks article][2]
* [Red Blob Games][3]
* [101 Computing Interactive Example][4]

You will likely find many implementations of the A* algorithm in a variety of
programming languages all over the Web. To make yourself a better programmer,
**don't use them**. It's cheating yourself from this experience of creating a
multi-contextual model of interpreting a non-trivial algorithm into code. This
is something that every software developer will eventually have to face. Start
now, friends.

[1]: https://en.wikipedia.org/wiki/A*_search_algorithm#Description
[2]: https://www.geeksforgeeks.org/a-search-algorithm/
[3]: https://www.redblobgames.com/pathfinding/a-star/introduction.html
[4]: https://www.101computing.net/a-star-search-algorithm/
