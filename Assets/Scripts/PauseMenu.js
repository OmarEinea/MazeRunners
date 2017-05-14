#pragma strict

private var saveTimeScale:float;
private var currentPage:Page;
private var previousPage:Page;
private var menuTop:int = 200;
private var toolbarIndex: int = 0;
private var toolbarStrings: String[] = ["Audio", "Graphics", "System"];
var hudColor:Color = Color.white;
var Skin:GUISkin;


function Start () {

	saveTimeScale = Time.timeScale;
	currentPage = Page.InGame;
		
}

function Update () {

	if(Input.GetKeyDown("escape")){
		switch(currentPage){
			case Page.InGame: PauseGame(); break;
			case Page.PauseMenu: UnPauseGame(); break;
			default: currentPage = Page.PauseMenu;
		}
	}
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

function OnGUI(){

	//if(IsGamePaused()){ //|| IsMainPage()){
		if(Skin != null)
			GUI.skin = Skin;
		else
			GUI.color = hudColor;
			switch(currentPage){
			//MainMenu, NewGame, Credits, Characters, Level, InGame, PauseMenu, Options
				case Page.PauseMenu: ShowPauseMenu(); break;
				case Page.Options: ShowOptions(); break;

			}
	//}
}

function ShowPauseMenu(){

	BeginPage(300, 300);
	if(GUILayout.Button("Resume"))
		UnPauseGame();

	if(GUILayout.Button("Options")){
		previousPage = Page.PauseMenu;
		currentPage = Page.Options;
	}

	if(GUILayout.Button("Quit")){

		currentPage = Page.MainMenu;
		previousPage = Page.MainMenu;
		Time.timeScale = saveTimeScale;
		exitGame();
	}

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

function exitGame(){
	Application.LoadLevel("MainPage");
}