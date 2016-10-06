var a = new Graph(["A","B","C","D","E"], {"AB":1,"BC":1,"CD":1,"CE":2,"DE":1,"BE":2,"DA":2,"AC":2,"DB":2,"AE":1})
a.process()

var b = new Graph(["A","B","C","D","E"], {"CE":1,"DE":1,"BE":1,"DA":1})
b.process()

var c = new Graph(["A","B","C","D","E"], {"CE":1,"BE":1,"DA":1,"BC":1})
c.process()

var d = new Graph(["A","B","C","D","E","F","G"], {"AB":6,"AC":3,"CE":12,"BE":8,"CD":5,"DE":3,"EF":5,"EG":9,"DG":20,"FG":2})
d.process()

var f = new Graph(["A","B","C","D","E"], {"AB":8,"AD":5,"BE":3,"BC":4,"DE":6,"CD":7,"CE":1})
f.process()
