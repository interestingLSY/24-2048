function Changeimg(i,j){
	//document.write( a[id].d + "<br />" )
	document.getElementById(i*5+j).src = "blockimg/" + a[i][j] + ".png"
}
var leftdis = Math.ceil( (screen.availWidth-395) / 2 )
var topdis = Math.floor( (screen.availHeight-400) * 0.4 )
var blockwid = "90"
var blockwwid = "100"
var a = new Array()

var score = 0

function Init(){
	for( var i = 1 ; i <= 4 ; i++ ){
		a[i] = new Array()
		for( var j = 1 ; j <= 4 ; j++ ){
			var x = topdis + (i-1)*blockwwid
			var y = leftdis + (j-1)*blockwwid
			a[i][j] = 0
			document.write("<img id="+(i*5+j)+" src=\"\" width="+blockwid+" height="+blockwid+" style=\'position:absolute;left:"+y+"px;top:"+x+"px\' />")
		}
	}
}
function Draw(){
	for( var i = 1 ; i <= 4 ; i++ ){
		for( var j = 1 ; j <= 4 ; j++ )
			Changeimg(i,j)
	}
}
function Newnum(){	// 70% 2, 30% 4
	var x,y
	x = y = 0
	while( x == 0 || a[x][y] != 0 ){
		x = Math.floor((Math.random()*10000))%4 + 1
		y = Math.floor((Math.random()*10000))%4 + 1
	}
	if( Math.random() >= 0.70 ){	// 4
		a[x][y] = 2
	}else{
		a[x][y] = 1
	}
}
function Isdead(){
	for( var i = 1 ; i <= 4 ; i++ )
		for( var j = 1 ; j <= 4 ; j++ )
			if( a[i][j] == 0 )
				return
	for( var i = 1 ; i <= 4 ; i++ )
		for( var j = 1 ; j <= 4 ; j++ ){
			if( i != 4 && a[i+1][j] == a[i][j] ) return
			if( j != 4 && a[i][j+1] == a[i][j] ) return;
		}
	alert("You have GGed!\nScore:"+score)
	for( var i = 1 ; i <= 4 ; i++ )
		for( var j = 1 ; j <= 4 ; j++ )
			a[i][j] = 0
	score = 0
}
function Update(){
	Newnum()
	document.getElementById(233).innerHTML = "score: " + score
	Draw()
	Isdead()
}

var dx = [0,-1,0,1]
var dy = [-1,0,1,0]
function Shuffle(dx,dy){
	var shuffled = 0
	for( var k = 1 ; k <= 16 ; k++ )
		for( var x = 1 ; x <= 4 ; x++ )
			for( var y = 1 ; y <= 4 ; y++ ){
				if( a[x][y] == 0 ) continue
				var nx = x+dx
				var ny = y+dy
				if( nx < 1 || nx > 4 || ny < 1 || ny > 4 ) continue
				//alert(nx)
				if( a[nx][ny] != 0 ) continue
				a[nx][ny] = a[x][y]
				a[x][y] = 0
				shuffled = 1
			}
	return shuffled
}
function Merge(dx,dy){
	var merged = 0
	var xst = 1, xed = 4, xdelta = 1
	var yst = 1, yed = 4, ydelta = 1
	if( dx > 0 || dy > 0 ){
		xst = 4; xed = 1; xdelta = -1;
		yst = 4; yed = 1; ydelta = -1;
	}
	for( var x = xst ; x != xed+xdelta ; x += xdelta )
		for( var y = yst ; y != yed+xdelta ; y += ydelta ){
			var nx = x + dx, ny = y + dy
			if( nx < 1 || nx > 4 || ny < 1 || ny > 4 ) continue
			//alert(nx+" "+ny)
			if( a[x][y] == 0  ||  a[nx][ny] != a[x][y] ) continue
			a[nx][ny]++
			score += Math.pow(2,a[x][y])
			a[x][y] = 0
			merged = 1
		}
	return merged
}

function Keydown( event ){
	var code = event.keyCode
	if( code < 37 || code > 40 ) return
	event.preventDefault();
	code -= 37
	var updated = 0
	updated += Shuffle(dx[code],dy[code])
	updated += Merge(dx[code],dy[code])
	updated += Shuffle(dx[code],dy[code])
	if( updated > 0 ) Update()
}
