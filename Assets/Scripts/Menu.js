#pragma strict

private var saveTimeScale:float;
private var currentPage:Page;
private var menuTop:int = 200;
private var StartPaused:boolean = true;
private var mainMenu:boolean = true;
private var credits: String[] = [
								"Thanx for playing our game.",
								"Developed by: Omar Enie and Khalil Mohammad",
								"Copyright (c) 2017 Technicat, LLC. All Rights Reserved."];
private var toolbarIndex: int = 0;
private var toolbarStrings: String[] = ["Audio", "Graphics", "System"];
var hudColor:Color = Color.white;
var Skin:GUISkin;

enum Page{

	None, MainPage, Main, Options, Credits
}

function PauseGame(){

	saveTimeScale = Time.timeScale;
	Time.timeScale = 0;
	currentPage = Page.Main;

}

function MainMenu(){

	currentPage = Page.MainPage;
}

function Start () {
	/*if(mainMenu)
		MainMenu();
	else*/ if(StartPaused)
		PauseGame();
		
}

function UnPauseGame(){

	Time.timeScale = saveTimeScale;
	currentPage = Page.None;

}

function IsGamePaused(){

	return Time.timeScale == 0;
}

/*function IsMainPage(){

	return currentPage == Page.MainPage;
}*/

function Update () {

	if(Input.GetKeyDown("escape")){

		switch(currentPage){
			case Page.None: PauseGame(); break;
			case Page.Main: UnPauseGame(); break;
			default: currentPage = Page.Main;
		}
	}
}

function BeginPage(width:int, height:int){

	GUILayout.BeginArea(Rect((Screen.width-width)/2, menuTop, width, height));
}

function EndPage(){

	if(currentPage != Page.Main && GUILayout.Button("Back")){
		currentPage = Page.Main;
	}
	GUILayout.EndArea();
}

function OnGUI(){

	if(IsGamePaused()){ //|| IsMainPage()){
	if(Skin != null)
		GUI.skin = Skin;
	else
		GUI.color = hudColor;
		switch(currentPage){

			case Page.Main: ShowPauseMenu(); break;
			case Page.Options: ShowOptions(); break;
			case Page.Credits: ShowCredits(); break;

		}
	}

}

function ShowPauseMenu(){

	BeginPage(300, 300);
	if(GUILayout.Button("Resume"))
		UnPauseGame();

	if(GUILayout.Button("Options"))
		currentPage = Page.Options;

	if(GUILayout.Button("Credits"))
		currentPage = Page.Credits;

	if(GUILayout.Button("Quit"))
		Application.Quit();

		EndPage();
}
function ShowOptions(){

	BeginPage(300, 300);

	toolbarIndex = GUILayout.Toolbar(toolbarIndex, toolbarStrings);
	switch(toolbarIndex){
		case 0: ShowAudio(); break;
		case 1: ShowGraphics(); break;
		case 2: ShowSystem(); break;
	}
	EndPage();
}
function ShowCredits(){

	BeginPage(300, 300);
	for(var credit in credits){
		GUILayout.Label(credit);
	}
	EndPage();
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