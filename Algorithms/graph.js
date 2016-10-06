Graph = function(nodes = [], connections = {}){
    this.V = nodes
    this.E = connections
    this.nodes = {}
    this.isSetup = false
    this.setupDrawing = function(){
        this.isSetup = true
        this.draw_nodes = {}
        for(var n in this.V){
            this.draw_nodes[this.V[n]] = new Node(createVector(random(width), random(height)),this.V[n])
        }
        this.draw_edges = {}
        for(var e in this.E){
            this.draw_edges[e] = new Edge(this.draw_nodes[e[0]], this.draw_nodes[e[1]], this.E[e])
        }
    }

    this.show = function(strs = false, lbls = false){
        for(var e in this.E){this.draw_edges[e].show(strs,lbls)}
        for(var n in this.V){this.draw_nodes[this.V[n]].show()}
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

    this.kruskal = function(){
        var connected = []
        var tree = new Graph(this.V)
        var MST = []
        tree.process()
        console.log(tree)
        var E = this.E
        var edges = Object.keys(this.E).sort(function(a,b){return E[b]-E[a]})
        var done = false
        while(connected.length == 0 || connected[0].length < this.V.length){
            E = edges.pop()
            if(E === undefined){console.log("out of edges"); return false}
            console.log("Trying edge ", E)
            if(tree.dijkstra(E[0],E[1]) === false){
                console.log("Edge does not make a cycle, adding to tree")
                tree.connect(E[0],E[1],this.E[E])
                var updated = false
                var pushedTo = []
                for(var i = 0; i < connected.length; i++){
                    if(connected[i].indexOf(E[0]) > -1 || connected[i].indexOf(E[1]) > -1){
                        if(connected[i].indexOf(E[0]) == -1){connected[i].push(E[0])}
                        if(connected[i].indexOf(E[1]) == -1){connected[i].push(E[1])}
                        mst.push(E)
                        pushedTo.push(i)
                        updated = true
                    }
                }
                if(!updated){connected.push([E[0],E[1]])}
                while(pushedTo.length > 1){
                    var idx = pushedTo.pop()
                    for(i in connected[idx]){
                        if(connected[pushedTo[0]].indexOf(connected[idx][i]) == -1){
                            connected[pushedTo[0]].push(connected[idx][i])
                        }
                    }
                    connected.splice(idx,1)
                }
            } else {console.log("edge rejected")}
        }
        return {tree: MST, graph: tree}
    }

    this.dijkstra = function(a,b){
        var done = []
        var table = {}
        var current = a
        // set table vals for start node
        table[a] = {dist: 0, prnt: false}
        // until every node is visited
        while(done.length < this.V.length){
            console.log("Using Node: ", current)
            if(current === undefined){console.log("out of nodes"); break}
            // for each connected node to current node
            for(var node in this.nodes[current]){
                // if node isn't in table, or dist is greater than could be
                if(!(node in table) || table[node].dist > table[current].dist+this.nodes[current][node]){
                    // text output
                    var dst = undefined
                    try{dst = table[node].dist} catch(err) {}
                    console.log("Editing node ", node, " from ", dst , " to ", table[current].dist+this.nodes[current][node])
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
