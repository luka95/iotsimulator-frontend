import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSensorPropertiesComponent } from './edit-sensor-properties.component';

describe('EditObstaclePropertiesComponent', () => {
  let component: EditSensorPropertiesComponent;
  let fixture: ComponentFixture<EditSensorPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSensorPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSensorPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
