import { useContext, useEffect, useState } from "react"
import { CreateCustomer } from "./CreateCustomer";
import { UpdateCustomer } from "./UpdateCustomer";
import CustomerContext from "../../../contexts/CustomerContext";
import { useCustomers } from "../../../hooks/useCustomers";
import { CustomerActionType } from "../../../reducers/CustomerReducer";
import { BeatLoader } from "react-spinners";


export const Customers = () => {
    const { fetchCustomersHandler, deleteCustomerHandler, isLoading } = useCustomers()
    const { customers, customerDispatch } = useContext(CustomerContext)
    const [editingCustomerId, setEditingCustomerId] = useState<number | null>(null);

    useEffect(() => {
        if (customers.length > 0) return;
        const getData = async () => {
            const customersData = await fetchCustomersHandler();
            customerDispatch({
                type: CustomerActionType.LOADED,
                payload: JSON.stringify(customersData)
            })
        }
        getData();
    })

    const handleDelete = async (id: number) => {
        await deleteCustomerHandler(id);
        customerDispatch({
            type: CustomerActionType.DELETED,
            payload: JSON.stringify(id)
        })
    }

    return (
        <>
            <h2>Manage Customers</h2>
            <CreateCustomer />
            {isLoading &&
                <div className="center-content">
                    <BeatLoader color="white" />
                </div>
            }
            <section className="wrapper">
                {customers.map(({ id, firstname, lastname, email, password, phone, street_address, postal_code, city, country, created_at }) => (
                    <div key={id} className="card">
                        {editingCustomerId === id ? (
                            <UpdateCustomer customerId={id} setEditingCustomerId={setEditingCustomerId} />

                        ) : (
                            <>
                                <h3>{firstname} {lastname}</h3>
                                <p className="two-lines"><span>Email:</span> <span>{email}</span></p>
                                <p><span>Password:</span> <span>{password}</span></p>
                                <p><span>Phone:</span> <span>{phone}</span></p>
                                <p className="two-lines"><span>Adress:</span> <span>{street_address}</span>
                                    <span>{postal_code} {city} {country}</span></p>
                                <p className="two-lines"><span>Created At:</span> <span>{created_at}</span></p>
                                <div className="button-wrapper-product">
                                    <button onClick={() => setEditingCustomerId(id)}>Edit</button>
                                    <button onClick={() => handleDelete(id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </section>
        </>
    )
}
