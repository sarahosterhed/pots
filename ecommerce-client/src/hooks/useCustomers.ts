import { useState } from "react";
import { Customer, CustomerCreate } from "../types/Customer";
import { createCustomer, deleteCustomer, fetchCustomerByEmail, fetchCustomerById, fetchCustomers, updateCustomer } from "../services/customerService";

export const useCustomers = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateCustomerInput = (customer: CustomerCreate): string | null => {
    if (!customer.firstname.trim()) return "First name is required.";
    if (!customer.lastname.trim()) return "Last name is required.";
    if (!customer.email.includes("@")) return "Invalid email address.";
    if (!String(customer.phone).trim()) return "Phone number is required.";
    if (!customer.street_address.trim()) return "Street address is required.";
    if (!customer.postal_code.match(/^\d{5}$/)) return "Postal code is required.";
    if (!customer.city.trim()) return "City is required.";
    if (!customer.country.trim()) return "Country is required.";
    return null;
  };

  const fetchCustomersHandler = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCustomers();
      return data;
    } catch (error) {
      setError("Error fetching customers");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomerByIdHandler = async (id: number) => {
    setIsLoading(true);
    try {
      const data = await fetchCustomerById(id);
      return data;
    } catch (error) {
      setError("Error fetching customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomerByEmailHandler = async (email: string) => {
    setIsLoading(true);
    try {
      const data = await fetchCustomerByEmail(email);
      return data;
    } catch {
      setError("Error fetching customer email");
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  const deleteCustomerHandler = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteCustomer(id);
    } catch (error) {
      setError("Error: Could not delete customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCustomerHandler = async (id: number, payload: Customer) => {
    setIsLoading(true);
    try {
      await updateCustomer(id, payload);
    } catch (error) {
      setError("Error: Could not update customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createCustomerHandler = async (payload: CustomerCreate) => {
    setIsLoading(true);

    const validationError = validateCustomerInput(payload);
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return null;
    }

    try {
      const data = await createCustomer(payload);
      return data;
    } catch (error) {
      setError("Error: Could not delete customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    fetchCustomersHandler,
    deleteCustomerHandler,
    updateCustomerHandler,
    fetchCustomerByIdHandler,
    fetchCustomerByEmailHandler,
    createCustomerHandler
  };
};
