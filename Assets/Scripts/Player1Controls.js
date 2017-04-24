#pragma strict

	private var controller : CharacterController;
	private var gravity : float = 17.0f;
	private var jumpPower : float = 6.0f;
	private var verticalVelocity : float;

function Start () {
		controller = GetComponent(CharacterController);
}

function Update () {

	if(Input.GetKey(KeyCode.W))
	{
		transform.Translate(Vector3(0, 0, 0.089));// (Time.deltaTime * 2.0));
		GetComponent.<Animation>().Play("run");
	}

	else if(Input.GetKey(KeyCode.S)){
		transform.Translate(Vector3(0, 0, -0.07));
		GetComponent.<Animation>().Play("run");
	}
	else if(Input.GetKeyDown(KeyCode.E))
		GetComponent.<Animation>().Play("attack");

	else
		GetComponent.<Animation>().Play("waitingforbattle");

	if(Input.GetKey(KeyCode.D))
		transform.Rotate(Vector3.up * 2);

	if(Input.GetKey(KeyCode.A))
		transform.Rotate(Vector3.down * 2);

//Jumping
	if (transform.position.y <= 0.02) {
		verticalVelocity = -gravity * Time.deltaTime;
		if (Input.GetKey (KeyCode.R)) {
			verticalVelocity = jumpPower;
		}
	} 
	else {
		verticalVelocity -= gravity * Time.deltaTime;
	}

	controller.Move((Vector3 (0, verticalVelocity, 0)*Time.deltaTime));

}
