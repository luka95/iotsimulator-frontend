import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ObstacleFormComponent} from './obstacle-form.component';

describe('ObstacleFormComponent', () => {
    let component: ObstacleFormComponent;
    let fixture: ComponentFixture<ObstacleFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ObstacleFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ObstacleFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
