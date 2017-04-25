#pragma strict

private var rb:Rigidbody;
var up:String;
var down:String;
var left:String;
var right:String;
var jump:String;
var attack:String;
var speed:int = 5;

function Start () {
	rb = GetComponent.<Rigidbody>();
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
	else
		GetComponent.<Animation>().Play("waitingforbattle");

	if(Input.GetKey(right))
		transform.Rotate(Vector3.up * speed/2);

	if(Input.GetKey(left))
		transform.Rotate(Vector3.down * speed/2);

	if(Input.GetKeyDown(jump))
		rb.AddForce(Vector3.up * 300);

	rb.velocity = Vector3(rb.velocity.x, oldY, rb.velocity.z);
}
