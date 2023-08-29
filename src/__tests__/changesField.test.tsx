import { render } from "@testing-library/react";
import ChangesFieldSideIcons from "@/components/ChangesFieldSideIcons";

describe("ChangesFieldSideIcons", () => {
  it("renders correctly", () => {
    const { container } = render(<ChangesFieldSideIcons />);

    // Check if the component's elements are rendered
    const images = container.querySelectorAll("img");
    const circleIcon = container.querySelector(".MuiSvgIcon-root");

    expect(images).toHaveLength(2);
    expect(circleIcon).toBeInTheDocument();
  });
});
