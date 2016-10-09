Graph = function(nodes = [], connections = {}){
    this.V = nodes
    this.E = connections
    this.nodes = {}
    this.isSetup = false
    this.highlighted = {
        nodes: {},
        edges: {}
    }
    this.tmp = {}
    this.export = function(){
        var poses = {}
        for(var i in this.V){
            poses[this.V[i]] = {x:this.draw_nodes[this.V[i]].pos.x ,y:this.draw_nodes[this.V[i]].pos.y }
        }
        return {
            nodes: this.V,
            edges: this.E,
            positions: poses
        }
    }
    this.setupDrawing = function(positions = false){
        this.isSetup = true
        this.draw_nodes = {}
        if(positions){
            for(var n in this.V){
                var pos = createVector(positions[this.V[n]].x, positions[this.V[n]].y)
                this.draw_nodes[this.V[n]] = new Node(pos,this.V[n])
            }
        } else {
            for(var n in this.V){
                this.draw_nodes[this.V[n]] = new Node(createVector(random(width-100)+50, random(height-100)+50),this.V[n])
            }
        }
        this.draw_edges = {}
        for(var e in this.E){
            this.draw_edges[e] = new Edge(this.draw_nodes[e[0]], this.draw_nodes[e[1]], this.E[e])
        }
    }

    this.show = function(strs = false, lbls = false){
        for(var e in this.E){this.draw_edges[e].show(this.highlighted,strs,lbls)}
        for(var n in this.V){this.draw_nodes[this.V[n]].show(this.highlighted)}
    }

    this.simulate = function(dmp=0.98){
        for(var e in this.E){this.draw_edges[e].applyForce()}
        for(var n in this.V){this.draw_nodes[this.V[n]].update(dmp)}
    }

    this.center = function(){
        var totx = 0
        var toty = 0
        for(var n in this.V){
            totx += this.draw_nodes[this.V[n]].pos.x
            toty += this.draw_nodes[this.V[n]].pos.y
        }
        totx = totx/this.V.length
        toty = toty/this.V.length
        for(var n in this.V){
            this.draw_nodes[this.V[n]].pos.x -= totx-width/2
            this.draw_nodes[this.V[n]].pos.y -= toty-height/2
        }
    }

    this.process = function(){
        for(var i in this.V){
            if(!(this.V[i] in this.nodes)){
                this.nodes[this.V[i]] = []
            }
        }
        for(var c in this.E){
            if(!(c[1] in this.nodes[c[0]])){
                this.nodes[c[0]][c[1]] = this.E[c]
                this.nodes[c[1]][c[0]] = this.E[c]
            }
        }
    }

    this.addV = function(name){
        this.V.push(name)
        this.nodes[name] = []
        if(this.isSetup){
            this.draw_nodes[name] = new Node(createVector(mouseX, mouseY),name)
        }
    }

    this.removeV = function(name){
        var pos = this.V.indexOf(name)
        if(pos > -1){
            this.V.remove(pos)
            delete this.nodes[name]
            return true
        }
        return false
    }

    this.connect = function(v1, v2, weight = 1){
        var p = [v1,v2].sort().join("")
        if(!(p in this.E)){
            this.E[p] = weight
            this.nodes[v1][v2] = weight
            this.nodes[v2][v1] = weight
            if(this.isSetup){
                this.draw_edges[p] = new Edge(this.draw_nodes[v1], this.draw_nodes[v2], weight)
            }
            return true
        }
        return false
    }

    this.clearHighlighting = function(){
        this.highlighted = {
            nodes: {},
            edges: {}
        }
    }

    this.autoScale = function(){
        var vals = []
        for(var edge in this.draw_edges){
            vals.push(this.draw_edges[edge].idealScale())
        }
        var index = floor(vals.length/2.78)
        return vals[index]
    }

    this.kruskalSetup = function(){
        clrcnsl()
        this.clearHighlighting()
        this.tmp = {}
        this.tmp.connected = []
        this.tmp.tree = new Graph(this.V)
        this.tmp.MST = []
        this.tmp.tree.process()
        this.tmp.E = this.E
        this.tmp.len = 0
        var E = this.E
        this.tmp.edges = Object.keys(this.E).sort(function(a,b){return E[b]-E[a]})
        this.tmp.done = false
        this.tmp.edges_done = []
        cnsl("Ordering Edges by length:\n    {0}".format(String(this.tmp.edges.slice().reverse())))
    }
    this.kruskalMain = function(){
        if(this.tmp.connected.length == 0 || this.tmp.connected[0].length < this.V.length){
            this.tmp.E = this.tmp.edges.pop()
            if(this.tmp.E === undefined){
                cnsl("Out of edges - No tree found.")
                this.tmp.found = false
                return true
            }
            this.highlighted.edges[this.tmp.E] = color(30,100,100)
            for(var i in this.tmp.edges_done){
                if(this.tmp.edges_done[i] in this.tmp.tree.E){
                    this.highlighted.edges[this.tmp.edges_done[i]] = color(120,100,100)
                } else {
                    this.highlighted.edges[this.tmp.edges_done[i]] = color(0,100,100)
                }
            }
            this.tmp.edges_done.push(this.tmp.E)
            cnsl("Trying edge {0}".format(this.tmp.E))
            if(this.tmp.tree.dijkstra(this.tmp.E[0],this.tmp.E[1]) === false){
                cnsl("    Edge does not make a cycle, adding to tree")
                this.tmp.tree.connect(this.tmp.E[0],this.tmp.E[1],this.E[this.tmp.E])
                this.tmp.MST.push(this.tmp.E)
                this.tmp.len += this.E[this.tmp.E]
                var updated = false
                var pushedTo = []
                for(var i = 0; i < this.tmp.connected.length; i++){
                    if(this.tmp.connected[i].indexOf(this.tmp.E[0]) > -1 || this.tmp.connected[i].indexOf(this.tmp.E[1]) > -1){
                        if(this.tmp.connected[i].indexOf(this.tmp.E[0]) == -1){this.tmp.connected[i].push(this.tmp.E[0])}
                        if(this.tmp.connected[i].indexOf(this.tmp.E[1]) == -1){this.tmp.connected[i].push(this.tmp.E[1])}
                        pushedTo.push(i)
                        updated = true
                    }
                }
                if(!updated){this.tmp.connected.push([this.tmp.E[0],this.tmp.E[1]])}
                while(pushedTo.length > 1){
                    var idx = pushedTo.pop()
                    for(i in this.tmp.connected[idx]){
                        if(this.tmp.connected[pushedTo[0]].indexOf(this.tmp.connected[idx][i]) == -1){
                            this.tmp.connected[pushedTo[0]].push(this.tmp.connected[idx][i])
                        }
                    }
                    this.tmp.connected.splice(idx,1)
                }
                cnsl("Currently connected sections:")
                for(sect in this.tmp.connected){
                    cnsl("    " + String(this.tmp.connected[sect]))
                }
            } else {
                cnsl("    Edge makes a cycle - Rejected")
            }
            return false
        } else {
            cnsl("All nodes are now connected!")
            this.tmp.found = true
            return true
        }
    }
    this.kruskalEnd = function(){
        if(this.tmp.found){
            for(var i in this.tmp.edges_done){
                delete this.highlighted.edges[this.tmp.edges_done[i]]
                if(this.tmp.edges_done[i] in this.tmp.tree.E){
                    this.highlighted.edges[this.tmp.edges_done[i]] = color(120,100,100)
                }
            }
            cnsl("\nEdges in tree:   {0}\nTotal length:    {1}".format(Object.keys(this.tmp.tree.E),this.tmp.len))
        } else {
            for(var i in this.E){
                this.highlighted.edges[this.E[i]] = color(0,100,100)
            }
        }
    }

    this.dijkstra = function(a,b,show=false){
        var done = []
        var table = {}
        var current = a
        // set table vals for start node
        table[a] = {dist: 0, prnt: false}
        // until every node is visited
        while(done.length < this.V.length){
            if(current === undefined){break}
            // for each connected node to current node
            for(var node in this.nodes[current]){
                // if node isn't in table, or dist is greater than could be
                if(!(node in table) || table[node].dist > table[current].dist+this.nodes[current][node]){
                    // text output
                    var dst = undefined
                    try{dst = table[node].dist} catch(err) {}
                    //update table values for node
                    table[node] = {
                        dist:table[current].dist+this.nodes[current][node],
                        prnt:current
                    }
                }
            }
            // add current to visted list
            done.push(current)
            // find minimum distance unvisited node
            var min = Infinity
            var minpos = undefined
            for(var prop in table){
                if(done.indexOf(prop) == -1 && (min === undefined || table[prop].dist < min)){
                    min = table[prop].dist
                    minpos = prop
                }
            }
            // make that the current node
            current = minpos
        }
        // if target wasnt reached
        if(done.indexOf(b) == -1){
            return false
        // if it was reached
        } else {
            // backtrack through parents to start node
            var path = [b]
            while(path[path.length-1] != false){
                path.push(table[path[path.length-1]].prnt)
            }
            path.splice(path.length-1,1)
            path.reverse()
            return {
                path: path,
                dist: table[b].dist
            }
        }
    }

    this.dijkstraSetup = function(a,b){
        clrcnsl()
        this.clearHighlighting()
        this.tmp = {}
        this.tmp.a = a
        this.tmp.b = b
        this.tmp.done = []
        this.tmp.edges_done = []
        this.tmp.table = {}
        this.tmp.current = a
        cnsl("Editing node {0} from {1} to {2}".format(this.tmp.current,undefined,0))
        this.tmp.table[a] = {dist: 0, prnt: "-"}
        cnsl(tableString(Object.keys(this.tmp.table).sort(),this.tmp.table))
    }
    this.dijkstraMain = function(){
        if(this.tmp.done.length < this.V.length){
            if(this.tmp.current === undefined){console.log("out of nodes"); return false}

            cnsl("Using Node: {0}".format(this.tmp.current))
            for(var i in this.tmp.done){
                this.highlighted.nodes[this.tmp.done[i]] = color(120,100,100)
            }
            for(var i in this.tmp.edges_done){
                delete this.highlighted.edges[this.tmp.edges_done[i]]
            }
            this.highlighted.nodes[this.tmp.current] = color(0,0,100)
            for(var node in this.nodes[this.tmp.current]){
                var edgeName = [this.tmp.current,node].sort().join("")
                this.highlighted.edges[edgeName] = color(30,100,100)
                this.tmp.edges_done.push(edgeName)
                if(!(node in this.tmp.table) || this.tmp.table[node].dist > this.tmp.table[this.tmp.current].dist+this.nodes[this.tmp.current][node]){
                    this.highlighted.edges[edgeName] = color(120,100,100)
                    var dst = undefined
                    try{dst = this.tmp.table[node].dist} catch(err) {}
                    cnsl("    Editing node {0} from {1} to {2}".format(
                        node,dst,this.tmp.table[this.tmp.current].dist+this.nodes[this.tmp.current][node]))
                    this.tmp.table[node] = {
                        dist:this.tmp.table[this.tmp.current].dist+this.nodes[this.tmp.current][node],
                        prnt:this.tmp.current
                    }
                }
            }
            this.tmp.done.push(this.tmp.current)
            var min = Infinity
            var minpos = undefined
            for(var prop in this.tmp.table){
                if(this.tmp.done.indexOf(prop) == -1 && (min === undefined || this.tmp.table[prop].dist < min)){
                    min = this.tmp.table[prop].dist
                    minpos = prop
                }
            }
            this.tmp.current = minpos
            cnsl(tableString(Object.keys(this.tmp.table).sort(),this.tmp.table))
            return false
        } else {return true}
    }
    this.dijkstraEnd = function(){
        for(i in this.tmp.edges_done){
            delete this.highlighted.edges[this.tmp.edges_done[i]]
        }
        for(i in this.tmp.done){
            this.highlighted.nodes[this.tmp.done[i]] = color(120,100,100)
        }
        if(this.tmp.done.indexOf(this.tmp.b) == -1){
            cnsl("Target node wasn't reached")
            return false
        } else {
            var path = [this.tmp.b]
            while(path[path.length-1] != "-"){
                path.push(this.tmp.table[path[path.length-1]].prnt)
            }
            path.splice(path.length-1,1)
            path.reverse()
            cnsl("Best distance was {0}\nBest path was {1}".format(
            this.tmp.table[this.tmp.b].dist, path.join("->")))
            for(var i = 0; i < path.length -1; i++){
                var p = [path[i],path[i+1]].sort().join("")
                this.highlighted.edges[p] = color(120,100,100)
            }
        }
    }

    this.heuristic = function(a,b){
        var vect = p5.Vector.sub(this.draw_nodes[a].pos,this.draw_nodes[b].pos)
        return vect.mag()/scl
    }

    this.AStarSetup = function(a,b){
        clrcnsl()
        this.clearHighlighting()
        this.tmp = {}
        this.tmp.current = a
        this.tmp.open = []
        this.tmp.closed = []
        this.tmp.table = {}
        this.tmp.b = b
        this.tmp.table[a] = {G: 0,H: this.heuristic(a,b),prnt: false}
        this.tmp.table[a].F = this.tmp.table[a].G + this.tmp.table[a].H
        this.tmp.open.push(a)
    }
    this.AStarMain = function(){
        if(this.tmp.current != this.tmp.b){

            if(this.tmp.current === undefined){cnsl("Out of nodes - no possible path"); return false}
            cnsl("Using node "+this.tmp.current)
            this.tmp.open.splice(this.tmp.open.indexOf(this.tmp.current),1)
            this.tmp.closed.push(this.tmp.current)
            for(nbr in this.nodes[this.tmp.current]){
                cnsl("    Checking "+ nbr)
                if(this.tmp.closed.indexOf(nbr) == -1){
                    this.tmp.table[nbr] = {H: this.heuristic(nbr,this.tmp.b),prnt: this.tmp.current}
                    var edge = [this.tmp.current,nbr].sort().join("")
                    var newG = this.tmp.table[this.tmp.current].G + this.E[edge]
                    if(this.tmp.table[nbr].G == undefined || this.tmp.table[nbr].G > newG){
                        this.tmp.table[nbr].G = newG
                        this.tmp.table[nbr].F = this.tmp.table[nbr].G + this.tmp.table[nbr].H
                        cnsl("      Setting new F-cost for {0}, of {1}".format(nbr,nfc(this.tmp.table[nbr].F,1,1)))
                    }
                    if(this.tmp.open.indexOf(nbr) == -1){this.tmp.open.push(nbr)}
                }
            }
            var minval = undefined,min = undefined
            for(var i in this.tmp.open){
                if(minval === undefined || this.tmp.table[this.tmp.open[i]].F < minval){
                    minval = this.tmp.table[this.tmp.open[i]].F
                    min = this.tmp.open[i]
                }
            }
            this.tmp.current = min
            this.clearHighlighting()
            for(var i in this.tmp.open)  {this.highlighted.nodes[this.tmp.open[i]]   = color(120,100,100)}
            for(var i in this.tmp.closed){this.highlighted.nodes[this.tmp.closed[i]] = color(0  ,100,100)}
            this.highlighted.nodes[this.tmp.current] = color(200,100,100)
            var path = [this.tmp.current]
            while(path[path.length-1] != false){
                path.push(this.tmp.table[path[path.length-1]].prnt)
                console.log(path)
            }
            path.pop()
            path.reverse()
            for(var i = 0; i < path.length-1; i++){
                var edge = [path[i],path[i+1]].sort().join("")
                this.highlighted.edges[edge] = color(200,100,100)
            }
            return false
        } else {
            cnsl("Reached target node!")
            return true
        }
    }
    this.AStarEnd = function(){
        this.clearHighlighting()
        var path = [this.tmp.b]
        while(path[path.length-1] != false){
            path.push(this.tmp.table[path[path.length-1]].prnt)
        }
        path.pop()
        path.reverse()
        var dist = this.tmp.table[this.tmp.b].G
        for(var i = 0; i < path.length-1; i++){
            var edge = [path[i],path[i+1]].sort().join("")
            this.highlighted.edges[edge] = color(120,100,100)
        }
        cnsl("Best path: " + path.join(""))
        cnsl("Path dist: " + dist)
    }
    this.primSetup = function(){
        clrcnsl()
        this.clearHighlighting()
        cnsl("Starting at node "+this.V[0])
        this.tmp = {}
        this.tmp.tree_edges = []
        this.tmp.tree_nodes = [this.V[0]]
        this.tmp.total_length = 0
        this.highlighted.nodes[this.V[0]] = color(120,100,100)
    }
    this.primMain1 = function(){
        for(var e in this.highlighted.edges){
            if(this.tmp.tree_edges.indexOf(e) == -1){
                this.highlighted.edges[e] = color(0,100,100)
            }
        }
        var best_edge = null
        var min_length = Infinity
        var tested_edges = ""
        for(var n in this.tmp.tree_nodes){
            for(var other in this.nodes[this.tmp.tree_nodes[n]]){
                var edge_length = this.nodes[this.tmp.tree_nodes[n]][other]
                var edge_name = [this.tmp.tree_nodes[n],other].sort().join("")
                if(this.tmp.tree_nodes.indexOf(other) == -1){
                    this.highlighted.edges[edge_name] = color(30,100,100)
                    if(edge_length < min_length){
                        best_edge = [this.tmp.tree_nodes[n],other]
                        min_length = edge_length
                    }
                    tested_edges += edge_name + " "
                }
            }
        }
        this.tmp.best_edge = best_edge
        cnsl("Available edges: " + tested_edges)
    }
    this.primMain2 = function(){
            this.tmp.tree_nodes.push(this.tmp.best_edge[1])
            var edge_name = this.tmp.best_edge.sort().join("")
            this.highlighted.edges[edge_name] = color(120,100,100)
            this.tmp.tree_edges.push(edge_name)
            this.tmp.total_length += this.E[edge_name]
            cnsl("Shortest edge was {0}, with length {1}\nAdding {0} to tree".format(
                edge_name,this.E[edge_name]))
            cnsl("")
            for(var n in this.tmp.tree_nodes){
                this.highlighted.nodes[this.tmp.tree_nodes[n]] = color(120,100,100)
            }
        if(this.tmp.tree_nodes.length < this.V.length){return false}
        else { return true }
    }
    this.primEnd = function(){
        for(var n in this.tmp.tree_nodes){
            this.highlighted.nodes[this.tmp.tree_nodes[n]] = color(120,100,100)
        }
        for(var e in this.highlighted.edges){
            if(this.tmp.tree_edges.indexOf(e) == -1){
                delete this.highlighted.edges[e]
            }
        }
        cnsl("Total path length = " + String(this.tmp.total_length))
        cnsl("Edges used: " + this.tmp.tree_edges.sort().join(","))
    }
}

function minInObject(obj){
    var min, minpos
    for(var prop in obj){
        if(min === undefined || obj[prop] < min){
            min = obj[prop]
            minpos = prop
        }
    }
    return minpos
}

function maxInObject(obj){
    var max, maxpos
    for(var prop in obj){
        if(max === undefined || obj[prop] < max){
            max = obj[prop]
            maxpos = prop
        }
    }
    return maxpos
}


function tableString(vs,obj){
    var str = ""
    str += "\n+ Node + Min Dist + Parent +\n"
    for(i in vs){
        str += "|   {0}  |{1}|{2}|\n".format(
            vs[i], pad(obj[vs[i]].dist,10),pad(obj[vs[i]].prnt,8))
    }
    str += "+ -  - + - -  - - + - -- - +\n"
    return str
}

function pad(str,l){
    str = String(str)
    var space = l-str.length
    return " ".repeat(floor(space/2)) + str + " ".repeat(ceil(space/2))
}
