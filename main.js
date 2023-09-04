// Automaton delivery robot project from (Eloquent JavaScript Textbook)
// Convert list of roads to a data structure that tells us each place that
// can be reached from there

const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}
const roadGraph = buildGraph(roads);

/*
^^^^^^^
Given an array of edges, buildGraph creates a map object that for each
node, stores an array of connected nodes
Using the split method to split up the road strings of form 'Start-End'
to 'start' and 'end' as separate strings
*/

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }
    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return { place: destination, address: p.address };
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}

/*
move method checks whether there is a road going from current place to destination
if not, returns old state since it is not a valid move
then creates new state with destination as robot's new place
also needs to create new set of parcels that robot is carrying
parcels also need to be moved to the new place
*/

let first = new VillageState(
    "Post Office",
    [{ place: "Post Office", address: "Alice's House" }]
);
let next = first.move("Alice's House");
console.log(next.place);
// → Alice's House
console.log(next.parcels);
// → []
console.log(first.place);
// → Post Office

let object = Object.freeze({value: 5});
object.value = 10;
console.log(object.value);
// → 5

function runRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

/*
Robot decides in which direction to move by taking VillageState object and 
returning name of a nearby place
As robot wants to remember things, so they can make and execute plans, 
we give the robot memory and allow it to return a new memory
Robot returns object containing direction it wants to move in 
and memory value that will be given back the next time it is called
*/

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}
function randomRobot(state) {
    return { direction: randomPick(roadGraph[state.place]) };
}

VillageState.random = function (parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({ place, address });
    }
    return new VillageState("Post Office", parcels);
};

/*
To make robot work more efficiently, it has to be be able to deliberatoely move toward
a given parcel or delivery destination
We want to search for a route that starts at A, doesn't visit the same place twice
This helps consider the shortest  
*/

function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i=0; i<work.length; i++) {
        let {at , route} = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

/*
Exploration has to be done in correct order - places that were reached first
have to be explored first
We cannot immediately explore a place as that would mean places reached from there 
would also be explored immediately and there may be a shorter path of exploration
Search starts with start position and empty route
Search then operates by taking next item in list and exploring that, meaning
all roads going from that place are looked at
If one of them is a goal, a finished route can be returned
If we haven't looked at this place before, new item is added to list
*/

runRobot(VillageState.random(), randomRobot); // old slower route
runRobot(VillageState.random(), routeRobot, []); // new faster route