import { Component, OnInit } from "@angular/core";
import { ToastyService } from "ng2-toasty";
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: "pdp-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public emailVal: string = "";
  public passwordVal: string = "";
  public confPasswordVal: string = "";

  constructor(
    private toastyService: ToastyService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  public register(): void {
    const body = {
      password: this.confPasswordVal,
      email: this.emailVal
    };

    let configSuccess = {
      title: "Registro",
      msg: "Usuario registrado con éxito. Por favor, revise su email",
      showClose: true,
      timeout: 4000,
      theme: "bootstrap"
    };

    this.userService.create(body).subscribe(
      () => {
        this.toastyService.success(configSuccess);
      },
      error => {
        let configError = {
          title: "Error.",
          msg: "Email ya registrado.",
          showClose: true,
          timeout: 3000,
          theme: "bootstrap"
        };

        if (error.status == 400) this.toastyService.error(configError);
        else {
          configError.msg = "Se ha producido un error inesperado";
          this.toastyService.error(configError);
        }
      }
    );
  }
}
