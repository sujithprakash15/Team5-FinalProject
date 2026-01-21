import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";


@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [RouterOutlet,RouterLinkActive, RouterLink],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  username = sessionStorage.getItem("empId");
}
