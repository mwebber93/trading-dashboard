import { cleanup, render, screen, prettyDOM, waitFor } from '@testing-library/react';
import App from './App';
import * as positionUtils from './Position/Position.utils';

beforeEach(() => {
	jest.resetAllMocks();
});

afterEach(() => {
	cleanup();
});

describe('Position Widget Tests', () => {
	test('renders learn react link', async () => {
		const mockPositionUtils = jest.spyOn(positionUtils, 'fetchPositionData');
		mockPositionUtils.mockImplementation(() =>
			Promise.resolve({
				cashAvailable: 1000,
				unitsHeld: 10,
				currentPrice: 2000,
				totalValue: 20000,
				totalCost: 15000,
				todaysPriceChangeValue: 50,
				todaysPriceChangePercent: 1.11,
				overallPriceChangeValue: 200,
				overallPriceChangePercent: 2.22,
				firstDealTimestamp: 1640995200000,
				lastDealTimestamp: 1641081600000,
				totalDeals: 5,
			})
		);

		render(<App />);

		await waitFor(() => {
			expect(screen.getByText('Position')).toBeTruthy();
			expect(screen.getByText('Cash available:')).toBeTruthy();
			expect(screen.getByText('+£1,000.00')).toBeTruthy();
			expect(screen.getByText('Units held:')).toBeTruthy();
			expect(screen.getByText('10')).toBeTruthy();
			expect(screen.getByText('Current price:')).toBeTruthy();
			expect(screen.getByText('+£2,000.00')).toBeTruthy();
			expect(screen.getByText('Total value:')).toBeTruthy();
			expect(screen.getByText('+£20,000.00')).toBeTruthy();
			expect(screen.getByText('Total cost:')).toBeTruthy();
			expect(screen.getByText('+£15,000.00')).toBeTruthy();
			expect(screen.getByText('Day price change:')).toBeTruthy();
			expect(screen.getByText('+£50.00 (+1.11%)')).toBeTruthy();
			expect(screen.getByText('Overall price change:')).toBeTruthy();
			expect(screen.getByText('+£200.00 (+2.22%)')).toBeTruthy();
			expect(screen.getByText('First deal:')).toBeTruthy();
			expect(screen.getByText('01/01/2022')).toBeTruthy();
			expect(screen.getByText('Last deal:')).toBeTruthy();
			expect(screen.getByText('01/02/2022')).toBeTruthy();
			expect(screen.getByText('Total deals:')).toBeTruthy();
			expect(screen.getByText('+£1,000.00')).toBeTruthy();
		});
	});
});
