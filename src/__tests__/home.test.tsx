import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Home from "@/pages/home";

test("adds and removes changes cities and submits form", () => {
  const { getByText, getByLabelText } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  // Mock the console.error to prevent error output in the test
  jest.spyOn(console, "error").mockImplementation(() => {});

  // Simulate user interactions with form fields
  fireEvent.change(getByLabelText("From"), { target: { value: "Paris" } });
  fireEvent.click(getByText("Add destination"));
  fireEvent.change(getByLabelText("Changes City 1"), {
    target: { value: "Paris" },
  });

  fireEvent.change(getByLabelText("To"), { target: { value: "Paris" } });
  fireEvent.change(getByLabelText("Date of Trip", { exact: false }), {
    target: { value: "2023-09-01" },
  });
  fireEvent.change(getByLabelText("Number of Passengers", { exact: false }), {
    target: { value: "3" },
  });

  // Click the "Search" button to submit the form
  fireEvent.click(getByText("Search"));

  // Check if the URL pathname changes after form submission
  expect(window.location.pathname).toBe("/results");
});
