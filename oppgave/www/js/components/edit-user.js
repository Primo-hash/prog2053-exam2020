import { LitElement, html, css } from "../../node_modules/lit-element/lit-element.js";

class EditUser extends LitElement {
  
  static get properties() {
    return {
      user: { type: Object },

      // Input data
      nUname: {type: String},
      nFirstName: {type: String},
      nLastName: {type: String},
      oldPassword: {type: String},
      newPassword: {type: String},
    };
  }



  render() {
    return html`
    <div class="col-lg-6">
    <div class="articles card">

      <div class="card-header d-flex align-items-center">
        <h2>Rediger ${this.user.uname}'s profil</h2>
      </div>

      <div class="card-body no-padding">
        <form @submit="${(event) => this.updateUser(event)}>

          <div class="form-group pt-3 ml-5" style="width: 20rem;">
            <label for="uname">Username</label>
            <input class="form-control" id="uname" name="uname" type="text"
              @change="${(event) => this.changeUname(event)}"
            >
          </div>

          <div class="form-group pt-3 ml-5" style="width: 20rem;">
            <label for="firstName">First name</label>
            <input class="form-control" id="firstName" name="firstName" type="text"
              @change="${(event) => this.changeFirstName(event)}"
            >
          </div>

          <div class="form-group pt-3 ml-5" style="width: 20rem;">
            <label for="lastName">Last name</label>
            <input class="form-control" id="lastName" name="lastName" type="text"
              @change="${(event) => this.changeLastName(event)}"
            >
          </div>
          
          <div class="form-group pt-3 ml-5" style="width: 20rem;">
            <label for="oldpwd"><br>Old password</label>
            <input class="form-control" id="oldpwd" name="oldpwd" type="password"
              title="Input your old password" 
              required
              @change="${(event) => this.changeOldPassword(event)}"
              >
          </div>

          <div class="form-group pt-3 ml-5" style="width: 20rem;">
            <label for="password">New password</label>
            <input class="form-control" id="password" name="password" type="password" pattern=".{3,}"
              title="3 Characters or more" 
              @change="${(event) => this.changePassword(event)}"
            >
          </div>

          <input type="submit" @click=${(event) => this.submit(event)} class="btn btn-info mt-4 ml-2" value="Edit User">
          
        </form>
      </div>
    </div>
  </div>

</div>
    `;
  }


    //updates the information about a user
    async submit(event) {
      event.preventDefault();

      // Object with input values named after 
      // parameters the fetch call needs to execute
      const form = {
        uname: this.nUname,
        uid: this.user.uid,
        firstName: this.nFirstName,
        lastName: this.nLastName,
        oldpwd: this.oldPassword,
        pwd: this.newPassword
      }

      // Server call with form parameters to update the user's data
      await fetch('api/updateUser.php', {
       method: 'POST',
       body: JSON.stringify(form)
      }).then(res => res.json()) // Result values resolved as JSON
        .then(data=>{
          if (data.status=='success') {
              console.log("The user was updated");
          } else {
              console.log("The user was not updated");
          }
        })
    }


    // Functions below update the respective property values
    // While the user is typing them in input

    changeUname(event) {
      event.preventDefault();
      this.nUname = event.target.value;
    }

    changeFirstName(event) {
      event.preventDefault();
      this.nFirstName = event.target.value;
    }

    changeLastName(event) {
      event.preventDefault();
      this.nLastName = event.target.value;
    }

    changeOldPassword(event) {
      event.preventDefault();
      this.oldPassword = event.target.value;
    }

    changePassword(event) {
      event.preventDefault();
      this.newPassword = event.target.value;
    }

}
customElements.define('edit-user', EditUser);
