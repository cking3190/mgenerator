import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomString from './CustomString';

describe('CustomString', () => {
  test('renders the length slider with the default value', () => {
    const { getByLabelText } = render(<CustomString />);
    const slider = getByLabelText('Length');
    expect(slider).toHaveAttribute('value', '10');
  });

  test('renders the alpha, numeric, and casing checkboxes with the default values', () => {
    const { getByLabelText } = render(<CustomString />);
    const alphaCheckbox = getByLabelText('Alpha');
    expect(alphaCheckbox).toBeChecked();
    const numericCheckbox = getByLabelText('Numeric');
    expect(numericCheckbox).toBeChecked();
    const casingCheckbox = getByLabelText('Casing');
    expect(casingCheckbox).toBeChecked();
  });

  test('calls the onChange prop with the correct operator string when the length slider is changed', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(<CustomString onChange={onChange} />);
    const slider = getByLabelText('Length');
    fireEvent.change(slider, { target: { value: 20 } });
    expect(onChange).toHaveBeenCalledWith(
      '{ "$string": { "length": 20, "casing": "upper", "alpha": true, "numeric": true } }'
    );
  });

  // test('calls the onChange prop with the correct operator string when the alpha, numeric, or casing checkboxes are changed', () => {
  //   const onChange = jest.fn();
  //   const { getByLabelText } = render(<CustomString onChange={onChange} />);
  //   const alphaCheckbox = getByLabelText('Alpha');
  //   fireEvent.click(alphaCheckbox);
  //   expect(onChange).toHaveBeenCalledWith(
  //     '{ "$string": { "length": 10, "casing": "upper", "alpha": false, "numeric": true } }'
  //   );
  //   const numericCheckbox = getByLabelText('Numeric');
  //   fireEvent.click(numericCheckbox);
  //   expect(onChange).toHaveBeenCalledWith(
  //     '{ "$string": { "length": 10, "casing": "upper", "alpha": false, "numeric": false } }'
  //   );
  //   const casingCheckbox = getByLabelText('Casing');
  //   fireEvent.click(casingCheckbox);
  //   expect(onChange).toHaveBeenCalledWith(
  //     '{ "$string": { "length": 10, "casing": "lower", "alpha": false, "numeric": false } }'
  //   );
  // });
});