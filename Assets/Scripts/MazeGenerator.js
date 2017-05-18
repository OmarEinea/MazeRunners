
public var CellWall:GameObject;
public var CellCorner:GameObject;
public var WallGate:GameObject;
public var CornerTower:GameObject;
public var StartPosition:Vector3;
private var MazeWidth:int = 5;
private var MazeHeight:int = 8;

function Start() {
	BuildCornerTowers(StartPosition.x, StartPosition.z);
	var gates = [
		[0, MazeWidth - 1, 0],
		[0, Mathf.Floor(MazeWidth / 2), 0],
		[0, 0, 0]
	];

	var goals = [
		[MazeHeight + 2, MazeWidth - 1, 1],
		[MazeHeight, Mathf.Floor(MazeWidth / 2), 2],
		[MazeHeight + 2, 0, 3]
	];
	var openMaze = Mathf.Floor(Random.Range(0, 2.9999f));
	for (var i = 0; i < 3; i++) {
		BuildMaze(StartPosition, MazeWidth, goals[i][0], gates[i], goals[i], i == openMaze);
		StartPosition -= Vector3(0, 0, MazeWidth * 10);
	}

	Instantiate(gameObject, transform.position, Quaternion.Euler(Vector3(0, 180, 0))).GetComponent.<MazeGenerator>().enabled = false;
}

function BuildCornerTowers(x:int, y:int) {
	Instantiate(CornerTower, Vector3(x, 15, y), Quaternion.Euler(Vector3(270, 0, 0)), transform);
	Instantiate(CornerTower, Vector3(x, 15, -y), Quaternion.Euler(Vector3(270, 0, 0)), transform);
}

function BuildMaze(position, width, height, gate, goal, open) {
	for (var l = 0; l < width + 1; l++)
	 	for (var n = 1; n < height; n++)
	 		Instantiate(CellCorner, position - Vector3(n*10, -3.45, l*10), Quaternion.Euler(Vector3(270, 0, 0)), transform);

	var maze = MazeMatrix(width, height);
	position -= Vector3(5, 0, 5);

    for (var i = 0; i < maze.length; i++)
        for (var j = 0; j < maze[i].length; j++)
	        for (var k = 0; k < maze[i][j].length; k++)
	        	if(maze[i][j][k] == 0)
	        		Instantiate((i == gate[0] && j == gate[1] && k == gate[2] || open && i == goal[0] - 1 && j == goal[1] && k == goal[2]) ? WallGate : CellWall,
	        					position - Vector3(i*10, 0, j*10), Quaternion.Euler(Vector3(0, k*90, 0)), transform);

}

function MazeMatrix(x, y) {

    // Establish variables and starting grid
    var totalCells = x*y;
    var cells = new Array();
    var unvis = new Array();
    for (var i = 0; i < y; i++) {
        cells[i] = new Array();
        unvis[i] = new Array();
        for (var j = 0; j < x; j++) {
            cells[i][j] = new Array([0,0,0,0]);
            unvis[i][j] = true;
        }
    }
    
    // Set a random position to start from
    var currentCell = new Array([Mathf.Floor(Random.Range(0, y - 0.0001f)), Mathf.Floor(Random.Range(0, x - 0.0001f))]);
    var path = new Array([currentCell]);
    unvis[currentCell[0]][currentCell[1]] = false;
    var visited = 1;
    
    // Loop through all available cell positions
    while (visited < totalCells) {
        // Determine neighboring cells
        var pot = [[currentCell[0]-1, currentCell[1], 0, 2],
                [currentCell[0], currentCell[1]+1, 1, 3],
                [currentCell[0]+1, currentCell[1], 2, 0],
                [currentCell[0], currentCell[1]-1, 3, 1]];
        var neighbors = new Array();
        
        // Determine if each neighboring cell is in game grid, and whether it has already been checked
        for (var l = 0; l < 4; l++) {
            if (pot[l][0] > -1 && pot[l][0] < y && pot[l][1] > -1 && pot[l][1] < x && unvis[pot[l][0]][pot[l][1]]) { neighbors.push(pot[l]); }
        }
        
        // If at least one active neighboring cell has been found
        if (neighbors.length) {
            // Choose one of the neighbors at random
            next = neighbors[Mathf.Floor(Random.Range(0, neighbors.length - 0.0001f))];
            
            // Remove the wall between the current cell and the chosen neighboring cell
            cells[currentCell[0]][currentCell[1]][next[2]] = 1;
            cells[next[0]][next[1]][next[3]] = 1;
            
            // Mark the neighbor as visited, and set it as the current cell
            unvis[next[0]][next[1]] = false;
            visited++;
            currentCell = [next[0], next[1]];
            path.push(currentCell);
        }
        // Otherwise go back up a step and keep going
        else {
            currentCell = path.pop();
        }
    }
    return cells;
}