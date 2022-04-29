import { Component } from '@angular/core';
import { User } from '@prisma/client';

@Component({
  selector: 'teachers-archi-web-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isCollapsed = false;
  imageSrc = './assets/logoUPJV_Bleu.png';
  isAdmin(): boolean {
    const user = localStorage.getItem('user');
    if (user === null) {
      return false;
    }
    const userParsed = JSON.parse(user) as User;
    return userParsed ? (userParsed.admin ? true : false) : false;
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return !user || user === 'null' ? false : true;
  }
}
