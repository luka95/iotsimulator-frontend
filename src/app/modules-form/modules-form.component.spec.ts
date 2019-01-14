import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModulesFormComponent} from './modules-form.component';

describe('ModulesFormComponent', () => {
    let component: ModulesFormComponent;
    let fixture: ComponentFixture<ModulesFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModulesFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModulesFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
