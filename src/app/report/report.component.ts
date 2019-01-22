import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-report-form',
    templateUrl: './report.component.html'
})
export class ReportComponent {
    @Input() isDisabled: boolean = true;
    @Input() report: any;
}
