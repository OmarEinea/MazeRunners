#pragma strict

private var rb:Rigidbody;

var up:String;
var down:String;
var left:String;
var right:String;
var jump:String;
var attack:String;
var Health:int = 3;
var weapons:Transform;
var flyingToX:float = 105;
var flyingAngle:float = 90;

private var speed:int = 5;
private var anim:Animation;
private var flyingDuration:float = 10;
private var flyingStart:float;
private var flyingMid:float;
private var flyingFrom:Vector3;
private var flyingRotation:Quaternion;
private var isFlying:boolean = false;
private var weaponPicked:boolean = false;

function Start () {
	rb = GetComponent.<Rigidbody>();
	anim = GetComponent.<Animation>();
}

function OnCollisionEnter(col:Collision){

	if(col.gameObject.tag == "PickWeapon" && !weaponPicked) {
		weapons.Find(col.gameObject.name).gameObject.SetActive(true);
		weapons.GetComponent.<BoxCollider>().enabled = true;
		weaponPicked = true;
		isFlying = true;
		flyingStart = Time.time;
		flyingFrom = transform.position;
		flyingRotation = transform.rotation;
	}
}

function OnTriggerEnter(col:Collider) {
	if(Health > 0) {
		if(col.gameObject.tag == "Hit" && !col.transform.IsChildOf(transform) &&
		   col.transform.root.GetComponent.<Animation>().IsPlaying("attack") && !anim.IsPlaying("getHit")) {
			anim.Play("getHit");
			Health--;
		}
		if(Health == 0) {
			anim.Play("die");
			enabled = false;
		}
	}
}

function Update () {
	if(isFlying) {
		anim.Play("idle");
		var time = (Time.time - flyingStart) / flyingDuration;
		if(time < 0.5) {
			transform.rotation = Quaternion.Lerp(flyingRotation, Quaternion.Euler(60, flyingAngle, 0), time * 2);
			flyingMid = Time.time;
		} else
			transform.rotation = Quaternion.Lerp(Quaternion.Euler(60, flyingAngle, 0), Quaternion.Euler(0, flyingAngle, 0), (Time.time - flyingMid) / flyingDuration * 2);

		var center = (flyingFrom + Vector3(flyingToX, 0, 0)) / 2 - Vector3(0, 1, 0);
		transform.position = Vector3.Slerp(flyingFrom - center, Vector3(flyingToX, 0, 0) - center, time);
		transform.position += center;
		if(time > 1) isFlying = false;
	} else if(!anim.IsPlaying("getHit")) {
		var oldY:float = rb.velocity.y;

		if(Input.GetKey(up)){
			rb.velocity = speed * transform.forward;
			anim.Play("run");
		} else if(Input.GetKey(down)){
			rb.velocity = (1-speed) * transform.forward;
			anim.Play("run");
		} else if(Input.GetKeyDown(attack) && weaponPicked)
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
}
