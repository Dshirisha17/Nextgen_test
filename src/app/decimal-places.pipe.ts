import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalPlaces',
  // pure: false
})
export class DecimalPlacesPipe implements PipeTransform {
    transform(value: any): string {
    // Remove commas from the input value
    const sanitizedValue = value.toString().replace(/,/g, '');

    // Check if the sanitized value is not a number or null
    if (isNaN(sanitizedValue) || sanitizedValue === null) {
      console.log('Invalid input value:', value);
      return '';
    }
  
    // Convert sanitized value to a number
    const numericValue = Number(sanitizedValue);
  
    // Check if the numericValue is NaN after conversion
    if (isNaN(numericValue)) {
      console.log('Invalid input value:', value);
      return '';
    }
  
    // Check if the value has decimals
    const hasDecimals = numericValue % 1 !== 0;
  
    console.log('Original value:', value);
    console.log('Numeric value:', numericValue);
  
    // Format the value with commas for thousands separator
    const formattedIntegerPart = Math.floor(Math.abs(numericValue))
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const formattedDecimalPart = hasDecimals ? numericValue.toFixed(2).split('.')[1] : '00';
    const formattedValue = `${formattedIntegerPart}.${formattedDecimalPart}`;

    console.log('Formatted value:', formattedValue);

    return formattedValue;
}
}