import { ChangeEvent } from "react";

/**
 * Generic form input change handler for React forms
 * Supports text, select, single file, and multiple files
 *
 * @param event - the change event from input/select
 * @param setFormData - React state setter function for form data
 */
export function handleFormInputChangeHelper<T extends Record<string, any>>(
  event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  setFormData: React.Dispatch<React.SetStateAction<T>>
) {
  const { name, type, value, files, multiple } = event.target as HTMLInputElement;

  if (type === "file" && files) {
    setFormData(prev => ({
      ...prev,
      [name]: multiple ? Array.from(files) : files[0],
    }));
  } else {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }
}

export function convertJsonToFormData(data: Record<string, any>): FormData {
  const formData = new FormData();

  const isFile = (val: any): val is File | Blob => val instanceof File || val instanceof Blob;

  const appendFormData = (key: string, value: any): void => {
    if (value === null || value === undefined) return;

    // Directly append files
    if (isFile(value)) {
      formData.append(key, value);
      return;
    }

    // Booleans to 1/0
    if (typeof value === 'boolean') {
      formData.append(key, value ? '1' : '0');
      return;
    }

    // Dates
    if (typeof value === 'string' && !isNaN(Date.parse(value))) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        formData.append(key, date.toISOString());
        return;
      }
    }

    // Arrays
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (isFile(item)) {
          formData.append(`${key}[]`, item);
        } else if (typeof item === 'object' && item !== null) {
          for (const prop in item) {
            if (Object.prototype.hasOwnProperty.call(item, prop)) {
              appendFormData(`${key}[${index}][${prop}]`, item[prop]);
            }
          }
        } else {
          formData.append(`${key}[]`, item);
        }
      });
      return;
    }

    // Plain primitives
    formData.append(key, String(value));
  };

  Object.entries(data).forEach(([key, value]) => appendFormData(key, value));

  return formData;
}
