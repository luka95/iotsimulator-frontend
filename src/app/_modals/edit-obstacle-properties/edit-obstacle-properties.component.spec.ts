import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditObstaclePropertiesComponent } from './edit-obstacle-properties.component';

describe('EditObstaclePropertiesComponent', () => {
  let component: EditObstaclePropertiesComponent;
  let fixture: ComponentFixture<EditObstaclePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditObstaclePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditObstaclePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
