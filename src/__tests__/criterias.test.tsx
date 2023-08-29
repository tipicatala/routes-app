import { render } from "@testing-library/react";
import CriterialSection from "@/components/CriterialSection";

describe("CriteriaSection", () => {
  const mockProps = {
    from: "City A",
    changes: "City B, City C",
    to: "City D",
    date: "2023-09-01",
    passengers: "3",
  };

  it("renders correctly with mock data", () => {
    const { getByText } = render(<CriterialSection {...mockProps} />);

    expect(getByText(`From: ${mockProps.from}`)).toBeInTheDocument();
    expect(getByText(`Change Cities: ${mockProps.changes}`)).toBeInTheDocument();
    expect(getByText(`Destination: ${mockProps.to}`)).toBeInTheDocument();
    expect(getByText(`Date of Trip: ${mockProps.date}`)).toBeInTheDocument();
    expect(getByText(`Number of Passengers: ${mockProps.passengers}`)).toBeInTheDocument();
  });

  it("renders correctly without change cities", () => {
    const { queryByText } = render(<CriterialSection {...mockProps} changes={undefined} />);

    expect(queryByText(`Change Cities:`)).toBeNull();
  });
});
