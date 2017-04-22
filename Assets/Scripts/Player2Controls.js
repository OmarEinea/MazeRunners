#pragma strict

function Start () {
	
}

function Update () {

	if(Input.GetKey(KeyCode.I))
	{
		transform.Translate(Vector3.forward * (Time.deltaTime * 2.0));
		GetComponent.<Animation>().Play("run");
	}
	else
		GetComponent.<Animation>().Play("waitingforbattle");

	if(Input.GetKey(KeyCode.K)){
		transform.Translate(Vector3.back * Time.deltaTime);
	}

	if(Input.GetKey(KeyCode.L))
		transform.Rotate(Vector3.up * 2);

	if(Input.GetKey(KeyCode.J))
		transform.Rotate(Vector3.down * 2);


}
