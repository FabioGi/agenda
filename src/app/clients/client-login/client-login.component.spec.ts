import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ClientLoginComponent } from "./client-login.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ClientLoginComponent", () => {

  let fixture: ComponentFixture<ClientLoginComponent>;
  let component: ClientLoginComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ClientLoginComponent]
    });

    fixture = TestBed.createComponent(ClientLoginComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
