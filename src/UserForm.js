import { useState } from "react";
import validator from "validator";
import Select from "react-select";

const trainerOptions = [
    { value: "any", label: "Any" },
    { value: "trainerOne", label: "Trainer 1" },
    { value: "trainerTwo", label: "Trainer 2" },
    { value: "trainerThree", label: "Trainer 3" },
];

const UserForm = ({ onSave, user= {} }) => {
    const [userData, setUserData] = useState(user);
    const [errors, setErrors] = useState({});

    const { name, email, phone, id, trainer } = userData;

    const validateData = () => {
        let errors = {};

        if (!name) {
            errors.name = "Name is required";
        }

        if (!validator.isEmail(email)) {
            errors.email = "A valid email is required";
        }

        if (!validator.isMobilePhone(phone)) {
            errors.phone = "A valid phone number is required";
        }

        return errors;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSelectChange = (option) => {
        setUserData((prevData) => ({ ...prevData, trainer: option }));
    };

    const handleSave = () => {
        const errors = validateData();
        if (Object.keys(errors).length) {
            setErrors(errors);
            return;
        }

        setErrors({});
        console.log(userData);
        onSave(userData);
    };

    return (
        <div>
            <div>
                <p>Name*</p>
                <input name="name" value={name} onChange={handleChange} placeholder="Name" />
                <div style={{ color: "red" }}>{errors.name}</div>
            </div>

            <div>
                <p>Email*</p>
                <input name="email" value={email} onChange={handleChange} placeholder="@" />
                <div style={{ color: "red" }}>{errors.email}</div>
            </div>

            <div>
                <p>Phone Number*</p>
                <input name="phone" value={phone} onChange={handleChange} placeholder="###-###-####" />
                <div style={{ color: "red" }}>{errors.phone}</div>
            </div>

            <div>
                <p>Member ID</p>
                <input name="id" value={id} onChange={handleChange} placeholder="x######" />
            </div>

            <div>
                <p>Trainer:</p>
                <Select
                    value={trainerOptions.find(({ value }) => value === trainer)}
                    onChange={handleSelectChange}
                    options={trainerOptions}
                />
            </div>

            <div>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default UserForm;