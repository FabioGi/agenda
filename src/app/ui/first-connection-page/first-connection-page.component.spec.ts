import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FirstConnectionPageComponent } from "./first-connection-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("FirstConnectionPageComponent", () => {

  let fixture: ComponentFixture<FirstConnectionPageComponent>;
  let component: FirstConnectionPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [FirstConnectionPageComponent]
    });

    fixture = TestBed.createComponent(FirstConnectionPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
