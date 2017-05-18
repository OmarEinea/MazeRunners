#pragma strict

private var saveTimeScale:float;
private var currentPage:Page;
private var previousPage:Page;
private var menuTop:int = 100;
private var StartPaused:boolean = true;
private var mainMenu:boolean = true;
private var credits: String[] = ["Thanx for playing our game.", "Developed by: Omar Enie and Khalil Mohammad", "Copyright (c) 2017 Technicat, LLC. All Rights Reserved."];
private var toolbarIndex: int = 0;
private var toolbarStrings: String[] = ["Audio", "Graphics", "System"];
private var toolbarLevels: String[] = ["Castle", "Desert"];
private var toolbarCharacters: String[] = ["Player1", "Player2"];
private var P1:String = "Skeleton";
private var P2:String = "Zombie";
private var ChosenLevel: String = "Castle";
var hudColor:Color = Color.white;
var Skin:GUISkin;

enum Page{

	MainMenu, NewGame, Credits, Characters, Level, InGame, PauseMenu, Options
}

function Start () {

	saveTimeScale = Time.timeScale;
	currentPage = Page.MainMenu;
		
}

function Update () {

}

function UnPauseGame(){

	Time.timeScale = saveTimeScale;
	currentPage = Page.InGame;

}

function PauseGame(){

	saveTimeScale = Time.timeScale;
	Time.timeScale = 0;
	currentPage = Page.PauseMenu;

}

function IsGamePaused(){

	return Time.timeScale == 0;
}

function BeginPage(width:int, height:int){

	GUILayout.BeginArea(Rect((Screen.width-width)/2, menuTop, width, height));

}

/*function EndPage(){

	if(GUILayout.Button("Back"))
		currentPage = previousPage;
	GUILayout.EndArea();
}*/

function OnGUI(){

	//if(IsGamePaused()){ //|| IsMainPage()){
		if(Skin != null)
			GUI.skin = Skin;
		else
			GUI.color = hudColor;
			switch(currentPage){
			//MainMenu, NewGame, Credits, Characters, Level, InGame, PauseMenu, Options
				case Page.MainMenu: ShowMainMenu(); break;
				case Page.NewGame: ShowNewGameMenu(); break;
				case Page.Characters: ShowCharactersMenu(); break;
				case Page.Level: ShowLevelMenu(); break;
				case Page.PauseMenu: ShowPauseMenu(); break;
				case Page.Options: ShowOptions(); break;
				case Page.Credits: ShowCredits(); break;

			}
	//}
}
function ShowMainMenu(){

		BeginPage(300, 300);
			if(GUILayout.Button("New Game")){
				previousPage = Page.MainMenu;
				currentPage = Page.NewGame;
			}
			if(GUILayout.Button("Options")){
				previousPage = Page.MainMenu;
				currentPage = Page.Options;
			}
			if(GUILayout.Button("Credits")){
				previousPage = Page.MainMenu;
				currentPage = Page.Credits;
			}

			if(GUILayout.Button("Quit"))
				Application.Quit();

		GUILayout.EndArea();
}
function ShowNewGameMenu(){

		BeginPage(300, 300);
			if(GUILayout.Button("Start")){
				previousPage = Page.InGame;
				currentPage = Page.InGame;
				startGame();
			}
			
			if(GUILayout.Button("Character Selection")){
				previousPage = Page.NewGame;
				currentPage = Page.Characters;
			}
			if(GUILayout.Button("Level selection")){
				previousPage = Page.NewGame;
				currentPage = Page.Level;
			}

			if(GUILayout.Button("Back"))
			currentPage = previousPage;

		GUILayout.EndArea();
}

function ShowCharactersMenu(){

		BeginPage(300, 300);

		toolbarIndex = GUILayout.Toolbar(toolbarIndex, toolbarCharacters);
		switch(toolbarIndex){
			case 0: Player1Char(); break;
			case 1: Player2Char(); break;
		}

		if(GUILayout.Button("Back"))
			currentPage = previousPage;

		GUILayout.EndArea();
}

function Player1Char(){

	if(GUILayout.Button("Skeleton"))
			P1 = "Skeleton";
	if(GUILayout.Button("Zombie"))
			P1 = "Zombie";
	if(GUILayout.Button("Knight"))
			P1 = "Knight";
	if(GUILayout.Button("Orch"))
			P1 = "Orch";
}

function Player2Char(){

	if(GUILayout.Button("Skeleton"))
			P2 = "Skeleton";
	if(GUILayout.Button("Zombie"))
			P2 = "Zombie";
	if(GUILayout.Button("Knight"))
			P2 = "Knight";
	if(GUILayout.Button("Orch"))
			P2 = "Orch";
	
}

function ShowLevelMenu(){ //ChosenLevel

		BeginPage(300, 300);

		toolbarIndex = GUILayout.Toolbar(toolbarIndex, toolbarLevels);
		switch(toolbarIndex){
			case 0: ChosenLevel = "Castle"; break;
			case 1: ChosenLevel = "Desert"; break;
		}
		if(GUILayout.Button("Back"))
			currentPage = previousPage;

		GUILayout.EndArea();
}

function ShowPauseMenu(){

	BeginPage(300, 300);
	if(GUILayout.Button("Resume"))
		UnPauseGame();

	if(GUILayout.Button("Options")){
		previousPage = Page.PauseMenu;
		currentPage = Page.Options;
	}

	if(GUILayout.Button("Quit"))
		Application.Quit();

	GUILayout.EndArea();
}
function ShowOptions(){

	BeginPage(300, 300);

	toolbarIndex = GUILayout.Toolbar(toolbarIndex, toolbarStrings);
	switch(toolbarIndex){
		case 0: ShowAudio(); break;
		case 1: ShowGraphics(); break;
		case 2: ShowSystem(); break;
	}
		if(GUILayout.Button("Back"))
		currentPage = previousPage;
	GUILayout.EndArea();
}
function ShowCredits(){

	BeginPage(300, 300);
	for(var credit in credits){
		GUILayout.Label(credit);
	}
	if(GUILayout.Button("Back"))
		currentPage = previousPage;
	GUILayout.EndArea();
}


function ShowAudio(){

	GUILayout.Label("Volume");
	AudioListener.volume = GUILayout.HorizontalSlider(AudioListener.volume, 0.0, 1.0);
}

function ShowGraphics(){

	GUILayout.Label(QualitySettings.names[QualitySettings.GetQualityLevel()]);
	GUILayout.Label("Pixel Light Count: "+QualitySettings.pixelLightCount);
	GUILayout.Label("Shadow Cascades: "  +QualitySettings.shadowCascades);
	GUILayout.Label("Shadow Distance: "  +QualitySettings.shadowDistance);
	GUILayout.Label("Soft Vegetation: "  +QualitySettings.softVegetation);
	GUILayout.BeginHorizontal();

	if(GUILayout.Button("Decrease"))
		QualitySettings.DecreaseLevel();
	if(GUILayout.Button("Increase"))
		QualitySettings.IncreaseLevel();

	GUILayout.EndHorizontal();
}

function ShowSystem(){

	GUILayout.Label("Graphics: " + SystemInfo.graphicsDeviceName + " " +
								   SystemInfo.graphicsMemorySize + "MB\n" +
								   SystemInfo.graphicsDeviceVersion + "\n" +
								   SystemInfo.graphicsDeviceVendor); 
}

function startGame(){
	Application.LoadLevel(ChosenLevel);
}