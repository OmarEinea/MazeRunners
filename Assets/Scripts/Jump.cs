using UnityEngine;
using System.Collections;

public class Jump : MonoBehaviour {

	private CharacterController controller;
	private float gravity = 17.0f;
	private float jumpPower = 6.0f;
	private float verticalVelocity;

	// Use this for initialization
	void Start () {
		controller = GetComponent<CharacterController> ();
	}

	// Update is called once per frame
	void Update () {

		if (controller.isGrounded) {
			verticalVelocity = -gravity * Time.deltaTime;
			if (Input.GetKey (KeyCode.P)) {
				verticalVelocity = jumpPower;
			}
		} 
		else {
			verticalVelocity -= gravity * Time.deltaTime;
		}

		Vector3 moveVec = new Vector3 (0, verticalVelocity, 0);
		controller.Move ((moveVec*Time.deltaTime));
	}
}
