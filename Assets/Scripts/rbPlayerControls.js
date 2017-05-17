#pragma strict

private var rb:Rigidbody;

var up:String;
var down:String;
var left:String;
var right:String;
var jump:String;
var attack:String;

var weapons:Transform;

private var speed:int = 5;
private var weaponPicked = false;
private var anim:Animation;

function Start () {
	rb = GetComponent.<Rigidbody>();
	anim = GetComponent.<Animation>();
}

function OnCollisionEnter(col:Collision){

	if(col.gameObject.tag == "PickWeapon" && !weaponPicked) {
		weapons.Find(col.gameObject.name).gameObject.SetActive(true);
		weaponPicked = true;
	}
}

function Update () {
	var oldY:float = rb.velocity.y;
	if(Input.GetKey(up)){
		rb.velocity = speed * transform.forward;
		anim.Play("run");
	}
	else if(Input.GetKey(down)){
		rb.velocity = (1-speed) * transform.forward;
		anim.Play("run");
	}
	else if(Input.GetKeyDown(attack) && weaponPicked)
		anim.Play("attack");
	else if(!anim.IsPlaying("attack"))
		anim.Play("idle");

	if(Input.GetKey(right))
		transform.Rotate(Vector3.up * speed/2);

	if(Input.GetKey(left))
		transform.Rotate(Vector3.down * speed/2);

	if(Input.GetKeyDown(jump))
		rb.AddForce(Vector3.up * 300);


	rb.velocity = Vector3(rb.velocity.x, oldY, rb.velocity.z);
}
