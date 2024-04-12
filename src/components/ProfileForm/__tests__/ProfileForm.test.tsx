import { cleanup } from "@testing-library/react";
import { render, mockUserContext, mockProfile } from "../../../../testing";
import { ProfileForm } from "../ProfileForm";
import type { Props } from "../types";

const renderProfileForm = (props?: Partial<Props>) => render((
  <ProfileForm
    onSubmit={props?.onSubmit || jest.fn()}
    onCancel={props?.onCancel || jest.fn()}
    error={props?.error || null}
    isEditMode={props?.isEditMode || false}
    profile={props?.profile}
  />
), { wrappers: { theme: true } });

describe("ProfileForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render creation form", async () => {
    const { findByText, container } = renderProfileForm();

    const emailField = container.querySelector("input[id=email]") as HTMLInputElement;
    expect(await findByText(/Email/i)).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(emailField.value).toBe("");

    const phoneField = container.querySelector("input[id=phone]") as HTMLInputElement;
    expect(await findByText(/Phone/i)).toBeInTheDocument();
    expect(phoneField).toBeInTheDocument();
    expect(phoneField.value).toBe("");

    const firstNameField = container.querySelector("input[id=firstName]") as HTMLInputElement;
    expect(await findByText(/First name/i)).toBeInTheDocument();
    expect(firstNameField).toBeInTheDocument();
    expect(firstNameField.value).toBe("");

    const lastNameNameField = container.querySelector("input[id=lastName]") as HTMLInputElement;
    expect(await findByText(/Last name/i)).toBeInTheDocument();
    expect(lastNameNameField).toBeInTheDocument();
    expect(lastNameNameField.value).toBe("");

    const organizationField = container.querySelector("input[id=organization]") as HTMLInputElement;
    expect(await findByText(/Organization/i)).toBeInTheDocument();
    expect(organizationField).toBeInTheDocument();
    expect(organizationField.value).toBe("");

    const titleField = container.querySelector("input[id=title]") as HTMLInputElement;
    expect(await findByText(/Title/i)).toBeInTheDocument();
    expect(titleField).toBeInTheDocument();
    expect(titleField.value).toBe("");
  });

  test("render updating form", async () => {
    const { findByText, container } = renderProfileForm({
      profile: mockProfile.data as never,
    });

    const emailField = container.querySelector("input[id=email]") as HTMLInputElement;
    expect(await findByText(/Email/i)).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(emailField.value).toBe("ivan.vyhovsky@cossacks.org");

    const phoneField = container.querySelector("input[id=phone]") as HTMLInputElement;
    expect(await findByText(/Phone/i)).toBeInTheDocument();
    expect(phoneField).toBeInTheDocument();
    expect(phoneField.value).toBe("+441234567890");

    const firstNameField = container.querySelector("input[id=firstName]") as HTMLInputElement;
    expect(await findByText(/First name/i)).toBeInTheDocument();
    expect(firstNameField).toBeInTheDocument();
    expect(firstNameField.value).toBe("Ivan");

    const lastNameNameField = container.querySelector("input[id=lastName]") as HTMLInputElement;
    expect(await findByText(/Last name/i)).toBeInTheDocument();
    expect(lastNameNameField).toBeInTheDocument();
    expect(lastNameNameField.value).toBe("Vyhovsky");

    const organizationField = container.querySelector("input[id=organization]") as HTMLInputElement;
    expect(await findByText(/Organization/i)).toBeInTheDocument();
    expect(organizationField).toBeInTheDocument();
    expect(organizationField.value).toBe("Cossack Hetmanate");

    const titleField = container.querySelector("input[id=title]") as HTMLInputElement;
    expect(await findByText(/Title/i)).toBeInTheDocument();
    expect(titleField).toBeInTheDocument();
    expect(titleField.value).toBe("Hetman of Zaporizhian Host");
  });

  test("render creation form with info about dpUser", async () => {
    const { findByText, container } = renderProfileForm({
      profile: {
        attributes: {
          email: mockUserContext.data.user.primaryEmail,
          first_name: mockUserContext.data.user.firstName,
          last_name: mockUserContext.data.user.lastName,
        },
      } as never,
    });

    const emailField = container.querySelector("input[id=email]") as HTMLInputElement;
    expect(await findByText(/Email/i)).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(emailField.value).toBe("cormac.mccarthy@example.org");

    const phoneField = container.querySelector("input[id=phone]") as HTMLInputElement;
    expect(await findByText(/Phone/i)).toBeInTheDocument();
    expect(phoneField).toBeInTheDocument();
    expect(phoneField.value).toBe("");

    const firstNameField = container.querySelector("input[id=firstName]") as HTMLInputElement;
    expect(await findByText(/First name/i)).toBeInTheDocument();
    expect(firstNameField).toBeInTheDocument();
    expect(firstNameField.value).toBe("Dorcas");

    const lastNameNameField = container.querySelector("input[id=lastName]") as HTMLInputElement;
    expect(await findByText(/Last name/i)).toBeInTheDocument();
    expect(lastNameNameField).toBeInTheDocument();
    expect(lastNameNameField.value).toBe("McCullough");

    const organizationField = container.querySelector("input[id=organization]") as HTMLInputElement;
    expect(await findByText(/Organization/i)).toBeInTheDocument();
    expect(organizationField).toBeInTheDocument();
    expect(organizationField.value).toBe("");

    const titleField = container.querySelector("input[id=title]") as HTMLInputElement;
    expect(await findByText(/Title/i)).toBeInTheDocument();
    expect(titleField).toBeInTheDocument();
    expect(titleField.value).toBe("");
  });

  test("should show \"Create\" button", async () => {
    const { findByRole } = renderProfileForm();
    expect(await findByRole("button", { name: "Create" })).toBeInTheDocument();
  });

  test("should show \"Save\" button", async () => {
    const { findByRole } = renderProfileForm({ isEditMode: true });
    expect(await findByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  test("render error", async () => {
    const { findByText } = renderProfileForm({ error: "some error" });
    expect(await findByText(/some error/)).toBeInTheDocument();
  });
});
