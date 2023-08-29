import { render } from "@testing-library/react";
import DistancesSection from "@/components/DistancesSection";

const mockDistances = [
  { from: "City A", to: "City B", distance: 100 },
  { from: "City B", to: "City C", distance: 150 },
];

const mockTotalDistance = 250;

describe("DistancesSection", () => {
  it("renders correctly with mock data", () => {
    const { getByText } = render(
      <DistancesSection distances={mockDistances} totalDistance={mockTotalDistance} />
    );

    // Check if the component's elements are rendered
    mockDistances.forEach((distance) => {
      const distanceText = `Distance from ${distance.from} to ${distance.to}: ${distance.distance.toFixed(2)} km`;
      expect(getByText(distanceText)).toBeInTheDocument();
    });

    const totalDistanceText = `Total Distance: ${mockTotalDistance.toFixed(2)} km`;
    expect(getByText(totalDistanceText)).toBeInTheDocument();
  });
});
