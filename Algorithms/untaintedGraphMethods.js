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
