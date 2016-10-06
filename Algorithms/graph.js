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

    this.dijkstraSetup = function(a,b){
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
            for(i in this.tmp.done){
                this.highlighted.nodes[this.tmp.done[i]] = color(120,50,100)
            }
            for(i in this.tmp.edges_done){
                delete this.highlighted.edges[this.tmp.edges_done[i]]
            }
            this.highlighted.nodes[this.tmp.current] = color(0,0,100)
            for(var node in this.nodes[this.tmp.current]){
                var edgeName = [this.tmp.current,node].sort().join("")
                this.highlighted.edges[edgeName] = color(30,50,100)
                this.tmp.edges_done.push(edgeName)
                if(!(node in this.tmp.table) || this.tmp.table[node].dist > this.tmp.table[this.tmp.current].dist+this.nodes[this.tmp.current][node]){
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
            this.highlighted.nodes[this.tmp.done[i]] = color(120,50,100)
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
                this.highlighted.edges[this.tmp.edges_done[i]] = color(120,50,100)
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
