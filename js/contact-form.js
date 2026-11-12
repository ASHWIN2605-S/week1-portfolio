const contactForm = document.querySelector("#contact-form");

if (!contactForm) {
  throw new Error("Contact form was not found.");
}

const formStatus = contactForm.querySelector("#form-status");
const submitButton = contactForm.querySelector('button[type="submit"]');
const fields = [
  {
    input: contactForm.querySelector("#contact-name"),
    error: contactForm.querySelector("#name-error"),
    requiredMessage: "Please enter your name."
  },
  {
    input: contactForm.querySelector("#contact-email"),
    error: contactForm.querySelector("#email-error"),
    requiredMessage: "Please enter your email address."
  },
  {
    input: contactForm.querySelector("#contact-subject"),
    error: contactForm.querySelector("#subject-error"),
    requiredMessage: "Please enter a subject."
  },
  {
    input: contactForm.querySelector("#contact-message"),
    error: contactForm.querySelector("#message-error"),
    requiredMessage: "Please enter a message."
  }
];

if (!formStatus || !submitButton || fields.some(function (field) {
  return !field.input || !field.error;
})) {
  throw new Error("Contact form fields or status message were not found.");
}

let formWasSubmitted = false;

function validateField(field) {
  let errorMessage = "";

  if (field.input.value.trim() === "") {
    errorMessage = field.requiredMessage;
  } else if (
    field.input.type === "email" &&
    field.input.validity.typeMismatch
  ) {
    errorMessage = "Please enter a valid email address.";
  }

  field.input.setAttribute("aria-invalid", String(errorMessage !== ""));
  field.error.textContent = errorMessage;
  field.error.hidden = errorMessage === "";

  return errorMessage === "";
}

fields.forEach(function (field) {
  field.input.addEventListener("input", function () {
    formStatus.hidden = true;
  });

  field.input.addEventListener("blur", function () {
    if (formWasSubmitted) {
      validateField(field);
    }
  });
});

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  formWasSubmitted = true;
  formStatus.hidden = true;

  let firstInvalidField = null;

  fields.forEach(function (field) {
    if (!validateField(field) && firstInvalidField === null) {
      firstInvalidField = field.input;
    }
  });

  if (firstInvalidField) {
    firstInvalidField.focus();
    return;
  }

  formStatus.textContent =
    "The form is valid. This front-end demo does not send your message.";
  formStatus.hidden = false;
});

submitButton.disabled = false;
