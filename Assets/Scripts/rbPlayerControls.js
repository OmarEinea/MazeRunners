#pragma strict

private var rb:Rigidbody;
var myLight:Light;

var myLight1:Light;
var myLight2:Light;

var up:String;
var down:String;
var left:String;
var right:String;
var jump:String;
var attack:String;
private var speed:int = 5;
private var sendMsg:int;

function Start () {
	rb = GetComponent.<Rigidbody>();
}

function OnCollisionEnter(col:Collision){

	if(col.gameObject.tag == "Pyramid"){

		up = "x";
		down = "x";
		left = "x";
		right = "x";
		jump = "x";
		attack = "x";

		sendMsg = 1;
	}

}

function Update () {
	var oldY:float = rb.velocity.y;
	if(Input.GetKey(up)){
		rb.velocity = speed * transform.forward;
		GetComponent.<Animation>().Play("run");
	}
	else if(Input.GetKey(down)){
		rb.velocity = (1-speed) * transform.forward;
		GetComponent.<Animation>().Play("run");
	}
	else if(Input.GetKeyDown(attack))
		GetComponent.<Animation>().Play("attack");

	else if(sendMsg == 1){
		GetComponent.<Animation>().Play("dance");
		if(myLight.enabled != false){
			myLight.enabled = false;
			myLight1.enabled = true;
			myLight2.enabled = true;

		}
	}

	else if(sendMsg == 0)
		GetComponent.<Animation>().Play("waitingforbattle");

	if(Input.GetKey(right))
		transform.Rotate(Vector3.up * speed/2);

	if(Input.GetKey(left))
		transform.Rotate(Vector3.down * speed/2);

	if(Input.GetKeyDown(jump))
		rb.AddForce(Vector3.up * 300);



	rb.velocity = Vector3(rb.velocity.x, oldY, rb.velocity.z);
}
