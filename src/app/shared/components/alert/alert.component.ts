import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'warning' = 'success';
  @Input() duration: number = 1000;
  visible: boolean = false;

  alertClass: string = '';

  private setAlertClass(): void {
    switch (this.type) {
      case 'success':
        this.alertClass = 'bg-green-100 text-green-700 border-green-500';
        break;
      case 'error':
        this.alertClass = 'bg-red-100 text-red-700 border-red-500';
        break;
      case 'warning':
        this.alertClass = 'bg-yellow-100 text-yellow-700 border-yellow-500';
        break;
    }
  }

  showAlert(message: string, type: 'success' | 'error' | 'warning', duration?: number) {
    this.message = message;
    this.type = type;
    this.visible = true;
    this.setAlertClass();

    const alertDuration = duration ?? this.duration;

    setTimeout(() => {
      this.hideAlert();
    }, alertDuration);
  }

  hideAlert() {
    this.visible = false;
  }
}
