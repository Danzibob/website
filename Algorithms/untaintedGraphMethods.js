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
