#pragma strict

var up:String;
var down:String;
var left:String;
var right:String;
var jump:String;
var attack:String;
var Health:int = 3;
var weapons:Transform;
var flyingToX:float = 110;
var flyingAngle:float = 90;

private var speed:int = 7;
private var animator:Animator;
private var flyingDuration:float = 10;
private var flyingStart:float;
private var flyingMid:float;
private var flyingFrom:Vector3;
private var flyingRotation:Quaternion;
private var isFlying:boolean = false;
private var weaponPicked:boolean = false;
private var rb:Rigidbody;

function Start () {
	rb = GetComponent.<Rigidbody>();
	animator = GetComponent.<Animator>();
}

function OnCollisionEnter(col:Collision){
	if(col.gameObject.tag == "PickWeapon" && !weaponPicked) {
		weapons.Find(col.gameObject.name).gameObject.SetActive(true);
		weapons.GetComponent.<CapsuleCollider>().enabled = true;
		weaponPicked = true;
		animator.SetTrigger("Fly");
		animator.SetBool("Run Forwards", false);
		animator.SetBool("Run Backwards", false);
	}
}

function OnFlyingStart() {
	isFlying = true;
	flyingStart = Time.time;
	flyingFrom = transform.position;
	flyingRotation = transform.rotation;
}

function OnDeath() {
	for(var player in FindObjectsOfType(rbPlayerControls))
		player.CheckWinner();
}

function CheckWinner() {
	if(Health > 0) {
		animator.SetTrigger("Win");
		enabled = false;
	}
}

function OnTriggerEnter(col:Collider) {
	if(Health > 0) {
		if(col.gameObject.tag == "Hit" && !col.transform.IsChildOf(transform) && 
				col.transform.root.GetComponent.<Animator>().GetCurrentAnimatorStateInfo(0).IsName("Attack") &&
					!animator.GetCurrentAnimatorStateInfo(0).IsName("Get Hit")) {
			Health--;
			if(Health == 0) {
				animator.SetTrigger("Die");
				GetComponent.<CapsuleCollider>().enabled = false;
				enabled = false;
			} else animator.SetTrigger("Get Hit");
		}
	}
}

function Update () {
	if(isFlying) {
		var time = (Time.time - flyingStart) / flyingDuration;
		if(time < 0.5) {
			transform.rotation = Quaternion.Lerp(flyingRotation, Quaternion.Euler(60, flyingAngle, 0), time * 2);
			flyingMid = Time.time;
		} else
			transform.rotation = Quaternion.Lerp(Quaternion.Euler(60, flyingAngle, 0), Quaternion.Euler(0, flyingAngle, 0), (Time.time - flyingMid) / flyingDuration * 2);

		var center = (flyingFrom + Vector3(flyingToX, 0, 0)) / 2 - Vector3(0, 1, 0);
		transform.position = Vector3.Slerp(flyingFrom - center, Vector3(flyingToX, 0, 0) - center, time);
		transform.position += center;
		if(time > 1) {
			isFlying = false;
			animator.SetTrigger("Land");
		}
	} else {
		var oldY:float = rb.velocity.y;

		animator.SetBool("Run Forwards", Input.GetKey(up));
		animator.SetBool("Run Backwards", Input.GetKey(down));

		if(Input.GetKeyDown(attack) && weaponPicked)
			animator.SetTrigger("Attack");

		if(!animator.GetCurrentAnimatorStateInfo(0).IsName("Attack") &&
		   !animator.GetCurrentAnimatorStateInfo(0).IsName("Get Hit") &&
		   !animator.GetCurrentAnimatorStateInfo(0).IsName("Land")) {
			if(animator.GetBool("Run Forwards"))
				rb.velocity = speed * transform.forward;
			if(animator.GetBool("Run Backwards"))
				rb.velocity = (1-speed) * transform.forward;
			if(Input.GetKeyDown(jump)) {
				animator.SetTrigger("Jump");
			}
		}

		if(Input.GetKey(right))
			transform.Rotate(Vector3.up * speed/2);
		
		if(Input.GetKey(left))
			transform.Rotate(Vector3.down * speed/2);

		rb.velocity = Vector3(rb.velocity.x, oldY, rb.velocity.z);
	}
}